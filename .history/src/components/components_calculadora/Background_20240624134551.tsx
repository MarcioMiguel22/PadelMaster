import React, { useEffect } from 'react';
import './Background.scss';

const Background: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triangle = document.querySelector('.triangle') as HTMLElement;
      const size = 200 + scrollY / 5;
      triangle.style.borderLeftWidth = `${size}px`;
      triangle.style.borderBottomWidth = `${size}px`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="background">
      <div className="triangle"></div>
    </div>
  );
};

export default Background;
