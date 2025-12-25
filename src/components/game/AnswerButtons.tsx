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
        <div className="tw-grid tw-grid-cols-2 tw-gap-4 md:tw-grid-cols-3">
            {branches.map((branch) => (
                <button
                    type="button"
                    key={branch}
                    onClick={() => onAnswer(branch)}
                    disabled={disabled}
                    className="tw-flex tw-h-[80px] tw-flex-col tw-items-center tw-justify-center tw-rounded-lg tw-bg-gray-50 tw-px-4 tw-py-3 tw-font-medium tw-text-secondary tw-shadow-md tw-transition-all hover:tw-scale-105 hover:tw-bg-primary hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary focus:tw-ring-offset-2 disabled:tw-opacity-70"
                >
                    <i className={`${branchIcons[branch]} tw-mb-2 tw-text-lg`} />
                    {branch}
                </button>
            ))}
        </div>
    );
};

export default AnswerButtons;
