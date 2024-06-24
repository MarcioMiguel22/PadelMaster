import React, { useEffect } from 'react';
import './Background.scss';

const Background: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const strips = document.querySelectorAll('.strip') as NodeListOf<HTMLElement>;
      strips.forEach((strip) => {
        const lightness = 85 + scrollY / 100;
        strip.style.background = `linear-gradient(to right, hsl(60, 100%, ${lightness}%), hsl(120, 50%, ${lightness - 10}%))`;
      });
    };

    const createStrips = () => {
      const container = document.querySelector('.background') as HTMLElement;
      let topPosition = 0;
      for (let i = 0; i < 6; i++) { // Reduced the number of strips for simplicity
        const strip = document.createElement('div');
        strip.classList.add('strip');
        strip.style.top = `${topPosition}vh`;
        topPosition += 15; // Adjust this value to control spacing between strips
        strip.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
        container.appendChild(strip);
      }
    };

    createStrips();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div className="background"></div>;
};

export default Background;
