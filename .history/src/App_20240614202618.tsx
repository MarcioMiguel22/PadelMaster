
///home/marciomiguel/code/MarcioMiguel22/Sites/PadelMaster/src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Calculadora from './pages/Calculadora/Calculadora';
import PlayerComponent from './pages/Player/playerComponent';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculadora" element={<Calculadora />} /> // Wrap Calculadora component with curly braces
        <Route path="/player-component" element={<PlayerComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
