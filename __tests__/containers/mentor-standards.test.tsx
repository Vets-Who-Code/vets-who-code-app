import MentorStandardsArea from "@containers/mentor-standards";
import { CONDUCT_STANDARD, GROWTH_STAGES, MENTOR_STANDARDS } from "@data/mentor-standards";
import { render, screen } from "@testing-library/react";

describe("Mentor standards and development guide", () => {
    it("renders every criterion with a description at every growth stage", () => {
        expect(MENTOR_STANDARDS.map((s) => s.criterion)).toEqual([
            "Cadence",
            "Evidence-Based Feedback",
            "Gradual Release",
            "Market Anchoring",
        ]);
        expect(GROWTH_STAGES).toEqual(["Learning", "Practicing", "Proficient", "Coaching Others"]);
        render(<MentorStandardsArea />);
        for (const standard of MENTOR_STANDARDS) {
            const card = screen
                .getByRole("heading", { level: 3, name: standard.criterion })
                .closest("article");
            expect(card).not.toBeNull();
            for (const stage of GROWTH_STAGES) {
                expect(card).toHaveTextContent(stage);
                expect(card).toHaveTextContent(standard.stages[stage]);
            }
            expect(card).toHaveTextContent(standard.support);
        }
    });

    it("states conduct as pass or fail, with rotating off as the consequence", () => {
        render(<MentorStandardsArea />);
        expect(screen.getByRole("heading", { level: 2, name: /conduct/i })).toHaveTextContent(
            /pass or fail/i
        );
        expect(screen.getByText(/rotates off/)).toBeInTheDocument();
        for (const item of CONDUCT_STANDARD.covers) {
            expect(screen.getByText(item)).toBeInTheDocument();
        }
        expect(screen.getByText(CONDUCT_STANDARD.support)).toBeInTheDocument();
    });

    it("never calls itself a rubric", () => {
        const { container } = render(<MentorStandardsArea />);
        expect(container.textContent).not.toMatch(/rubric/i);
    });
});
