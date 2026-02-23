import React from 'react';
import { Card } from '../types';

interface MatchedAnimalsBoardProps {
    cards: Card[];
}

const MatchedAnimalsBoard: React.FC<MatchedAnimalsBoardProps> = ({ cards }) => {
    // 중복 이모지를 제거하고 각각의 맞춤 상태를 확인
    const animalStatus = cards.reduce((acc: { [key: string]: boolean }, card) => {
        if (card.isLogo) return acc;
        if (!acc.hasOwnProperty(card.emoji)) {
            acc[card.emoji] = card.isMatched;
        } else {
            // 하나라도 맞지 않았으면 false (이미 true면 유지)
            acc[card.emoji] = acc[card.emoji] && card.isMatched;
        }
        return acc;
    }, {});

    const animals = Object.entries(animalStatus);

    return (
        <div className="farm-panel animate-pop" style={{
            width: '120px',
            maxHeight: '80vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            position: 'sticky',
            top: '20px'
        }}>
            <h3 style={{ fontSize: '0.9rem', margin: '0 0 10px 0', textAlign: 'center', color: 'var(--wood-brown)' }}>
                동물 목록
            </h3>
            {animals.map(([emoji, isMatched], index) => (
                <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px',
                    borderRadius: '8px',
                    backgroundColor: isMatched ? 'rgba(76, 175, 80, 0.2)' : 'white',
                    border: isMatched ? '2px solid var(--farm-grass-dark)' : '1px solid #ddd',
                    transition: 'all 0.3s ease'
                }}>
                    <span style={{ fontSize: '1.5rem', opacity: isMatched ? 1 : 0.6 }}>{emoji}</span>
                    {isMatched && <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✅</span>}
                </div>
            ))}
        </div>
    );
};

export default MatchedAnimalsBoard;
