import React from 'react';
import styles from './NextGameButton.module.css';

interface NextGameButtonProps {
  jogoIndex: number;
  onClick: () => void;
}

const NextGameButton8: React.FC<NextGameButtonProps> = ({ jogoIndex, onClick }) => {
  return (
    <button onClick={onClick} className={styles.nextGameButton}>
      Jogo {jogoIndex + 1}
    </button>
  );
};

export default NextGameButton8;
