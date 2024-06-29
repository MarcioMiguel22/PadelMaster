import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PlayerSelector.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';

const PlayerSelector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(4);
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedOption(prevOption => {
      const nextOption = prevOption === 4 ? 12 : 4;
      navigate(`/${nextOption}-jogadores`);
      return nextOption;
    });
  };

  return (
    <div className={styles.selectorContainer} onClick={handleClick}>
      <div className={styles.bolaContainer}>
        <img
          src={tennisBall}
          alt="Bola de Tênis"
          className={`${styles.bola} ${
            selectedOption === 4 ? styles.option4 : styles.option12
          }`}
        />
      </div>
      <div className={styles.options}>
        <div className={styles.optionText}>4 Jogadores</div>
        <div className={styles.optionText}>12 Jogadores</div>
      </div>
    </div>
  );
};

export default PlayerSelector;