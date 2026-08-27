import { useState } from 'react';
import Board from '../Board/Board';
import styles from './Game.module.css';

export default function Game() {
  // Guarda a lista de jogadas feitas
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // Guarda o número da jogada atual
  const [currentMove, setCurrentMove] = useState(0);
  
  // É a vez do 'X' quando o número da jogada é par
  const xIsNext = currentMove % 2 === 0;
  // Pega o estado dos quadrados na jogada atual
  const currentSquares = history[currentMove];

  // Atualiza o histórico ao fazer uma jogada
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Volta para um determinado ponto do histórico
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Monta a lista de botões para voltar as jogadas
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ir para jogada #' + move;
    } else {
      description = 'Ir para o início do jogo';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className={styles.gameInfo}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}