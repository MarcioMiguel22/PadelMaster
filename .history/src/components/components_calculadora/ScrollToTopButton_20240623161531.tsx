import React, { useState, useEffect } from 'react';
import tennisBall from '../../assets/images/tennis-ball.png';
import styles from './ScrollToTopButton.module.css';

interface ScrollToTopButtonProps {
  refs: (React.RefObject<HTMLDivElement> | HTMLDivElement | null)[];
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ refs }) => {
  const [animation, setAnimation] = useState<string>('');
  const [currentRefIndex, setCurrentRefIndex] = useState<number>(0);

  useEffect(() => {
    const rankingRef = refs[refs.length - 1];
    if (rankingRef) {
      if ('current' in rankingRef) {
        rankingRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        rankingRef.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [refs]);

  const handleScroll = () => {
    setAnimation(styles.bounce);
    setTimeout(() => {
      const currentRef = refs[currentRefIndex];

      if (currentRef) {
        if ('current' in currentRef) {
          currentRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
          currentRef.scrollIntoView({ behavior: 'smooth' });
        }
      }

      setCurrentRefIndex((currentRefIndex + 1) % refs.length);
      setAnimation('');
    }, 500);
  };

  return (
    <button onClick={handleScroll} className={styles.scrollToTop}>
      <img src={tennisBall} alt="Tennis Ball" className={`${styles.tennisBall} ${animation}`} />
    </button>
  );
};

export default ScrollToTopButton;
