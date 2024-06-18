import React from 'react';
import styles from './TrocarJogadoresButton.module.css';

interface TrocarJogadoresButtonProps {
  onClick: () => void;
}

const TrocarJogadoresButton: React.FC<TrocarJogadoresButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick();
    onClick();
  };

  return (
    <button onClick={handleClick} className={styles.trocarJogadoresButton}>
      Trocar Jogadores
    </button>
  );
};

export default TrocarJogadoresButton;
