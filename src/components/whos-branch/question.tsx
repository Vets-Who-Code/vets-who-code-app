import React from "react";

interface QuestionProps {
    question: {
        question: string;
        options: string[];
        answer: string;
    };
    onAnswerOptionClick: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswerOptionClick }) => {
    return (
        <div className="question">
            <h2>{question.question}</h2>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswerOptionClick(option === question.answer)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
