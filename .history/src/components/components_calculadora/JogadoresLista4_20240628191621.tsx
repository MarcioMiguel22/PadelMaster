import React, { useRef, useEffect, useState } from 'react';
import JogadorItem, { InputRef } from './JogadorItem';
import { Jogador } from '../../utils/types/types';

interface JogadoresListaProps {
  jogadores: Jogador[];
  handleNomeChange: (id: number, novoNome: string) => void;
}

const JogadoresLista4: React.FC<JogadoresListaProps> = ({ jogadores, handleNomeChange }) => {
  const [localJogadores, setLocalJogadores] = useState<Jogador[]>([]);
  const inputRefs = useRef<(InputRef | null)[]>([]);

  useEffect(() => {
    const storedJogadores = localStorage.getItem('jogadores4');
    if (storedJogadores) {
      setLocalJogadores(JSON.parse(storedJogadores));
    } else {
      setLocalJogadores(jogadores);
    }
  }, [jogadores]);

  const focusNextInput = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleNomeChangeWithStorage = (id: number, novoNome: string) => {
    handleNomeChange(id, novoNome);
    const updatedJogadores = localJogadores.map(jogador =>
      jogador.id === id ? { ...jogador, nome: novoNome } : jogador
    );
    setLocalJogadores(updatedJogadores);
    localStorage.setItem('jogadores4', JSON.stringify(updatedJogadores));
  };

  return (
    <div className="jogadores-lista">
      {Array.from({ length: 1 }, (_, i) => (
        <div className="jogadores-coluna" key={i}>
          {localJogadores.slice(i * 4, (i + 1) * 4).map((jogador, jIndex) => (
            <JogadorItem
              key={jogador.id}
              jogador={jogador}
              handleNomeChange={handleNomeChangeWithStorage}
              focusNextInput={() => focusNextInput(i * 4 + jIndex)}
              ref={(el) => (inputRefs.current[i * 4 + jIndex] = el)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default JogadoresLista4;
