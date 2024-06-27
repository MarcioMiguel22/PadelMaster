import React, { useState } from 'react';
import styles from './Selector.module.css';

const Selector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('manual');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.selectorContainer}>
      <label htmlFor="modeSelector" className={styles.label}>Selecione o modo:</label>
      <div className={styles.selectWrapper}>
        <select
          id="modeSelector"
          value={selectedOption}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="manual">Manual</option>
          <option value="automatic">Automático</option>
        </select>
        <div className={styles.bola}></div> {/* Bola animada */}
      </div>
    </div>
  );
};

export default Selector;
