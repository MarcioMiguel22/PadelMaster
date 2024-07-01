import React from 'react';
import Campo8 from './Campo8';
import { Campo as CampoType, Jogador } from '../../utils/types/types';

interface JogoProps {
  jogo: CampoType[];
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  getTeamClass: (campo: CampoType, timeIndex: number) => string;
  selecionarJogador: (jogador: Jogador) => void;
  jogadoresSelecionados: Jogador[];
  trocarJogadores: (campoId: number) => void;
}

const Jogo8: React.FC<JogoProps> = ({
  jogo,
  jogoIndex,
  handleResultadoChange,
  getTeamClass,
  selecionarJogador,
  jogadoresSelecionados,
  trocarJogadores,
}) => (
  <div className="jogo">
    <div className="container">
      <h2 className="header">Resultados Jogo {jogoIndex + 1}</h2>
    </div>
    <div className="campos">
      {jogo.map(campo => (
        <Campo8
          key={campo.id}
          campo={campo}
          jogoIndex={jogoIndex}
          handleResultadoChange={handleResultadoChange}
          getTeamClass={getTeamClass}
          selecionarJogador={selecionarJogador}
          jogadoresSelecionados={jogadoresSelecionados}
          trocarJogadores={trocarJogadores}
        />
      ))}
    </div>
  </div>
);

export default Jogo8;
