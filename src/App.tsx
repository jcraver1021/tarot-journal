import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Draw from './pages/draw/Draw';
import Read from './pages/read/Read';
import Decks from './pages/decks/Decks';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id?" element={<List />} />
        <Route path="/draw/:spread?" element={<Draw />} />
        <Route path="/read" element={<Read />} />
        <Route path="/decks" element={<Decks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
