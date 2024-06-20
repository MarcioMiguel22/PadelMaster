// src/components/Titulo.tsx
import React from 'react';
import styles from './Titulo.module.css';

interface TituloProps {
  texto: string;
}

const Titulo: React.FC<TituloProps> = ({ texto }) => {
  return <h1 className={styles.titulo}>{texto}</h1>;
};

export default Titulo;
