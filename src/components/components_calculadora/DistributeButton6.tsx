import React, { useState, useRef, useEffect } from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './DistributeButton.module.css';

const DistributeButton6: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isRotating, setIsRotating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    scrollToDistributeButton(); // Chama a função de rolagem quando o componente é montado
  }, []);

  const handleClick = () => {
    setIsRotating(true);

    setTimeout(() => {
      setIsRotating(false);
      onClick();
      scrollToDistributeButton(); // Chama a função de rolagem após a animação
    }, 1000); // Tempo da animação em milissegundos
  };

  const scrollToDistributeButton = () => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <button ref={buttonRef} onClick={handleClick} className={styles.distributeButton}>
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

export default DistributeButton6;
