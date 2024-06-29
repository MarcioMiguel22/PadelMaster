import React, { useState, useEffect, useRef } from 'react';
import './CalculadoraApp4.css';
import JogadoresLista4 from '../../components/components_calculadora/JogadoresLista4';
import Jogo4 from '../../components/components_calculadora/Jogo4';
import Ranking4 from '../../components/components_calculadora/Ranking4';
import ScrollToTopButton4 from '../../components/components_calculadora/ScrollToTopButton4';
import DistributeButton4 from '../../components/components_calculadora/DistributeButton4';
import ExportButton4 from '../../components/components_calculadora/ExportButton4';
import ResetButton4 from '../../components/components_calculadora/ResetButton4';
import NextGameButton4 from '../../components/components_calculadora/NextGameButton4';
import { criarTimes4, criarCampos4, atualizarRanking4, trocarJogadores4, iniciarProximoJogo4 } from '../../utils/utils4';
import { handleNomeChange, selecionarJogador } from '../../utils/playerUtils';
import { todosResultadosInseridos4 } from '../../utils/utils4';
import Titulo from '../../components/components_calculadora/Titulo';
import NavBar from '../../components/components_calculadora/NavBar';
import Background from '../../components/components_calculadora/Background';
import Selector from '../../components/components_calculadora/Selector';
import PlayerSelector from '../../components/components_calculadora/PlayerSelector';
import { Jogador, Time, Campo as CampoType } from '../../utils/types/types'; // Adiciona a importação de Time

const jogadoresIniciais: Jogador[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  nome: `Jogador ${i + 1}`,
  vitorias: 0,
  derrotas: 0,
  pontos: 0,
  pontosPerdidos: 0,
  totalPontos: 0,
}));

const CalculadoraApp4: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [jogos, setJogos] = useState<CampoType[][]>([]);
  const [showDistributeButton, setShowDistributeButton] = useState(true);
  const [jogadoresSelecionados, setJogadoresSelecionados] = useState<Jogador[]>([]);

  const topRef = useRef<HTMLDivElement>(null);
  const resultsRefs = useRef<(HTMLDivElement | null)[]>(new Array(5).fill(null));
  const rankingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const savedJogadores = localStorage.getItem('jogadores4');
    const savedJogos = localStorage.getItem('jogos4');
    if (savedJogadores) {
      setJogadores(JSON.parse(savedJogadores));
    }
    if (savedJogos) {
      setJogos(JSON.parse(savedJogos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jogadores4', JSON.stringify(jogadores));
  }, [jogadores]);

  useEffect(() => {
    localStorage.setItem('jogos4', JSON.stringify(jogos));
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
    setJogadores(atualizarRanking4(jogadores, novosJogos));
  };

  const distribuirJogadores = () => {
    const times = criarTimes4(jogadores);
    const novosCampos = criarCampos4(times);
    const novosJogos = [novosCampos];
    setJogos(novosJogos);
    setJogadores(atualizarRanking4(jogadores, novosJogos));
  };

  const handleTrocarJogadores = (campoId: number) => {
    const novosJogos = trocarJogadores4(jogos, campoId);
    setJogos(novosJogos);
  };

  const iniciarProximoJogoHandler = () => {
    const novosJogos = iniciarProximoJogo4(jogos);
    setJogos(novosJogos);
    setJogadores(atualizarRanking4(jogadores, novosJogos));

    if (jogos.length === 1) {
      setShowDistributeButton(false);
    }
  };

  const resetGame = () => {
    setJogadores(jogadoresIniciais);
    setJogos([]);
    setShowDistributeButton(true);
    setJogadoresSelecionados([]);
    localStorage.removeItem('jogadores4');
    localStorage.removeItem('jogos4');
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

  const resultadosInseridos = todosResultadosInseridos4(jogos);

  const jogadoresClassificados = atualizarRanking4(jogadores, jogos);

  return (
    <div className="calculadora-container" ref={topRef}>
      <Background />
      <NavBar items={['Home', 'Jogadores', 'Resultados', 'Ranking', 'Sobre']} />
      <Titulo texto="Sobe & Desce" />
      <div className="main-content">
        <div className="selectors-container">
          <Selector />
          <PlayerSelector />
        </div>
        <JogadoresLista4 jogadores={jogadores} handleNomeChange={handleNomeChangeHandler} />
        <div className="fields-container">
          {showDistributeButton && <DistributeButton4 onClick={distribuirJogadores} />}
          {jogos.map((jogo, jogoIndex) => (
            <div ref={(el) => resultsRefs.current[jogoIndex] = el} key={jogoIndex}>
              <Jogo4
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
            <NextGameButton4 jogoIndex={jogos.length} onClick={iniciarProximoJogoHandler} />
          )}
        </div>
        <div id="ranking-resultados" ref={rankingRef}>
          <div className="export-button-container">
            {resultadosInseridos && (
              <>
                <ResetButton4 onReset={resetGame} />
                <ExportButton4 jogadores={jogadoresClassificados} jogos={jogos} />
              </>
            )}
          </div>
          <Ranking4 jogadoresClassificados={jogadoresClassificados} />
          <div className="export-button-container">
            {resultadosInseridos && (
              <>
                <ResetButton4 onReset={resetGame} />
                <ExportButton4 jogadores={jogadoresClassificados} jogos={jogos} />
              </>
            )}
          </div>
        </div>
        <ScrollToTopButton4
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

export default CalculadoraApp4;
