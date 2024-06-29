import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PlayerSelector.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';

const PlayerSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (playerCount: number) => {
    navigate(`/${playerCount}-jogadores`);
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.option} onClick={() => handleNavigation(4)}>
        <img src={tennisBall} alt="4 Jogadores" className={styles.bola} />
        <div className={styles.optionText}>4 Jogadores</div>
      </div>
      <div className={styles.option} onClick={() => handleNavigation(8)}>
        <img src={tennisBall} alt="8 Jogadores" className={styles.bola} />
        <div className={styles.optionText}>8 Jogadores</div>
      </div>
      <div className={styles.option} onClick={() => handleNavigation(12)}>
        <img src={tennisBall} alt="12 Jogadores" className={styles.bola} />
        <div className={styles.optionText}>12 Jogadores</div>
      </div>
    </div>
  );
};

export default PlayerSelector;
