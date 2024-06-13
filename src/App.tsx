import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Calculadora from './pages/Services/Calculadora';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculadora" element={<Calculadora />} /> // Wrap Calculadora component with curly braces
      </Routes>
    </Router>
  );
}

export default App
