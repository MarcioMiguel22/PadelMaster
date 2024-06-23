import React, { useState } from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './DistributeButton.module.css';

const DistributeButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);

    setTimeout(() => {
      setIsRotating(false);
      onClick();
      scrollToResultados(); // Chama a função de rolagem após a animação
    }, 1000); // Tempo da animação em milissegundos
  };

  const scrollToResultados = () => {
    const resultadosElement = document.getElementById('DistributeButton');
    if (resultadosElement) {
      resultadosElement.scrollIntoView({ behavior: 'smooth' });
    }
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
