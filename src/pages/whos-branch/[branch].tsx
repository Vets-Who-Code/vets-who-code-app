// pages/whos-branch/[branch].tsx
import type { GetStaticPaths, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAllBranches, getBranchByName } from "../../lib/whos-branch";

interface Question {
    question: string;
    options: string[];
    answer: string;
}

interface Branch {
    name: string;
    questions: Question[];
}

type TProps = {
    data: {
        branch: Branch;
    };
};

const BranchQuiz: NextPage<TProps> = ({ data: { branch } }) => {
    const router = useRouter();
    const [players, setPlayers] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [feedback, setFeedback] = useState("");
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        // Get players from sessionStorage
        const storedPlayers = sessionStorage.getItem("players");
        if (!storedPlayers) {
            router.push("/whos-branch");
            return;
        }
        const playersList = JSON.parse(storedPlayers);
        setPlayers(playersList);

        // Initialize scores
        const initialScores: Record<string, number> = {};
        playersList.forEach((player: string) => {
            initialScores[player] = 0;
        });
        setScores(initialScores);
    }, [router]);

    const handlePlayerSelect = (player: string) => {
        setSelectedPlayer(player);
    };

    const handleAnswerClick = (selectedAnswer: string) => {
        if (!selectedPlayer) {
            setFeedback("Please select a player first!");
            return;
        }

        const currentQuestion = branch.questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.answer;

        if (isCorrect) {
            setScores((prev) => ({
                ...prev,
                [selectedPlayer]: prev[selectedPlayer] + 1,
            }));
            setFeedback("Correct!");
        } else {
            setFeedback(`Wrong! The correct answer is ${currentQuestion.answer}.`);
        }

        setShowNextButton(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < branch.questions.length) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedPlayer(null);
            setFeedback("");
            setShowNextButton(false);
        } else {
            // Game over logic
            setFeedback("Game Over!");
        }
    };

    if (!branch) return null;

    return (
        <div className="game-container">
            <h1>Who&apos;s Branch Is It Anyway?</h1>

            <div id="game-area">
                <p>Select the Player:</p>
                <div id="player-buttons">
                    {players.map((player) => (
                        <button
                            key={player}
                            onClick={() => handlePlayerSelect(player)}
                            className={selectedPlayer === player ? "active" : ""}
                        >
                            {player}
                        </button>
                    ))}
                </div>

                <p id="fact">{branch.questions[currentQuestionIndex].question}</p>

                <div id="answers">
                    {branch.questions[currentQuestionIndex].options.map((option) => (
                        <button
                            key={option}
                            className="answer-btn"
                            onClick={() => handleAnswerClick(option)}
                            disabled={showNextButton}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <p id="feedback">{feedback}</p>

                {showNextButton && (
                    <button id="next-btn" onClick={handleNextQuestion}>
                        Next Question
                    </button>
                )}

                <div id="scores">
                    {Object.entries(scores).map(([player, score]) => (
                        <p key={player}>
                            {player}: {score}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const branches = await getAllBranches();

    return {
        paths: branches.map((branch) => ({
            params: {
                branch: branch.name.toLowerCase(),
            },
        })),
        fallback: false,
    };
};

interface StaticProps {
    params: {
        branch: string;
    };
}

export const getStaticProps = async ({ params }: StaticProps) => {
    const branch = await getBranchByName(params.branch);

    if (!branch) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data: {
                branch,
            },
        },
    };
};

export default BranchQuiz;
