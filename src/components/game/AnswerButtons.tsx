import React from "react";
import { MilitaryBranch } from "../../utils/types";

interface AnswerButtonsProps {
    onAnswer: (answer: MilitaryBranch) => void;
    branches: MilitaryBranch[];
    disabled?: boolean;
}

// Map branch names to appropriate Font Awesome icons
const branchIcons: Record<MilitaryBranch, string> = {
    Army: "fas fa-shield-alt",
    Navy: "fas fa-anchor",
    "Air Force": "fas fa-fighter-jet",
    Marines: "fas fa-globe-americas",
    "Coast Guard": "fas fa-ship",
    "Space Force": "fas fa-rocket",
};

const AnswerButtons: React.FC<AnswerButtonsProps> = ({ onAnswer, branches, disabled = false }) => {
    return (
        <div className="tw:grid tw:grid-cols-2 tw:gap-4 tw:md:grid-cols-3">
            {branches.map((branch) => (
                <button
                    type="button"
                    key={branch}
                    onClick={() => onAnswer(branch)}
                    disabled={disabled}
                    className="tw:flex tw:h-[80px] tw:flex-col tw:items-center tw:justify-center tw:rounded-lg tw:bg-gray-200 tw:px-4 tw:py-3 tw:font-medium tw:text-secondary tw:shadow-md tw:transition-all tw:hover:scale-105 tw:hover:bg-primary tw:hover:text-white tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-primary tw:focus:ring-offset-2 tw:disabled:opacity-70"
                >
                    <i className={`${branchIcons[branch]} tw:mb-2 tw:text-lg`} />
                    {branch}
                </button>
            ))}
        </div>
    );
};

export default AnswerButtons;
