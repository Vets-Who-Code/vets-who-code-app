import { render, screen } from "@testing-library/react";
import { GithubRepo, VWCProject } from "@utils/types";
import type { Mock } from "vitest";
import { BuiltBy, LinkButtons, ProjectCard, RepoStats, TechStack } from "@/components/projects";
import { getProjectData } from "@/lib/project";
import Projects from "@/pages/projects";

// Mock dependencies
vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}));

vi.mock("@components/breadcrumb", () => ({
    default: () => <div data-testid="breadcrumb" />,
}));

vi.mock("@components/vwc-grid", () => ({
    VWCGrid: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="vwc-grid">{children}</div>
    ),
}));

// The grid card animates with motion; render it as a plain div.
vi.mock("motion/react", () => ({
    motion: {
        div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    },
}));

vi.mock("@/lib/project", () => ({
    getProjectData: vi.fn(),
}));

// Mock data
const mockRepo: GithubRepo = {
    html_url: "",
    stargazers_count: 100,
    forks_count: 20,
    open_issues_count: 5,
    subscribers_count: 15,
};

const mockProject: VWCProject = {
    details: {
        index: 0,
        slug: "test-project",
        name: "Test Project",
        headline: "A test project",
        summary: "Does one thing.",
        serves: "Test users",
        owner: "testowner",
        repo: "test-repo",
        technologies: ["React", "TypeScript"],
        builtBy: [
            { login: "testuser" },
            { login: "staffer", profile: "/team/staffer" },
            { login: "storyteller", story: "/blogs/storyteller" },
        ],
        shippedAt: "2020-01-01",
        status: "live",
        thumbnail: {
            src: "https://example.com/thumbnail.jpg",
            alt: "Test thumbnail",
        },
        live_url: "https://example.com",
        long_description: ["Test description"],
    },
    repo: mockRepo,
};

describe("TechStack Component", () => {
    it("renders all technologies", () => {
        const technologies = ["React", "TypeScript", "Node.js"];
        render(<TechStack techStack={technologies} />);

        technologies.forEach((tech) => {
            expect(screen.getByText(tech)).toBeInTheDocument();
        });
    });
});

describe("LinkButtons Component", () => {
    it("renders GitHub link", () => {
        const url = "https://github.com/test";
        render(<LinkButtons github_url={url} />);
        const ghLink = screen.getByText("GitHub").closest("a");
        expect(ghLink).toHaveAttribute("href", url);
    });

    it("renders both GitHub and Live links when live_url is provided", () => {
        const ghURL = "https://github.com/test";
        const liveURL = "https://test.com";
        render(<LinkButtons github_url={ghURL} live_url={liveURL} />);
        const ghLink = screen.getByText("GitHub").closest("a");
        expect(ghLink).toHaveAttribute("href", ghURL);
        const liveLink = screen.getByText("Live").closest("a");
        expect(liveLink).toHaveAttribute("href", liveURL);
    });

    it("omits the Live link when live_url is null", () => {
        render(<LinkButtons github_url="https://github.com/test" live_url={null} />);
        expect(screen.queryByText("Live")).not.toBeInTheDocument();
    });
});

describe("RepoStats Component", () => {
    it("renders repository statistics", () => {
        render(<RepoStats repo={mockRepo} />);

        expect(screen.getByText("100")).toBeInTheDocument(); // Stars
        expect(screen.getByText("5")).toBeInTheDocument(); // Issues
        expect(screen.getByText("15")).toBeInTheDocument(); // Watching
        expect(screen.getByText("20")).toBeInTheDocument(); // Forks
    });
});

describe("BuiltBy Component", () => {
    it("links each login to GitHub with a GitHub-hosted avatar", () => {
        render(<BuiltBy contributors={mockProject.details.builtBy} />);

        const link = screen.getByTitle("View testuser's profile");
        expect(link).toHaveAttribute("href", "https://github.com/testuser");
        expect(link.querySelector("img")).toHaveAttribute(
            "src",
            "https://avatars.githubusercontent.com/testuser?s=64"
        );
        expect(screen.getByText("@testuser")).toBeInTheDocument();
    });

    it("prefers an internal profile path when one is set", () => {
        render(<BuiltBy contributors={mockProject.details.builtBy} />);
        expect(screen.getByTitle("View staffer's profile")).toHaveAttribute(
            "href",
            "/team/staffer"
        );
    });

    it("links a transition story when one is set", () => {
        render(<BuiltBy contributors={mockProject.details.builtBy} />);
        const stories = screen.getAllByText("Read their story");
        expect(stories).toHaveLength(1);
        expect(stories[0].closest("a")).toHaveAttribute("href", "/blogs/storyteller");
    });
});

describe("ProjectCard Component", () => {
    it("links the card to the project's detail page", () => {
        render(<ProjectCard project={mockProject} />);

        const link = screen.getByTitle("View Test Project");
        expect(link).toHaveAttribute("href", "/projects/test-project");
        expect(link).toHaveTextContent("Test Project");
        expect(link).toHaveTextContent("A test project");
    });
});

describe("Projects Page", () => {
    it("renders projects list", () => {
        render(<Projects projects={[mockProject]} />);

        expect(screen.getByTestId("seo")).toBeInTheDocument();
        expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
        expect(screen.getByTestId("vwc-grid")).toBeInTheDocument();
        expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    it("renders description text", () => {
        render(<Projects projects={[mockProject]} />);

        expect(screen.getByText(/ship software to production/)).toBeInTheDocument();
        expect(screen.getByText(/Each project links to its source on GitHub/)).toBeInTheDocument();
    });
});

describe("getStaticProps", () => {
    it("returns project data and layout settings", async () => {
        (getProjectData as Mock).mockResolvedValue([mockProject]);

        const { getStaticProps } = await import("@/pages/projects");
        const result = await getStaticProps({});

        expect(result).toEqual({
            props: {
                projects: [mockProject],
                layout: {
                    headerShadow: true,
                    headerFluid: false,
                    footerMode: "light",
                },
            },
            revalidate: 600,
        });
    });

    it("handles errors by falling back to empty projects", async () => {
        (getProjectData as Mock).mockRejectedValue(new Error("API Error"));

        const { getStaticProps } = await import("@/pages/projects");
        const result = await getStaticProps({});

        expect(result).toEqual({
            props: {
                projects: [],
                layout: {
                    headerShadow: true,
                    headerFluid: false,
                    footerMode: "light",
                },
            },
            revalidate: 60,
        });
    });
});
