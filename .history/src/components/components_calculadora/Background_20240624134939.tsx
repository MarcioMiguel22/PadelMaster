import React, { useEffect } from 'react';
import './Background.scss';

const Background: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triangles = document.querySelectorAll('.triangle') as NodeListOf<HTMLElement>;
      triangles.forEach((triangle, index) => {
        const size = 200 + scrollY / (5 + index);
        triangle.style.borderLeftWidth = `${size}px`;
        triangle.style.borderBottomWidth = `${size}px`;
      });
    };

    const createTriangles = () => {
      const container = document.querySelector('.background') as HTMLElement;
      for (let i = 0; i < 10; i++) { // Adjust the number of triangles as needed
        const triangle = document.createElement('div');
        triangle.classList.add('triangle');
        const size = Math.random() * 200 + 100;
        triangle.style.borderLeftWidth = `${size}px`;
        triangle.style.borderBottomWidth = `${size}px`;
        triangle.style.top = `${Math.random() * 100}vh`;
        triangle.style.left = `${Math.random() * 100}vw`;
        container.appendChild(triangle);
      }
    };

    createTriangles();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div className="background"></div>;
};

export default Background;
