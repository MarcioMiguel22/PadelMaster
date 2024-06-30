import { Jogador, Time, Campo as CampoType } from '../utils/types/types';

export const embaralharArray6 = <T,>(array: T[]): T[] => {
  const copiaArray = [...array];
  for (let i = copiaArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiaArray[i], copiaArray[j]] = [copiaArray[j], copiaArray[i]];
  }
  return copiaArray;
};

export const criarTimes6 = (jogadores: Jogador[]): Time[] => {
  const jogadoresEmbaralhados = embaralharArray6(jogadores);
  const times: Time[] = [];
  for (let i = 0; i < jogadoresEmbaralhados.length; i += 2) {
    if (i < 4) {
      times.push({ jogadores: jogadoresEmbaralhados.slice(i, i + 2), resultado: 0 });
    }
  }
  return times;
};

export const criarCampos6 = (times: Time[]): CampoType[] => [
  { id: 1, times: times.slice(0, 2) },
];

export const atualizarRanking6 = (jogadores: Jogador[], jogos: CampoType[][]) => {
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
    return b.totalPontos - a.totalPontos;
  });
};

export const todosResultadosInseridos6 = (jogos: CampoType[][]): boolean => {
  return jogos.length > 0 && jogos.every(jogo =>
    jogo.every(campo =>
      campo.times.every(time =>
        typeof time.resultado === 'number'
      )
    )
  );
};

export const trocarJogadores6 = (jogos: CampoType[][], campoId: number): CampoType[][] => {
  return jogos.map(jogo =>
    jogo.map(campo => {
      if (campo.id === campoId) {
        const novosTimes = [...campo.times];
        if (novosTimes.length === 2) {
          const temp = novosTimes[0].jogadores[1];
          novosTimes[0].jogadores[1] = novosTimes[1].jogadores[1];
          novosTimes[1].jogadores[1] = temp;
        }
        return { ...campo, times: novosTimes };
      }
      return campo;
    })
  );
};

export const iniciarProximoJogo6 = (jogos: CampoType[][]): CampoType[][] => {
  const ultimoJogo = jogos[jogos.length - 1];
  const novosCampos = ultimoJogo.map(campo => {
    const novosTimes = campo.times.map(time => ({
      ...time,
      resultado: 0
    }));
    return { ...campo, times: novosTimes };
  });
  return [...jogos, novosCampos];
};
