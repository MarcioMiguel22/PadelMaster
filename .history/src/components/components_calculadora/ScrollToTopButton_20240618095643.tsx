//src/components/components_calculadora/ScrollToTopButton.tsx

import React from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './ScrollToTopButton.module.css'; // Importando o arquivo CSS Module

const ScrollToTopButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.scrollToTop}>
      <img src={tennisBall} alt="Tennis Ball" className={styles.tennisBall} />
      <span className={styles.arrowUp}>↑</span>
    </button>
  );
};

export default ScrollToTopButton;
