// src/components/components_calculadora/ResetButton6.tsx
import React from 'react';
import styles from './ResetButton.module.css';

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton6: React.FC<ResetButtonProps> = ({ onReset }) => {
  return (
    <button onClick={onReset} className={styles.resetButton}>
      Resetar Jogo
    </button>
  );
};

export default ResetButton6;
