import React from 'react';
import styles from './ResetButton.module.css';

const ResetButton: React.FC = () => {
  const handleReset = () => {
    localStorage.clear();
    window.scrollTo(0, 0); // Adiciona a rolagem para o topo da página
    window.location.reload();
  };

  return (
    <button onClick={handleReset} className={styles.resetButton}>
      Novo Jogo
    </button>
  );
};

export default ResetButton;
