import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Titulo from '../../components/components_calculadora/Titulo'
import BackgroundHome from '../../components/components_calculadora/Background_home'; // Certifique-se do caminho correto

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <BackgroundHome />

      <div className={styles.contentContainer}>
       <Titulo texto="Sobe & Desce" />

        <button className={styles.enterButton} onClick={() => navigate('/calculadora')}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Home;
