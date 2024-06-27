import React, { useState } from 'react';
import styles from './Selector.module.css';
import tennisBall from '/home/marciomiguel/code/MarcioMiguel22/Sites/PadelMaster/src/assets/images/tennis-ball.png';

const Selector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('manual');

  const toggleOption = () => {
    setSelectedOption(prevOption => {
      if (prevOption === 'manual') return 'automatic';
      if (prevOption === 'automatic') return 'center';
      return 'manual';
    });
  };

  return (
    <div className={styles.selectorContainer} onClick={toggleOption}>
      <div className={styles.bolaContainer}>
        <img
          src={tennisBall}
          alt="Bola de Tênis"
          className={`${styles.bola} ${
            selectedOption === 'manual'
              ? styles.manual
              : selectedOption === 'automatic'
              ? styles.automatic
              : styles.center
          }`}
        />
      </div>
      <div className={styles.optionText}>
        {selectedOption === 'manual' ? 'Manual' : selectedOption === 'automatic' ? 'Automático' : 'Centro'}
      </div>
    </div>
  );
};

export default Selector;
