import React from 'react';
import styles from './Jogo.module.css';
import Campo from './Campo';
import { Campo as CampoType, Jogador } from '../../utils/types/types';

interface JogoProps {
  jogo: CampoType[];
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  getTeamClass: (campo: CampoType, timeIndex: number) => string;
  selecionarJogador: (jogador: Jogador) => void;
  jogadoresSelecionados: Jogador[];
  trocarJogadores: (campoId: number) => void;
  jogadoresEsperando: Jogador[];
}

const Jogo6: React.FC<JogoProps> = ({
  jogo,
  jogoIndex,
  handleResultadoChange,
  getTeamClass,
  selecionarJogador,
  jogadoresSelecionados,
  trocarJogadores,
  jogadoresEsperando,
}) => (
  <div className="jogo">
    <div className={styles.container}>
      <h2 className={styles.header}>Resultados Jogo {jogoIndex + 1}</h2>
    </div>
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
          trocarJogadores={trocarJogadores}
          jogadoresEsperando={jogadoresEsperando}
        />
      ))}
    </div>
  </div>
);

export default Jogo6;
