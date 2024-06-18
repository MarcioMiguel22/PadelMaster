import React from 'react';
import Campo from './Campo';
import { Campo as CampoType, Jogador } from '../../utils/types/types';

interface JogoProps {
  jogo: CampoType[];
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  getTeamClass: (campo: CampoType, timeIndex: number) => string;
  selecionarJogador: (jogador: Jogador) => void;
  jogadoresSelecionados: Jogador[];
}

const Jogo: React.FC<JogoProps> = ({ jogo, jogoIndex, handleResultadoChange, getTeamClass, selecionarJogador, jogadoresSelecionados }) => (
  <div className="jogo">
    <h2>Resultados Jogo {jogoIndex + 1}</h2>
    <div className="campos">
      {jogo.map(campo => (
        <Campo
          key={campo.id}
          campo={campo}
          jogoIndex={jogoIndex}
          handleResultadoChange={handleResultadoChange}
          getTeamClass={getTeamClass}
          selecionarJogador={selecionarJogador}
          jogadoresSelecionados={jogadoresSelecionados}
        />
      ))}
    </div>
  </div>
);

export default Jogo;
