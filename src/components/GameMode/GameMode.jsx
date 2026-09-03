// Componente Modo de Jogo- Controla as regras, exibe o placar acumulado e o progresso do torneio.
import styles from './GameMode.module.css';

export default function GameMode({ maxRounds, onSelectMode, totalGames, scores, onResetScores }) {
  return (
    <div>
      <label htmlFor="mode-select">Modo de Jogo: </label>
      
      <select 
        id="mode-select" 
        value={maxRounds} 
        onChange={(e) => onSelectMode(Number(e.target.value))}
      >
        <option value={0}>Modo Livre (Sem limite)</option>
        <option value={10}>Torneio (10 rodadas)</option>
        <option value={20}>Torneio (20 rodadas)</option>
        <option value={30}>Torneio (30 rodadas)</option>
      </select>

      {/* Exibição do Placar */}
      <div className="mt-2">
        <p><strong>Placar:</strong> X: {scores.x} | O: {scores.o} | Empates: {scores.draws}</p>
        
        {/* Mostra o botão de Zerar Placar APENAS no Modo Livre */}
        {maxRounds === 0 && (
          <button onClick={onResetScores}>Zerar Placar</button>
        )}
      </div>

      {/* Progresso do Torneio */}
      {maxRounds > 0 && (
        <p>Partidas realizadas: {totalGames} de {maxRounds}</p>
      )}
    </div>
  );
}