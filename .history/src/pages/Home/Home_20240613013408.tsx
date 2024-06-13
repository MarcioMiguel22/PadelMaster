import React from 'react';
import './PadelPage.css';
import padelImage from '../Home/Quieres-saber-cuáles-son-los-beneficios-del-pádel-y-porque-es-importante-practicarlo.jpg'; // Certifique-se de que a imagem está na mesma pasta ou ajuste o caminho

const PadelPage: React.FC = () => {
    return (
        <div className="padel-container">
            <h1>Bem-vindo ao PadelMaster</h1>
            <img src={padelImage} alt="Imagem de Padel" className="padel-image" />
            <button className="enter-button">Entrar</button>
        </div>
    );
};

export default PadelPage;
