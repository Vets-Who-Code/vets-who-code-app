// pages/whos-branch/index.tsx
import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAllBranches } from "../../lib/whos-branch";

type TProps = {
    data: {
        branches: {
            name: string;
        }[];
    };
};

const WhoBranchIndex: NextPage<TProps> = ({ data: { branches } }) => {
    const router = useRouter();
    const [players, setPlayers] = useState(["", "", "", ""]);

    const handleStartGame = () => {
        const validPlayers = players.filter(name => name.trim() !== "");
        if (validPlayers.length === 0) {
            alert("Please enter at least one player name");
            return;
        }
        
        // Store players in sessionStorage
        sessionStorage.setItem('players', JSON.stringify(validPlayers));
        
        // Redirect to first branch
        if (branches.length > 0) {
            router.push(`/whos-branch/${branches[0].name.toLowerCase()}`);
        }
    };

    const handlePlayerChange = (index: number, value: string) => {
        const newPlayers = [...players];
        newPlayers[index] = value;
        setPlayers(newPlayers);
    };

    return (
        <div className="game-container">
            <h1>Who&apos;s Branch Is It Anyway?</h1>
            
            <div id="player-setup">
                <p>Enter Player Names:</p>
                {players.map((player, index) => (
                    <input
                        key={index}
                        type="text"
                        value={player}
                        onChange={(e) => handlePlayerChange(index, e.target.value)}
                        placeholder={`Player ${index + 1}`}
                    />
                ))}
                <button id="start-btn" onClick={handleStartGame}>
                    Start Game
                </button>
            </div>
        </div>
    );
};

export const getStaticProps = async () => {
    const branches = await getAllBranches();
    
    return {
        props: {
            data: {
                branches,
            },
        },
    };
};

export default WhoBranchIndex;