import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/options";
import prisma from "@/lib/prisma";
import type {
    GitHubData,
    GitHubProfileData,
    GitHubRepo,
    GitHubEvent,
    LanguageBreakdownEntry,
} from "@/types/profile";
import { GITHUB_LANGUAGE_COLORS } from "@/types/profile";

async function githubFetch(url: string, token: string) {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "VetsWhoCode-App",
        },
    });
    if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

function aggregateLanguages(repos: GitHubRepo[]): LanguageBreakdownEntry[] {
    const counts: Record<string, number> = {};
    for (const repo of repos) {
        if (repo.language && !repo.fork) {
            counts[repo.language] = (counts[repo.language] || 0) + 1;
        }
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (total === 0) return [];

    return Object.entries(counts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([language, count]) => ({
            language,
            percentage: Math.round((count / total) * 100),
            color: GITHUB_LANGUAGE_COLORS[language] || "#8b8b8b",
        }));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ error: "Method not allowed" });
    }

    const session = await getServerSession(req, res, options);
    if (!session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        // Get the user's GitHub access token from the Account table
        const account = await prisma.account.findFirst({
            where: {
                userId: session.user.id,
                provider: "github",
            },
            select: { access_token: true },
        });

        if (!account?.access_token) {
            return res.status(404).json({ error: "No GitHub account linked" });
        }

        const token = account.access_token;

        // Fetch profile first to get the GitHub login
        const profile = await githubFetch(
            "https://api.github.com/user",
            token
        ) as GitHubProfileData;

        // Then fetch repos and events in parallel using the real login
        const [repos, events] = await Promise.all([
            githubFetch(
                "https://api.github.com/user/repos?per_page=100&sort=updated&direction=desc&type=owner",
                token
            ) as Promise<GitHubRepo[]>,
            githubFetch(
                `https://api.github.com/users/${profile.login}/events?per_page=30`,
                token
            ).catch(() => [] as GitHubEvent[]),
        ]);

        // Compute aggregated stats
        const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
        const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
        const accountAgeDays = Math.floor(
            (Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24)
        );

        // Aggregate languages from top 30 repos by stars
        const topRepos = [...repos]
            .filter((r) => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 30);
        const languages = aggregateLanguages(topRepos);
        const topLanguage = languages.length > 0 ? languages[0].language : null;

        const data: GitHubData = {
            profile,
            repos,
            languages,
            events,
            stats: { totalStars, totalForks, accountAgeDays, topLanguage },
        };

        // Cache for 5 minutes
        res.setHeader("Cache-Control", "private, s-maxage=300, stale-while-revalidate=600");
        return res.status(200).json(data);
    } catch (error) {
        console.error("[GitHub API] Error fetching GitHub data:", error);
        return res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
}
