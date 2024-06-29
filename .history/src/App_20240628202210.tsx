import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

import PlayerComponent from './pages/Player/playerComponent';
import CalculadoraApp4 from './pages/Calculadora/CalculadoraApp4';
import CalculadoraApp12 from './pages/Calculadora/CalculadoraApp12';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/player-component" element={<PlayerComponent />} />
        <Route path="/4-jogadores" element={<CalculadoraApp4 />} />
        <Route path="/12-jogadores" element={<CalculadoraApp12 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
