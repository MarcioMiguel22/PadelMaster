import React, { useState } from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './DistributeButton.module.css'; // Importando o arquivo CSS Module

const DistributeButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onClick();
    setTimeout(() => {
      setIsRotating(false);
    }, 1000); // Tempo da animação em milissegundos
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.distributeButton}>
        <img
          src={tennisBall}
          alt="Tennis Ball"
          className={`${styles.tennisBall} ${isRotating ? styles.rotate : ''}`}
        />
        <span className={styles.label}>Distribuir Jogadores</span>
      </button>
    </div>
  );
};

export default DistributeButton;
