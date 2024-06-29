import { Jogador, Time, Campo as CampoType } from './types/types';

export const criarTimes8 = (jogadores: Jogador[]): Time[] => {
  const jogadoresEmbaralhados = embaralharArray(jogadores);
  const times: Time[] = [];
  for (let i = 0; i < jogadoresEmbaralhados.length; i += 2) {
    times.push({ jogadores: jogadoresEmbaralhados.slice(i, i + 2), resultado: 0 });
  }
  return times;
};

export const criarCampos8 = (times: Time[]): CampoType[] => {
  const campos: CampoType[] = [];
  for (let i = 0; i < times.length; i += 2) {
    campos.push({ id: i / 2, times: times.slice(i, i + 2) });
  }
  return campos;
};

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

export const trocarJogadores8 = (jogos: CampoType[][]): CampoType[][] => {
  return jogos;
};

export const iniciarProximoJogo8 = (jogos: CampoType[][]): CampoType[][] => {
  return jogos;
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
