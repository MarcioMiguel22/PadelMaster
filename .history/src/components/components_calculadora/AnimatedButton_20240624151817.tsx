// src/components/components_calculadora/AnimatedButton.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AnimatedButton.module.css';
import Titulo from './Titulo';

interface AnimatedButtonProps {
  texto: string;
  direction?: 'up' | 'down';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ texto, direction = 'up' }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate('/calculadora');
    }, 4000); // tempo para a animação antes de navegar
  };

  return (
    <div
      className={`${styles.animatedButton} ${isClicked ? (direction === 'up' ? styles.clickedUp : styles.clickedDown) : ''}`}
      onClick={handleClick}
    >
      <Titulo texto={texto} />
    </div>
  );
};

export default AnimatedButton;
