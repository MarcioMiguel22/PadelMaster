import React, { useState } from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './ScrollToTopButton.module.css';

interface ScrollToTopButtonProps {
  refs: (React.RefObject<HTMLDivElement> | HTMLDivElement | null)[];
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ refs }) => {
  const [animation, setAnimation] = useState<string>('');

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setAnimation(styles.bounce);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setAnimation('');
      }, 500);
    } else {
      setAnimation(styles.disappear);
      setTimeout(() => {
        refs.forEach((ref) => {
          if (ref && 'current' in ref) {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
          } else if (ref) {
            (ref as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
          }
        });
        setAnimation('');
      }, 500);
    }
  };

  return (
    <button onClick={handleScroll} className={styles.scrollToTop}>
      <img src={tennisBall} alt="Tennis Ball" className={`${styles.tennisBall} ${animation}`} />
    </button>
  );
};

export default ScrollToTopButton;
