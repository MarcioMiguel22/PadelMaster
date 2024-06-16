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

export const iniciarProximoJogo = (jogos: CampoType[][], setJogos: React.Dispatch<React.SetStateAction<CampoType[][]>>) => {
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

    // Vencedores e perdedores dos campos
    const vencedoresCampo1 = time1Campo1.resultado > time2Campo1.resultado ? time1Campo1.jogadores : time2Campo1.jogadores;
    const vencedoresCampo2 = time1Campo2.resultado > time2Campo2.resultado ? time1Campo2.jogadores : time2Campo2.jogadores;
    const perdedoresCampo2 = time1Campo2.resultado > time2Campo2.resultado ? time2Campo2.jogadores : time1Campo2.jogadores;
    const perdedoresCampo3 = time1Campo3.resultado > time2Campo3.resultado ? time2Campo3.jogadores : time1Campo3.jogadores;

    // Atualizar pontuação dos jogadores
    const margemVitoriaCampo1 = Math.abs(time1Campo1.resultado - time2Campo1.resultado);
    const margemVitoriaCampo2 = Math.abs(time1Campo2.resultado - time2Campo2.resultado);
    const margemVitoriaCampo3 = Math.abs(time1Campo3.resultado - time2Campo3.resultado);

    vencedoresCampo1.forEach(jogador => {
      jogador.vitorias += 1;
      jogador.pontos += margemVitoriaCampo1;
    });

    vencedoresCampo2.forEach(jogador => {
      jogador.vitorias += 1;
      jogador.pontos += margemVitoriaCampo2;
    });

    perdedoresCampo3.forEach(jogador => {
      jogador.vitorias += 1;
      jogador.pontos += margemVitoriaCampo3;
    });

    // Campo 1: vencedores do campo 1 e vencedores do campo 2
    novosCampos[0].times.push(
      { jogadores: [vencedoresCampo1[0], vencedoresCampo2[0]], resultado: 0 },
      { jogadores: [vencedoresCampo1[1], vencedoresCampo2[1]], resultado: 0 }
    );

    // Campo 2: vencedores do campo 2 e perdedores do campo 2
    novosCampos[1].times.push(
      { jogadores: [vencedoresCampo2[0], perdedoresCampo2[0]], resultado: 0 },
      { jogadores: [vencedoresCampo2[1], perdedoresCampo2[1]], resultado: 0 }
    );

    // Campo 3: perdedores do campo 3 e perdedores do campo 2
    novosCampos[2].times.push(
      { jogadores: [perdedoresCampo3[0], perdedoresCampo2[0]], resultado: 0 },
      { jogadores: [perdedoresCampo3[1], perdedoresCampo2[1]], resultado: 0 }
    );
  }

  setJogos([...jogos, novosCampos]);
};
