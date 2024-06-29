import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './PlayerSelector.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';

const PlayerSelector: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (playerCount: number) => {
    navigate(`/${playerCount}-jogadores`);
  };

  const isActivePage = (playerCount: number) => {
    return location.pathname === `/${playerCount}-jogadores`;
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={`${styles.option} ${isActivePage(4) ? styles.active : ''}`} onClick={() => handleNavigation(4)}>
        {isActivePage(4) && <img src={tennisBall} alt="4 Jogadores" className={styles.bola} />}
        <div className={styles.optionText}>4 Jogadores</div>
      </div>
      <div className={`${styles.option} ${isActivePage(8) ? styles.active : ''}`} onClick={() => handleNavigation(8)}>
        {isActivePage(8) && <img src={tennisBall} alt="8 Jogadores" className={styles.bola} />}
        <div className={styles.optionText}>8 Jogadores</div>
      </div>
      <div className={`${styles.option} ${isActivePage(12) ? styles.active : ''}`} onClick={() => handleNavigation(12)}>
        {isActivePage(12) && <img src={tennisBall} alt="12 Jogadores" className={styles.bola} />}
        <div className={styles.optionText}>12 Jogadores</div>
      </div>
    </div>
  );
};

export default PlayerSelector;
