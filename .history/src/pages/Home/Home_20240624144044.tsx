import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import padelImage from '../../assets/images/inicio.jpg';
import BackgroundHome from '../../components/components_calculadora/Background_home'; // Certifique-se do caminho correto

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <BackgroundHome />

      <div className={styles.contentContainer}>
        <h1 className={styles.title}>PadelMaster</h1>

        <button className={styles.enterButton} onClick={() => navigate('/calculadora')}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Home;
