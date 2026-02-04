import React from 'react';

interface ScoreBoardProps {
    score: number;
    combo: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, combo }) => {
    return (
        <div className="glass-panel" style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '15px 30px',
            minWidth: '300px'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h3 className="status-text" style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '2px' }}>SCORE</h3>
                <p style={{ margin: '5px 0 0', fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--neon-blue)', textShadow: '0 0 10px rgba(0, 243, 255, 0.5)' }}>{score}</p>
            </div>

            {combo > 1 && (
                <div style={{ textAlign: 'center', animation: 'pulse 0.5s infinite alternate' }}>
                    <h3 className="status-text" style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--neon-pink)' }}>COMBO</h3>
                    <p style={{ margin: '5px 0 0', fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--neon-pink)', textShadow: '0 0 10px rgba(255, 0, 85, 0.5)' }}>x{combo}</p>
                </div>
            )}
        </div>
    );
};

export default ScoreBoard;
