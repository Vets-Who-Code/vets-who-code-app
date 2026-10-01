import { techPartners } from "@data/sponsors";
import { render, screen } from "@testing-library/react";
import SponsorPage from "@/pages/sponsors";

vi.mock("next/router", () => ({ useRouter: () => ({ asPath: "/sponsors" }) }));

describe("/sponsors", () => {
    beforeEach(() => {
        render(<SponsorPage />);
    });

    it("has exactly one h1", () => {
        expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    });

    it("renders only approved partner logos", () => {
        for (const partner of techPartners) {
            const logo = screen.queryByAltText(`${partner.name} logo`);
            if (partner.logoApproved) expect(logo).toBeInTheDocument();
            else expect(logo).not.toBeInTheDocument();
        }
    });

    it("links every stat footnote to a source", () => {
        for (const marker of screen.getAllByRole("link", { name: /^Source \d$/ })) {
            const id = marker.getAttribute("href")?.slice(1) ?? "";
            expect(document.getElementById(id)).toBeInTheDocument();
        }
    });
});
