import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import padelImage from '../../assets/images/inicio.jpg';

const PadelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.padelContainer}>
      <div className={styles.centeredContent}>
        <h1>PadelMaster</h1>
        <div className={styles.content}>
          <img src={padelImage} alt="Imagem de Padel" className={styles.padelImage} />
          <div className={styles.buttonContainer}>
            <button className={styles.enterButton} onClick={() => navigate('/calculadora')}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PadelPage;
