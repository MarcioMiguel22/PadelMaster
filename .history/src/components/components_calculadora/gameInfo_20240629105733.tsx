import React, { useState } from 'react';
import Selector from './Selector';
import ExportButton from './ExportButton';
import { Jogador, Campo as CampoType } from '../../utils/types/types';

const ParentComponent: React.FC<{ jogadores: Jogador[], jogos: CampoType[][] }> = ({ jogadores, jogos }) => {
  const [gameInfo, setGameInfo] = useState<{ clube: string; local: string; organizador: string; horario: string } | null>(null);

  return (
    <div>
      <Selector onSaveGameInfo={setGameInfo} />
      {gameInfo && <ExportButton jogadores={jogadores} jogos={jogos} gameInfo={gameInfo} />}
    </div>
  );
};

export default ParentComponent;
