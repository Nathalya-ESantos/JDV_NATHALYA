// Função auxiliar pura para verificar se existe um vencedor no tabuleiro
export function calculateWinner(squares) {
  // Todas as 8 combinações possíveis de vitória no tabuleiro (3 horizontais, 3 verticais, 2 diagonais)
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Percorre cada combinação para testar se os 3 marcadores são iguais
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // Se a posição 'a' tem um símbolo ('X' ou 'O') e for igual a 'b' e 'c', temos um vencedor
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Retorna o símbolo vencedor ('X' ou 'O')
    }
  }

  // Se percorreu todas as linhas e ninguém venceu, retorna null
  return null;
}