import React from 'react';
import { Card as CardType } from '../types';

interface CardComponentProps {
    card: CardType;
    onClick: (id: string) => void;
}

const Card: React.FC<CardComponentProps> = ({ card, onClick }) => {
    return (
        <div
            style={{
                perspective: '1000px',
                width: '100%',
                height: '100%',
                aspectRatio: '1/1',
                cursor: card.isMatched || card.isLogo ? 'default' : 'pointer',
            }}
            onClick={() => onClick(card.id)}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front of Card (Unflipped State - Neon Border/Question Mark) */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#222',
                        border: '2px solid var(--neon-blue)',
                        borderRadius: '10px',
                        boxShadow: '0 0 5px var(--neon-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        color: 'var(--neon-blue)',
                    }}
                >
                    {card.isLogo ? 'LOGO' : '?'}
                </div>

                {/* Back of Card (Flipped State - Emoji) */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#333',
                        border: '2px solid var(--neon-pink)',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px var(--neon-pink)',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                    }}
                >
                    {card.emoji === 'NEON' ? (
                        <span className="text-glow" style={{ fontSize: '1.2rem', color: 'var(--neon-green)' }}>SAME<br />CARD</span>
                    ) : (
                        card.emoji
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
