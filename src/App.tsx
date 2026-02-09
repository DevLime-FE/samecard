import React from 'react';
import './App.css';
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

      <ScoreBoard score={gameState.score} combo={gameState.combo} time={gameState.elapsedTime} />

      <LevelSelector currentLevel={gameState.level} onSelectLevel={changeLevel} />

      {gameState.isGameComplete && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0,0,0,0.95)',
          padding: '50px',
          border: '4px solid var(--neon-pink)',
          borderRadius: '20px',
          zIndex: 1000,
          textAlign: 'center',
          boxShadow: '0 0 50px var(--neon-pink)'
        }}>
          <h2 className="text-glow" style={{ fontSize: '3rem', color: 'var(--neon-pink)', margin: 0 }}>CLEAR!</h2>
          <div style={{ margin: '30px 0', fontSize: '1.3rem', lineHeight: '1.6' }}>
            <p>기본 점수: {gameState.score}</p>
            <p>경과 시간: {gameState.elapsedTime}초</p>
            <p style={{ color: 'var(--neon-yellow)' }}>
              시간 보너스: x{gameState.timeBonusMultiplier}
            </p>
            <hr style={{ borderColor: '#333', margin: '15px 0' }} />
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              최종 점수: <span style={{ color: 'var(--neon-blue)' }}>{gameState.finalScore}</span>
            </p>
          </div>
          <button
            onClick={resetGame}
            style={{
              marginTop: '10px',
              padding: '15px 30px',
              fontSize: '1.2rem',
              backgroundColor: 'var(--neon-blue)',
              color: '#000',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
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
