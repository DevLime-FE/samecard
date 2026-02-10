import { useState, useEffect, useCallback } from 'react';
import { Card, GameState, Level } from '../types';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', 'ZO', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦋', '🐝', '🐙', '🐠', '🐬', '🐳', '🌹', '🌻', '🌲', '🌴', '🌵', '🍄', '🌍', '🌙', '⭐', '☀️', '🔥', '💧', '⚡', '❄️', '🍎', '🍓', '🍔', '🍕', '🚗', '🚀', '⚽', '🏀', '🎮', '🎸'];

// Helper to shuffle cards
const shuffleArgs = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const useGameLogic = (initialLevel: Level = 4) => {
    const [gameState, setGameState] = useState<GameState>({
        level: initialLevel,
        cards: [],
        score: 0,
        combo: 0,
        isGameComplete: false,
        flippedCards: [],
        isProcessing: false,
        elapsedTime: 0,
        isPlaying: false,
        isGameStarted: false,
    });

    // Time Thresholds (Seconds) based on grid size
    const getBonusMultiplier = (level: number, time: number): number => {
        // Approximate difficulty scaling
        // 3x3 (9 cards): 15s/25s
        // 4x4 (16 cards): 25s/40s
        // 6x6 (36 cards): 60s/90s
        // 7x7 (49 cards): 90s/130s
        // 8x8 (64 cards): 120s/180s

        let fastTime = 0;
        let mediumTime = 0;

        switch (level) {
            case 3: fastTime = 15; mediumTime = 25; break;
            case 4: fastTime = 25; mediumTime = 40; break;
            case 6: fastTime = 60; mediumTime = 90; break;
            case 7: fastTime = 90; mediumTime = 130; break;
            case 8: fastTime = 120; mediumTime = 180; break;
            default: fastTime = 60; mediumTime = 90;
        }

        if (time <= fastTime) return 2.0;
        if (time <= mediumTime) return 1.5;
        return 1.0;
    };

    // Initialize level
    const startLevel = useCallback((level: Level) => {
        const gridSize = level;
        const totalCards = gridSize * gridSize;
        const isOddTotal = totalCards % 2 !== 0;
        const pairsNeeded = Math.floor(totalCards / 2);

        // Select emojis
        const levelEmojis = EMOJIS.slice(0, pairsNeeded);
        const deckEmojis = [...levelEmojis, ...levelEmojis];

        // Create initial card objects
        let cards: Card[] = deckEmojis.map((emoji, index) => ({
            id: `card-${index}`,
            emoji,
            isFlipped: false,
            isMatched: false,
        }));

        // Shuffle
        cards = shuffleArgs(cards);

        // Insert Center Card for odd grid sizes (e.g. 3x3, 5x5, 7x7)
        if (isOddTotal) {
            const centerIndex = Math.floor(totalCards / 2);
            const logoCard: Card = {
                id: 'card-logo',
                emoji: 'NEON',
                isFlipped: true,
                isMatched: true,
                isLogo: true,
            };
            cards.splice(centerIndex, 0, logoCard);
        }

        setGameState({
            level,
            cards,
            score: 0,
            combo: 0,
            isGameComplete: false,
            flippedCards: [],
            isProcessing: false,
            elapsedTime: 0,
            timeBonusMultiplier: undefined,
            isPlaying: false, // Timer start paused
            isGameStarted: false, // Init as false, wait for user start
        });
    }, []);

    const startGame = () => {
        setGameState(prev => ({
            ...prev,
            isGameStarted: true,
            isPlaying: true
        }));
    };

    // Initial load
    useEffect(() => {
        startLevel(gameState.level);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState.isPlaying && !gameState.isGameComplete) {
            interval = setInterval(() => {
                setGameState(prev => ({
                    ...prev,
                    elapsedTime: prev.elapsedTime + 1
                }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState.isPlaying, gameState.isGameComplete]);

    // Handle Card Click
    const handleCardClick = (id: string) => {
        if (!gameState.isGameStarted || gameState.isProcessing || gameState.isGameComplete) return;

        const clickedCardIndex = gameState.cards.findIndex(c => c.id === id);
        if (clickedCardIndex === -1) return;
        const clickedCard = gameState.cards[clickedCardIndex];

        if (clickedCard.isFlipped || clickedCard.isMatched || clickedCard.isLogo) return;

        const newCards = [...gameState.cards];
        newCards[clickedCardIndex].isFlipped = true;

        const newFlippedIndices = [...gameState.flippedCards, clickedCardIndex];

        setGameState(prev => ({
            ...prev,
            cards: newCards,
            flippedCards: newFlippedIndices,
        }));

        if (newFlippedIndices.length === 2) {
            setGameState(prev => ({ ...prev, isProcessing: true }));
            checkForMatch(newFlippedIndices, newCards);
        }
    };

    const checkForMatch = (indices: number[], currentCards: Card[]) => {
        const [firstIndex, secondIndex] = indices;
        const firstCard = currentCards[firstIndex];
        const secondCard = currentCards[secondIndex];

        if (firstCard.emoji === secondCard.emoji) {
            setTimeout(() => {
                setGameState(prev => {
                    const matchedCards = [...prev.cards];
                    matchedCards[firstIndex].isMatched = true;
                    matchedCards[secondIndex].isMatched = true;

                    const points = 10 * Math.pow(2, prev.combo);
                    const newScore = prev.score + points;
                    const newCombo = prev.combo + 1;

                    const allMatched = matchedCards.every(c => c.isMatched || c.isLogo);
                    let finalScore = undefined;
                    let timeBonusMultiplier = undefined;
                    let isPlaying = prev.isPlaying;

                    if (allMatched) {
                        isPlaying = false;
                        timeBonusMultiplier = getBonusMultiplier(prev.level, prev.elapsedTime);
                        finalScore = Math.floor(newScore * timeBonusMultiplier);
                    }

                    return {
                        ...prev,
                        cards: matchedCards,
                        score: newScore,
                        combo: newCombo,
                        flippedCards: [],
                        isProcessing: false,
                        isGameComplete: allMatched,
                        elapsedTime: prev.elapsedTime,
                        isPlaying,
                        finalScore,
                        timeBonusMultiplier
                    };
                });
            }, 500);
        } else {
            setTimeout(() => {
                setGameState(prev => {
                    const resetCards = [...prev.cards];
                    resetCards[firstIndex].isFlipped = false;
                    resetCards[secondIndex].isFlipped = false;

                    return {
                        ...prev,
                        cards: resetCards,
                        combo: 0,
                        flippedCards: [],
                        isProcessing: false
                    };
                });
            }, 1000);
        }
    };

    return {
        gameState,
        handleCardClick,
        resetGame: () => startLevel(gameState.level),
        changeLevel: (lvl: Level) => startLevel(lvl),
        startGame,
    };
};
