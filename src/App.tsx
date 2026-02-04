import React from 'react';
import './App.css'; // This will be implicitly replaced by our global styles in index.css mostly, but we'll clean it up
import { useGameLogic } from './hooks/useGameLogic';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import LevelSelector from './components/LevelSelector';

function App() {
  const { gameState, handleCardClick, changeLevel, resetGame } = useGameLogic();

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 className="neon-title" onClick={resetGame} style={{ cursor: 'pointer' }}>
        NEON MEMORY
      </h1>

      <ScoreBoard score={gameState.score} combo={gameState.combo} />

      <LevelSelector currentLevel={gameState.level} onSelectLevel={changeLevel} />

      {gameState.isGameComplete && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0,0,0,0.9)',
          padding: '40px',
          border: '4px solid var(--neon-pink)',
          borderRadius: '20px',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          <h2 className="text-glow" style={{ fontSize: '3rem', color: 'var(--neon-pink)', margin: 0 }}>CLEAR!</h2>
          <p style={{ fontSize: '1.5rem' }}>최종 점수: {gameState.score}</p>
          <button
            onClick={resetGame}
            style={{
              marginTop: '20px',
              padding: '15px 30px',
              fontSize: '1.2rem',
              backgroundColor: 'var(--neon-blue)',
              color: '#000',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold'
            }}
          >
            다시 하기
          </button>
        </div>
      )}

      <GameBoard
        level={gameState.level}
        cards={gameState.cards}
        onCardClick={handleCardClick}
      />
    </div>
  );
}

export default App;
