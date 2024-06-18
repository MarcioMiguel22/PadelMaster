import React, { useState } from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './ScrollToTopButton.module.css';

interface ScrollToTopButtonProps {
  refs: (React.RefObject<HTMLDivElement> | HTMLDivElement | null)[];
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ refs }) => {
  const [animation, setAnimation] = useState<string>('');

  const handleScroll = async () => {
    setAnimation(styles.bounce);
    await new Promise(resolve => setTimeout(resolve, 500));

    for (const ref of refs) {
      if (ref && 'current' in ref) {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (ref) {
        (ref as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa de 1 segundo entre as rolagens
    }

    setAnimation('');
  };

  return (
    <button onClick={handleScroll} className={styles.scrollToTop}>
      <img src={tennisBall} alt="Tennis Ball" className={`${styles.tennisBall} ${animation}`} />
    </button>
  );
};

export default ScrollToTopButton;
