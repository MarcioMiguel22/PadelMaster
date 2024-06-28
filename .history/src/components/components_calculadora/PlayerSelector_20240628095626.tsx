import React, { useState } from 'react';
import styles from './PlayerSelector.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';

const PlayerSelector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(4);

  const handleClick = () => {
    setSelectedOption(prevOption => {
      if (prevOption === 4) return 8;
      if (prevOption === 8) return 12;
      return 4;
    });
  };

  return (
    <div className={styles.selectorContainer} onClick={handleClick}>
      <div className={styles.bolaContainer}>
        <img
          src={tennisBall}
          alt="Bola de Tênis"
          className={`${styles.bola} ${
            selectedOption === 4 ? styles.option4 : selectedOption === 8 ? styles.option8 : styles.option12
          }`}
        />
      </div>
      <div className={styles.options}>
        <div className={styles.optionText}>4 Jogadores</div>
        <div className={styles.optionText}>8 Jogadores</div>
        <div className={styles.optionText}>12 Jogadores</div>
      </div>
    </div>
  );
};

export default PlayerSelector;
