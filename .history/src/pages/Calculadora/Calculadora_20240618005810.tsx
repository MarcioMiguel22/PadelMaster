import React, { useState, useRef } from 'react';
import './Calculadora.css';
import JogadoresLista from '../../components/components_calculadora/JogadoresLista';
import Jogo from '../../components/components_calculadora/Jogo';
import Ranking from '../../components/components_calculadora/Ranking';
import { Jogador, Time, Campo as CampoType } from '../../utils/types/types';
import { iniciarProximoJogo } from '../../components/components_calculadora/logic/gameLogic';
import ScrollToTopButton from '../../components/components_calculadora/ScrollToTopButton';
import DistributeButton from '../../components/components_calculadora/DistributeButton';

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

const CalculadoraApp: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [jogos, setJogos] = useState<CampoType[][]>([]);
  const [jogosFinalizados, setJogosFinalizados] = useState(false);
  const [showDistributeButton, setShowDistributeButton] = useState(true);
  const jogoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentJogoIndex, setCurrentJogoIndex] = useState(jogos.length - 1);

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

    // Atualizar ranking dos jogadores
    const jogadoresAtualizados = [...jogadores].sort((a, b) => {
      if (b.vitorias === a.vitorias) {
        return b.pontos - a.pontos;
      }
      return b.vitorias - a.vitorias;
    });

    setJogadores(jogadoresAtualizados);
  };

  const iniciarProximoJogoHandler = () => {
    iniciarProximoJogo(jogos, setJogos);
    if (jogos.length === 1) {
      setShowDistributeButton(false);  // Esconder o botão "Distribuir Jogadores" após iniciar o jogo 2
    }
  };

  const finalizarJogos = () => {
    const ultimoJogo = jogos[jogos.length - 1];
    const campo1 = ultimoJogo.find(campo => campo.id === 1);
    const campo2 = ultimoJogo.find(campo => campo.id === 2);
    const campo3 = ultimoJogo.find(campo => campo.id === 3);

    if (campo1 && campo2 && campo3) {
      const [time1Campo1, time2Campo1] = campo1.times;
      const [time1Campo2, time2Campo2] = campo2.times;
      const [time1Campo3, time2Campo3] = campo3.times;

      const vencedoresCampo1 = time1Campo1.resultado > time2Campo1.resultado ? time1Campo1.jogadores : time2Campo1.jogadores;
      const vencedoresCampo2 = time1Campo2.resultado > time2Campo2.resultado ? time1Campo2.jogadores : time2Campo2.jogadores;
      const vencedoresCampo3 = time1Campo3.resultado > time2Campo3.resultado ? time1Campo3.jogadores : time2Campo3.jogadores;

      const margemVitoriaCampo1 = Math.abs(time1Campo1.resultado - time2Campo1.resultado);
      const margemVitoriaCampo2 = Math.abs(time1Campo2.resultado - time2Campo2.resultado);
      const margemVitoriaCampo3 = Math.abs(time1Campo3.resultado - time2Campo3.resultado);

      const novosJogadores = [...jogadores];

      const atualizarJogadores = (jogadoresAtualizados: Jogador[], jogadores: Jogador[], vitorias: number, pontos: number) => {
        jogadores.forEach(jogador => {
          const index = jogadoresAtualizados.findIndex(j => j.id === jogador.id);
          if (index !== -1) {
            jogadoresAtualizados[index] = {
              ...jogadoresAtualizados[index],
              vitorias: jogadoresAtualizados[index].vitorias + vitorias,
              pontos: jogadoresAtualizados[index].pontos + pontos,
            };
          }
        });
      };

      atualizarJogadores(novosJogadores, vencedoresCampo1, 1, margemVitoriaCampo1);
      atualizarJogadores(novosJogadores, vencedoresCampo2, 1, margemVitoriaCampo2);
      atualizarJogadores(novosJogadores, vencedoresCampo3, 1, margemVitoriaCampo3);

      setJogadores(novosJogadores);
      setJogosFinalizados(true);  // Esconder o botão após finalizar os jogos
    }
  };

  const getTeamClass = (campo: CampoType, timeIndex: number): string => {
    if (campo.times.length < 2) return '';
    const resultadoAtual = campo.times[timeIndex].resultado;
    const resultadoOponente = campo.times[1 - timeIndex]?.resultado;
    if (resultadoAtual > resultadoOponente) return 'team vencedor';
    if (resultadoAtual < resultadoOponente) return 'team perdedor';
    return 'team';
  };

  const jogadoresClassificados = [...jogadores].sort((a, b) => {
    if (b.vitorias === a.vitorias) {
      return b.pontos - a.pontos;
    }
    return b.vitorias - a.vitorias;
  });

  const scrollToNextJogo = () => {
    if (currentJogoIndex >= 0 && jogoRefs.current[currentJogoIndex]) {
      jogoRefs.current[currentJogoIndex]?.scrollIntoView({ behavior: 'smooth' });
      setCurrentJogoIndex(currentJogoIndex - 1);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentJogoIndex(jogos.length - 1);
    }
  };

  return (
    <div className="calculadora-container">
      <h1>Jogos de Padel</h1>
      <div className="main-content">
        <JogadoresLista jogadores={jogadores} handleNomeChange={handleNomeChange} />
        <div className="fields-container">
          {showDistributeButton && (
            <DistributeButton onClick={distribuirJogadores} />
          )}
          {jogos.map((jogo, jogoIndex) => (
            <div key={jogoIndex} ref={el => (jogoRefs.current[jogoIndex] = el)}>
              <Jogo
                jogo={jogo}
                jogoIndex={jogoIndex}
                handleResultadoChange={handleResultadoChange}
                handleNomeEdit={handleNomeEdit}
                getTeamClass={getTeamClass}
              />
            </div>
          ))}
        </div>
        {jogos.length > 0 && jogos.length < 5 && (
          <button onClick={iniciarProximoJogoHandler} className="distribute-button">Jogo {jogos.length + 1}</button>
        )}
        {jogos.length > 0 && jogos.length === 5 && !jogosFinalizados && (
          <button onClick={finalizarJogos} className="finalizar-button">Finalizar Jogos</button>
        )}
        <ScrollToTopButton onClick={scrollToNextJogo} />
        <Ranking jogadoresClassificados={jogadoresClassificados} />
      </div>
    </div>
  );
};

export default CalculadoraApp;
