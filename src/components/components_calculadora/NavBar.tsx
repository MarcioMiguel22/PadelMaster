// src/components/NavBar.tsx
import React from 'react';
import styles from './NavBar.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';

interface NavBarProps {
  items: string[];
}

const NavBar: React.FC<NavBarProps> = ({ items }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src={tennisBall}
          alt="Tennis Ball"
          className={styles.tennisBall}
        />
        <span className={styles.title}>PadelMaster</span>
      </div>
      <ul className={styles.menu}>
        {items.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
