import React from 'react';
import styles from './ResetButton.module.css';

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton4: React.FC<ResetButtonProps> = ({ onReset }) => {
  const handleReset = () => {
    localStorage.clear();
    window.scrollTo(0, 0); // Adiciona a rolagem para o topo da página
    onReset();
  };

  return (
    <button onClick={handleReset} className={styles.resetButton}>
      Novo Jogo
    </button>
  );
};

export default ResetButton4;
