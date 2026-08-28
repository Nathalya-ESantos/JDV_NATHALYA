import Game from './components/Game/Game';

// O App.jsx agora funciona apenas como o ponto de entrada principal,
// chamando o nosso componente orquestrador "Game".
export default function App() {
  return (
    <div>
      <Game />
    </div>
  );
}