import React, { useState } from 'react';
import styles from './Selector.module.css';
import tennisBall from '/home/marciomiguel/code/MarcioMiguel22/Sites/PadelMaster/src/assets/images/tennis-ball.png';

const Selector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('manual');

  const toggleOption = () => {
    setSelectedOption(prevOption => (prevOption === 'manual' ? 'automatic' : 'manual'));
  };

  return (
    <div className={styles.selectorContainer} onClick={toggleOption}>
      <div className={styles.bolaContainer}>
        <img
          src={tennisBall}
          alt="Bola de Tênis"
          className={`${styles.bola} ${selectedOption === 'manual' ? styles.manual : styles.automatic}`}
        />
      </div>
      <div className={styles.optionText}>
        {selectedOption === 'manual' ? 'Manual' : 'Automático'}
      </div>
    </div>
  );
};

export default Selector;
