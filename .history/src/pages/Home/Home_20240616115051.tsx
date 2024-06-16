import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'; // Updated import statement
import padelImage from '../../assets/images/inicio.jpg';

const PadelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.padelContainer}>
      <h1>PadelMaster</h1>
      <div className={styles.content}>
        <img src={padelImage} alt="Imagem de Padel" className={styles.padelImage} />
        <div className={styles.buttonContainer}>
          <button className={styles.enterButton} onClick={() => navigate('/calculadora')}>Entrar</button>
          <button className={styles.enterButton} onClick={() => navigate('/player-component')}>Entrar-player</button>
        </div>
      </div>
    </div>
  );
};

export default PadelPage;
