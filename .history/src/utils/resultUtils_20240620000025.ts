// src/utils/resultUtils.ts

import { Campo as CampoType } from '../utils/types/types';

export const todosResultadosInseridos = (jogos: CampoType[][]): boolean => {
  return jogos.length > 0 && jogos.every(jogo =>
    jogo.every(campo =>
      campo.times.every(time =>
        typeof time.resultado === 'number'
      )
    )
  );
};
