import { Jogador, Campo as CampoType } from '../../../utils/types/types';

export const separarDuplas = (jogadores: Jogador[]): Jogador[] => {
  const separados: Jogador[] = [];
  while (jogadores.length) {
    const [jogador1, jogador2] = jogadores.splice(0, 2);
    separados.push(jogador1);
    if (jogador2) separados.push(jogador2);
  }
  return separados;
};

export const criarNovasDuplas = (vencedores: Jogador[], perdedores: Jogador[]): Jogador[] => {
  const todosJogadores = separarDuplas([...vencedores, ...perdedores]);
  const novasDuplas: Jogador[] = [];

  for (let i = 0; i < todosJogadores.length; i += 2) {
    novasDuplas.push(todosJogadores[i]);
    novasDuplas.push(todosJogadores[i + 1]);
  }

  return novasDuplas;
};

export const iniciarProximoJogo = (jogos: CampoType[][], setJogos: React.Dispatch<React.SetStateAction<CampoType[][]>>) => {
  const ultimoJogo = jogos[jogos.length - 1];
  const novosCampos: CampoType[] = [
    { id: 1, times: [] },
    { id: 2, times: [] },
    { id: 3, times: [] },
  ];

  ultimoJogo.forEach(campo => {
    if (campo.times.length === 2) {
      const [time1, time2] = campo.times;
      const vencedores = time1.resultado > time2.resultado ? time1.jogadores : time2.jogadores;
      const perdedores = time1.resultado > time2.resultado ? time2.jogadores : time1.jogadores;

      const margemVitoria = Math.abs(time1.resultado - time2.resultado);

      vencedores.forEach(jogador => {
        jogador.vitorias += 1;
        jogador.pontos += margemVitoria;
      });

      const jogadoresSeparados = criarNovasDuplas(vencedores, perdedores);

      if (campo.id === 1) {
        novosCampos[0].times.push({ jogadores: [jogadoresSeparados[0], jogadoresSeparados[1]], resultado: 0 });
        novosCampos[1].times.push({ jogadores: [jogadoresSeparados[2], jogadoresSeparados[3]], resultado: 0 });
      } else if (campo.id === 2) {
        novosCampos[0].times.push({ jogadores: [jogadoresSeparados[0], jogadoresSeparados[1]], resultado: 0 });
        novosCampos[2].times.push({ jogadores: [jogadoresSeparados[2], jogadoresSeparados[3]], resultado: 0 });
      } else if (campo.id === 3) {
        novosCampos[1].times.push({ jogadores: [jogadoresSeparados[0], jogadoresSeparados[1]], resultado: 0 });
        novosCampos[2].times.push({ jogadores: [jogadoresSeparados[2], jogadoresSeparados[3]], resultado: 0 });
      }
    }
  });

  setJogos([...jogos, novosCampos]);
};
