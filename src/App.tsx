import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import List from './pages/list/List';
import DrawSingle from './pages/draw/DrawSingle';

function App() {
  // TODO: We want to use the same Draw page so we can reuse the journal mechanism, but we will need to maintain the routes so we can pass the right options
  // Or we could have each draw page use the same component but pass different props
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
