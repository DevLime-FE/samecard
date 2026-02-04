import React from 'react';
import { Card as CardType, Level } from '../types';
import Card from './Card';

interface GameBoardProps {
    level: Level;
    cards: CardType[];
    onCardClick: (id: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ level, cards, onCardClick }) => {
    // map internal level ID (1, 2, 5) to grid size (5, 6, 10)
    const getGridSize = (lvl: Level) => {
        switch (lvl) {
            case 1: return 5;
            case 2: return 6;
            case 5: return 10;
            default: return 5;
        }
    };

    const gridSize = getGridSize(level);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gap: '10px',
                width: '95%',
                maxWidth: '800px', // Constrain width for larger monitors
                margin: '0 auto',
                padding: '20px',
                justifyItems: 'center', // Center cards in their cells
            }}
        >
            {cards.map((card) => (
                <div key={card.id} style={{ width: '100%', maxWidth: '80px', aspectRatio: '1/1' }}>
                    <Card card={card} onClick={onCardClick} />
                </div>

            ))}
        </div>
    );
};

export default GameBoard;
