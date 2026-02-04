import React from 'react';
import './App.css'; // This will be implicitly replaced by our global styles in index.css mostly, but we'll clean it up
import { useGameLogic } from './hooks/useGameLogic';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import LevelSelector from './components/LevelSelector';

function App() {
  const { gameState, handleCardClick, changeLevel, resetGame } = useGameLogic();

  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 className="title-glow" onClick={resetGame} style={{ cursor: 'pointer' }}>
        SAMECARD
      </h1>

      <div style={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
        <LevelSelector currentLevel={gameState.level} onSelectLevel={changeLevel} />
        <ScoreBoard score={gameState.score} combo={gameState.combo} />
      </div>

      {gameState.isGameComplete && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div className="glass-panel animate-pop" style={{ padding: '60px', textAlign: 'center', border: '2px solid var(--neon-pink)' }}>
            <h2 className="title-glow" style={{ fontSize: '4rem', margin: 0 }}>CLEAR!</h2>
            <p className="status-text" style={{ fontSize: '2rem', marginTop: '20px' }}>Final Score: <span style={{ color: 'var(--neon-blue)' }}>{gameState.score}</span></p>
            <button
              onClick={resetGame}
              className="glass-button"
              style={{ marginTop: '40px', fontSize: '1.5rem', padding: '20px 40px', borderColor: 'var(--neon-green)', color: 'var(--neon-green)' }}
            >
              PLAY AGAIN
            </button>
          </div>
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
