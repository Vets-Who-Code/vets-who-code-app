import { NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

const fetchWithTimeout = async (
    url: string,
    options: RequestInit,
    timeout = 5000
): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "read:org, user:email",
                },
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "github" && account.access_token) {
                try {
                    const githubOrg = process.env.GITHUB_ORG;
                    if (!githubOrg) {
                        console.error("GITHUB_ORG environment variable not set");
                        return false;
                    }

                    const githubProfile = profile as GithubProfile;
                    // Add timeout protection to the GitHub API call
                    const res = await fetchWithTimeout(
                        `https://api.github.com/orgs/${githubOrg}/members/${githubProfile.login}`,
                        {
                            headers: {
                                Accept: "application/vnd.github.v3+json",
                                Authorization: `Bearer ${account.access_token}`,
                                "User-Agent": "NextAuth.js",
                            },
                        },
                        5000 // 5 second timeout
                    );

                    // Handle rate limiting
                    if (res.status === 403) {
                        console.error("GitHub API rate limit exceeded");
                        return false;
                    }

                    if (!res.ok) {
                        console.error(`GitHub API error: ${res.status}`);
                        return false;
                    }

                    const isMember = res.status === 204;

                    if (!isMember) {
                        console.error("User is not a member of the required organization");
                        return false;
                    }

                    return true;
                } catch (error) {
                    if (error instanceof Error) {
                        if (error.name === "AbortError") {
                            console.error("GitHub API request timed out");
                        } else {
                            console.error("Error checking GitHub organization membership:", error);
                        }
                    }
                    return false;
                }
            }

            return true;
        },
        async session({ session, user }) {
            try {
                if (session.user) {
                    session.user.id = user.id as string;
                }
                return session;
            } catch (error) {
                console.error("Error in session callback:", error);
                return session;
            }
        },
        async jwt({ token, user, account }) {
            try {
                if (account && user) {
                    token.id = user.id;
                }
                return token;
            } catch (error) {
                console.error("Error in JWT callback:", error);
                return token;
            }
        },
    },
    pages: {
        error: "/auth/error", // Add this if you want to handle auth errors with a custom page
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};
