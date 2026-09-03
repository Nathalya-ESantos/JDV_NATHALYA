import Game from './components/Game/Game';

// O App.jsx agora funciona apenas como o ponto de entrada principal,
// chamando o componente "Game".
export default function App() {
  return (
    <div>
      <Game />
    </div>
  );
}