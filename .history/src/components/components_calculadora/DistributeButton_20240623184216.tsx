import React, { useState, useRef, useEffect } from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './DistributeButton.module.css';

const DistributeButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    scrollToDistributeButton(); // Chama a função de rolagem quando o componente é montado
  }, []);

  const handleClick = () => {
    setIsRotating(true);
    setIsMoving(true);

    setTimeout(() => {
      setIsRotating(false);
      onClick();
      scrollToDistributeButton(); // Chama a função de rolagem após a animação
      setIsMoving(false);
    }, 2000); // Tempo total da animação em milissegundos (1s para mover + 1s para rotação)
  };

  const scrollToDistributeButton = () => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`${styles.distributeButton} ${isMoving ? styles.moveToCorner : ''}`}
      >
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
