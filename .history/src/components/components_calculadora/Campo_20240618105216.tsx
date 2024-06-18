import React from 'react';
import { Campo as CampoType, Time, Jogador } from '../../utils/types/types';
import TrocarJogadoresButton from './TrocarJogadoresButton';

interface CampoProps {
  campo: CampoType;
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  handleNomeEdit: (jogoIndex: number, campoId: number, timeIndex: number, jogadorIndex: number, novoNome: string) => void;
  getTeamClass: (campo: CampoType, timeIndex: number) => string;
  trocarJogadores: (campoId: number) => void; // Atualizado para aceitar apenas campoId
}

const Campo: React.FC<CampoProps> = ({ campo, jogoIndex, handleResultadoChange, handleNomeEdit, getTeamClass, trocarJogadores }) => {
  const handleTrocarJogadores = () => {
    trocarJogadores(campo.id);
  };

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
                    onChange={(e) => handleNomeEdit(jogoIndex, campo.id, idx, jogadorIndex, e.target.value)}
                    className="jogador-input"
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
      {jogoIndex > 0 && (
        <TrocarJogadoresButton onClick={handleTrocarJogadores} />
      )}
    </div>
  );
};

export default Campo;
