import React from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './DistributeButton.module.css'; // Importando o arquivo CSS Module

const DistributeButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <button onClick={onClick} className={styles.distributeButton}>
        <img src={tennisBall} alt="Tennis Ball" className={styles.tennisBall} />
        <span className={styles.label}>Distribuir Jogadores</span>
      </button>
    </div>
  );
};

export default DistributeButton;
