import React, { useRef } from 'react';
import JogadorItem from './JogadorItem';
import { Jogador } from '../../utils/types/types'; // Importando o tipo Jogador

interface JogadoresListaProps {
  jogadores: Jogador[];
  handleNomeChange: (id: number, novoNome: string) => void;
}

const JogadoresLista: React.FC<JogadoresListaProps> = ({ jogadores, handleNomeChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusNextInput = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="jogadores-lista">
      {Array.from({ length: 3 }, (_, i) => (
        <div className="jogadores-coluna" key={i}>
          {jogadores.slice(i * 4, (i + 1) * 4).map((jogador, jIndex) => (
            <JogadorItem
              key={jogador.id}
              jogador={jogador}
              handleNomeChange={handleNomeChange}
              focusNextInput={() => focusNextInput(i * 4 + jIndex)}
              ref={(el) => (inputRefs.current[i * 4 + jIndex] = el)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default JogadoresLista;
