import { render, screen, fireEvent } from "@testing-library/react";
import { VWCProject, VWCContributor, VWCProjectRepo } from "@utils/types";
import Projects from "pages/projects";
import {
    TechStack,
    LinkButtons,
    RepoStats,
    TopContributors,
    ProjectDetailModal,
    ProjectCard,
} from "pages/projects";
import { getProjectData } from "lib/project";
import { waitFor } from "@testing-library/react";

// Mock dependencies
jest.mock("@components/seo/page-seo", () => ({
    __esModule: true,
    default: () => <div data-testid="seo" />,
}));

jest.mock("@layout/layout-01", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>,
}));

jest.mock("@components/breadcrumb", () => ({
    __esModule: true,
    default: () => <div data-testid="breadcrumb" />,
}));

jest.mock("@components/vwc-grid", () => ({
    VWCGrid: ({ children }: { children: React.ReactNode }) => <div data-testid="vwc-grid">{children}</div>,
}));

jest.mock("@components/markdown-renderer", () => ({
    __esModule: true,
    default: ({ content }: { content: string }) => <div data-testid="markdown">{content}</div>,
}));

// Mock the AnimatePresence component
jest.mock("motion/react", () => ({
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    motion: {
        div: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
    },
}));

jest.mock("@/lib/project", () => ({
    getProjectData: jest.fn(),
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
        (getProjectData as jest.Mock).mockResolvedValue([mockProject]);

        const { getStaticProps } = require("@/pages/projects");
        const result = await getStaticProps();

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

    it("handles errors appropriately", async () => {
        (getProjectData as jest.Mock).mockRejectedValue(new Error("API Error"));

        const { getStaticProps } = require("@/pages/projects");
        await expect(getStaticProps()).rejects.toThrow("Failed to update github project data");
    });
});
