import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Calculadora } from '../src/components/components_calculadora/Calculadora';
import PlayerComponent from './pages/Player/playerComponent';
import CalculadoraApp12 from './pages/Calculadora/CalculadoraApp12'; // Importe o componente correto

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculadoraApp4" element={<Calculadora />} />
        <Route path="/player-component" element={<PlayerComponent />} />
        <Route path="/12-jogadores" element={<CalculadoraApp12 />} /> {/* Adicionando a rota correta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
