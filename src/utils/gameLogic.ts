// src/utils/gameLogic.ts

import { Jogador, Time, Campo as CampoType } from '../utils/types/types';
import { embaralharArray } from './utils'; // Importe a função de embaralhamento do utils.ts

export const criarTimes = (jogadores: Jogador[]): Time[] => {
  const jogadoresEmbaralhados = embaralharArray(jogadores);
  const times: Time[] = [];
  for (let i = 0; i < jogadoresEmbaralhados.length; i += 2) {
    times.push({ jogadores: jogadoresEmbaralhados.slice(i, i + 2), resultado: 0 });
  }
  return times;
};

export const criarCampos = (times: Time[]): CampoType[] => [
  { id: 1, times: times.slice(0, 2) },
  { id: 2, times: times.slice(2, 4) },
  { id: 3, times: times.slice(4, 6) },
];

export const atualizarRanking = (jogadores: Jogador[], jogos: CampoType[][]) => {
  const jogadoresAtualizados = [...jogadores].map(jogador => {
    let vitorias = 0;
    let pontos = 0;
    let pontosPerdidos = 0;
    jogos.forEach(jogo => {
      jogo.forEach(campo => {
        campo.times.forEach(time => {
          if (time.jogadores.some(j => j.id === jogador.id)) {
            pontos += time.resultado;
            const oponente = campo.times[1 - campo.times.indexOf(time)];
            pontosPerdidos += oponente.resultado;
            if (time.resultado > oponente.resultado) {
              vitorias += 1;
            }
          }
        });
      });
    });
    const totalPontos = pontos - pontosPerdidos;
    return { ...jogador, vitorias, pontos, pontosPerdidos, totalPontos };
  });

  return jogadoresAtualizados.sort((a, b) => {
    if (b.totalPontos === a.totalPontos) {
      if (b.vitorias === a.vitorias) {
        return b.pontos - a.pontos;
      }
      return b.vitorias - a.vitorias;
    }
    return b.totalPontos - a.totalPontos; // Maior totalPontos classifica mais alto
  });
};

export const trocarJogadores = (jogos: CampoType[][], campoId: number) => {
  const novosJogos = [...jogos];
  const ultimoJogo = novosJogos[novosJogos.length - 1];
  const campo = ultimoJogo.find(c => c.id === campoId);
  if (!campo) return novosJogos;

  const [time1, time2] = campo.times;
  const jogadoresCampo = [...time1.jogadores, ...time2.jogadores];

  // Embaralhar jogadores que chegaram ao campo
  const jogadoresEmbaralhados = embaralharArray(jogadoresCampo);

  campo.times = [
    { jogadores: jogadoresEmbaralhados.slice(0, 2), resultado: 0 },
    { jogadores: jogadoresEmbaralhados.slice(2, 4), resultado: 0 },
  ];

  return novosJogos;
};

export const iniciarProximoJogo = (jogos: CampoType[][]) => {
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

    // Campo 1: vencedores do campo 1 e vencedores do campo 2
    novosCampos[0].times.push(
      { jogadores: [vencedoresCampo1[0], vencedoresCampo2[0]], resultado: 0 },
      { jogadores: [vencedoresCampo1[1], vencedoresCampo2[1]], resultado: 0 }
    );

    // Campo 2: perdedores do campo 1 e vencedores do campo 3
    novosCampos[1].times.push(
      { jogadores: [perdedoresCampo1[0], vencedoresCampo3[0]], resultado: 0 },
      { jogadores: [perdedoresCampo1[1], vencedoresCampo3[1]], resultado: 0 }
    );

    // Campo 3: perdedores do campo 2 e perdedores do campo 3
    novosCampos[2].times.push(
      { jogadores: [perdedoresCampo2[0], perdedoresCampo3[0]], resultado: 0 },
      { jogadores: [perdedoresCampo2[1], perdedoresCampo3[1]], resultado: 0 }
    );
  }

  return [...jogos, novosCampos];
};
