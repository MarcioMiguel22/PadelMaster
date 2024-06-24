// src/pages/Home.tsx
import React from 'react';
import styles from './Home.module.css';
import AnimatedButton from '../../components/components_calculadora/AnimatedButton';
import BackgroundHome from '../../components/components_calculadora/Background_home';
import { AnimationProvider } from '../../components/components_calculadora/AnimationContext'; // Atualize o caminho conforme necessário

const Home: React.FC = () => {
  return (
    <AnimationProvider>
      <div className={styles.homeContainer}>
        <BackgroundHome />
        <div className={styles.contentContainer}>
          <AnimatedButton texto="Padel Master" direction="up" />
          <div className={styles.invertedTitle}>
            <AnimatedButton texto="Padel Master" direction="down" />
          </div>
        </div>
      </div>
    </AnimationProvider>
  );
};

export default Home;
