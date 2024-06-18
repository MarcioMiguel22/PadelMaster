import React from 'react';
import { Campo as CampoType, Jogador } from '../../utils/types/types';
import TrocarJogadoresButton from './TrocarJogadoresButton';

interface CampoProps {
  campo: CampoType;
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  getTeamClass: (campo: CampoType, timeIndex: number) => string;
  trocarJogadores: (campoId: number) => void;
  selecionarJogador: (jogador: Jogador) => void;
  jogadoresSelecionados: Jogador[];
}

const Campo: React.FC<CampoProps> = ({
  campo,
  jogoIndex,
  handleResultadoChange,
  getTeamClass,
  trocarJogadores,
  selecionarJogador,
  jogadoresSelecionados
}) => {
  return (
    <div className="field">
      <h2>Campo {campo.id}</h2>
      <ul>
        {campo.times.map((time, idx) => (
          <li key={idx} className={getTeamClass(campo, idx)}>
            <div>
              {time.jogadores.map(jogador => (
                <span
                  key={jogador.id}
                  onClick={() => selecionarJogador(jogador)}
                  style={{
                    backgroundColor: jogadoresSelecionados.includes(jogador) ? 'yellow' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {jogador.nome}
                </span>
              ))}
              <input
                type="number"
                value={time.resultado}
                onChange={(e) => handleResultadoChange(jogoIndex, campo.id, idx, parseInt(e.target.value))}
                className="resultado-input"
              />
            </div>
          </li>
        ))}
      </ul>
      {jogoIndex > 0 && (
        <TrocarJogadoresButton onClick={() => trocarJogadores(campo.id)} />
      )}
    </div>
  );
};

export default Campo;
