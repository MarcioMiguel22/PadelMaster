import React, { useState } from 'react';
import './Calculadora.css';
import JogadoresLista from '../../components/components_calculadora/JogadoresLista';
import Jogo from '../../components/components_calculadora/Jogo';
import Ranking from '../../components/components_calculadora/Ranking';
import { Jogador, Time, Campo as CampoType } from '../../utils/types/types';
import ScrollToTopButton from '../../components/components_calculadora/ScrollToTopButton';
import DistributeButton from '../../components/components_calculadora/DistributeButton';
import ExportButton from '../../components/components_calculadora/ExportButton';
import ResetButton from '../../components/components_calculadora/ResetButton';

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

const criarCampos = (times: Time[]): CampoType[] => [
  { id: 1, times: times.slice(0, 2) },
  { id: 2, times: times.slice(2, 4) },
  { id: 3, times: times.slice(4, 6) },
];

const atualizarRanking = (jogadores: Jogador[], jogos: CampoType[][]) => {
  const jogadoresAtualizados = [...jogadores].map(jogador => {
    let vitorias = 0;
    let pontos = 0;
    jogos.forEach(jogo => {
      jogo.forEach(campo => {
        campo.times.forEach(time => {
          if (time.jogadores.some(j => j.id === jogador.id)) {
            pontos += time.resultado;
            if (time.resultado > campo.times[1 - campo.times.indexOf(time)].resultado) {
              vitorias += 1;
            }
          }
        });
      });
    });
    return { ...jogador, vitorias, pontos };
  });

  return jogadoresAtualizados.sort((a, b) => {
    if (b.vitorias === a.vitorias) {
      return b.pontos - a.pontos;
    }
    return b.vitorias - a.vitorias;
  });
};

const CalculadoraApp: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [jogos, setJogos] = useState<CampoType[][]>([]);
  const [showDistributeButton, setShowDistributeButton] = useState(true);
  const [jogadoresSelecionados, setJogadoresSelecionados] = useState<Jogador[]>([]);

  const handleNomeChange = (id: number, novoNome: string) => {
    setJogadores(jogadores.map(jogador =>
      jogador.id === id ? { ...jogador, nome: novoNome } : jogador
    ));
  };

  const handleResultadoChange = (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => {
    const novosJogos = jogos.map((jogo, idx) =>
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
    );
    setJogos(novosJogos);
    setJogadores(atualizarRanking(jogadores, novosJogos));
  };

  const distribuirJogadores = () => {
    const times = criarTimes(jogadores);
    const novosCampos = criarCampos(times);
    const novosJogos = [novosCampos];
    setJogos(novosJogos);
    setJogadores(atualizarRanking(jogadores, novosJogos));
  };

  const iniciarProximoJogoHandler = () => {
    const ultimoJogo = jogos[jogos.length - 1];
    const novosCampos: CampoType[] = [
      { id: 1, times: [] },
      { id: 2, times: [] },
      { id: 3, times: [] },
    ];

    const campo1 = ultimoJogo.find(campo => campo.id === 1);
    const campo2 = ultimoJogo.find(campo => campo.id === 2);
    const campo3 = ultimoJogo.find(campo => campo.id === 3);

    if (campo1 && campo2 && campo3) {
      const [time1Campo1, time2Campo1] = campo1.times;
      const [time1Campo2, time2Campo2] = campo2.times;
      const [time1Campo3, time2Campo3] = campo3.times;

      const vencedoresCampo1 = time1Campo1.resultado > time2Campo1.resultado ? time1Campo1.jogadores : time2Campo1.jogadores;
      const perdedoresCampo1 = time1Campo1.resultado > time2Campo1.resultado ? time2Campo1.jogadores : time1Campo1.jogadores;

      const vencedoresCampo2 = time1Campo2.resultado > time2Campo2.resultado ? time1Campo2.jogadores : time2Campo2.jogadores;
      const perdedoresCampo2 = time1Campo2.resultado > time2Campo2.resultado ? time2Campo2.jogadores : time1Campo2.jogadores;

      const vencedoresCampo3 = time1Campo3.resultado > time2Campo3.resultado ? time1Campo3.jogadores : time2Campo3.jogadores;
      const perdedoresCampo3 = time1Campo3.resultado > time2Campo3.resultado ? time2Campo3.jogadores : time1Campo3.jogadores;

      novosCampos[0].times.push(
        { jogadores: [vencedoresCampo1[0], vencedoresCampo2[0]], resultado: 0 },
        { jogadores: [vencedoresCampo1[1], vencedoresCampo2[1]], resultado: 0 }
      );

      novosCampos[1].times.push(
        { jogadores: [perdedoresCampo1[0], vencedoresCampo3[0]], resultado: 0 },
        { jogadores: [perdedoresCampo1[1], vencedoresCampo3[1]], resultado: 0 }
      );

      novosCampos[2].times.push(
        { jogadores: [perdedoresCampo2[0], perdedoresCampo3[0]], resultado: 0 },
        { jogadores: [perdedoresCampo2[1], perdedoresCampo3[1]], resultado: 0 }
      );
    }

    const novosJogos = [...jogos, novosCampos];
    setJogos(novosJogos);
    setJogadores(atualizarRanking(jogadores, novosJogos));

    if (jogos.length === 1) {
      setShowDistributeButton(false);
    }
  };

  const resetGame = () => {
    setJogadores(jogadoresIniciais);
    setJogos([]);
    setShowDistributeButton(true);
    setJogadoresSelecionados([]);
  };

  const getTeamClass = (campo: CampoType, timeIndex: number): string => {
    if (campo.times.length < 2) return '';
    const resultadoAtual = campo.times[timeIndex].resultado;
    const resultadoOponente = campo.times[1 - timeIndex]?.resultado;
    if (resultadoAtual > resultadoOponente) return 'team vencedor';
    if (resultadoAtual < resultadoOponente) return 'team perdedor';
    return 'team';
  };

  const jogadoresClassificados = atualizarRanking(jogadores, jogos);

  const selecionarJogador = (jogador: Jogador) => {
    setJogadoresSelecionados(prevState => {
      if (prevState.includes(jogador)) {
        return prevState.filter(j => j.id !== jogador.id);
      } else {
        if (prevState.length < 2) {
          return [...prevState, jogador];
        } else {
          return prevState;
        }
      }
    });
  };

  const todosResultadosInseridos = jogos.length === 5 && jogos.every(jogo =>
    jogo.every(campo =>
      campo.times.every(time =>
        typeof time.resultado === 'number'
      )
    )
  );

  return (
    <div className="calculadora-container">
      <h1>Jogos de Padel</h1>
      <div className="main-content">
        <JogadoresLista jogadores={jogadores} handleNomeChange={handleNomeChange} />
        <div className="fields-container">
          {showDistributeButton && <DistributeButton onClick={distribuirJogadores} />}
          {jogos.map((jogo, jogoIndex) => (
            <Jogo
              key={jogoIndex}
              jogo={jogo}
              jogoIndex={jogoIndex}
              handleResultadoChange={handleResultadoChange}
              getTeamClass={getTeamClass}
              selecionarJogador={selecionarJogador}
              jogadoresSelecionados={jogadoresSelecionados}
            />
          ))}
          {jogos.length > 0 && jogos.length < 5 && (
            <button onClick={iniciarProximoJogoHandler} className="distribute-button">Jogo {jogos.length + 1}</button>
          )}
        </div>
        <div id="ranking-resultados">
          <Ranking jogadoresClassificados={jogadoresClassificados} />
          <div className="export-button-container">
            <ExportButton jogadores={jogadoresClassificados} jogos={jogos} />
          </div>
          {todosResultadosInseridos && <ResetButton onReset={resetGame} />}
        </div>
        <ScrollToTopButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      </div>
    </div>
  );
};

export default CalculadoraApp;
