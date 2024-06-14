import React from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './ScrollToTopButton.module.css'; // Importando o arquivo CSS Module

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={scrollToTop} className={styles.scrollToTop}>
      <img src={tennisBall} alt="Tennis Ball" className={styles.tennisBall} />
      <span className={styles.arrowUp}>↑</span>
    </button>
  );
};

export default ScrollToTopButton;
