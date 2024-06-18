import React, { useState } from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './ScrollToTopButton.module.css';

interface ScrollToTopButtonProps {
  refs: (React.RefObject<HTMLDivElement> | HTMLDivElement | null)[];
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ refs }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animation, setAnimation] = useState<string>('');

  const handleScroll = () => {
    const currentRef = refs[currentIndex];

    if (currentRef && 'current' in currentRef) {
      currentRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (currentRef) {
      (currentRef as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
    }

    setAnimation(styles.bounce);
    setTimeout(() => {
      setAnimation('');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % refs.length);
    }, 500);
  };

  return (
    <button onClick={handleScroll} className={styles.scrollToTop}>
      <img src={tennisBall} alt="Tennis Ball" className={`${styles.tennisBall} ${animation}`} />
    </button>
  );
};

export default ScrollToTopButton;
