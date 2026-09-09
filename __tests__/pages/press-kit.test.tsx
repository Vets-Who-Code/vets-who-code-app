import { sitemapColumns } from "@data/sitemap-links";
import teamMembers from "@data/team-members.json";
import { render, screen } from "@testing-library/react";
import PressKitPage from "@/pages/press-kit";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}));

const founder = teamMembers.find((member) => member.slug === "jerome-hardaway");
if (!founder) throw new Error("jerome-hardaway is missing from team-members.json");

describe("Press kit page", () => {
    it("states the mission verbatim", () => {
        render(<PressKitPage />);
        expect(
            screen.getByText(
                "We don't train veterans to fill seats. We train them to be impactful on their engineering teams at companies that shape the world."
            )
        ).toBeInTheDocument();
    });

    it("offers both logos as attachment downloads", () => {
        render(<PressKitPage />);
        const color = screen.getByRole("link", { name: "Download full-color PNG" });
        const white = screen.getByRole("link", { name: "Download white PNG" });
        expect(color.getAttribute("href")).toContain("fl_attachment");
        expect(white.getAttribute("href")).toContain("fl_attachment");
        expect(white.getAttribute("href")).toContain("co_rgb:FFFFFF");
    });

    it("offers the founder headshot as an attachment download", () => {
        render(<PressKitPage />);
        const link = screen.getByRole("link", { name: "Download high-res JPEG" });
        expect(link.getAttribute("href")).toContain("fl_attachment");
        expect(link.getAttribute("href")).toContain("jerome-headshot");
        // The download belongs to the founder section, so it must follow its heading.
        const heading = screen.getByRole("heading", { level: 2, name: /Jerome/ });
        expect(heading.compareDocumentPosition(link)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it("renders the founder bio from the team data", () => {
        render(<PressKitPage />);
        expect(screen.getByText(founder.bio)).toBeInTheDocument();
        expect(screen.getByAltText(/Jerome Hardaway/)).toBeInTheDocument();
    });

    it("labels every swatch with its hex value", () => {
        render(<PressKitPage />);
        for (const hex of ["#091f40", "#c5203e", "#EEEDE9", "#1A1823", "#FDB330"]) {
            expect(screen.getByText(hex)).toBeInTheDocument();
        }
    });

    it("links to the contact form and media page", () => {
        render(<PressKitPage />);
        expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
            "href",
            "/contact-us"
        );
        expect(screen.getByRole("link", { name: "See coverage" })).toHaveAttribute(
            "href",
            "/media"
        );
    });

    it("is linked from the footer's Company column", () => {
        const company = sitemapColumns.find((column) => column.heading === "Company");
        expect(company?.links).toContainEqual({ label: "Press Kit", path: "/press-kit" });
    });
});
