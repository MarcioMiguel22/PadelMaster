// src/components/Titulo.tsx
import React from 'react';
import styles from './Titulo.module.css';

interface TituloProps {
  texto: string;
}

const Titulo: React.FC<TituloProps> = () => {
  return (
    <div className={styles.container}>

        <img

          alt="Tennis Ball"
          // Adiciona a classe 'rotate' condicionalmente baseado no estado isRotating

        />
        <span className={styles.label}>Distribuir Jogadores</span>

    </div>
  );
};

export default Titulo;
