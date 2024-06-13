import React, { useState } from 'react';
import './Calculadora.css';

type Jogador = {
  id: number;
  nome: string;
};

type Time = {
  jogadores: Jogador[];
};

type Campo = {
  id: number;
  times: Time[];
};

const jogadoresIniciais: Jogador[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nome: `Jogador ${i + 1}`,
}));

const embaralharArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const criarTimes = (jogadores: Jogador[]): Time[] => {
  const jogadoresEmbaralhados = embaralharArray(jogadores);
  const times: Time[] = [];
  for (let i = 0; i < jogadoresEmbaralhados.length; i += 2) {
    times.push({ jogadores: jogadoresEmbaralhados.slice(i, i + 2) });
  }
  return times;
};

const CalculadoraApp: React.FC = () => {
  const [campos, setCampos] = useState<Campo[]>([
    { id: 1, times: [] },
    { id: 2, times: [] },
    { id: 3, times: [] },
  ]);

  const distribuirJogadores = () => {
    const times = criarTimes(jogadoresIniciais);
    const novosCampos: Campo[] = campos.map((campo, index) => ({
      ...campo,
      times: times.slice(index * 2, index * 2 + 2),
    }));
    setCampos(novosCampos);
  };

  return (
    <div className="calculadora-container">
      <h1> Mix e Tapas</h1>
      <button onClick={distribuirJogadores} className="distribute-button">Distribuir Jogadores</button>
      <div className="fields-container">
        {campos.map(campo => (
          <div key={campo.id} className="field">
            <h2>Campo {campo.id}</h2>
            <ul>
              {campo.times.map((time, idx) => (
                <li key={idx} className="team">
                  {time.jogadores.map(jogador => jogador.nome).join(' e ')}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculadoraApp;
