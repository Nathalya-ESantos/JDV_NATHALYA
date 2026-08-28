// Componente Pai- Gerencia o estado global do jogo, o histórico de jogadas e o modo de jogo.

import { useState } from 'react';
import Board from '../Board/Board';
import GameMode from '../GameMode/GameMode';
import { calculateWinner } from '../Calculate/Calculate';
import styles from './Game.module.css';

export default function Game() {
  // Histórico de jogadas da partida ATUAL
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  
  // Controle do torneio / modo de jogo
  const [maxRounds, setMaxRounds] = useState(0); // 0 = Modo livre
  const [totalGames, setTotalGames] = useState(0); // Total de partidas concluídas

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Verifica se a partida atual teve um vencedor ou empate (9 jogadas sem vencedor)
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every((square) => square !== null);
  const isGameFinished = Boolean(winner) || isDraw;

  // Verifica se o limite do torneio foi atingido
  const isTournamentOver = maxRounds > 0 && totalGames >= maxRounds;

  // Chamado a cada jogada no tabuleiro
  function handlePlay(nextSquares) {
    // Impede novas jogadas se o torneio acabou ou se a partida atual já finalizou
    if (isTournamentOver || isGameFinished) return;

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // Se essa jogada finalizou a partida (vitória ou empate), incrementa a contagem de partidas
    const hasWinnerNow = calculateWinner(nextSquares);
    const hasDrawNow = !hasWinnerNow && nextSquares.every((sq) => sq !== null);

    if (hasWinnerNow || hasDrawNow) {
      setTotalGames((prev) => prev + 1);
    }
  }

  // Limpa o tabuleiro para começar uma nova partida dentro do mesmo torneio
  function handleResetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
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
      {/* Componente para alterar o modo de jogo */}
      <GameMode 
        maxRounds={maxRounds} 
        totalGames={totalGames} 
        onSelectMode={(mode) => {
          setMaxRounds(mode);
          setTotalGames(0);
          handleResetGame(); // Reseta o tabuleiro ao mudar o modo
        }} 
      />

      {/* Botão de reiniciar/próxima partida aparece quando a rodada atual encerra */}
      {isGameFinished && !isTournamentOver && (
        <button className="btn btn-primary my-2" onClick={handleResetGame}>
          Próxima Partida
        </button>
      )}

      {/* Mensagem de encerramento do torneio */}
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