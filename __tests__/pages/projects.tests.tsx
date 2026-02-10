import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { VWCContributor, VWCProject, VWCProjectRepo } from "@utils/types";
import type { Mock } from "vitest";
import { getProjectData } from "@/lib/project";
import Projects, {
    LinkButtons,
    ProjectCard,
    ProjectDetailModal,
    RepoStats,
    TechStack,
    TopContributors,
} from "@/pages/projects";

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

vi.mock("@components/markdown-renderer", () => ({
    default: ({ content }: { content: string }) => <div data-testid="markdown">{content}</div>,
}));

// Mock the AnimatePresence component
vi.mock("motion/react", () => ({
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    motion: {
        div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    },
}));

vi.mock("@/lib/project", () => ({
    getProjectData: vi.fn(),
}));

// Mock data
const mockContributor: VWCContributor = {
    login: "testuser",
    name: "Test User",
    avatar_url: "https://example.com/avatar.jpg",
    html_url: "https://github.com/testuser",
    contributions: 10,
};

const mockRepo: VWCProjectRepo = {
    html_url: "",
    stargazers_count: 100,
    forks_count: 20,
    open_issues_count: 5,
    subscribers_count: 15,
    contributors: [mockContributor],
};

const mockProject: VWCProject = {
    details: {
        index: 0,
        name: "Test Project",
        headline: "A test project",
        owner: "testowner",
        repo: "test-repo",
        technologies: ["React", "TypeScript"],
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

describe("TopContributors Component", () => {
    it("renders contributor information", () => {
        render(<TopContributors contributors={[mockContributor]} />);

        expect(screen.getByText("Test User")).toBeInTheDocument();
        expect(screen.getByText("@testuser")).toBeInTheDocument();
        expect(screen.getByAltText("Test User")).toHaveAttribute(
            "src",
            "https://example.com/avatar.jpg"
        );
    });
});

describe("ProjectDetailModal Component", () => {
    it("renders project details", () => {
        render(<ProjectDetailModal project={mockProject} />);

        expect(screen.getByText("Test Project")).toBeInTheDocument();
        expect(screen.getByText("A test project")).toBeInTheDocument();
        expect(screen.getByAltText("Test thumbnail")).toBeInTheDocument();
    });

    it("renders markdown content", () => {
        render(<ProjectDetailModal project={mockProject} />);
        expect(screen.getByTestId("markdown")).toHaveTextContent("Test description");
    });
});

describe("ProjectCard Component", () => {
    it("opens modal on click", async () => {
        render(<ProjectCard project={mockProject} />);

        // Click the project card to open modal
        fireEvent.click(screen.getByText("Test Project"));

        // Verify modal content is visible
        await waitFor(() => {
            expect(screen.getByText(mockProject.details.technologies[0])).toBeInTheDocument();
        });
    });

    it("closes modal when clicking close button", () => {
        render(<ProjectCard project={mockProject} />);

        // Open the modal
        fireEvent.click(screen.getByText("Test Project"));

        // Click the close button
        fireEvent.click(screen.getByTestId("close-button"));

        // Verify modal is closed
        // Note: We might need to use waitFor here if there are animations
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
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

        expect(
            screen.getByText(/Welcome to the Vets Who Code project showcase/)
        ).toBeInTheDocument();
        expect(screen.getByText(/Here, you'll find innovative applications/)).toBeInTheDocument();
        expect(screen.getByText(/Explore their work and discover/)).toBeInTheDocument();
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
