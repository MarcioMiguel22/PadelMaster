import React, { useState } from 'react';
import styles from './Selector.module.css';

const Selector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('manual');

  const toggleOption = () => {
    setSelectedOption(prevOption => (prevOption === 'manual' ? 'automatic' : 'manual'));
  };

  return (
    <div className={styles.selectorContainer} onClick={toggleOption}>
      <div className={styles.bolaContainer}>
        <div className={`${styles.bola} ${selectedOption === 'manual' ? styles.manual : styles.automatic}`}></div>
      </div>
      <div className={styles.optionText}>
        {selectedOption === 'manual' ? 'Manual' : 'Automático'}
      </div>
    </div>
  );
};

export default Selector;
