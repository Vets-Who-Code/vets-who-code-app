import React, { useState, useEffect } from 'react';
import PlayerSetup from '@/components/game/PlayerSetup';
import GameArea from '@/components/game/GameArea';
import ScoreBoard from '@/components/game/ScoreBoard';
import { Player, Fact, GameState, MilitaryBranch } from '@/utils/types';
import factsData from '@/data/militaryFacts.json';

const GamePage: React.FC = () => {
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

  const militaryBranches: MilitaryBranch[] = ["Army", "Navy", "Air Force", "Marines", "Coast Guard", "Space Force"];
  const facts: Fact[] = factsData;

  const handlePlayerSetupComplete = (newPlayers: Player[]) => {
    setGameState(prev => ({
      ...prev,
      players: newPlayers,
      selectedPlayerIndex: 0,
      currentFactIndex: 0,
      isGameOver: false,
      showFeedback: false,
    }));
  };

  const handleAnswer = (answer: MilitaryBranch) => {
    if (gameState.selectedPlayerIndex === null || gameState.isGameOver || gameState.showFeedback) return;

    const currentFact = facts[gameState.currentFactIndex];
    const currentPlayer = gameState.players[gameState.selectedPlayerIndex];
    let newScore = currentPlayer.score;
    let message = '';
    let correct = false;

    if (answer === currentFact.answer) {
      newScore++;
      message = "Correct!";
      correct = true;
    } else {
      message = `Wrong! The correct answer is ${currentFact.answer}.`;
      correct = false;
    }

    setFeedbackMessage(message);
    setIsAnswerCorrect(correct);

    const updatedPlayers = gameState.players.map((p, index) =>
      index === gameState.selectedPlayerIndex ? { ...p, score: newScore } : p
    );

    setGameState(prev => ({
      ...prev,
      players: updatedPlayers,
      currentAnswer: answer,
      showFeedback: true,
    }));
  };

  const handleNextQuestion = () => {
    if (gameState.currentFactIndex + 1 >= facts.length) {
      setGameState(prev => ({ ...prev, isGameOver: true, showFeedback: false }));
    } else {
      const nextPlayerIndex = gameState.selectedPlayerIndex !== null ? (gameState.selectedPlayerIndex + 1) % gameState.players.length : 0;
      setGameState(prev => ({
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
  const selectedPlayer = gameState.selectedPlayerIndex !== null ? gameState.players[gameState.selectedPlayerIndex] : null;

  return (
    <div className="tw-container tw-mx-auto tw-p-4 tw-max-w-3xl tw-bg-white tw-text-secondary tw-min-h-screen">
      <header className="tw-text-center tw-my-8">
        <h1 className="tw-text-5xl tw-font-bold tw-text-secondary">Military Trivia Game</h1>
      </header>

      <main className="tw-bg-gray-100 tw-p-6 tw-rounded-lg tw-shadow-xl">
        {!gameState.players.length ? (
          <PlayerSetup onSetupComplete={handlePlayerSetupComplete} />
        ) : gameState.isGameOver ? (
          <div className="tw-text-center">
            <h2 className="tw-text-4xl tw-font-semibold tw-mb-8 tw-text-secondary">Final Scores</h2>
            <ScoreBoard players={gameState.players} />
            <button
              onClick={handlePlayAgain}
              className="tw-mt-8 tw-px-8 tw-py-3 tw-bg-primary tw-text-white tw-text-lg tw-font-semibold tw-rounded-lg hover:tw-bg-opacity-80 tw-transition-colors"
            >
              Play Again?
            </button>
          </div>
        ) : (
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
              <div className="tw-text-center tw-mt-6">
                <button
                  onClick={handleNextQuestion}
                  className="tw-px-7 tw-py-3 tw-bg-secondary tw-text-white tw-text-lg tw-font-semibold tw-rounded-lg hover:tw-bg-opacity-80 tw-transition-colors"
                >
                  {gameState.currentFactIndex + 1 >= facts.length ? 'Show Final Scores' : 'Next Question'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default GamePage;
