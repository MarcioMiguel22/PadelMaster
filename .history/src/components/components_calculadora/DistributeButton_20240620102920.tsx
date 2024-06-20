import React, { useState } from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './DistributeButton.module.css'; // Importando o arquivo CSS Module

const DistributeButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  // Estado para rastrear se a bola está girando
  const [isRotating, setIsRotating] = useState(false);

  // Função chamada ao clicar no botão
  const handleClick = () => {
    // Definindo estado de rotação como verdadeiro para iniciar a animação
    setIsRotating(true);

    // Após o tempo da animação (1 segundo), definir rotação como falso e chamar onClick
    setTimeout(() => {
      setIsRotating(false);
      // Chama a função onClick somente após a animação completar
      onClick();
    }, 1000); // Tempo da animação em milissegundos
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.distributeButton}>
        <img
          src={tennisBall}
          alt="Tennis Ball"
          // Adiciona a classe 'rotate' condicionalmente baseado no estado isRotating
          className={`${styles.tennisBall} ${isRotating ? styles.rotate : ''}`}
        />
        <span className={styles.label}>Distribuir Jogadores</span>
      </button>
    </div>
  );
};

export default DistributeButton;
