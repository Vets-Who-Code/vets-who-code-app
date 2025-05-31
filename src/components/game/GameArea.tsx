import React from "react";
import FactDisplay from "./FactDisplay";
import AnswerButtons from "./AnswerButtons";
import { Fact, MilitaryBranch } from "../../utils/types";

interface GameAreaProps {
    currentFact: Fact | null;
    handleAnswer: (answer: MilitaryBranch) => void;
    branches: MilitaryBranch[];
    feedbackMessage: string | null;
    isAnswerCorrect: boolean | null;
    showFeedback: boolean;
    selectedPlayerName: string | null;
}

const GameArea: React.FC<GameAreaProps> = ({
    currentFact,
    handleAnswer,
    branches,
    feedbackMessage,
    isAnswerCorrect,
    showFeedback,
    selectedPlayerName,
}) => {
    if (!currentFact) {
        return <p className="tw-py-10 tw-text-center tw-text-secondary">Loading fact...</p>;
    }

    return (
        <div className="tw-game-area tw-my-8 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
            {selectedPlayerName && !showFeedback && (
                <p className="tw-mb-4 tw-text-center tw-text-lg tw-text-secondary">
                    Current Player:{" "}
                    <span className="tw-font-semibold tw-text-primary">{selectedPlayerName}</span>
                </p>
            )}
            <FactDisplay fact={currentFact.fact} />
            {!showFeedback ? (
                <AnswerButtons onAnswer={handleAnswer} branches={branches} />
            ) : (
                <div className="tw-mt-6">
                    <AnswerButtons onAnswer={handleAnswer} branches={branches} disabled />
                </div>
            )}
            {showFeedback && feedbackMessage && (
                <p
                    className={`tw-mt-6 tw-text-center tw-text-2xl tw-font-bold ${
                        isAnswerCorrect ? "tw-text-green-500" : "tw-text-primary"
                    }`}
                >
                    {feedbackMessage}
                </p>
            )}
        </div>
    );
};

export default GameArea;
