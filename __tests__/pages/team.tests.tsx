import boardMembers from "@data/board-members.json";
import teamMembers from "@data/team-members.json";
import { fireEvent, render, screen } from "@testing-library/react";
import type { IInstructor } from "@utils/types";
import Team from "@/pages/team";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}));

const data = {
    teamMembers: teamMembers as IInstructor[],
    boardMembers: boardMembers as IInstructor[],
};

const renderPage = () => render(<Team data={data} />);

describe("Team page", () => {
    it("renders every staff and board member", () => {
        renderPage();
        for (const member of [...data.teamMembers, ...data.boardMembers]) {
            expect(screen.getByText(member.name)).toBeInTheDocument();
        }
    });

    it("links each person to their profile page", () => {
        renderPage();
        for (const member of [...data.teamMembers, ...data.boardMembers]) {
            const link = screen.getByTitle(`View ${member.name}'s profile`);
            expect(link).toHaveAttribute("href", `/team/${member.slug}`);
        }
    });

    it("shows zero-padded counts derived from the data", () => {
        renderPage();
        const pad = (n: number) => String(n).padStart(2, "0");
        expect(screen.getByText(`${pad(data.teamMembers.length)} Staff`)).toBeInTheDocument();
        expect(screen.getByText(`${pad(data.boardMembers.length)} Board`)).toBeInTheDocument();
    });

    it("falls back to the placeholder photo once, without looping", () => {
        const { container } = renderPage();
        const photo = container.querySelector("img") as HTMLImageElement;

        fireEvent.error(photo);
        expect(photo.getAttribute("src")).toBe("/images/profile/placeholder-profile.jpg");

        // A failing placeholder must not re-trigger the swap.
        photo.setAttribute("src", "/images/profile/placeholder-profile.jpg");
        fireEvent.error(photo);
        expect(photo.getAttribute("src")).toBe("/images/profile/placeholder-profile.jpg");
    });

    it("gives each card a single accessible name", () => {
        renderPage();
        const link = screen.getByTitle(`View ${data.teamMembers[0].name}'s profile`);
        expect(link.querySelector("img")).toHaveAttribute("alt", "");
    });

    it("shows staff roles but omits the redundant board role line", () => {
        renderPage();
        expect(screen.getByText(data.teamMembers[0].designation)).toBeInTheDocument();
        expect(screen.queryByText("Board Member")).not.toBeInTheDocument();
    });
});
