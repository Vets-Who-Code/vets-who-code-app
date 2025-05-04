import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WhosBranchPage from "@pages/whos-branch";
import Game from "@components/whos-branch";
import questions from "@data/whos-branch.json";

describe("WhosBranchPage", () => {
    test("renders the breadcrumb", () => {
        render(<WhosBranchPage />);
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Who's Branch")).toBeInTheDocument();
    });

    test("renders the game component", () => {
        render(<WhosBranchPage />);
        expect(screen.getByText(questions[0].question)).toBeInTheDocument();
    });
});

describe("Game Component", () => {
    test("renders the first question", () => {
        render(<Game />);
        expect(screen.getByText(questions[0].question)).toBeInTheDocument();
    });

    test("handles correct answer", () => {
        render(<Game />);
        const correctOption = screen.getByText(questions[0].options[0]);
        fireEvent.click(correctOption);
        expect(screen.getByText(questions[1].question)).toBeInTheDocument();
    });

    test("handles incorrect answer", () => {
        render(<Game />);
        const incorrectOption = screen.getByText(questions[0].options[1]);
        fireEvent.click(incorrectOption);
        expect(screen.getByText(questions[1].question)).toBeInTheDocument();
    });

    test("displays score at the end", () => {
        render(<Game />);
        questions.forEach((question) => {
            const option = screen.getByText(question.options[0]);
            fireEvent.click(option);
        });
        expect(screen.getByText("Your Score")).toBeInTheDocument();
    });
});
