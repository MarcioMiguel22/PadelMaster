import React from 'react';

interface RankingProps {
  jogadoresClassificados: Jogador[];
}

const Ranking: React.FC<RankingProps> = ({ jogadoresClassificados }) => (
  <div className="ranking-container">
    <h2>Ranking dos Jogadores</h2>
    <ul>
      {jogadoresClassificados.map((jogador) => (
        <li key={jogador.id}>
          {jogador.nome} - Vitórias: {jogador.vitorias}, Pontos: {jogador.pontos}
        </li>
      ))}
    </ul>
  </div>
);

export default Ranking;
