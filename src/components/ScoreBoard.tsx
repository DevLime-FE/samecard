import React from 'react';

interface ScoreBoardProps {
    score: number;
    combo: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, combo }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
            margin: '20px auto',
            padding: '15px',
            border: '2px solid var(--neon-blue)',
            borderRadius: '10px',
            boxShadow: '0 0 10px var(--neon-blue), inset 0 0 10px var(--neon-blue)',
            backgroundColor: 'rgba(0, 243, 255, 0.1)'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: 'var(--neon-blue)', fontSize: '1.2rem', textTransform: 'uppercase' }}>점수 (SCORE)</h3>
                <p className="text-glow" style={{ margin: '5px 0 0', fontSize: '2rem', fontWeight: 'bold' }}>{score}</p>
            </div>

            {combo > 1 && (
                <div style={{ textAlign: 'center', animation: 'pulse 0.5s infinite alternate' }}>
                    <h3 style={{ margin: 0, color: 'var(--neon-pink)', fontSize: '1.2rem', textTransform: 'uppercase' }}>COMBO!</h3>
                    <p className="text-glow" style={{ margin: '5px 0 0', fontSize: '2rem', fontWeight: 'bold', color: 'var(--neon-pink)' }}>x{combo}</p>
                </div>
            )}
        </div>
    );
};

export default ScoreBoard;
