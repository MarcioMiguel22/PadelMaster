
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlayerComponent from './pages/Player/playerComponent';
import PlayerSelector4 from './components/components_calculadora/PlayerSelector4';
import PlayerSelector8 from './components/components_calculadora/PlayerSelector8';
import PlayerSelector12 from './components/components_calculadora/PlayerSelector12';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/4-jogadores" element={<PlayerSelector4 />} />
        <Route path="/8-jogadores" element={<PlayerSelector8 />} />
        <Route path="/12-jogadores" element={<PlayerSelector12 />} />
        <Route path="/player-component" element={<PlayerComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
