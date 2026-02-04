export type Level = 3 | 4 | 6 | 7 | 8; // Easy(4x4), Medium(6x6), Hard(7x7), Very Hard(8x8)

export interface Card {
    id: string; // Unique ID for React keys
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;

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
