import React from 'react';

interface ScoreBoardProps {
    score: number;
    combo: number;
    time: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, combo, time }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="farm-panel" style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto 20px auto',
            backgroundColor: 'var(--cream)',
            border: '4px solid var(--wood-brown)',
        }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: 'var(--wood-brown)', fontSize: '1.2rem', fontWeight: 900 }}>점수</h3>
                <p style={{ margin: '5px 0 0', fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)' }}>{score}</p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: 'var(--wood-brown)', fontSize: '1.2rem', fontWeight: 900 }}>시간</h3>
                <p style={{ margin: '5px 0 0', fontSize: '2rem', fontWeight: 900, color: 'var(--text-dark)' }}>{formatTime(time)}</p>
            </div>

            {combo > 1 && (
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: 'var(--wood-light)', fontSize: '1.2rem', fontWeight: 900 }}>콤보!</h3>
                    <p style={{ margin: '5px 0 0', fontSize: '2rem', fontWeight: 900, color: 'var(--farm-grass-dark)' }}>x{combo}</p>
                </div>
            )}
        </div>
    );
};

export default ScoreBoard;
