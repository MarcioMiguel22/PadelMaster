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

const criarCampos = (times: Time[]): Campo[] => [
  { id: 1, times: times.slice(0, 2) },
  { id: 2, times: times.slice(2, 4) },
  { id: 3, times: times.slice(4, 6) },
];

const CalculadoraApp: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [jogos, setJogos] = useState<Campo[][]>([]);

  const handleNomeChange = (id: number, novoNome: string) => {
    setJogadores(jogadores.map(jogador =>
      jogador.id === id ? { ...jogador, nome: novoNome } : jogador
    ));
  };

  const handleResultadoChange = (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => {
    setJogos(jogos.map((jogo, idx) =>
      idx === jogoIndex
        ? jogo.map(campo =>
            campo.id === campoId
              ? {
                  ...campo,
                  times: campo.times.map((time, index) =>
                    index === timeIndex ? { ...time, resultado: novoResultado } : time
                  ),
                }
              : campo
          )
        : jogo
    ));
  };

  const handleNomeEdit = (jogoIndex: number, campoId: number, timeIndex: number, jogadorIndex: number, novoNome: string) => {
    setJogos(jogos.map((jogo, idx) =>
      idx === jogoIndex
        ? jogo.map(campo =>
            campo.id === campoId
              ? {
                  ...campo,
                  times: campo.times.map((time, tIdx) =>
                    tIdx === timeIndex
                      ? {
                          ...time,
                          jogadores: time.jogadores.map((jogador, jIdx) =>
                            jIdx === jogadorIndex ? { ...jogador, nome: novoNome } : jogador
                          ),
                        }
                      : time
                  ),
                }
              : campo
          )
        : jogo
    ));
  };

  const distribuirJogadores = () => {
    const times = criarTimes(jogadores);
    const novosCampos = criarCampos(times);
    setJogos([novosCampos]);
  };

  const iniciarProximoJogo = () => {
    const ultimoJogo = jogos[jogos.length - 1];
    const novosCampos: Campo[] = [
      { id: 1, times: [] },
      { id: 2, times: [] },
      { id: 3, times: [] },
    ];

    ultimoJogo.forEach(campo => {
      if (campo.times.length === 2) {
        const [time1, time2] = campo.times;
        const vencedores = time1.resultado > time2.resultado ? time1.jogadores : time2.jogadores;
        const perdedores = time1.resultado > time2.resultado ? time2.jogadores : time1.jogadores;

        if (campo.id === 1) {
          novosCampos[0].times.push({ jogadores: vencedores, resultado: 0 });
          novosCampos[1].times.push({ jogadores: perdedores, resultado: 0 });
        } else if (campo.id === 2) {
          novosCampos[0].times.push({ jogadores: vencedores, resultado: 0 });
          novosCampos[2].times.push({ jogadores: perdedores, resultado: 0 });
        } else if (campo.id === 3) {
          novosCampos[1].times.push({ jogadores: vencedores, resultado: 0 });
          novosCampos[2].times.push({ jogadores: perdedores, resultado: 0 });
        }
      }
    });

    setJogos([...jogos, novosCampos]);
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
          {jogos.map((jogo, jogoIndex) => (
            <div key={jogoIndex}>
              <h2>Resultados Jogo {jogoIndex + 1}</h2>
              {jogo.map(campo => (
                <div key={campo.id} className="field">
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
                              {jogadorIndex === 0 ? ' e ' : ''}
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
              ))}
            </div>
          ))}
        </div>
        {jogos.length > 0 && jogos.length < 5 && (
          <button onClick={iniciarProximoJogo} className="distribute-button">Jogo {jogos.length + 1}</button>
        )}
      </div>
    </div>
  );
};

export default CalculadoraApp;
