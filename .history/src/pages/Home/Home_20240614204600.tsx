import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.module.css';
import padelImage from '../../assets/images/inicio.jpg'

const PadelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="padel-container">
      <h1>PadelMaster</h1>
      <img src={padelImage} alt="Imagem de Padel" className="padel-image" />
      <button className="enter-button" onClick={() => navigate('/calculadora')}>Entrar</button>
      <button className="enter-button" onClick={() => navigate('/player-component')}>Entrar-player</button>
    </div>
  );
};

export default PadelPage;
