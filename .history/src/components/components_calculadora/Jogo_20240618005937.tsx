import React from 'react';
import Campo from './Campo';
import { Campo as CampoType } from '../../utils/types/types'; // Importando o tipo Campo corretamente

interface JogoProps {
  jogo: CampoType[]; // Usando o tipo importado para definir a propriedade jogo
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  handleNomeEdit: (jogoIndex: number, campoId: number, timeIndex: number, jogadorIndex: number, novoNome: string) => void;
  getTeamClass: (campo: CampoType, timeIndex: number) => string;
  trocarJogadores: (campoId: number) => void; // Adicione a nova propriedade
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
          trocarJogadores={trocarJogadores} // Passe a propriedade para o Campo
        />
      ))}
    </div>
  </div>
);

export default Jogo;
