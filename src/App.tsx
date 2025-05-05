import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import List from './pages/list/List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
