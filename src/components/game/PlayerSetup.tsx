import React, { useState } from 'react';
import { Player } from '@/utils/types';

interface PlayerSetupProps {
  onSetupComplete: (players: Player[]) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onSetupComplete }) => {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '', '']);
  const [numPlayers, setNumPlayers] = useState<number>(1);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlayers = playerNames
      .slice(0, numPlayers)
      .filter((name) => name.trim() !== '')
      .map((name) => ({ name, score: 0 }));
    if (newPlayers.length > 0) {
      onSetupComplete(newPlayers);
    } else {
      alert("Please enter at least one player name.");
    }
  };

  return (
    <div className="tw-max-w-md tw-mx-auto tw-p-6 tw-bg-white tw-rounded-lg tw-shadow-md">
      <h2 className="tw-text-2xl tw-font-bold tw-text-secondary tw-mb-6 tw-text-center">Player Setup</h2>
      <form onSubmit={handleSubmit} className="tw-space-y-5">
        <div>
          <label htmlFor="numPlayers" className="tw-block tw-text-sm tw-font-medium tw-text-secondary">Number of Players (1-4):</label>
          <select
            id="numPlayers"
            value={numPlayers}
            onChange={(e) => setNumPlayers(parseInt(e.target.value))}
            className="tw-mt-1 tw-block tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-primary focus:tw-border-primary"
          >
            {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        {Array.from({ length: numPlayers }).map((_, index) => (
          <div key={index}>
            <label htmlFor={`playerName${index}`} className="tw-block tw-text-sm tw-font-medium tw-text-secondary">
              Player {index + 1} Name:
            </label>
            <input
              type="text"
              id={`playerName${index}`}
              value={playerNames[index]}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="tw-mt-1 tw-block tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-primary focus:tw-border-primary"
              placeholder={`Enter Player ${index + 1} Name`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="tw-w-full tw-px-4 tw-py-3 tw-bg-primary tw-text-white tw-font-semibold tw-rounded-lg hover:tw-bg-opacity-80 tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerSetup;
