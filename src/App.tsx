import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import List from './pages/list/List';
import DrawSingle from './pages/draw/DrawSingle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<List />} />
        <Route path="/draw/single" element={<DrawSingle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
