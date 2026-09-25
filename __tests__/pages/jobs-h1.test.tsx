import { render, screen } from "@testing-library/react";
import JobDetailPage from "@/pages/jobs/[id]";
import JobsPage from "@/pages/jobs/index";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("next-auth/next", () => ({
    getServerSession: vi.fn(),
}));

vi.mock("@/lib/auth-options", () => ({
    options: {},
}));

// Keeps rss-parser out of the happy-dom run.
vi.mock("@lib/jobboardly", () => ({
    getJobs: vi.fn(),
    getCategories: vi.fn(),
    getJobTypes: vi.fn(),
    getJobById: vi.fn(),
}));

const h1Texts = () => screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent);

describe("jobs pages", () => {
    it("/jobs has exactly one h1", () => {
        render(<JobsPage jobs={[]} categories={[]} jobTypes={[]} />);
        expect(h1Texts()).toEqual(["Career Hub"]);
    });

    it("/jobs/[id] has exactly one h1", () => {
        render(
            <JobDetailPage
                job={{
                    id: "1",
                    title: "Engineer",
                    description: "<p>Build things</p>",
                    link: "https://example.com",
                }}
            />
        );
        expect(h1Texts()).toEqual(["Engineer"]);
    });
});
