// src/hooks/useAnimation.ts
import { useContext } from 'react';
import { AnimationContext } from '../components/components_calculadora/AnimationContext';

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
