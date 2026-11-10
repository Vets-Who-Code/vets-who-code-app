import fs from "fs";
import path from "path";
import type { Mock } from "vitest";
import { getGithubRepo } from "@/lib/github";
import {
    getAllProjects,
    getLatestFeaturedPullRequest,
    getProjectBySlug,
    getProjectData,
    getProjectPageData,
    getProjectSlugs,
} from "@/lib/project";

vi.mock("@/lib/github", () => ({
    getGithubRepo: vi.fn(),
}));

const repoStats = {
    html_url: "https://github.com/Vets-Who-Code/vets-who-code-app",
    stargazers_count: 55,
    open_issues_count: 3,
    forks_count: 20,
    subscribers_count: 8,
};

const projectDir = path.join(process.cwd(), "src/data/projects");
const jsonFiles = fs.readdirSync(projectDir).filter((file) => file.endsWith(".json"));

describe("project slugs", () => {
    it("derives slugs from the JSON filenames without the extension", () => {
        const slugs = getProjectSlugs();
        expect(slugs).toHaveLength(jsonFiles.length);
        expect(slugs).toContain("vets-who-code-app");
        expect(slugs.some((slug) => slug.endsWith(".json"))).toBe(false);
    });

    it("ignores non-JSON directory entries such as .DS_Store", () => {
        const readdir = vi
            .spyOn(fs, "readdirSync")
            .mockReturnValue([".DS_Store", "prework.json"] as never);
        expect(getProjectSlugs()).toEqual(["prework"]);
        readdir.mockRestore();
    });

    it("resolves a record by slug with or without the .json suffix", () => {
        expect(getProjectBySlug("vets-who-code-app").slug).toBe("vets-who-code-app");
        expect(getProjectBySlug("vets-who-code-app.json").slug).toBe("vets-who-code-app");
    });
});

describe("project records (data contract)", () => {
    const records = getAllProjects();

    it("loads every record in src/data/projects", () => {
        expect(records.length).toBeGreaterThan(0);
        expect(records).toHaveLength(jsonFiles.length);
    });

    it.each(records.map((record) => [record.slug, record] as const))(
        "%s carries the catalog fields",
        (_slug, record) => {
            expect(record.summary.trim().length).toBeGreaterThan(0);
            expect(record.summary.length).toBeLessThanOrEqual(160);
            expect(record.serves.trim().length).toBeGreaterThan(0);
            expect(record.owner).toBe("Vets-Who-Code");
            expect(["live", "maintained", "archived"]).toContain(record.status);
            expect(record.shippedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(record.builtBy.length).toBeGreaterThan(0);
            for (const contributor of record.builtBy) {
                expect(contributor.login).toMatch(/^[A-Za-z0-9-]+$/);
                if (contributor.profile) expect(contributor.profile).toMatch(/^\//);
                if (contributor.story) {
                    const post = `${contributor.story.replace(/^\/blogs\//, "")}.md`;
                    expect(fs.existsSync(path.join(process.cwd(), "src/data/blogs", post))).toBe(
                        true
                    );
                }
            }
        }
    );

    it.each(
        records
            .filter((record) => record.featuredPullRequests)
            .map((record) => [record.slug, record] as const)
    )("%s features only merged PRs from its own repo by its builtBy troops", (_slug, record) => {
        const logins = record.builtBy.map((contributor) => contributor.login);
        for (const pr of record.featuredPullRequests ?? []) {
            expect(logins).toContain(pr.author);
            expect(pr.author).not.toBe("jeromehardaway");
            expect(pr.repo).toBe(record.repo);
            expect(pr.url).toBe(
                `https://github.com/${record.owner}/${record.repo}/pull/${pr.number}`
            );
            expect(pr.mergedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(pr.title.trim().length).toBeGreaterThan(0);
            expect(pr.note.trim().length).toBeGreaterThan(0);
        }
    });

    it("lists no private or founder-only repository", () => {
        const repos = records.map((record) => record.repo);
        expect(repos).not.toContain("web-curriculum");
        expect(repos).not.toContain("vets-who-code.github.io");
    });
});

describe("getLatestFeaturedPullRequest", () => {
    it("returns the most recently merged featured PR across the catalog", () => {
        const all = getAllProjects().flatMap((project) => project.featuredPullRequests ?? []);
        const latest = getLatestFeaturedPullRequest();

        expect(latest).not.toBeNull();
        for (const pr of all) expect((latest?.mergedAt ?? "") >= pr.mergedAt).toBe(true);
    });

    it("returns null when no record features a PR", () => {
        const readdir = vi.spyOn(fs, "readdirSync").mockReturnValue(["prework.json"] as never);
        expect(getLatestFeaturedPullRequest()).toBeNull();
        readdir.mockRestore();
    });
});

describe("GitHub fallback", () => {
    beforeEach(() => {
        vi.spyOn(console, "warn").mockImplementation(() => undefined);
    });

    it("keeps the other projects and nulls the repo when one fetch fails", async () => {
        (getGithubRepo as Mock).mockImplementation(async (_owner: string, repo: string) => {
            if (repo === "Prework") throw new Error("Status code: 404");
            return repoStats;
        });

        const projects = await getProjectData();

        expect(projects).toHaveLength(jsonFiles.length);
        expect(projects.find((p) => p.details.slug === "prework")?.repo).toBeNull();
        expect(projects.find((p) => p.details.slug === "vets-who-code-app")?.repo).toEqual(
            repoStats
        );
    });

    it("sorts the catalog by index", async () => {
        (getGithubRepo as Mock).mockResolvedValue(repoStats);
        const indexes = (await getProjectData()).map((p) => p.details.index);
        expect(indexes).toEqual([...indexes].sort((a, b) => a - b));
    });

    it("returns repo: null for a detail page instead of throwing", async () => {
        (getGithubRepo as Mock).mockRejectedValue(new Error("rate limited"));

        const project = await getProjectPageData("prework");

        expect(project.details.slug).toBe("prework");
        expect(project.repo).toBeNull();
    });
});
