import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
  const [showDistributeButton, setShowDistributeButton] = useState(true);

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

  const trocarJogadores = (campoId: number) => {
    const novosCampos = [...jogos[jogos.length - 1]];

    const jogadoresDisponiveis = jogadores.filter(jogador => {
      return !novosCampos.some(campo =>
        campo.times.some(time =>
          time.jogadores.some(j => j.id === jogador.id)
        )
      );
    });

    const jogadoresEmbaralhados = embaralharArray(jogadoresDisponiveis);
    const novoTime1 = jogadoresEmbaralhados.slice(0, 2);
    const novoTime2 = jogadoresEmbaralhados.slice(2, 4);

    const campoIndex = novosCampos.findIndex(campo => campo.id === campoId);
    if (campoIndex !== -1) {
      novosCampos[campoIndex].times = [
        { jogadores: novoTime1, resultado: 0 },
        { jogadores: novoTime2, resultado: 0 }
      ];
      setJogos([...jogos.slice(0, -1), novosCampos]);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    // Adicionar Ranking
    doc.setFontSize(18);
    doc.text('Ranking dos Jogadores', 20, 20);
    const rankingData = jogadoresClassificados.map((jogador, index) => [
      index + 1,
      jogador.nome,
      jogador.vitorias,
      jogador.pontos,
    ]);
    doc.autoTable({
      head: [['Posição', 'Nome', 'Vitórias', 'Pontos']],
      body: rankingData,
      startY: 30,
    });

    // Adicionar Resultados dos Jogos
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Resultados dos Jogos', 20, 20);
    let startY = 30;
    jogos.forEach((jogo, jogoIndex) => {
      doc.setFontSize(14);
      doc.text(`Jogo ${jogoIndex + 1}`, 20, startY);
      jogo.forEach((campo) => {
        const campoData = campo.times.map((time, timeIndex) => [
          `Time ${timeIndex + 1}`,
          time.jogadores.map(jogador => jogador.nome).join(', '),
          time.resultado,
        ]);
        doc.autoTable({
          head: [['Time', 'Jogadores', 'Resultado']],
          body: campoData,
          startY: startY + 10,
        });
        startY += 10 + (campo.times.length * 10); // Update startY based on content
      });
      doc.addPage();
      startY = 30;
    });

    // Salvar PDF
    doc.save('resultados.pdf');
  };

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
              handleNomeEdit={handleNomeEdit}
              getTeamClass={getTeamClass}
              trocarJogadores={trocarJogadores}
            />
          ))}
          {jogos.length > 0 && jogos.length < 5 && (
            <button onClick={iniciarProximoJogoHandler} className="distribute-button">Jogo {jogos.length + 1}</button>
          )}
          {jogos.length > 0 && (
            <button onClick={exportPDF} className="export-button">Exportar Resultados em PDF</button>
          )}
        </div>
        <ScrollToTopButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <Ranking jogadoresClassificados={jogadoresClassificados} />
      </div>
    </div>
  );
};

export default CalculadoraApp;
