import React, { useState } from 'react';
import { Jogador } from '../../utils/types/types'; // Importando o tipo Jogador

interface JogadorItemProps {
  jogador: Jogador;
  handleNomeChange: (id: number, novoNome: string) => void;
}

const JogadorItem: React.FC<JogadorItemProps> = ({ jogador, handleNomeChange }) => {
  const [nome, setNome] = useState(jogador.nome);

  const handleBlur = () => {
    if (nome.trim() === '') {
      setNome(jogador.nome);
    } else {
      handleNomeChange(jogador.id, nome);
    }
  };

  return (
    <div className="jogador-item">
      <label>{`Jogador ${jogador.id}`}</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onBlur={handleBlur}
        placeholder="Inserir nome de jogador"
      />
    </div>
  );
};

export default JogadorItem;
