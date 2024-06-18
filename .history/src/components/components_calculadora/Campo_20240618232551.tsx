import React from 'react';
import { Campo as CampoType, Time, Jogador } from '../../utils/types/types';

interface CampoProps {
  campo: CampoType;
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  getTeamClass: (campo: CampoType, timeIndex: number) => string;
  selecionarJogador: (jogador: Jogador) => void;
  jogadoresSelecionados: Jogador[];
}

const Campo: React.FC<CampoProps> = ({ campo, jogoIndex, handleResultadoChange, getTeamClass, selecionarJogador, jogadoresSelecionados }) => {
  const isJogadorSelecionado = (jogador: Jogador) => jogadoresSelecionados.some(j => j.id === jogador.id);

  return (
    <div className="field">
      <h2>Campo {campo.id}</h2>
      <ul>
        {campo.times.map((time: Time, idx: number) => (
          <li key={idx} className={getTeamClass(campo, idx)}>
            <div>
              {time.jogadores.map((jogador: Jogador, jogadorIndex: number) => (
                <span key={jogador.id}>
                  <input
                    type="text"
                    value={jogador.nome}
                    readOnly
                    className={`jogador-input ${isJogadorSelecionado(jogador) ? 'selecionado' : ''}`}
                    onClick={() => selecionarJogador(jogador)} // Seleciona o jogador ao clicar
                  />
                  {jogadorIndex === 0 ? '  ' : ''}
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
    </div>
  );
};

export default Campo;
