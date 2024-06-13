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
  const copiaArray = [...array];
  for (let i = copiaArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiaArray[i], copiaArray[j]] = [copiaArray[j], copiaArray[i]];
  }
  return copiaArray;
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
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [campos, setCampos] = useState<Campo[]>([
    { id: 1, times: [] },
    { id: 2, times: [] },
    { id: 3, times: [] },
  ]);

  const handleNomeChange = (id: number, novoNome: string) => {
    setJogadores(jogadores.map(jogador =>
      jogador.id === id ? { ...jogador, nome: novoNome } : jogador
    ));
  };

  const distribuirJogadores = () => {
    const times = criarTimes(jogadores);
    const novosCampos: Campo[] = campos.map((campo, index) => ({
      ...campo,
      times: times.slice(index * 2, index * 2 + 2),
    }));
    setCampos(novosCampos);
  };

  return (
    <div className="calculadora-container">
      <h1>Calculadora de Jogos de Padel</h1>
      <div className="jogadores-lista">
        <div className="jogadores-coluna">
          {jogadores.slice(0, 4).map(jogador => (
            <div key={jogador.id} className="jogador-item">
              <label>{`Jogador ${jogador.id}`}</label>
              <input
                type="text"
                value={jogador.nome}
                onChange={(e) => handleNomeChange(jogador.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="jogadores-coluna">
          {jogadores.slice(4, 8).map(jogador => (
            <div key={jogador.id} className="jogador-item">
              <label>{`Jogador ${jogador.id}`}</label>
              <input
                type="text"
                value={jogador.nome}
                onChange={(e) => handleNomeChange(jogador.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="jogadores-coluna">
          {jogadores.slice(8, 12).map(jogador => (
            <div key={jogador.id} className="jogador-item">
              <label>{`Jogador ${jogador.id}`}</label>
              <input
                type="text"
                value={jogador.nome}
                onChange={(e) => handleNomeChange(jogador.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
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
