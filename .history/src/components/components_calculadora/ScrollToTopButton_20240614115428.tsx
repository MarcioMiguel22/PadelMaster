import React from 'react';

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={scrollToTop} className="scroll-to-top">
      Ir para o topo
    </button>
  );
};

export default ScrollToTopButton;
