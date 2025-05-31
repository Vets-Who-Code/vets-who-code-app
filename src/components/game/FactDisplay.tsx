import React from 'react';

interface FactDisplayProps {
  fact: string;
}

const FactDisplay: React.FC<FactDisplayProps> = ({ fact }) => {
  return (
    <div className="tw-p-6 tw-bg-secondary tw-text-white tw-rounded-lg tw-mb-6 tw-min-h-[100px] tw-flex tw-items-center tw-justify-center">
      <p className="tw-text-xl tw-text-center">{fact}</p>
    </div>
  );
};

export default FactDisplay;
