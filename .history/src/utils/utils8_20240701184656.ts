// src/utils/utils8.ts

import { Campo as CampoType, Jogador, Time } from './types/types';


export const criarTimes8 = (jogadores: Jogador[]): Time[] => {
  const jogadoresEmbaralhados = embaralharArray(jogadores);
  const times: Time[] = [];
  for (let i = 0; i < jogadoresEmbaralhados.length; i += 2) {
    times.push({ jogadores: jogadoresEmbaralhados.slice(i, i + 2), resultado: 0 });
  }
  return times;
};

export const criarCampos8 = (times: Time[]): CampoType[] => [
  { id: 1, times: times.slice(0, 2) },
  { id: 2, times: times.slice(2, 4) },
];

export const atualizarRanking8 = (jogadores: Jogador[], jogos: CampoType[][]): Jogador[] => {
  const jogadoresAtualizados = jogadores.map(jogador => ({ ...jogador, vitorias: 0, derrotas: 0, pontos: 0, pontosPerdidos: 0, totalPontos: 0 }));

  jogos.forEach(jogo => {
    jogo.forEach(campo => {
      campo.times.forEach((time, timeIndex) => {
        time.jogadores.forEach(jogador => {
          const jogadorIndex = jogadoresAtualizados.findIndex(j => j.id === jogador.id);
          if (jogadorIndex >= 0) {
            jogadoresAtualizados[jogadorIndex].pontos += time.resultado;
            jogadoresAtualizados[jogadorIndex].pontosPerdidos += campo.times[1 - timeIndex]?.resultado || 0;
            jogadoresAtualizados[jogadorIndex].totalPontos += time.resultado - (campo.times[1 - timeIndex]?.resultado || 0);
            if (time.resultado > (campo.times[1 - timeIndex]?.resultado || 0)) {
              jogadoresAtualizados[jogadorIndex].vitorias += 1;
            } else {
              jogadoresAtualizados[jogadorIndex].derrotas += 1;
            }
          }
        });
      });
    });
  });

  return jogadoresAtualizados.sort((a, b) => b.totalPontos - a.totalPontos);
};

export const iniciarProximoJogo8 = (jogos: CampoType[][]): CampoType[][] => {
  const ultimoJogo = jogos[jogos.length - 1];
  const novosCampos: CampoType[] = [
    { id: 1, times: [] },
    { id: 2, times: [] },
  ];

  const campo1 = ultimoJogo.find(campo => campo.id === 1);
  const campo2 = ultimoJogo.find(campo => campo.id === 2);

  if (campo1 && campo2) {
    const [time1Campo1, time2Campo1] = campo1.times;
    const [time1Campo2, time2Campo2] = campo2.times;

    const vencedoresCampo1 = time1Campo1.resultado > time2Campo1.resultado ? time1Campo1.jogadores : time2Campo1.jogadores;
    const perdedoresCampo1 = time1Campo1.resultado > time2Campo1.resultado ? time2Campo1.jogadores : time1Campo1.jogadores;

    const vencedoresCampo2 = time1Campo2.resultado > time2Campo2.resultado ? time1Campo2.jogadores : time2Campo2.jogadores;
    const perdedoresCampo2 = time1Campo2.resultado > time2Campo2.resultado ? time2Campo2.jogadores : time1Campo2.jogadores;

    // Campo 1: vencedores do campo 1 e vencedores do campo 2
    novosCampos[0].times.push(
      { jogadores: [vencedoresCampo1[0], vencedoresCampo2[0]], resultado: 0 },
      { jogadores: [vencedoresCampo1[1], vencedoresCampo2[1]], resultado: 0 }
    );

    // Campo 2: perdedores do campo 1 e perdedores do campo 2
    novosCampos[1].times.push(
      { jogadores: [perdedoresCampo1[0], perdedoresCampo2[0]], resultado: 0 },
      { jogadores: [perdedoresCampo1[1], perdedoresCampo2[1]], resultado: 0 }
    );
  }

  return [...jogos, novosCampos];
};

export const todosResultadosInseridos8 = (jogos: CampoType[][]): boolean => {
  return jogos.every(jogo =>
    jogo.every(campo =>
      campo.times.every(time =>
        time.resultado !== undefined
      )
    )
  );
};

const embaralharArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const trocarJogadores8 = (jogos: CampoType[][]): CampoType[][] => {
  // Implementar lógica para trocar jogadores
  // Aqui está uma implementação básica de troca de jogadores
  return jogos.map(jogo => {
    return jogo.map(campo => {
      const novosTimes = campo.times.map(time => {
        const jogadoresEmbaralhados = embaralharArray(time.jogadores);
        return { ...time, jogadores: jogadoresEmbaralhados };
      });
      return { ...campo, times: novosTimes };
    });
  });
};
