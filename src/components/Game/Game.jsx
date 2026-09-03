// Componente Pai- Gerencia o estado global do jogo, histórico, modos e placar acumulado.
import { useState } from 'react';
import Board from '../Board/Board';
import GameMode from '../GameMode/GameMode';
import { calculateWinner } from '../Calculate/Calculate';
import styles from './Game.module.css';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  
  // Controle do torneio / modo de jogo
  const [maxRounds, setMaxRounds] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  // Placar Acumulado
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every((square) => square !== null);
  const isGameFinished = Boolean(winner) || isDraw;
  const isTournamentOver = maxRounds > 0 && totalGames >= maxRounds;

  function handlePlay(nextSquares) {
    if (isTournamentOver || isGameFinished) return;

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const hasWinnerNow = calculateWinner(nextSquares);
    const hasDrawNow = !hasWinnerNow && nextSquares.every((sq) => sq !== null);

    // Contabiliza resultados da rodada no placar acumulado
    if (hasWinnerNow) {
      setTotalGames((prev) => prev + 1);
      setScores((prev) => ({
        ...prev,
        [hasWinnerNow.toLowerCase()]: prev[hasWinnerNow.toLowerCase()] + 1
      }));
    } else if (hasDrawNow) {
      setTotalGames((prev) => prev + 1);
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  }

  // Prepara o tabuleiro para a próxima rodada do mesmo torneio/sessão
  function handleResetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  // Reseta o placar acumulado (usado no Modo Livre ou ao iniciar um novo torneio)
  function handleResetScores() {
    setScores({ x: 0, o: 0, draws: 0 });
  }

  // Inicia um novo jogo do zero quando o modo é alterado
  function handleSelectMode(newMode) {
    setMaxRounds(newMode);
    setTotalGames(0);
    handleResetGame();
    handleResetScores();
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    const description = move > 0 ? `Ir para jogada #${move}` : 'Ir para o início do jogo';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <GameMode 
        maxRounds={maxRounds} 
        totalGames={totalGames} 
        scores={scores}
        onResetScores={handleResetScores}
        onSelectMode={handleSelectMode} 
      />

      {isGameFinished && !isTournamentOver && (
        <button className="btn btn-primary my-2" onClick={handleResetGame}>
          Próxima Partida
        </button>
      )}

      {isTournamentOver && (
        <p className="text-danger fw-bold mt-2">
          Torneio finalizado! Limite de {maxRounds} partidas atingido.
        </p>
      )}

      <div className={styles.gameBoard}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className={styles.gameInfo}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}