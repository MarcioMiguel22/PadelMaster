import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Jogador, Campo as CampoType } from '../../utils/types/types';

interface ExportButtonProps {
  jogadores: Jogador[];
  jogos: CampoType[][];
}

const ExportButton: React.FC<ExportButtonProps> = ({ jogadores, jogos }) => {
  const exportPDF = () => {
    const doc = new jsPDF();

    // Adicionar Ranking
    doc.setFontSize(18);
    doc.text('Ranking dos Jogadores', 20, 20);
    const rankingData = jogadores.map((jogador, index) => [
      index + 1,
      jogador.nome,
      jogador.vitorias,
      jogador.pontos,
    ]);
    doc.autoTable({
      head: [['Posição', 'Nome', 'Vitórias', 'Pontos']],
      body: rankingData,
      startY: 30,
    });

    // Adicionar Resultados dos Jogos
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Resultados dos Jogos', 20, 20);
    let startY = 30;
    jogos.forEach((jogo, jogoIndex) => {
      doc.setFontSize(14);
      doc.text(`Jogo ${jogoIndex + 1}`, 20, startY);
      jogo.forEach((campo) => {
        const campoData = campo.times.map((time, timeIndex) => [
          `Time ${timeIndex + 1}`,
          time.jogadores.map(jogador => jogador.nome).join(', '),
          time.resultado,
        ]);
        doc.autoTable({
          head: [['Time', 'Jogadores', 'Resultado']],
          body: campoData,
          startY: startY + 10,
        });
        startY += 10 + (campo.times.length * 10); // Update startY based on content
      });
      doc.addPage();
      startY = 30;
    });

    // Salvar PDF
    doc.save('resultados.pdf');
  };

  return (
    <button onClick={exportPDF} className="export-button">
      Exportar Resultados em PDF
    </button>
  );
};

export default ExportButton;
