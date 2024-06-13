import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PadelPage.css';
import padelImage from '../../assets/images/Quieres-saber-cuáles-son-los-beneficios-del-pádel-y-porque-es-importante-practicarlo.jpg'

const PadelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="padel-container">
      <h1>PadelMaster</h1>
      <img src={padelImage} alt="Imagem de Padel" className="padel-image" />
      <button className="enter-button" onClick={() => navigate('/calculadora')}>Entrar</button>
    </div>
  );
};

export default PadelPage;
