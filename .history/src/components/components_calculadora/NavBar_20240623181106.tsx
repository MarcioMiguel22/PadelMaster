// src/components/NavBar.tsx
import React from 'react';
import styles from './NavBar.module.css';

interface NavBarProps {
  items: string[];
}

const NavBar: React.FC<NavBarProps> = ({ items }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src="/path/to/tennis-ball.png"
          alt="Tennis Ball"
          className={styles.tennisBall}
        />
        <span className={styles.title}>Tennis</span>
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
