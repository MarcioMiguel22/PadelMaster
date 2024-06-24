import React, { useEffect } from 'react';
import './Background.scss';

const Background: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shapes = document.querySelectorAll('.shape') as NodeListOf<HTMLElement>;
      shapes.forEach((shape, index) => {
        const size = 200 + scrollY / (5 + index);
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
      });
    };

    const changeShapeProperties = () => {
      const shapes = document.querySelectorAll('.shape') as NodeListOf<HTMLElement>;
      shapes.forEach((shape) => {
        const size = Math.random() * 200 + 100;
        const top = Math.random() * 100 + 'vh';
        const left = Math.random() * 100 + 'vw';
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.top = top;
        shape.style.left = left;
      });
    };

    window.addEventListener('scroll', handleScroll);
    changeShapeProperties();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="background">
      <div className="shape pentagon"></div>
      <div className="shape hexagon"></div>
      <div className="shape triangle"></div>
    </div>
  );
};

export default Background;
