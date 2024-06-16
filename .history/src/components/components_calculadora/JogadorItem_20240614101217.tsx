import React from 'react';

interface JogadorItemProps {
  jogador: Jogador;
  handleNomeChange: (id: number, novoNome: string) => void;
}

const JogadorItem: React.FC<JogadorItemProps> = ({ jogador, handleNomeChange }) => (
  <div className="jogador-item">
    <label>{`Jogador ${jogador.id}`}</label>
    <input
      type="text"
      value={jogador.nome}
      onChange={(e) => handleNomeChange(jogador.id, e.target.value)}
    />
  </div>
);

export default JogadorItem;
