import React, { useEffect } from 'react';
import './Background.scss';

const Background: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const strips = document.querySelectorAll('.strip') as NodeListOf<HTMLElement>;
      strips.forEach((strip) => {
        const brightness = 100 + scrollY / 5;
        strip.style.background = `linear-gradient(to right, hsl(120, 100%, ${brightness}%), hsl(120, 100%, ${brightness - 20}%))`;
      });
    };

    const createStrips = () => {
      const container = document.querySelector('.background') as HTMLElement;
      let topPosition = 0;
      for (let i = 0; i < 10; i++) { // Adjust the number of strips as needed
        const strip = document.createElement('div');
        strip.classList.add('strip');
        strip.style.top = `${topPosition}vh`;
        topPosition += 10; // Adjust this value to control spacing between strips
        strip.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
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
