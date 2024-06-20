// src/components/Titulo.tsx
import React from 'react';
import styles from './Titulo.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';

interface TituloProps {
  texto: string;
}

const Titulo: React.FC<TituloProps> = ({ texto }) => {
  return (
    <div className={styles.container}>
      <img
        src={tennisBall}
        alt="Tennis Ball"
        className={styles.tennisBall}
      />
      <span className={styles.label}>{texto}</span>
    </div>
  );
};

export default Titulo;
