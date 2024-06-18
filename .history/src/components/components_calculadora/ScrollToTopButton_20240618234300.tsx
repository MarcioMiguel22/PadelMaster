import React from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './ScrollToTopButton.module.css';

interface ScrollToTopButtonProps {
  refs: (React.RefObject<HTMLDivElement> | HTMLDivElement | null)[];
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ refs }) => {
  const handleScroll = () => {
    refs.forEach((ref) => {
      if (ref && 'current' in ref) {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (ref) {
        (ref as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  return (
    <button onClick={handleScroll} className={styles.scrollToTop}>
      <img src={tennisBall} alt="Tennis Ball" className={styles.tennisBall} />
      <span className={styles.arrowUp}>↑</span>
    </button>
  );
};

export default ScrollToTopButton;
