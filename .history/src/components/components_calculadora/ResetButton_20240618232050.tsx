import React from 'react';
import styles from './ResetButton.module.css';

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  const handleReset = () => {
    localStorage.clear();
    onReset();
  };

  return (
    <button onClick={handleReset} className={styles.resetButton}>
      Novo Jogo
    </button>
  );
};

export default ResetButton;
