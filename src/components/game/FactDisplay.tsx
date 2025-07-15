import React from "react";

interface FactDisplayProps {
    fact: string;
}

const FactDisplay: React.FC<FactDisplayProps> = ({ fact }) => {
    return (
        <div className="tw:mb-6 tw:flex tw:min-h-[100px] tw:items-center tw:justify-center tw:rounded-lg tw:bg-secondary tw:p-6 tw:text-white">
            <p className="tw:text-center tw:text-xl">{fact}</p>
        </div>
    );
};

export default FactDisplay;
