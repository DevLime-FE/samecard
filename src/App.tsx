import React from 'react';
import './App.css';
import { useGameLogic } from './hooks/useGameLogic';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import LevelSelector from './components/LevelSelector';
import MatchedAnimalsBoard from './components/MatchedAnimalsBoard';

function App() {
  const { gameState, handleCardClick, changeLevel, resetGame, startGame } = useGameLogic();

  return (
    <div className="App app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 className="title-wood animate-sway" onClick={() => { window.location.reload(); }} style={{ cursor: 'pointer' }}>
        동물농장 메모리
      </h1>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <ScoreBoard score={gameState.score} combo={gameState.combo} time={gameState.elapsedTime} />
        <LevelSelector currentLevel={gameState.level} onSelectLevel={changeLevel} />
      </div>

      <div style={{
        display: 'flex',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative'
      }}>
        {/* Left Spacer to balance the right sidebar and keep board centered */}
        <div style={{ width: '120px', flexShrink: 0 }} aria-hidden="true" />

        <div style={{ position: 'relative', flex: 1, minHeight: '400px', display: 'flex', justifyContent: 'center' }}>
          {!gameState.isGameStarted && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '20px',
              backdropFilter: 'blur(4px)',
            }}>
              <button
                onClick={startGame}
                className="farm-sign-start"
              >
                게임 시작!
              </button>
            </div>
          )}

          <GameBoard
            level={gameState.level}
            cards={gameState.cards}
            onCardClick={handleCardClick}
          />

          {gameState.isGameStarted && gameState.isGameComplete && (
            <div className="farm-panel animate-pop" style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '400px',
              zIndex: 1000,
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(5px)'
            }}>
              <h2 style={{ fontSize: '3rem', color: 'var(--wood-brown)', margin: 0, fontWeight: 900 }}>성공!</h2>
              <div style={{ margin: '30px 0', fontSize: '1.3rem', lineHeight: '1.6', color: 'var(--text-dark)' }}>
                <p>획득 점수: <b>{gameState.score}</b></p>
                <p>기록: <b>{gameState.elapsedTime}초</b></p>
                <p style={{ color: 'var(--farm-grass-dark)', fontWeight: 'bold' }}>
                  시간 보너스: x{gameState.timeBonusMultiplier}
                </p>
                <hr style={{ borderColor: 'var(--wood-brown)', opacity: 0.2, margin: '15px 0' }} />
                <p style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--wood-brown)' }}>
                  최종 점수: {gameState.finalScore}
                </p>
              </div>
              <button
                onClick={resetGame}
                className="farm-button"
                style={{ width: '100%', fontSize: '1.5rem' }}
              >
                다시 하기
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '120px', flexShrink: 0 }}>
          {gameState.isGameStarted && (
            <MatchedAnimalsBoard cards={gameState.cards} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
