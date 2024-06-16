import React from 'react';

interface CampoProps {
  campo: Campo;
  jogoIndex: number;
  handleResultadoChange: (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => void;
  handleNomeEdit: (jogoIndex: number, campoId: number, timeIndex: number, jogadorIndex: number, novoNome: string) => void;
  getTeamClass: (campo: Campo, timeIndex: number) => string;
}

const Campo: React.FC<CampoProps> = ({ campo, jogoIndex, handleResultadoChange, handleNomeEdit, getTeamClass }) => (
  <div className="field">
    <h2>Campo {campo.id}</h2>
    <ul>
      {campo.times.map((time, idx) => (
        <li key={idx} className={getTeamClass(campo, idx)}>
          <div>
            {time.jogadores.map((jogador, jogadorIndex) => (
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
  </div>
);

export default Campo;
