import React from "react";
import { Player } from "../../utils/types";

interface ScoreBoardProps {
    players: Player[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players }) => {
    if (players.length === 0) return null;

    return (
        <div className="tw:my-6 tw:rounded-lg tw:border-2 tw:border-secondary tw:bg-white tw:p-5 tw:shadow-lg">
            <h2 className="tw:mb-4 tw:text-center tw:text-2xl tw:font-bold tw:text-secondary">
                Scores
            </h2>
            <ul className="tw:space-y-2">
                {players.map((player) => (
                    <li
                        key={player.name}
                        className="tw:flex tw:justify-between tw:rounded-sm tw:p-2 tw:text-lg tw:text-secondary tw:even:bg-gray-100"
                    >
                        <span className="tw:font-medium">{player.name}:</span>
                        <span className="tw:font-bold tw:text-primary">{player.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScoreBoard;
