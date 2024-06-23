import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import padelImage from '../../assets/images/inicio.jpg'; // Remova esta linha se não estiver usando 'padelImage'

// Remova esta linha:
// import tennisBall from '../../assets/images/tennis-ball.png';

const PadelPage: React.FC = () => {
  const navigate = useNavigate();
  const [balls, setBalls] = useState<number[]>([]);

  useEffect(() => {
    // Gerar 100 bolas de tênis
    const generatedBalls = Array.from({ length: 100 }, (_, i) => i);
    setBalls(generatedBalls);
  }, []);

  return (
    <div className={styles.padelContainer}>
      <div className={styles.centeredContent}>
        <h1 className={styles.titulo}>PadelMaster</h1>
        <div className={styles.content}>
          <img src={padelImage} alt="Imagem de Padel" className={styles.padelImage} />
          <div className={styles.buttonContainer}>
            <button className={styles.enterButton} onClick={() => navigate('/calculadora')}>Entrar</button>
          </div>
        </div>
      </div>
      {balls.map((ball) => (
        <div
          key={ball}
          className={styles.tennisBall}
          style={{ left: `${Math.random() * 100}vw` }}
        />
      ))}
    </div>
  );
};

export default PadelPage;
