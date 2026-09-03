// Componente Modo de Jogo- Controla as regras, exibe o placar acumulado e o progresso do torneio.
import styles from './GameMode.module.css';

export default function GameMode({ maxRounds, onSelectMode, totalGames, scores, onResetScores }) {
  return (
    <div className={styles.container}>
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
      </div>

      {/* Placar estilizado */}
      <p className={styles.placarCard}>
        <strong>PLACAR</strong><br />
        X: {scores.x} | O: {scores.o} | Empates: {scores.draws}
      </p>

      {maxRounds === 0 && (
        <button className={styles.btnReset} onClick={onResetScores}>
          Zerar Placar
        </button>
      )}

      {maxRounds > 0 && (
        <p className={styles.infoText}>Partidas realizadas: <strong>{totalGames} de {maxRounds}</strong></p>
      )}
    </div>
  );
}