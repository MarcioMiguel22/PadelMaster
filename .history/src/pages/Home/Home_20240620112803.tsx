import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import padelImage from '../../assets/images/inicio.jpg';
import Titulo from '../../components/components_calculadora/Titulo';
const PadelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.padelContainer}>
      <div className={styles.centeredContent}>
      <Titulo texto="PadelMaster" className={styles.tennisBall} />

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
