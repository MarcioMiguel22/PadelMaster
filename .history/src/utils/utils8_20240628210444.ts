import { Jogador, Time, Campo as CampoType } from '../utils/types/types';

export const embaralharArray = <T,>(array: T[]): T[] => {
  const copiaArray = [...array];
  for (let i = copiaArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiaArray[i], copiaArray[j]] = [copiaArray[j], copiaArray[i]];
  }
  return copiaArray;
};

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
  { id: 3, times: times.slice(4, 6) },
  { id: 4, times: times.slice(6, 8) },
];

export const atualizarRanking8 = (jogadores: Jogador[], jogos: CampoType[][]) => {
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

export const trocarJogadores8 = (jogos: CampoType[][], campoId: number): CampoType[][] => {
  // Adicione sua lógica para trocar jogadores aqui
  return jogos;
};

export const iniciarProximoJogo8 = (jogos: CampoType[][]): CampoType[][] => {
  // Adicione sua lógica para iniciar o próximo jogo aqui
  return jogos;
};

export const todosResultadosInseridos8 = (jogos: CampoType[][]): boolean => {
  return jogos.length > 0 && jogos.every(jogo =>
    jogo.every(campo =>
      campo.times.every(time =>
        typeof time.resultado === 'number'
      )
    )
  );
};
