// types.ts
export interface Jogador {
  id: number;
  nome: string;
  vitorias: number;
  pontos: number;
}

export interface Time {
  jogadores: Jogador[];
  resultado: number;
}

export interface Campo {
  id: number;
  times: Time[];
}
