// src/utils/playerUtils.ts

import { Jogador } from '../utils/types/types';

export const handleNomeChange = (jogadores: Jogador[], id: number, novoNome: string): Jogador[] => {
  return jogadores.map(jogador =>
    jogador.id === id ? { ...jogador, nome: novoNome } : jogador
  );
};

export const selecionarJogador = (jogadoresSelecionados: Jogador[], jogador: Jogador): Jogador[] => {
  if (jogadoresSelecionados.includes(jogador)) {
    return jogadoresSelecionados.filter(j => j.id !== jogador.id);
  } else {
    if (jogadoresSelecionados.length < 2) {
      return [...jogadoresSelecionados, jogador];
    } else {
      return jogadoresSelecionados;
    }
  }
};
