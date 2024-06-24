// src/pages/Home.tsx
import React from 'react';
import styles from './Home.module.css';
import AnimatedButton from '../../components/AnimatedButton';
import BackgroundHome from '../../components/components_calculadora/Background_home';

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <BackgroundHome />
      <div className={styles.contentContainer}>
        <AnimatedButton texto="Padel Master" />
      </div>
    </div>
  );
};

export default Home;
