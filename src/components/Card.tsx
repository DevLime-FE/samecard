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
                    className="farm-panel"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        color: 'var(--wood-brown)',
                        backgroundColor: 'var(--wood-light)',
                        border: '4px solid var(--wood-brown)',
                        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.2)',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        width: '150%',
                        height: '150%',
                        background: 'radial-gradient(circle, var(--cream) 0%, transparent 70%)',
                        opacity: 0.2,
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: '50%'
                    }} />
                    ?
                </div>

                {/* Back of Card (Flipped State - Emoji) */}
                <div
                    className="farm-panel"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: card.isLogo ? 'var(--sun-yellow)' : 'var(--cream)',
                        border: card.isLogo ? '4px solid var(--wood-brown)' : '4px solid var(--farm-grass-dark)',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: card.isLogo ? '1.5rem' : '3.5rem',
                        fontWeight: '900',
                        color: 'var(--wood-brown)',
                        overflow: 'hidden'
                    }}
                >
                    <span style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.1))' }}>
                        {card.emoji}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
