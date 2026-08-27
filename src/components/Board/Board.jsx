import Square from '../Square/Square';
import styles from './Board.module.css';

export default function Board({ xIsNext, squares, onPlay }) {
  
  // Função executada quando um quadrado é clicado
  function handleClick(i) {
    // Se o quadrado já está ocupado ou se alguém já venceu, ignora o clique
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    
    // Cria uma cópia do array para não alterar o original diretamente (Imutabilidade)
    const nextSquares = squares.slice();
    
    // Define se coloca X ou O
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    
    // Envia o novo tabuleiro para o pai (Game)
    onPlay(nextSquares);
  }

  // Verifica se temos um vencedor
  const winner = calculateWinner(squares);
  let status;
  
  if (winner) {
    status = 'Vencedor: ' + winner;
  } else {
    status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      {/* Exibe o status da partida */}
      <div className={styles.status}>{status}</div>
      
      {/* Linha 1 */}
      <div className={styles.boardRow}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      
      {/* Linha 2 */}
      <div className={styles.boardRow}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      
      {/* Linha 3 */}
      <div className={styles.boardRow}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

// Função para testar as combinações de vitória
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
    [0, 4, 8], [2, 4, 6]             // Diagonais
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}