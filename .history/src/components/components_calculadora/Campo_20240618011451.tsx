import React, { useState } from 'react';
import { Campo as CampoType, Time, Jogador } from '../../utils/types/types';

interface CampoProps {
  campo: CampoType;
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  handleNomeEdit: (jogoIndex: number, campoId: number, timeIndex: number, jogadorIndex: number, novoNome: string) => void;
  getTeamClass: (campo: CampoType, timeIndex: number) => string;
  trocarJogadores: (campoId: number, jogadores: Jogador[]) => void; // Adicionando a prop trocarJogadores
}

const Campo: React.FC<CampoProps> = ({ campo, jogoIndex, handleResultadoChange, handleNomeEdit, getTeamClass, trocarJogadores }) => {
  const [showTrocarButton, setShowTrocarButton] = useState(true);

  const handleTrocarJogadores = () => {
    trocarJogadores(campo.id, campo.times.flatMap(time => time.jogadores));
    setShowTrocarButton(false); // Esconder o botão após ser clicado
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
      {jogoIndex > 0 && showTrocarButton && (
        <button onClick={handleTrocarJogadores} className="trocar-jogadores-button">
          Trocar Jogadores
        </button>
      )}
    </div>
  );
};

export default Campo;
