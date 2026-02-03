import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ScoreProduct } from './pages/ScoreProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/score" element={<ScoreProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
