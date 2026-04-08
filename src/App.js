import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [highscore, setHighscore] = useState(0);

  const moveCoin = () => {
    const maxX = 350;
    const maxY = 350;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setPosition({ x: randomX, y: randomY });
  };

  const handleClick = () => {
    if (gameOver) return;

    const newScore = score + 1;
    setScore(newScore);

    if (newScore > highscore) {
      setHighscore(newScore);
    }

    moveCoin();
  };

  useEffect(() => {
    if (gameOver) return;

    if (time === 0) {
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, gameOver]);

  useEffect(() => {
    moveCoin();
  }, []);

  const restartGame = () => {
    setScore(0);
    setTime(30);
    setGameOver(false);
    moveCoin();
  };

  return (
    <div>
      <h1>🪙 Coin Clicker</h1>
      <p>Poeng: {score}</p>
      <p>Highscore: {highscore}</p>
      <p>Tid igjen: {time} sek</p>

      <div id="game-area">
        {!gameOver && (
          <div
            id="coin"
            onClick={handleClick}
            style={{
              left: position.x,
              top: position.y,
            }}
          ></div>
        )}
      </div>

      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <button onClick={restartGame}>Spill igjen</button>
        </div>
      )}
    </div>
  );
}

export default App;
