import React, { useState, useEffect } from 'react';
import './CalculadoraApp6.css';
import JogadoresLista6 from '../../components/components_calculadora/JogadoresLista6';
import Jogo6 from '../../components/components_calculadora/Jogo6';
import Ranking6 from '../../components/components_calculadora/Ranking6';
import ScrollToTopButton6 from '../../components/components_calculadora/ScrollToTopButton6';
import DistributeButton6 from '../../components/components_calculadora/DistributeButton6';
import ExportButton6 from '../../components/components_calculadora/ExportButton6';
import ResetButton6 from '../../components/components_calculadora/ResetButton6';
import NextGameButton6 from '../../components/components_calculadora/NextGameButton6';
import { criarTimes6, criarCampos6, atualizarRanking6, trocarJogadores6, iniciarProximoJogo6, todosResultadosInseridos6 } from '../../utils/utils6';
import { handleNomeChange, selecionarJogador } from '../../utils/playerUtils';
import Titulo from '../../components/components_calculadora/Titulo';
import NavBar from '../../components/components_calculadora/NavBar';
import Background from '../../components/components_calculadora/Background';
import Selector from '../../components/components_calculadora/Selector';
import PlayerSelector from '../../components/components_calculadora/PlayerSelector';
import { Jogador, Campo as CampoType } from '../../utils/types/types';

const jogadoresIniciais: Jogador[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  nome: `Jogador ${i + 1}`,
  vitorias: 0,
  derrotas: 0,
  pontos: 0,
  pontosPerdidos: 0,
  totalPontos: 0,
}));

const CalculadoraApp6: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [jogos, setJogos] = useState<CampoType[][]>([]);
  const [showDistributeButton, setShowDistributeButton] = useState(true);
  const [jogadoresEsperando, setJogadoresEsperando] = useState<Jogador[]>(jogadoresIniciais.slice(4));
  const [jogadoresSelecionados, setJogadoresSelecionados] = useState<Jogador[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const savedJogadores = localStorage.getItem('jogadores6');
    const savedJogos = localStorage.getItem('jogos6');
    if (savedJogadores) {
      setJogadores(JSON.parse(savedJogadores));
    }
    if (savedJogos) {
      setJogos(JSON.parse(savedJogos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jogadores6', JSON.stringify(jogadores));
  }, [jogadores]);

  useEffect(() => {
    localStorage.setItem('jogos6', JSON.stringify(jogos));
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
    setJogadores(atualizarRanking6(jogadores, novosJogos));
  };

  const distribuirJogadores = () => {
    const times = criarTimes6(jogadores);
    const novosCampos = criarCampos6(times, jogadores.slice(4));
    const novosJogos = [novosCampos];
    setJogos(novosJogos);
    setJogadoresEsperando(jogadores.slice(4));
    setJogadores(atualizarRanking6(jogadores, novosJogos));
  };

  const handleTrocarJogadores = (campoId: number) => {
    const novosJogos = trocarJogadores6(jogos, campoId);
    setJogos(novosJogos);
    const novosJogadoresEsperando = novosJogos[novosJogos.length - 1].find(campo => campo.id === campoId)?.jogadoresEsperando || [];
    setJogadoresEsperando(novosJogadoresEsperando);
  };

  const iniciarProximoJogoHandler = () => {
    const novosJogos = iniciarProximoJogo6(jogos);
    setJogos(novosJogos);
    setJogadores(atualizarRanking6(jogadores, novosJogos));
    setJogadoresEsperando(novosJogos[novosJogos.length - 1][0].jogadoresEsperando || []);

    if (jogos.length === 1) {
      setShowDistributeButton(false);
    }
  };

  const resetGame = () => {
    setJogadores(jogadoresIniciais);
    setJogos([]);
    setShowDistributeButton(true);
    setJogadoresEsperando(jogadoresIniciais.slice(4));
    setJogadoresSelecionados([]);
    localStorage.removeItem('jogadores6');
    localStorage.removeItem('jogos6');
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

  const resultadosInseridos = todosResultadosInseridos6(jogos);

  const jogadoresClassificados = atualizarRanking6(jogadores, jogos);

  return (
    <div className="calculadora-container">
      <Background />
      <NavBar items={['Home', 'Jogadores', 'Resultados', 'Ranking', 'Sobre']} />
      <Titulo texto="Sobe & Desce" />
      <div className="main-content">
        <div className="selectors-container">

          <PlayerSelector />
        </div>
        <JogadoresLista6 jogadores={jogadores} handleNomeChange={handleNomeChangeHandler} />
        <div className="fields-container">
          {showDistributeButton && <DistributeButton6 onClick={distribuirJogadores} />}
          {jogos.map((jogo, jogoIndex) => (
            <div key={jogoIndex}>
              <Jogo6
                jogo={jogo}
                jogoIndex={jogoIndex}
                handleResultadoChange={handleResultadoChange}
                getTeamClass={getTeamClass}
                selecionarJogador={handleSelecionarJogador}
                jogadoresSelecionados={jogadoresSelecionados}
                trocarJogadores={handleTrocarJogadores}
                jogadoresEsperando={jogadoresEsperando}
              />
            </div>
          ))}
          {jogos.length > 0 && jogos.length < 5 && (
            <NextGameButton6 jogoIndex={jogos.length} onClick={iniciarProximoJogoHandler} />
          )}
        </div>
        <div id="ranking-resultados">
          <div className="export-button-container">
            {resultadosInseridos && (
              <>
                <ResetButton6 onReset={resetGame} />
                <ExportButton6 jogadores={jogadoresClassificados} jogos={jogos} />
              </>
            )}
          </div>
          <Ranking6 jogadoresClassificados={jogadoresClassificados} />
          <div className="export-button-container">
            {resultadosInseridos && (
              <>
                <ResetButton6 onReset={resetGame} />
                <ExportButton6 jogadores={jogadoresClassificados} jogos={jogos} />
              </>
            )}
          </div>
        </div>
        <ScrollToTopButton6 refs={[]} />
      </div>
    </div>
  );
};

export default CalculadoraApp6;
