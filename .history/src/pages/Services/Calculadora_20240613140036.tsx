import React, { useState } from 'react';
import './Calculadora.css';

type Jogador = {
  id: number;
  nome: string;
  vitorias: number;
  pontos: number;
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
  vitorias: 0,
  pontos: 0,
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

const separarDuplas = (jogadores: Jogador[]): Jogador[] => {
  const separados: Jogador[] = [];
  while (jogadores.length) {
    const [jogador1, jogador2] = jogadores.splice(0, 2);
    separados.push(jogador1);
    if (jogador2) separados.push(jogador2);
  }
  return separados;
};

const criarNovasDuplas = (jogadores: Jogador[]): Time[] => {
  const novasDuplas: Time[] = [];
  for (let i = 0; i < jogadores.length; i += 2) {
    novasDuplas.push({ jogadores: [jogadores[i], jogadores[i + 1]], resultado: 0 });
  }
  return novasDuplas;
};

const separarTimes = (times: Time[]): Jogador[] => {
  const jogadores: Jogador[] = [];
  times.forEach(time => {
    jogadores.push(...time.jogadores);
  });
  return jogadores;
};

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

    const todosJogadores: Jogador[] = separarTimes(ultimoJogo.reduce((acc, campo) => acc.concat(campo.times), []));
    const jogadoresSeparados = separarDuplas(todosJogadores);

    const novasDuplas = criarNovasDuplas(jogadoresSeparados);

    novosCampos[0].times.push(novasDuplas[0]);
    novosCampos[0].times.push(novasDuplas[1]);
    novosCampos[1].times.push(novasDuplas[2]);
    novosCampos[1].times.push(novasDuplas[3]);
    novosCampos[2].times.push(novasDuplas[4]);
    novosCampos[2].times.push(novasDuplas[5]);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jogadoresClassificados = [...jogadores].sort((a, b) => {
    if (b.vitorias === a.vitorias) {
      return b.pontos - a.pontos;
    }
    return b.vitorias - a.vitorias;
  });

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
            <div key={jogoIndex} className="jogo">
              <h2>Resultados Jogo {jogoIndex + 1}</h2>
              <div className="campos">
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
            </div>
          ))}
        </div>
        {jogos.length > 0 && jogos.length < 5 && (
          <button onClick={iniciarProximoJogo} className="distribute-button">Jogo {jogos.length + 1}</button>
        )}
        <button onClick={scrollToTop} className="scroll-to-top">Ir para o topo</button>
        <div className="ranking-container">
          <h2>Ranking dos Jogadores</h2>
          <ul>
            {jogadoresClassificados.map((jogador) => (
              <li key={jogador.id}>
                {jogador.nome} - Vitórias: {jogador.vitorias}, Pontos: {jogador.pontos}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraApp;
