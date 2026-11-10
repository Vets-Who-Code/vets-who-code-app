import { render, screen } from "@testing-library/react";
import WorkBelt from "@ui/work-belt";

const pullRequest = {
    repo: "vets-who-code-app",
    number: 325,
    title: "Migrate to next js",
    url: "https://github.com/Vets-Who-Code/vets-who-code-app/pull/325",
    author: "andrew-t-james",
    mergedAt: "2022-03-26",
    note: "Moved the site from Gatsby to Next.js.",
};

describe("WorkBelt", () => {
    it("links SEE THE WORK to /projects with no featured PR", () => {
        render(<WorkBelt />);

        expect(screen.getByRole("link", { name: /See the work/ })).toHaveAttribute(
            "href",
            "/projects"
        );
        expect(screen.queryByText("Featured PR")).not.toBeInTheDocument();
    });

    it("shows the featured PR's title, repo and author linked to GitHub", () => {
        render(<WorkBelt pullRequest={pullRequest} />);

        const link = screen.getByRole("link", { name: "Migrate to next js" });
        expect(link).toHaveAttribute("href", pullRequest.url);
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
        expect(screen.getByText(/vets-who-code-app #325 by @andrew-t-james/)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /See the work/ })).toHaveAttribute(
            "href",
            "/projects"
        );
    });
});
