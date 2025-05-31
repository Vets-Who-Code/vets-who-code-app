import React from 'react';
import { Player } from '@/utils/types';

interface ScoreBoardProps {
  players: Player[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players }) => {
  if (players.length === 0) return null;

  return (
    <div className="tw-my-6 tw-p-5 tw-border-2 tw-border-secondary tw-rounded-lg tw-shadow-lg tw-bg-white">
      <h2 className="tw-text-2xl tw-font-bold tw-text-secondary tw-mb-4 tw-text-center">Scores</h2>
      <ul className="tw-space-y-2">
        {players.map((player, index) => (
          <li
            key={index}
            className="tw-flex tw-justify-between tw-text-lg tw-text-secondary tw-p-2 tw-rounded even:tw-bg-gray-100"
          >
            <span className="tw-font-medium">{player.name}:</span>
            <span className="tw-font-bold tw-text-primary">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBoard;
