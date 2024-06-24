import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import padelImage from '../../assets/images/inicio.jpg';

const PadelPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const background = document.querySelector('.background') as HTMLElement;
      const size = 100 + scrollY / 5;
      background.style.backgroundSize = `${size}%`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.padelContainer}>
      <div className="background"></div>
      <div className={styles.centeredContent}>
        <h1 className={styles.titulo}>PadelMaster</h1>
        <div className={styles.content}>
          <img src={padelImage} alt="Imagem de Padel" className={styles.padelImage} />
          <div className={styles.buttonContainer}>
            <button className={styles.enterButton} onClick={() => navigate('/calculadora')}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PadelPage;
