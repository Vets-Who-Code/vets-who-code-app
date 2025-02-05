import React, { useState } from "react";
import questions from "@data/whos-branch.json";
import Question from "./question";
import Score from "./score";

const Game = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerOptionClick = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="game">
            {showScore ? (
                <Score score={score} totalQuestions={questions.length} />
            ) : (
                <Question
                    question={questions[currentQuestionIndex]}
                    onAnswerOptionClick={handleAnswerOptionClick}
                />
            )}
        </div>
    );
};

export default Game;
