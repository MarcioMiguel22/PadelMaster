// src/components/Background.tsx

import React, { useEffect } from 'react';
import './Background.scss';

const Background: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pentagon = document.querySelector('.pentagon') as HTMLElement;
      const size = 200 + scrollY / 5;
      pentagon.style.width = `${size}px`;
      pentagon.style.height = `${size}px`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="background">
      <div className="pentagon"></div>
    </div>
  );
};

export default Background;
