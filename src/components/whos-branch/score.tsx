import React from "react";

interface ScoreProps {
    score: number;
    totalQuestions: number;
}

const Score: React.FC<ScoreProps> = ({ score, totalQuestions }) => {
    return (
        <div className="score">
            <h2>Your Score</h2>
            <p>
                {score} out of {totalQuestions}
            </p>
        </div>
    );
};

export default Score;
