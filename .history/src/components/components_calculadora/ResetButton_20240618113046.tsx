import React from 'react';
import styles from './ResetButton.module.css';

const ResetButton: React.FC = () => {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <button onClick={handleReset} className={styles.resetButton}>
      Novo Jogo
    </button>
  );
};

export default ResetButton;
