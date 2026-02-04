import React from 'react';
import { Level } from '../types';

interface LevelSelectorProps {
    currentLevel: Level;
    onSelectLevel: (level: Level) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onSelectLevel }) => {
    const levels: Level[] = [1, 2, 5];
    const levelLabels = {
        1: '1단계 (5x5)',
        2: '2단계 (6x6)',
        5: '5단계 (10x10)'
    };

    return (
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px 0' }}>
            {levels.map((lvl) => (
                <button
                    key={lvl}
                    onClick={() => onSelectLevel(lvl)}
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        color: currentLevel === lvl ? '#000' : 'var(--neon-green)',
                        backgroundColor: currentLevel === lvl ? 'var(--neon-green)' : 'transparent',
                        border: '2px solid var(--neon-green)',
                        borderRadius: '20px',
                        boxShadow: currentLevel === lvl ? '0 0 15px var(--neon-green)' : 'none',
                        textShadow: currentLevel === lvl ? 'none' : '0 0 5px var(--neon-green)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {levelLabels[lvl]}
                </button>
            ))}
        </div>
    );
};

export default LevelSelector;
