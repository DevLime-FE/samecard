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
                cursor: card.isMatched ? 'default' : 'pointer',
            }}
            onClick={() => onClick(card.id)}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    transformStyle: 'preserve-3d',
                    transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front of Card (Unflipped State) */}
                <div
                    className="glass-panel"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        color: 'rgba(255, 255, 255, 0.1)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        width: '150%',
                        height: '150%',
                        background: 'radial-gradient(circle, var(--neon-blue) 0%, transparent 70%)',
                        opacity: 0.1,
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: '50%'
                    }} />
                    ?
                </div>

                {/* Back of Card (Flipped State - Emoji) */}
                <div
                    className="glass-panel"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: 'rgba(20, 20, 30, 0.9)',
                        border: '1px solid var(--neon-pink)',
                        boxShadow: '0 0 15px rgba(255, 0, 85, 0.3)',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'radial-gradient(circle at center, rgba(188, 19, 254, 0.2) 0%, transparent 70%)',
                    }} />
                    <span style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' }}>
                        {card.emoji}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
