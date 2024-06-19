//src/components/components_calculadora/Ranking.tsx

import React from 'react';
import ouro from '../../assets/images/ouro.png';
import prata from '../../assets/images/prata.png';
import bronze from '../../assets/images/bronze.png';
import styles from './Ranking.module.css';
interface Jogador {
  id: number;
  nome: string;
  vitorias: number;
  pontos: number;
  pontosPerdidos: number; // Adicione esta linha
}

interface RankingProps {
  jogadoresClassificados: Jogador[];
}

const Ranking: React.FC<RankingProps> = ({ jogadoresClassificados }) => {
  const top3 = jogadoresClassificados.slice(0, 3);
  const outrosJogadores = jogadoresClassificados.slice(3);

  const medalhas = [ouro, prata, bronze];

  return (
    <div className={styles.rankingContainer}>
      <h2>Ranking dos Jogadores</h2>
      <div className={styles.top3Container}>
        {top3.map((jogador, index) => (
          <div key={jogador.id} className={styles.top3Item}>
            <img src={medalhas[index]} alt={`Medalha de ${index + 1}`} className={styles.medalha} />
            {jogador.nome} - Vitórias: {jogador.vitorias}, Pontos: {jogador.pontos}, Pontos Perdidos: {jogador.pontosPerdidos}
          </div>
        ))}
      </div>
      <ul className={styles.outrosJogadores}>
        {outrosJogadores.map((jogador) => (
          <li key={jogador.id}>
            {jogador.nome} - Vitórias: {jogador.vitorias}, Pontos: {jogador.pontos}, Pontos Perdidos: {jogador.pontosPerdidos}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Ranking;
