import React from 'react';
import { Card as CardType, Level } from '../types';
import Card from './Card';

interface GameBoardProps {
    level: Level;
    cards: CardType[];
    onCardClick: (id: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ level, cards, onCardClick }) => {
    // map level to grid size (it matches the level number now: 4->4, 6->6, 8->8)
    const getGridSize = (lvl: Level) => lvl;

    const gridSize = getGridSize(level);

    // Dynamic max-width based on grid size to prevent 4x4 from being too spread out
    // 4x4 -> max 480px, 6x6 -> max 720px, 8x8 -> max 900px
    const maxWidth = `${Math.min(gridSize * 110 + (gridSize - 1) * 15 + 40, 900)}px`;

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gap: '15px',
                width: '100%',
                maxWidth: maxWidth,
                margin: '20px auto',
                justifyItems: 'center',
                perspective: '1000px'
            }}
        >
            {cards.map((card) => (
                <div key={card.id} style={{ width: '100%', aspectRatio: '1/1' }}>
                    <Card card={card} onClick={onCardClick} />
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
