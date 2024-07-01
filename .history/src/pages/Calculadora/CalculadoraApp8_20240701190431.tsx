import React, { useState, useEffect, useRef } from 'react';
import './CalculadoraApp8.css';
import JogadoresLista8 from '../../components/components_calculadora/JogadoresLista8';
import Jogo8 from '../../components/components_calculadora/Jogo8';
import Ranking8 from '../../components/components_calculadora/Ranking8';
import ScrollToTopButton8 from '../../components/components_calculadora/ScrollToTopButton8';
import DistributeButton8 from '../../components/components_calculadora/DistributeButton8';
import ExportButton8 from '../../components/components_calculadora/ExportButton8';
import ResetButton8 from '../../components/components_calculadora/ResetButton8';
import NextGameButton8 from '../../components/components_calculadora/NextGameButton8';
import { criarTimes8, criarCampos8, atualizarRanking8, trocarJogadores8, iniciarProximoJogo8, todosResultadosInseridos8 } from '../../utils/utils8';
import { handleNomeChange, selecionarJogador } from '../../utils/playerUtils';
import Titulo from '../../components/components_calculadora/Titulo';
import NavBar from '../../components/components_calculadora/NavBar';
import Background from '../../components/components_calculadora/Background';

import PlayerSelector from '../../components/components_calculadora/PlayerSelector';
import { Jogador, Campo as CampoType, Time } from '../../utils/types/types';

const jogadoresIniciais: Jogador[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  nome: `Jogador ${i + 1}`,
  vitorias: 0,
  derrotas: 0,
  pontos: 0,
  pontosPerdidos: 0,
  totalPontos: 0,
}));

const CalculadoraApp8: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [jogos, setJogos] = useState<CampoType[][]>([]);
  const [showDistributeButton, setShowDistributeButton] = useState(true);
  const [jogadoresSelecionados, setJogadoresSelecionados] = useState<Jogador[]>([]);

  const topRef = useRef<HTMLDivElement>(null);
  const resultsRefs = useRef<(HTMLDivElement | null)[]>(new Array(5).fill(null));
  const rankingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const savedJogadores = localStorage.getItem('jogadores8');
    const savedJogos = localStorage.getItem('jogos8');
    if (savedJogadores) {
      setJogadores(JSON.parse(savedJogadores));
    }
    if (savedJogos) {
      setJogos(JSON.parse(savedJogos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jogadores8', JSON.stringify(jogadores));
  }, [jogadores]);

  useEffect(() => {
    localStorage.setItem('jogos8', JSON.stringify(jogos));
  }, [jogos]);

  const handleNomeChangeHandler = (id: number, novoNome: string) => {
    const jogadoresAtualizados = handleNomeChange(jogadores, id, novoNome);
    setJogadores(jogadoresAtualizados);
  };

  const handleResultadoChange = (jogoIndex: number, campoId: number, timeIndex: number, novoResultado: number) => {
    const novosJogos = jogos.map((jogo, idx) =>
      idx === jogoIndex
        ? jogo.map(campo =>
            campo.id === campoId
              ? {
                  ...campo,
                  times: campo.times.map((time: Time, index: number) =>
                    index === timeIndex ? { ...time, resultado: novoResultado } : time
                  ),
                }
              : campo
          )
        : jogo
    );
    setJogos(novosJogos);
    setJogadores(atualizarRanking8(jogadores, novosJogos));
  };

  const distribuirJogadores = () => {
    const times = criarTimes8(jogadores);
    const novosCampos = criarCampos8(times);
    const novosJogos = [novosCampos];
    setJogos(novosJogos);
    setJogadores(atualizarRanking8(jogadores, novosJogos));
  };

  const handleTrocarJogadores = () => {
    const novosJogos = trocarJogadores8(jogos);
    setJogos(novosJogos);
  };

  const iniciarProximoJogoHandler = () => {
    const novosJogos = iniciarProximoJogo8(jogos);
    setJogos(novosJogos);
    setJogadores(atualizarRanking8(jogadores, novosJogos));

    if (novosJogos.length > 1) {
      setShowDistributeButton(false);
    }
  };

  const resetGame = () => {
    setJogadores(jogadoresIniciais);
    setJogos([]);
    setShowDistributeButton(true);
    setJogadoresSelecionados([]);
    localStorage.removeItem('jogadores8');
    localStorage.removeItem('jogos8');
  };

  const getTeamClass = (campo: CampoType, timeIndex: number): string => {
    if (campo.times.length < 2) return '';
    const resultadoAtual = campo.times[timeIndex].resultado;
    const resultadoOponente = campo.times[1 - timeIndex]?.resultado;
    if (resultadoAtual > resultadoOponente) return 'team vencedor';
    if (resultadoAtual < resultadoOponente) return 'team perdedor';
    return 'team';
  };

  const handleSelecionarJogador = (jogador: Jogador) => {
    const jogadoresAtualizados = selecionarJogador(jogadoresSelecionados, jogador);
    setJogadoresSelecionados(jogadoresAtualizados);
  };

  const resultadosInseridos = todosResultadosInseridos8(jogos);

  const jogadoresClassificados = atualizarRanking8(jogadores, jogos);

  return (
    <div className="calculadora-container" ref={topRef}>
      <Background />
      <NavBar items={['Home', 'Jogadores', 'Resultados', 'Ranking', 'Sobre']} />
      <Titulo texto="Sobe & Desce" />
      <div className="main-content">
        <div className="selectors-container">
          <PlayerSelector />
        </div>
        <JogadoresLista8 jogadores={jogadores} handleNomeChange={handleNomeChangeHandler} />
        <div className="fields-container">
          {showDistributeButton && <DistributeButton8 onClick={distribuirJogadores} />}
          {jogos.map((jogo, jogoIndex) => (
            <div ref={(el) => resultsRefs.current[jogoIndex] = el} key={jogoIndex}>
              <Jogo8
                jogo={jogo}
                jogoIndex={jogoIndex}
                handleResultadoChange={handleResultadoChange}
                getTeamClass={getTeamClass}
                selecionarJogador={handleSelecionarJogador}
                jogadoresSelecionados={jogadoresSelecionados}
                trocarJogadores={handleTrocarJogadores}
              />
            </div>
          ))}
          {jogos.length > 0 && jogos.length < 5 && (
            <NextGameButton8 jogoIndex={jogos.length} onClick={iniciarProximoJogoHandler} />
          )}
        </div>
        <div id="ranking-resultados" ref={rankingRef}>
          <div className="export-button-container">
            {resultadosInseridos && (
              <>
                <ResetButton8 onReset={resetGame} />
                <ExportButton8 jogadores={jogadoresClassificados} jogos={jogos} />
              </>
            )}
          </div>
          <Ranking8 jogadoresClassificados={jogadoresClassificados} />
          <div className="export-button-container">
            {resultadosInseridos && (
              <>
                <ResetButton8 onReset={resetGame} />
                <ExportButton8 jogadores={jogadoresClassificados} jogos={jogos} />
              </>
            )}
          </div>
        </div>
        <ScrollToTopButton8
          refs={[
            topRef,
            ...resultsRefs.current.filter(ref => ref !== null),
            rankingRef,
          ]}
        />
      </div>
    </div>
  );
};

export default CalculadoraApp8;
