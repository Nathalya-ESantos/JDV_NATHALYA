//Componente Modo de Jogo- Controla a seleção das regras da partida (ex: Modo Livre ou com Limites).
import styles from './GameMode.module.css';

// Componente responsável por permitir a escolha do limite de rodadas
export default function GameMode({ maxRounds, onSelectMode, totalGames }) {
  return (
    <div>
      <label htmlFor="mode-select">Modo de Jogo: </label>
      
      {/* Menu para escolher o limite de partidas */}
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

      {/* Exibe o progresso caso um modo com limite seja escolhido */}
      {maxRounds > 0 && (
        <p>Partidas realizadas: {totalGames} de {maxRounds}</p>
      )}
    </div>
  );
}