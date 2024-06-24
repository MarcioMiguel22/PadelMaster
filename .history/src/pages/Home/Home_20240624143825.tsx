import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import padelImage from '../../assets/images/inicio.jpg';
import BackgroundHome from '../../components/components_calculadora/Background_home'; // Certifique-se do caminho correto

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <BackgroundHome />
      <div className={styles.padelContainer}>
        <div className={styles.centeredContent}>
          <h1 className={styles.titulo}>PadelMaster</h1>
          <div className={styles.content}>
            <img src={padelImage} alt="Imagem de Padel" className={styles.padelImage} />
            <div className={styles.buttonContainer}>
              <button className={styles.enterButton} onClick={() => navigate('/calculadora')}>
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
