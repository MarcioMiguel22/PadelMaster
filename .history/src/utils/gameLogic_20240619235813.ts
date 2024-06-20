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
