// src/pages/Home.tsx
import React from 'react';
import styles from './Home.module.css';
import AnimatedButton from '../../components/components_calculadora/AnimatedButton';
import BackgroundHome from '../../components/components_calculadora/Background_home';

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <BackgroundHome />
      <div className={styles.contentContainer}>
        <AnimatedButton texto="Padel Master" direction="up" />
        <div className={styles.invertedTitle}>
          <AnimatedButton texto="Padel Master" direction="down" />
        </div>
      </div>
    </div>
  );
};

export default Home;
