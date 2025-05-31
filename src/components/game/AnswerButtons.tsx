import React from 'react';
import { MilitaryBranch } from '@/utils/types';

interface AnswerButtonsProps {
  onAnswer: (answer: MilitaryBranch) => void;
  branches: MilitaryBranch[];
}

const AnswerButtons: React.FC<AnswerButtonsProps> = ({ onAnswer, branches }) => {
  return (
    <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4">
      {branches.map((branch) => (
        <button
          key={branch}
          onClick={() => onAnswer(branch)}
          className="tw-px-4 tw-py-3 tw-bg-gray-200 tw-text-secondary tw-font-medium tw-rounded-lg hover:tw-bg-primary hover:tw-text-white tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
        >
          {branch}
        </button>
      ))}
    </div>
  );
};

export default AnswerButtons;
