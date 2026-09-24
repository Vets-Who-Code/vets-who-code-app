import { render, screen } from "@testing-library/react";
import { VWCProject } from "@utils/types";
import type { Mock } from "vitest";
import { getProjectPageData, getProjectSlugs } from "@/lib/project";
import ProjectDetail, { getStaticPaths, getStaticProps } from "@/pages/projects/[slug]";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}));

vi.mock("@components/breadcrumb", () => ({
    default: ({ currentPage }: { currentPage: string }) => (
        <div data-testid="breadcrumb">{currentPage}</div>
    ),
}));

vi.mock("@components/markdown-renderer", () => ({
    default: ({ content }: { content: string }) => <div data-testid="markdown">{content}</div>,
}));

// next/head only emits through a head manager, which testing-library does not
// mount; render its children inline so the ld+json script lands in the DOM.
vi.mock("next/head", () => ({
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/lib/project", () => ({
    getProjectSlugs: vi.fn(),
    getProjectPageData: vi.fn(),
}));

const mockProject: VWCProject = {
    details: {
        index: 1,
        slug: "test-project",
        name: "Test Project",
        headline: "A test project",
        summary: "Does one thing well.",
        serves: "People who need the one thing.",
        owner: "Vets-Who-Code",
        repo: "test-repo",
        technologies: ["TypeScript", "Next.js"],
        builtBy: [
            { login: "founder", profile: "/team/founder" },
            { login: "troop", story: "/blogs/troop-story" },
        ],
        shippedAt: "2019-08-06",
        status: "live",
        thumbnail: { src: "https://example.com/thumb.png", alt: "Test thumbnail" },
        live_url: "https://example.com",
        long_description: ["First paragraph", "Second paragraph"],
    },
    repo: null,
};

const readJsonLd = (container: HTMLElement) => {
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    return JSON.parse(script?.textContent ?? "{}") as Record<string, unknown>;
};

describe("Project detail page", () => {
    it("renders the record's summary, audience, and long description", () => {
        render(<ProjectDetail project={mockProject} />);

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Test Project");
        expect(screen.getByText("A test project")).toBeInTheDocument();
        expect(screen.getByText("Does one thing well.")).toBeInTheDocument();
        expect(screen.getByText(/People who need the one thing\./)).toBeInTheDocument();
        expect(screen.getByText(/Shipped 2019/)).toBeInTheDocument();
        expect(screen.getAllByTestId("markdown").map((el) => el.textContent)).toEqual([
            "First paragraph",
            "Second paragraph",
        ]);
    });

    it("renders Built by from the record with no repo stats when GitHub was unavailable", () => {
        render(<ProjectDetail project={mockProject} />);

        expect(screen.queryByText("Repo Statistics")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Built by" })).toBeInTheDocument();
        expect(screen.getByTitle("View founder's profile")).toHaveAttribute(
            "href",
            "/team/founder"
        );
        expect(screen.getByTitle("View troop's profile")).toHaveAttribute(
            "href",
            "https://github.com/troop"
        );
        expect(screen.getByText("Read their story").closest("a")).toHaveAttribute(
            "href",
            "/blogs/troop-story"
        );
    });

    it("renders repo stats when GitHub data is present", () => {
        const withRepo: VWCProject = {
            ...mockProject,
            repo: {
                html_url: "",
                stargazers_count: 206,
                open_issues_count: 1,
                forks_count: 46,
                subscribers_count: 9,
            },
        };
        render(<ProjectDetail project={withRepo} />);

        expect(screen.getByText("Repo Statistics")).toBeInTheDocument();
        expect(screen.getByText("206")).toBeInTheDocument();
    });

    it("emits SoftwareSourceCode structured data", () => {
        const { container } = render(<ProjectDetail project={mockProject} />);
        const jsonLd = readJsonLd(container);

        expect(jsonLd["@type"]).toBe("SoftwareSourceCode");
        expect(jsonLd.codeRepository).toBe("https://github.com/Vets-Who-Code/test-repo");
        expect(jsonLd.url).toBe("https://vetswhocode.io/projects/test-project");
        expect(jsonLd.datePublished).toBe("2019-08-06");
        expect(jsonLd.programmingLanguage).toEqual(["TypeScript", "Next.js"]);
        expect(jsonLd.contributor).toEqual([
            { "@type": "Person", name: "founder", url: "https://github.com/founder" },
            { "@type": "Person", name: "troop", url: "https://github.com/troop" },
        ]);
        expect(jsonLd.targetProduct).toEqual({
            "@type": "SoftwareApplication",
            name: "Test Project",
            url: "https://example.com",
        });
    });

    it("omits targetProduct when there is no live URL", () => {
        const noLive: VWCProject = {
            ...mockProject,
            details: { ...mockProject.details, live_url: null },
        };
        const { container } = render(<ProjectDetail project={noLive} />);

        expect(readJsonLd(container)).not.toHaveProperty("targetProduct");
        expect(screen.queryByText("Live")).not.toBeInTheDocument();
    });
});

describe("getStaticPaths", () => {
    it("emits one clean slug per record and never falls back", async () => {
        (getProjectSlugs as Mock).mockReturnValue(["vets-who-code-app", "prework"]);

        const result = await getStaticPaths({});

        expect(result).toEqual({
            paths: [{ params: { slug: "vets-who-code-app" } }, { params: { slug: "prework" } }],
            fallback: false,
        });
    });
});

describe("getStaticProps", () => {
    it("loads the project for the slug with the light layout", async () => {
        (getProjectPageData as Mock).mockResolvedValue(mockProject);

        const result = await getStaticProps({ params: { slug: "test-project" } });

        expect(getProjectPageData).toHaveBeenCalledWith("test-project");
        expect(result).toEqual({
            props: {
                project: mockProject,
                layout: {
                    headerShadow: true,
                    headerFluid: false,
                    footerMode: "light",
                },
            },
        });
    });
});
