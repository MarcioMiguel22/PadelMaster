import React from 'react';
import Campo from './Campo';
import { Campo as CampoType, Jogador } from '../../utils/types/types';

interface JogoProps {
  jogo: CampoType[];
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  handleNomeEdit: (jogoIndex: number, campoId: number, timeIndex: number, jogadorIndex: number, novoNome: string) => void;
  getTeamClass: (campo: CampoType, timeIndex: number) => string;
  trocarJogadores: (campoId: number, jogadoresAtuais: Jogador[]) => void; // Atualizar para aceitar dois argumentos
}

const Jogo: React.FC<JogoProps> = ({ jogo, jogoIndex, handleResultadoChange, handleNomeEdit, getTeamClass, trocarJogadores }) => (
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
          trocarJogadores={trocarJogadores} // Passar função com dois argumentos
        />
      ))}
    </div>
  </div>
);

export default Jogo;
