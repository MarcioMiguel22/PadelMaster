// src/contexts/AnimationContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AnimationContextProps {
  isAnimating: boolean;
  startAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(undefined);

export const AnimationProvider: React.FC = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 4000); // tempo para a animação
  };

  return (
    <AnimationContext.Provider value={{ isAnimating, startAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
