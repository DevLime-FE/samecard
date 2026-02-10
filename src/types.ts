export type Level = 3 | 4 | 6 | 7 | 8; // Grid sizes: 3x3, 4x4, 6x6, 7x7, 8x8

export interface Card {
    id: string; // Unique ID for React keys
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
    isLogo?: boolean; // For the center card in 5x5 grid
}

export interface GameState {
    level: Level;
    cards: Card[];
    score: number;
    combo: number;
    isGameComplete: boolean;
    flippedCards: number[]; // Indices of currently flipped cards (max 2)
    isProcessing: boolean; // To prevent clicking while checking match
    elapsedTime: number; // Seconds elapsed
    isPlaying: boolean; // Timer active
    finalScore?: number; // Calculated at end
    timeBonusMultiplier?: number;
}
