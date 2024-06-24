// src/components/components_calculadora/AnimationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextProps {
  isAnimating: boolean;
  startAnimation: () => void;
}

interface AnimationProviderProps {
  children: ReactNode;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(undefined);

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
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
