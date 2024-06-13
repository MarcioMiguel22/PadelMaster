import React, { useState } from 'react';
import './Calculadora.css';

type Jogador = {
  id: number;
  nome: string;
};

type Time = {
  jogadores: Jogador[];
  resultado: number;
};

type Campo = {
  id: number;
  times: Time[];
};

const jogadoresIniciais: Jogador[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nome: `Jogador ${i + 1}`,
}));

const embaralharArray = <T,>(array: T[]): T[] => {
  const copiaArray = [...array];
  for (let i = copiaArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiaArray[i], copiaArray[j]] = [copiaArray[j], copiaArray[i]];
  }
  return copiaArray;
};

const criarTimes = (jogadores: Jogador[]): Time[] => {
  const jogadoresEmbaralhados = embaralharArray(jogadores);
  const times: Time[] = [];
  for (let i = 0; i < jogadoresEmbaralhados.length; i += 2) {
    times.push({ jogadores: jogadoresEmbaralhados.slice(i, i + 2), resultado: 0 });
  }
  return times;
};

const CalculadoraApp: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [campos, setCampos] = useState<Campo[]>([
    { id: 1, times: [] },
    { id: 2, times: [] },
    { id: 3, times: [] },
  ]);
  const [jogoDois, setJogoDois] = useState<boolean>(false);

  const handleNomeChange = (id: number, novoNome: string) => {
    setJogadores(jogadores.map(jogador =>
      jogador.id === id ? { ...jogador, nome: novoNome } : jogador
    ));
  };

  const handleResultadoChange = (campoId: number, timeIndex: number, novoResultado: number) => {
    setCampos(campos.map(campo =>
      campo.id === campoId
        ? {
            ...campo,
            times: campo.times.map((time, index) =>
              index === timeIndex ? { ...time, resultado: novoResultado } : time
            ),
          }
        : campo
    ));
  };

  const distribuirJogadores = () => {
    const times = criarTimes(jogadores);
    const novosCampos: Campo[] = campos.map((campo, index) => ({
      ...campo,
      times: times.slice(index * 2, index * 2 + 2),
    }));
    setCampos(novosCampos);
  };

  const iniciarJogoDois = () => {
    setJogoDois(true);

    // Movimentação dos jogadores baseada nos resultados dos jogos anteriores
    const novosCampos: Campo[] = [
      { id: 1, times: [] },
      { id: 2, times: [] },
      { id: 3, times: [] },
    ];

    campos.forEach(campo => {
      if (campo.times.length === 2) {
        const [time1, time2] = campo.times;
        const vencedores = time1.resultado > time2.resultado ? time1.jogadores : time2.jogadores;
        const perdedores = time1.resultado > time2.resultado ? time2.jogadores : time1.jogadores;

        if (campo.id === 1) {
          novosCampos[0].times.push({ jogadores: vencedores, resultado: 0 });
          novosCampos[0].times.push({ jogadores: perdedores, resultado: 0 });
        } else if (campo.id === 2) {
          novosCampos[0].times.push({ jogadores: vencedores, resultado: 0 });
          novosCampos[1].times.push({ jogadores: perdedores, resultado: 0 });
        } else if (campo.id === 3) {
          novosCampos[1].times.push({ jogadores: vencedores, resultado: 0 });
          novosCampos[2].times.push({ jogadores: perdedores, resultado: 0 });
        }
      }
    });

    setCampos(novosCampos);
  };

  const getTeamClass = (campo: Campo, timeIndex: number): string => {
    if (campo.times.length < 2) return '';
    const resultadoAtual = campo.times[timeIndex].resultado;
    const resultadoOponente = campo.times[1 - timeIndex]?.resultado;
    if (resultadoAtual > resultadoOponente) return 'team vencedor';
    if (resultadoAtual < resultadoOponente) return 'team perdedor';
    return 'team';
  };

  return (
    <div className="calculadora-container">
      <h1>Calculadora de Jogos de Padel</h1>
      <div className="main-content">
        <div className="jogadores-lista">
          <div className="jogadores-coluna">
            {jogadores.slice(0, 4).map(jogador => (
              <div key={jogador.id} className="jogador-item">
                <label>{`Jogador ${jogador.id}`}</label>
                <input
                  type="text"
                  value={jogador.nome}
                  onChange={(e) => handleNomeChange(jogador.id, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="jogadores-coluna">
            {jogadores.slice(4, 8).map(jogador => (
              <div key={jogador.id} className="jogador-item">
                <label>{`Jogador ${jogador.id}`}</label>
                <input
                  type="text"
                  value={jogador.nome}
                  onChange={(e) => handleNomeChange(jogador.id, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="jogadores-coluna">
            {jogadores.slice(8, 12).map(jogador => (
              <div key={jogador.id} className="jogador-item">
                <label>{`Jogador ${jogador.id}`}</label>
                <input
                  type="text"
                  value={jogador.nome}
                  onChange={(e) => handleNomeChange(jogador.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="fields-container">
          <button onClick={distribuirJogadores} className="distribute-button">Distribuir Jogadores</button>
          {jogoDois && (
            <button onClick={iniciarJogoDois} className="distribute-button">Jogo Dois</button>
          )}
          {campos.map(campo => (
            <div key={campo.id} className="field">
              <h2>Campo {campo.id}</h2>
              <ul>
                {campo.times.map((time, idx) => (
                  <li key={idx} className={getTeamClass(campo, idx)}>
                    <div>
                      {time.jogadores.map(jogador => jogador.nome).join(' e ')}
                      <input
                        type="number"
                        value={time.resultado}
                        onChange={(e) => handleResultadoChange(campo.id, idx, parseInt(e.target.value))}
                        className="resultado-input"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculadoraApp;
