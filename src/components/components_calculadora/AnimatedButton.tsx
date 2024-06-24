// src/components/components_calculadora/AnimatedButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AnimatedButton.module.css';
import Titulo from './Titulo';
import { useAnimation } from '../../utils/hooks/useAnimation';

interface AnimatedButtonProps {
  texto: string;
  direction?: 'up' | 'down';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ texto, direction = 'up' }) => {
  const { isAnimating, startAnimation } = useAnimation();
  const navigate = useNavigate();

  const handleClick = () => {
    startAnimation();
    setTimeout(() => {
      navigate('/calculadora');
    }, 2000); // tempo para a animação antes de navegar
  };

  return (
    <div
      className={`${styles.animatedButton} ${isAnimating ? (direction === 'up' ? styles.clickedUp : styles.clickedDown) : ''}`}
      onClick={handleClick}
    >
      <Titulo texto={texto} />
    </div>
  );
};

export default AnimatedButton;
