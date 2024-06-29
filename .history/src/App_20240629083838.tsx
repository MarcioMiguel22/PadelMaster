import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CalculadoraApp4 from './pages/Calculadora/CalculadoraApp4';
import CalculadoraApp8 from './pages/Calculadora/CalculadoraApp8';
import CalculadoraApp12 from './pages/Calculadora/CalculadoraApp12';
import PlayerComponent from './pages/Player/playerComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/4-jogadores" element={<CalculadoraApp4 />} />
        <Route path="/8-jogadores" element={<CalculadoraApp8 />} />
        <Route path="/12-jogadores" element={<CalculadoraApp12 />} />
        <Route path="/player-component" element={<PlayerComponent />} />
        {/* Add the /calculadora route if it should point to one of the components */}
        <Route path="/calculadora" element={<CalculadoraApp4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
