import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PlayerSelector.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';

const PlayerSelector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(4);
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedOption(prevOption => {
      const nextOption = prevOption === 4 ? 8 : prevOption === 8 ? 12 : 4;
      setTimeout(() => navigate(`/${nextOption}-jogadores`), 600); // Aguarda a transição antes de navegar
      return nextOption;
    });
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.bolaContainer} onClick={handleClick}>
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
