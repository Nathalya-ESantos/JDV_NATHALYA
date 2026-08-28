// Componente Tabuleiro- Renderiza os 9 quadrados, calcula vitórias/empates e gerencia o clique da rodada.

import Square from '../Square/Square';
import styles from './Board.module.css';

export default function Board({ xIsNext, squares, onPlay }) {
  
  // Trata o clique do usuário em um quadrado do tabuleiro[cite: 2]
  function handleClick(i) {
    // Retorna antecipadamente se o quadrado estiver preenchido ou se já houver vencedor[cite: 2]
    if (squares[i] || calculateWinner(squares)) {
      return; //[cite: 2]
    }
    
    // Cria cópia do array para manter a imutabilidade[cite: 2]
    const nextSquares = squares.slice(); //[cite: 2]
    
    // Define se marca X ou O[cite: 2]
    nextSquares[i] = xIsNext ? 'X' : 'O'; //[cite: 2]
    
    // Atualiza o estado no componente pai (Game)[cite: 2]
    onPlay(nextSquares); //[cite: 2]
  }

  // Identifica se há vencedor[cite: 2]
  const winner = calculateWinner(squares); //[cite: 2]
  
  // Verifica se deu empate: não há vencedor E todos os 9 quadrados estão preenchidos (diferentes de null)
  const isDraw = !winner && squares.every((square) => square !== null);

  // Define a mensagem do status conforme o estado do jogo
  let status;
  if (winner) {
    status = `Vencedor: ${winner}`; //[cite: 2]
  } else if (isDraw) {
    status = 'Empate! Deu velha!';
  } else {
    status = `Próximo jogador: ${xIsNext ? 'X' : 'O'}`; //[cite: 2]
  }

  return (
    // Elemento semântico container do tabuleiro[cite: 1]
    <section aria-label="Tabuleiro do Jogo da Velha">
      {/* Status da partida[cite: 1, 2] */}
      <h2 className={styles.status}>{status}</h2>
      
      {/* Linha 1[cite: 2] */}
      <div className={`d-flex justify-content-center ${styles.boardRow}`}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      
      {/* Linha 2[cite: 2] */}
      <div className={`d-flex justify-content-center ${styles.boardRow}`}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      
      {/* Linha 3[cite: 2] */}
      <div className={`d-flex justify-content-center ${styles.boardRow}`}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </section>
  );
}

// Função utilitária para checar combinações de vitória[cite: 2]
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais[cite: 2]
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais[cite: 2]
    [0, 4, 8], [2, 4, 6]             // Diagonais[cite: 2]
  ];
  
  for (let i = 0; i < lines.length; i++) { //[cite: 2]
    const [a, b, c] = lines[i]; //[cite: 2]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { //[cite: 2]
      return squares[a]; //[cite: 2]
    }
  }
  
  return null; //[cite: 2]
}