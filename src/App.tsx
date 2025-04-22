import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TarotCard from './components/TarotCard/TarotCard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <TarotCard
          isReversed={true}
          uprightText="The Fool"
          reversedText="The Fool (Reversed)"
          image="/card/rw/00-TheFool.png"
        />
      </div>
      <div>
        <TarotCard
          isReversed={false}
          uprightText="The Magician"
          reversedText="The Magician (Reversed)"
          image="/card/rw/01-TheMagician.png"
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
