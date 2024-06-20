// src/utils/stateManagement.ts

import { useState, useEffect } from 'react';
import { Jogador, Campo as CampoType } from './types/types';
import { criarTimes, criarCampos, atualizarRanking, iniciarProximoJogo, trocarJogadores } from './gameLogic';

const jogadoresIniciais: Jogador[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nome: `Jogador ${i + 1}`,
  vitorias: 0,
  pontos: 0,
  pontosPerdidos: 0,
  totalPontos: 0,
}));

export const usePadelGame = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>(jogadoresIniciais);
  const [jogos, setJogos] = useState<CampoType[][]>([]);
  const [showDistributeButton, setShowDistributeButton] = useState(true);
  const [jogadoresSelecionados, setJogadoresSelecionados] = useState<Jogador[]>([]);

  useEffect(() => {
    const savedJogadores = localStorage.getItem('jogadores');
    const savedJogos = localStorage.getItem('jogos');
    if (savedJogadores) {
      setJogadores(JSON.parse(savedJogadores));
    }
    if (savedJogos) {
      setJogos(JSON.parse(savedJogos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jogadores', JSON.stringify(jogadores));
  }, [jogadores]);

  useEffect(() => {
    localStorage.setItem('jogos', JSON.stringify(jogos));
  }, [jogos]);

  const distribuirJogadores = () => {
    const times = criarTimes(jogadores);
    const novosCampos = criarCampos(times);
    const novosJogos = [novosCampos];
    setJogos(novosJogos);
    setJogadores(atualizarRanking(jogadores, novosJogos));
  };

  const handleTrocarJogadores = (campoId: number) => {
    const novosJogos = trocarJogadores(jogos, campoId);
    setJogos(novosJogos);
  };

  const iniciarProximoJogoHandler = () => {
    const novosJogos = iniciarProximoJogo(jogos);
    setJogos(novosJogos);
    setJogadores(atualizarRanking(jogadores, novosJogos));

    if (jogos.length === 1) {
      setShowDistributeButton(false);
    }
  };

  const resetGame = () => {
    setJogadores(jogadoresIniciais);
    setJogos([]);
    setShowDistributeButton(true);
    setJogadoresSelecionados([]);
    localStorage.removeItem('jogadores');
    localStorage.removeItem('jogos');
  };

  return {
    jogadores,
    setJogadores,
    jogos,
    setJogos,
    showDistributeButton,
    setShowDistributeButton,
    jogadoresSelecionados,
    setJogadoresSelecionados,
    distribuirJogadores,
    handleTrocarJogadores,
    iniciarProximoJogoHandler,
    resetGame,
  };
};
