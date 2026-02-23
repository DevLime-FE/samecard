import React from 'react';
import { Level } from '../types';

interface LevelSelectorProps {
    currentLevel: Level;
    onSelectLevel: (level: Level) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onSelectLevel }) => {
    const levels: Level[] = [3, 4, 6, 7, 8];
    const levelLabels = {
        3: 'Very Easy (3x3)',
        4: 'Easy (4x4)',
        6: 'Medium (6x6)',
        7: 'Hard (7x7)',
        8: 'Very Hard (8x8)'
    };

    return (
        <div className="farm-panel" style={{ display: 'flex', gap: '15px', padding: '15px', alignItems: 'center', marginBottom: '20px' }}>
            <span className="status-text" style={{ marginRight: '10px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>난이도 선택</span>
            {levels.map((lvl: number, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelectLevel(lvl as Level)}
                    className={`farm-button ${currentLevel === lvl ? 'active' : ''}`}
                    style={{ fontSize: '0.9rem' }}
                >
                    {lvl}x{lvl}
                </button>
            ))}
        </div>
    );
};

export default LevelSelector;
