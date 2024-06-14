import React from 'react';
import JogadorItem from './JogadorItem';

interface JogadoresListaProps {
  jogadores: Jogador[];
  handleNomeChange: (id: number, novoNome: string) => void;
}

const JogadoresLista: React.FC<JogadoresListaProps> = ({ jogadores, handleNomeChange }) => (
  <div className="jogadores-lista">
    {Array.from({ length: 3 }, (_, i) => (
      <div className="jogadores-coluna" key={i}>
        {jogadores.slice(i * 4, (i + 1) * 4).map(jogador => (
          <JogadorItem
            key={jogador.id}
            jogador={jogador}
            handleNomeChange={handleNomeChange}
          />
        ))}
      </div>
    ))}
  </div>
);

export default JogadoresLista;
