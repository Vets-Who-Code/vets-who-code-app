import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Layout from "@layout/layout-03";
import SEO from "@components/seo/page-seo";
import EmojiRain from "@components/EmojiRain";
import PlayerSetup from "../components/game/PlayerSetup";
import GameArea from "../components/game/GameArea";
import ScoreBoard from "../components/game/ScoreBoard";
import { Player, Fact, GameState, MilitaryBranch } from "../utils/types";
import factsData from "../data/militaryFacts.json";

type PageWithLayoutType = NextPage & {
    Layout: typeof Layout;
};

const GamePage = () => {
    const [gameState, setGameState] = useState<GameState>({
        players: [],
        currentFactIndex: 0,
        selectedPlayerIndex: null,
        isGameOver: false,
        currentAnswer: null,
        showFeedback: false,
    });
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [showEmojiRain, setShowEmojiRain] = useState<boolean>(false);
    const emojiRainTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Clean up emoji rain effect when component unmounts
    useEffect(() => {
        const timeoutRefValue = emojiRainTimeoutRef.current;
        return () => {
            // Clear the timeout to prevent state updates after unmount
            if (timeoutRefValue) {
                clearTimeout(timeoutRefValue);
            }
        };
    }, []);

    const militaryBranches: MilitaryBranch[] = [
        "Army",
        "Navy",
        "Air Force",
        "Marines",
        "Coast Guard",
        "Space Force",
    ];
    const facts: Fact[] = factsData.map((fact) => ({
        ...fact,
        answer: fact.answer as MilitaryBranch,
    }));

    const handlePlayerSetupComplete = (newPlayers: Player[]) => {
        setGameState((prev) => ({
            ...prev,
            players: newPlayers,
            selectedPlayerIndex: 0,
            currentFactIndex: 0,
            isGameOver: false,
            showFeedback: false,
        }));
    };

    const handleAnswer = (answer: MilitaryBranch) => {
        if (
            gameState.selectedPlayerIndex === null ||
            gameState.isGameOver ||
            gameState.showFeedback
        )
            return;

        const currentFact = facts[gameState.currentFactIndex];
        const currentPlayer = gameState.players[gameState.selectedPlayerIndex];
        let newScore = currentPlayer.score;
        let message = "";
        let correct = false;

        const acceptedAnswers = Array.isArray(currentFact.answer)
            ? currentFact.answer
            : [currentFact.answer];

        if (acceptedAnswers.includes(answer)) {
            newScore += 1;
            message = "Correct!";
            correct = true;
            setShowEmojiRain(true);
            setTimeout(() => {
                setShowEmojiRain(false);
            }, 3000);
        } else {
            if (acceptedAnswers.length === 1) {
                message = `Wrong! The correct answer is ${acceptedAnswers[0]}.`;
            } else if (acceptedAnswers.length === 2) {
                message = `Wrong! The correct answer was either ${acceptedAnswers[0]} or ${acceptedAnswers[1]}.`;
            } else {
                const allButLast = acceptedAnswers.slice(0, -1).join(", ");
                const last = acceptedAnswers[acceptedAnswers.length - 1];
                message = `Wrong! The correct answers were: ${allButLast}, or ${last}.`;
            }
            correct = false;
        }

        setFeedbackMessage(message);
        setIsAnswerCorrect(correct);

        const updatedPlayers = gameState.players.map((p, index) =>
            index === gameState.selectedPlayerIndex ? { ...p, score: newScore } : p
        );

        setGameState((prev) => ({
            ...prev,
            players: updatedPlayers,
            currentAnswer: answer,
            showFeedback: true,
        }));
    };

    const handleNextQuestion = () => {
        // Hide emoji rain when moving to the next question
        setShowEmojiRain(false);

        if (gameState.currentFactIndex + 1 >= facts.length) {
            setGameState((prev) => ({ ...prev, isGameOver: true, showFeedback: false }));
        } else {
            const nextPlayerIndex =
                gameState.selectedPlayerIndex !== null
                    ? (gameState.selectedPlayerIndex + 1) % gameState.players.length
                    : 0;
            setGameState((prev) => ({
                ...prev,
                currentFactIndex: prev.currentFactIndex + 1,
                selectedPlayerIndex: nextPlayerIndex,
                currentAnswer: null,
                showFeedback: false,
            }));
        }
        setFeedbackMessage(null);
        setIsAnswerCorrect(null);
    };

    const handlePlayAgain = () => {
        // Hide emoji rain when restarting the game
        setShowEmojiRain(false);

        setGameState({
            players: [],
            currentFactIndex: 0,
            selectedPlayerIndex: null,
            isGameOver: false,
            currentAnswer: null,
            showFeedback: false,
        });
        setFeedbackMessage(null);
        setIsAnswerCorrect(null);
    };

    const currentFact = facts.length > 0 ? facts[gameState.currentFactIndex] : null;
    const selectedPlayer =
        gameState.selectedPlayerIndex !== null
            ? gameState.players[gameState.selectedPlayerIndex]
            : null;

    // Helper to render main content without nested ternaries
    const renderMainContent = () => {
        if (!gameState.players.length) {
            return <PlayerSetup onSetupComplete={handlePlayerSetupComplete} />;
        }
        if (gameState.isGameOver) {
            return (
                <div className="tw:text-center">
                    <h2 className="tw:mb-8 tw:text-4xl tw:font-semibold tw:text-secondary">
                        Final Scores
                    </h2>
                    <ScoreBoard players={gameState.players} />
                    <button
                        type="button"
                        onClick={handlePlayAgain}
                        className="tw:mt-8 tw:rounded-lg tw:bg-primary tw:px-8 tw:py-3 tw:text-lg tw:font-semibold tw:text-white tw:transition-colors tw:hover:bg-primary/80"
                    >
                        Play Again?
                    </button>
                </div>
            );
        }
        return (
            <>
                <ScoreBoard players={gameState.players} />
                <GameArea
                    currentFact={currentFact}
                    handleAnswer={handleAnswer}
                    branches={militaryBranches}
                    feedbackMessage={feedbackMessage}
                    isAnswerCorrect={isAnswerCorrect}
                    showFeedback={gameState.showFeedback}
                    selectedPlayerName={selectedPlayer ? selectedPlayer.name : null}
                />
                {gameState.showFeedback && (
                    <div className="tw:mt-6 tw:text-center">
                        <button
                            type="button"
                            onClick={handleNextQuestion}
                            className="tw:rounded-lg tw:bg-secondary tw:px-7 tw:py-3 tw:text-lg tw:font-semibold tw:text-white tw:transition-colors tw:hover:bg-secondary/80"
                        >
                            {gameState.currentFactIndex + 1 >= facts.length
                                ? "Show Final Scores"
                                : "Next Question"}
                        </button>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <SEO title="Who's Branch Is It Anyway?" />
            {showEmojiRain && <EmojiRain />}
            <div className="tw:container tw:mx-auto tw:min-h-screen tw:max-w-3xl tw:bg-white tw:p-4 tw:text-secondary">
                <header className="tw:my-8 tw:text-center">
                    <h1 className="tw:text-5xl tw:font-bold tw:text-secondary">
                        Who&#39;s Branch Is It Anyway?
                    </h1>
                </header>

                <div className="tw:mb-8 tw:rounded-lg tw:bg-primary/10 tw:p-6 tw:text-center tw:shadow-md">
                    <h2 className="tw:mb-4 tw:text-2xl tw:font-semibold tw:text-primary">
                        Test Your Military Knowledge!
                    </h2>
                    <p className="tw:mb-3 tw:text-lg tw:text-secondary">
                        Welcome to <em>Whose Branch Is It Anyway?&#39;</em>, the show where points
                        don’t matter. Just like PowerPoint in a field brief. That’s right, are like
                        getting a perfectly pressed uniform before a rain-filled ruck march.
                        Completely useless.
                    </p>
                    <p className="tw:mb-3 tw:text-lg tw:text-secondary">
                        Brought to you by Vets Who Code, this is the military trivia game where you
                        can challenge yourself or compete with friends to see who knows the most
                        about U.S. military history, branches, and traditions.
                    </p>
                    <p className="tw:mb-3 tw:text-lg tw:text-secondary">
                        So grab your MREs, tighten those boot laces, and let’s see if you’ve got
                        what it takes to guess the right branch. Army, Navy, Air Force, Marine
                        Corps, Space Force, or Coast Guard. Based on real facts, legends, and
                        straight-up weirdness only a veteran could love.
                    </p>
                    <p className="tw:mb-3 tw:text-lg tw:text-secondary">
                        Each correct answer earns you a point. Do you have what it takes to achieve
                        a perfect score?
                    </p>
                    <div className="tw:mt-4 tw:flex tw:flex-wrap tw:justify-center tw:gap-2">
                        {militaryBranches.map((branch) => (
                            <span
                                key={branch}
                                className="tw:inline-block tw:rounded-full tw:bg-secondary tw:px-4 tw:py-1 tw:text-sm tw:font-semibold tw:text-white"
                            >
                                {branch}
                            </span>
                        ))}
                    </div>
                </div>

                <main className="tw:rounded-lg tw:bg-gray-100 tw:p-6 tw:shadow-xl">
                    {renderMainContent()}
                </main>
            </div>
        </>
    );
};

GamePage.Layout = Layout;

export default GamePage as PageWithLayoutType;
