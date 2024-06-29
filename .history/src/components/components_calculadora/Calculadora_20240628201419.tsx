import React, { useState } from 'react';
import CalculadoraApp4 from './CalculadoraApp4';
import CalculadoraApp12 from './CalculadoraApp12';

export const Calculadora: React.FC = () => {
  const [useFourPlayers, setUseFourPlayers] = useState(true); // Exemplo de estado para alternar entre os componentes

  return (
    <div>
      {useFourPlayers ? <CalculadoraApp4 /> : <CalculadoraApp12 />}
      <button onClick={() => setUseFourPlayers(!useFourPlayers)}>
        Alternar entre {useFourPlayers ? '12 Jogadores' : '4 Jogadores'}
      </button>
    </div>
  );
};
