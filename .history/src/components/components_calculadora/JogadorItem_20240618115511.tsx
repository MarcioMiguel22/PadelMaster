import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Jogador } from '../../utils/types/types';

export interface InputRef {
  focus: () => void;
}

interface JogadorItemProps {
  jogador: Jogador;
  handleNomeChange: (id: number, novoNome: string) => void;
  focusNextInput: () => void;
}

const JogadorItem = forwardRef<InputRef, JogadorItemProps>(({ jogador, handleNomeChange, focusNextInput }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNomeChange(jogador.id, e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      focusNextInput();
    }
  };

  return (
    <div className="jogador-item">
      <input
        ref={inputRef}
        type="text"
        value={jogador.nome}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
});

export default JogadorItem;
