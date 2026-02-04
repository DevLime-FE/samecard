export type Level = 1 | 2 | 5; // 1단계(5x5), 2단계(6x6), 5단계(10x10)

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
}
