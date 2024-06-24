// src/components/AnimatedButton.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AnimatedButton.module.css';
import Titulo from './Titulo';

interface AnimatedButtonProps {
  texto: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ texto }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate('/calculadora');
    }, 1000); // tempo para a animação antes de navegar
  };

  return (
    <div
      className={`${styles.animatedButton} ${isClicked ? styles.clicked : ''}`}
      onClick={handleClick}
    >
      <Titulo texto={texto} />
    </div>
  );
};

export default AnimatedButton;
