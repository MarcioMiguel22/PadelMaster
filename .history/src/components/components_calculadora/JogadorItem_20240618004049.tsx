import React, { useState, useEffect, useRef } from 'react';
import { Jogador } from '../../utils/types/types'; // Importando o tipo Jogador

interface JogadorItemProps {
  jogador: Jogador;
  handleNomeChange: (id: number, novoNome: string) => void;
  focusNextInput: () => void;
}

const JogadorItem: React.FC<JogadorItemProps> = ({ jogador, handleNomeChange, focusNextInput }) => {
  const [nome, setNome] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set the initial value for the input
    setNome(jogador.nome === `Jogador ${jogador.id}` ? '' : jogador.nome);
  }, [jogador.nome, jogador.id]);

  const handleBlur = () => {
    if (nome.trim() === '') {
      handleNomeChange(jogador.id, `Jogador ${jogador.id}`);
      setNome('');
    } else {
      handleNomeChange(jogador.id, nome);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      focusNextInput();
    }
  };

  return (
    <div className="jogador-item">
      <label>{`Jogador ${jogador.id}`}</label>
      <input
        ref={inputRef}
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Inserir nome de jogador"
      />
    </div>
  );
};

export default JogadorItem;
