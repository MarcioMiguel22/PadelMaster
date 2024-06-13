import React, { useState } from 'react';

type Player = {
  id: number;
  name: string;
};

type Team = {
  players: Player[];
};

type Field = {
  id: number;
  teams: Team[];
};

const initialPlayers: Player[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Jogador ${i + 1}`,
}));

const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const createTeams = (players: Player[]): Team[] => {
  const shuffledPlayers = shuffleArray(players);
  const teams: Team[] = [];
  for (let i = 0; i < shuffledPlayers.length; i += 2) {
    teams.push({ players: shuffledPlayers.slice(i, i + 2) });
  }
  return teams;
};

const App: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([
    { id: 1, teams: [] },
    { id: 2, teams: [] },
    { id: 3, teams: [] },
  ]);

  const distributePlayers = () => {
    const teams = createTeams(initialPlayers);
    const newFields: Field[] = fields.map((field, index) => ({
      ...field,
      teams: teams.slice(index * 2, index * 2 + 2),
    }));
    setFields(newFields);
  };

  return (
    <div>
      <h1>Calculadora de Jogos de Padel</h1>
      <button onClick={distributePlayers}>Distribuir Jogadores</button>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {fields.map(field => (
          <div key={field.id}>
            <h2>Campo {field.id}</h2>
            <ul>
              {field.teams.map((team, idx) => (
                <li key={idx}>
                  {team.players.map(player => player.name).join(' e ')}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
