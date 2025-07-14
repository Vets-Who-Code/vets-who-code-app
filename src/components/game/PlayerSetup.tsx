import React, { useState, useMemo } from "react";
import { Player } from "../../utils/types";

interface PlayerSetupProps {
    onSetupComplete: (players: Player[]) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onSetupComplete }) => {
    const [playerNames, setPlayerNames] = useState<string[]>(["", "", "", ""]);
    const [numPlayers, setNumPlayers] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    // Generate stable IDs for player inputs
    const playerIds = useMemo(() => {
        return Array.from({ length: 4 }, () => `player-${Math.random().toString(36).substr(2, 9)}`);
    }, []);

    const handleNameChange = (index: number, name: string) => {
        setPlayerNames((prevNames) => {
            const newNames = [...prevNames];
            newNames[index] = name;
            return newNames;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const activePlayerNames = playerNames
            .slice(0, numPlayers)
            .filter((name) => name.trim() !== "");

        if (activePlayerNames.length === numPlayers) {
            setError(null);
            // Convert names to Player objects with score initialized to 0
            const players = activePlayerNames.map((name) => ({
                name,
                score: 0,
            }));
            onSetupComplete(players);
        } else {
            setError("Please enter at least one player name.");
        }
    };

    return (
        <div className="tw:mx-auto tw:max-w-md tw:rounded-lg tw:bg-white tw:p-6 tw:shadow-md">
            <h2 className="tw:mb-6 tw:text-center tw:text-2xl tw:font-bold tw:text-secondary">
                Player Setup
            </h2>
            <form onSubmit={handleSubmit} className="tw:space-y-5">
                <div>
                    <label
                        htmlFor="numPlayers"
                        className="tw:block tw:text-sm tw:font-medium tw:text-secondary"
                    >
                        Number of Players (1-4):
                    </label>
                    <select
                        id="numPlayers"
                        value={numPlayers}
                        onChange={(e) => setNumPlayers(parseInt(e.target.value, 10))}
                        className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border tw:border-gray-300 tw:p-3 tw:shadow-xs tw:focus:border-primary tw:focus:outline-hidden tw:focus:ring-primary"
                    >
                        {[1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                    {Array.from({ length: numPlayers }).map((_, index) => {
                        return (
                            <div key={playerIds[index]}>
                                <label
                                    htmlFor={`playerName${index}`}
                                    className="tw:block tw:text-sm tw:font-medium tw:text-secondary"
                                >
                                    Player {index + 1} Name:
                                </label>
                                <input
                                    type="text"
                                    id={`playerName${index}`}
                                    value={playerNames[index] || ""}
                                    onChange={(e) => handleNameChange(index, e.target.value)}
                                    className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border tw:border-gray-300 tw:p-3 tw:shadow-xs tw:focus:border-primary tw:focus:outline-hidden tw:focus:ring-primary"
                                    placeholder={`Enter Player ${index + 1} Name`}
                                    autoComplete="off"
                                />
                            </div>
                        );
                    })}
                </div>
                {error && <div className="tw:mb-2 tw:text-center tw:text-red-600">{error}</div>}
                <button
                    type="submit"
                    className="tw:w-full tw:rounded-lg tw:bg-primary tw:px-4 tw:py-3 tw:font-semibold tw:text-white tw:transition-colors tw:hover:bg-primary/80 tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-primary tw:focus:ring-offset-2"
                >
                    Start Game
                </button>
            </form>
        </div>
    );
};

export default PlayerSetup;
