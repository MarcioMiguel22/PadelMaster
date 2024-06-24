// src/pages/Home.tsx
import React from 'react';
import styles from './Home.module.css';
import AnimatedButton from '../../components/components_calculadora/AnimatedButton';
import BackgroundHome from '../../components/components_calculadora/Background_home';
import Titulo from '../../components/components_calculadora/Titulo';

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <BackgroundHome />
      <div className={styles.contentContainer}>
        <AnimatedButton texto="Padel Master" />
        <div className={styles.invertedTitle}>
          <Titulo texto="Padel Master" />
        </div>
      </div>
    </div>
  );
};

export default Home;
