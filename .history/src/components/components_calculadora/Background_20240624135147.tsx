import React, { useEffect } from 'react';
import './Background.scss';

const Background: React.FC = () => {
  useEffect(() => {
    const createStrips = () => {
      const container = document.querySelector('.background') as HTMLElement;
      for (let i = 0; i < 10; i++) { // Adjust the number of strips as needed
        const strip = document.createElement('div');
        strip.classList.add('strip');
        strip.style.top = `${Math.random() * 100}vh`;
        strip.style.left = `${Math.random() * 100}vw`;
        strip.style.transform = `rotate(${Math.random() * 180 - 90}deg)`;
        container.appendChild(strip);
      }
    };

    createStrips();
  }, []);

  return <div className="background"></div>;
};

export default Background;
