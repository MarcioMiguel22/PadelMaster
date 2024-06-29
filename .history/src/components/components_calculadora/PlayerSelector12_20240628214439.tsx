import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PlayerSelector.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';

const PlayerSelector12: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/4-jogadores');
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.bolaContainer} onClick={handleClick}>
        <img src={tennisBall} alt="Bola de Tênis" className={styles.bola} />
      </div>
      <div className={styles.options}>
        <div className={styles.optionText}>12 Jogadores</div>
      </div>
    </div>
  );
};

export default PlayerSelector12;
