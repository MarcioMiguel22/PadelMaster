// src/components/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>&copy; 2024 Tennis App. All rights reserved.</p>
        <nav>
          <ul className={styles.menu}>
            <li><a href="#home">Home</a></li>
            <li><a href="#jogadores">Jogadores</a></li>
            <li><a href="#resultados">Resultados</a></li>
            <li><a href="#ranking">Ranking</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
