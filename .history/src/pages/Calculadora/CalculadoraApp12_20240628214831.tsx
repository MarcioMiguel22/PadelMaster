import React, { useState, useEffect, useRef } from 'react';
import './CalculadoraApp12.css';
import JogadoresLista from '../../components/components_calculadora/JogadoresLista';
import Jogo from '../../components/components_calculadora/Jogo';
import Ranking from '../../components/components_calculadora/Ranking';
import { Jogador, Campo as CampoType } from '../../utils/types/types';
import ScrollToTopButton from '../../components/components_calculadora/ScrollToTopButton';
import DistributeButton from '../../components/components_calculadora/DistributeButton';
import ExportButton from '../../components/components_calculadora/ExportButton';
import ResetButton from '../../components/components_calculadora/ResetButton';
import { criarTimes, criarCampos, atualizarRanking, trocarJogadores, iniciarProximoJogo } from '../../utils/gameLogic';
import { handleNomeChange, selecionarJogador } from '../../utils/playerUtils';
import { todosResultadosInseridos } from '../../utils/resultUtils';
import Titulo from '../../components/components_calculadora/Titulo';
import NextGameButton from '../../components/components_calculadora/NextGameButton';
import NavBar from '../../components/components_calculadora/NavBar';
import Background from '../../components/components_calculadora/Background';
import Selector from '../../components/components_calculadora/Selector';
import PlayerSelector from '../../components/components_calculadora/PlayerSelector12';



const jogadoresIniciais: Jogador[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nome: `Jogador ${i + 1}`,
  vitorias: 0,
  derrotas: 0,
  pontos: 0,
  pontosPerdidos: 0,
  totalPontos: 0,
}));

const CalculadoraApp: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [jogos, setJogos] = useState<CampoType[][]>([]);
  const [showDistributeButton, setShowDistributeButton] = useState(true);
  const [jogadoresSelecionados, setJogadoresSelecionados] = useState<Jogador[]>([]);

  const topRef = useRef<HTMLDivElement>(null);
  const resultsRefs = useRef<(HTMLDivElement | null)[]>(new Array(5).fill(null));
  const rankingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Rola para o topo quando o componente é montado

    const savedJogadores = localStorage.getItem('jogadores');
    const savedJogos = localStorage.getItem('jogos');
    if (savedJogadores) {
      setJogadores(JSON.parse(savedJogadores));
    }
    if (savedJogos) {
      setJogos(JSON.parse(savedJogos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jogadores', JSON.stringify(jogadores));
  }, [jogadores]);

  useEffect(() => {
    localStorage.setItem('jogos', JSON.stringify(jogos));
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

  const handleTrocarJogadores = (campoId: number) => {
    const novosJogos = trocarJogadores(jogos, campoId);
    setJogos(novosJogos);
  };

  const iniciarProximoJogoHandler = () => {
    const novosJogos = iniciarProximoJogo(jogos);
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
    localStorage.removeItem('jogadores');
    localStorage.removeItem('jogos');
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

  const resultadosInseridos = todosResultadosInseridos(jogos);

  const jogadoresClassificados = atualizarRanking(jogadores, jogos);

  return (
    <div className="calculadora-container" ref={topRef}>
      <Background />
      <NavBar items={['Home', 'Jogadores', 'Resultados', 'Ranking', 'Sobre']} /> {/* Adicionando o NavBar aqui */}
      <Titulo texto="Sobe & Desce" />
      <div className="main-content">

      <div className="selectors-container">
          <Selector /> {/* Adicionando o Selector aqui */}
          <PlayerSelector /> {/* Adicionando o PlayerSelector aqui */}
        </div>
        <JogadoresLista jogadores={jogadores} handleNomeChange={handleNomeChangeHandler} />
        <div className="fields-container">
          {showDistributeButton && <DistributeButton onClick={distribuirJogadores} />}
          {jogos.map((jogo, jogoIndex) => (
            <div ref={(el) => resultsRefs.current[jogoIndex] = el} key={jogoIndex}>
              <Jogo
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
            <NextGameButton jogoIndex={jogos.length} onClick={iniciarProximoJogoHandler} />
          )}
        </div>
        <div id="ranking-resultados" ref={rankingRef}>
          <div className="export-button-container">
            {resultadosInseridos && (
              <>
                <ResetButton onReset={resetGame} />
                <ExportButton jogadores={jogadoresClassificados} jogos={jogos} />
              </>
            )}
          </div>
          <Ranking jogadoresClassificados={jogadoresClassificados} />
          <div className="export-button-container">
            {resultadosInseridos && (
              <>
                <ResetButton onReset={resetGame} />
                <ExportButton jogadores={jogadoresClassificados} jogos={jogos} />
              </>
            )}
          </div>
        </div>
        <ScrollToTopButton
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

export default CalculadoraApp;
