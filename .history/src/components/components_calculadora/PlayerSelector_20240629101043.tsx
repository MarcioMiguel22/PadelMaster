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
      <div className={`${styles.option} ${isActivePage(4) ? 'active' : ''}`} onClick={() => handleNavigation(4)}>
        <div className={styles.bolaContainer}>
          <img src={tennisBall} alt="4 Jogadores" className={styles.bola} />
        </div>
        <div className={styles.optionText}>4 Jogadores</div>
      </div>
      <div className={`${styles.option} ${isActivePage(8) ? 'active' : ''}`} onClick={() => handleNavigation(8)}>
        <div className={styles.bolaContainer}>
          <img src={tennisBall} alt="8 Jogadores" className={styles.bola} />
        </div>
        <div className={styles.optionText}>8 Jogadores</div>
      </div>
      <div className={`${styles.option} ${isActivePage(12) ? 'active' : ''}`} onClick={() => handleNavigation(12)}>
        <div className={styles.bolaContainer}>
          <img src={tennisBall} alt="12 Jogadores" className={styles.bola} />
        </div>
        <div className={styles.optionText}>12 Jogadores</div>
      </div>
    </div>
  );
};

export default PlayerSelector;
