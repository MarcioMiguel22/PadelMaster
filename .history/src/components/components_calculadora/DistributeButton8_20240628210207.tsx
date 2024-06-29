import React from 'react';
import styles from './DistributeButton.module.css';

interface DistributeButtonProps {
  onClick: () => void;
}

const DistributeButton8: React.FC<DistributeButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.distributeButton}>
      Distribuir Jogadores
    </button>
  );
};

export default DistributeButton8;
