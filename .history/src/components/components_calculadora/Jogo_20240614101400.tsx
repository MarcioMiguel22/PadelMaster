import React from 'react';
import Campo from './Campo';

interface JogoProps {
  jogo: Campo[];
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  handleNomeEdit: (jogoIndex: number, campoId: number, timeIndex: number, jogadorIndex: number, novoNome: string) => void;
  getTeamClass: (campo: Campo, timeIndex: number) => string;
}

const Jogo: React.FC<JogoProps> = ({ jogo, jogoIndex, handleResultadoChange, handleNomeEdit, getTeamClass }) => (
  <div className="jogo">
    <h2>Resultados Jogo {jogoIndex + 1}</h2>
    <div className="campos">
      {jogo.map(campo => (
        <Campo
          key={campo.id}
          campo={campo}
          jogoIndex={jogoIndex}
          handleResultadoChange={handleResultadoChange}
          handleNomeEdit={handleNomeEdit}
          getTeamClass={getTeamClass}
        />
      ))}
    </div>
  </div>
);

export default Jogo;
