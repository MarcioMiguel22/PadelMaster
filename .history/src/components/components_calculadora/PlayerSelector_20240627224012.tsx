import React, { useState } from 'react';
import styles from './PlayerSelector.module.css';
import tennisBall from '/home/marciomiguel/code/MarcioMiguel22/Sites/PadelMaster/src/assets/images/tennis-ball.png';

const PlayerSelector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(4);

  const handleClick = (option: number) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.selectorContainer}>
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
        <div className={styles.optionText} onClick={() => handleClick(4)}>4 Jogadores</div>
        <div className={styles.optionText} onClick={() => handleClick(8)}>8 Jogadores</div>
        <div className={styles.optionText} onClick={() => handleClick(12)}>12 Jogadores</div>
      </div>
    </div>
  );
};

export default PlayerSelector;
