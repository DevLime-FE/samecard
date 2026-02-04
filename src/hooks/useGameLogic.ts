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
    });

    // Initialize level
    const startLevel = useCallback((level: Level) => {
        const totalCards = level * level;
        const isOdd = totalCards % 2 !== 0; // Check for odd grid (e.g. 7x7=49)
        const effectiveCards = isOdd ? totalCards - 1 : totalCards;
        const pairsNeeded = effectiveCards / 2;

        // Select emojis
        const levelEmojis = EMOJIS.slice(0, pairsNeeded);
        const deckEmojis = [...levelEmojis, ...levelEmojis];

        // Create card objects
        let cards: Card[] = deckEmojis.map((emoji, index) => ({
            id: `card-${index}`,
            emoji,
            isFlipped: false,
            isMatched: false,
        }));

        // Shuffle
        cards = shuffleArgs(cards);

        // If odd grid size (e.g. 7x7), insert a pre-matched "BONUS" card at the exact center
        if (isOdd) {
            const centerIndex = Math.floor(totalCards / 2);
            const bonusCard: Card = {
                id: 'card-center',
                emoji: '🎁', // Bonus/Gift emoji
                isFlipped: true,
                isMatched: true, // Auto-matched
            };
            cards.splice(centerIndex, 0, bonusCard);
        }

        setGameState({
            level,
            cards,
            score: 0,
            combo: 0, // Reset combo only on full restart
            isGameComplete: false,
            flippedCards: [],
            isProcessing: false,
        });
    }, []);

    // Initial load
    useEffect(() => {
        startLevel(gameState.level);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle Card Click
    const handleCardClick = (id: string) => {
        if (gameState.isProcessing || gameState.isGameComplete) return;

        const clickedCardIndex = gameState.cards.findIndex(c => c.id === id);
        const clickedCard = gameState.cards[clickedCardIndex];

        // Ignore if already flipped/matched or invalid
        if (clickedCard.isFlipped || clickedCard.isMatched) return;

        // Flip the card
        const newCards = [...gameState.cards];
        newCards[clickedCardIndex].isFlipped = true;

        const newFlippedIndices = [...gameState.flippedCards, clickedCardIndex];

        setGameState(prev => ({
            ...prev,
            cards: newCards,
            flippedCards: newFlippedIndices,
        }));

        // Check match if 2 cards flipped
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
            // MATCH
            setTimeout(() => {
                setGameState(prev => {
                    const matchedCards = [...prev.cards];
                    matchedCards[firstIndex].isMatched = true;
                    matchedCards[secondIndex].isMatched = true;

                    // Score Logic: 10 * (2 ^ combo)
                    const points = 10 * Math.pow(2, prev.combo);
                    const newScore = prev.score + points;
                    const newCombo = prev.combo + 1;

                    // Check Game Over
                    const allMatched = matchedCards.every(c => c.isMatched);

                    return {
                        ...prev,
                        cards: matchedCards,
                        score: newScore,
                        combo: newCombo,
                        flippedCards: [],
                        isProcessing: false,
                        isGameComplete: allMatched
                    };
                });
            }, 500);
        } else {
            // NO MATCH
            setTimeout(() => {
                setGameState(prev => {
                    const resetCards = [...prev.cards];
                    resetCards[firstIndex].isFlipped = false;
                    resetCards[secondIndex].isFlipped = false;

                    return {
                        ...prev,
                        cards: resetCards,
                        combo: 0, // Reset combo
                        flippedCards: [],
                        isProcessing: false
                    };
                });
            }, 1000);
        }
    };

    const resetGame = () => {
        startLevel(gameState.level);
    };

    const changeLevel = (newLevel: Level) => {
        startLevel(newLevel);
    };

    return {
        gameState,
        handleCardClick,
        resetGame,
        changeLevel
    };
};
