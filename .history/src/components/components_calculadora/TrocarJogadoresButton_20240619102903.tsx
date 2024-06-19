// src/components/components_calculadora/TrocarJogadoresButton.tsx
import React from 'react';
import styles from './TrocarJogadoresButton.module.css';

interface TrocarJogadoresButtonProps {
  onClick: () => void;
}

const TrocarJogadoresButton: React.FC<TrocarJogadoresButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.trocarJogadoresButton}>
      Trocar Jogadores
    </button>
  );
};

export default TrocarJogadoresButton;
