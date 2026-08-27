import styles from './Square.module.css';

// O Square é apenas um botão simples
// 'value' é o texto que vai aparecer ('X', 'O' ou vazio)
// 'onSquareClick' é a função que avisa quando o botão foi clicado
export default function Square({ value, onSquareClick }) {
  return (
    <button 
      className={styles.square} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}