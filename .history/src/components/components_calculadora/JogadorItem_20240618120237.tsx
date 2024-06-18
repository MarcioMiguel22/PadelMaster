import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Autosuggest, { ChangeEvent, InputProps } from 'react-autosuggest';
import { Jogador } from '../../utils/types/types';

export interface InputRef {
  focus: () => void;
}

interface JogadorItemProps {
  jogador: Jogador;
  handleNomeChange: (id: number, novoNome: string) => void;
  focusNextInput: () => void;
}

const nomesSugestoes = ['Nome1', 'Nome2', 'Nome3', 'Nome4', 'Nome5']; // Substitua por uma lista real de sugestões

const JogadorItem = forwardRef<InputRef, JogadorItemProps>(({ jogador, handleNomeChange, focusNextInput }, ref) => {
  const [nome, setNome] = useState(jogador.nome);
  const [sugestoes, setSugestoes] = useState<string[]>([]);

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSugestoes(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSugestoes([]);
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : nomesSugestoes.filter(nome =>
      nome.toLowerCase().includes(inputValue)
    );
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderSuggestion = (suggestion: string) => (
    <div>
      {suggestion}
    </div>
  );

  const onChange = (_: React.FormEvent<HTMLElement>, { newValue }: ChangeEvent) => {
    setNome(newValue);
    handleNomeChange(jogador.id, newValue);
  };

  useImperativeHandle(ref, () => ({
    focus() {
      // Implementação para focar no input
    }
  }));

  const inputProps: InputProps<string> = {
    value: nome,
    onChange: onChange,
    onBlur: focusNextInput,
  };

  return (
    <div className="jogador-item">
      <Autosuggest
        suggestions={sugestoes}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
});

export { JogadorItem };
