import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Jogador, Campo as CampoType } from '../../utils/types/types';
import styles from './ExportButton.module.css';

interface ExportButtonProps {
  jogadores: Jogador[];
  jogos: CampoType[][];
}

const ExportButton: React.FC<ExportButtonProps> = ({ jogadores, jogos }) => {
  const exportPDF = () => {
    const doc = new jsPDF();

    // Definir a cor do texto para verde
    doc.setTextColor(76, 175, 80);

    // Adicionar Ranking
    doc.setFontSize(18);
    doc.text('Ranking dos Jogadores', 20, 20);
    const rankingData = jogadores.map((jogador, index) => [
      (index + 1).toString(), // Transformar número em string
      jogador.nome,
      jogador.vitorias.toString(), // Transformar número em string
      jogador.pontos.toString(), // Transformar número em string
      jogador.pontosPerdidos.toString(), // Transformar número em string
      jogador.totalPontos.toString() // Transformar número em string
    ]);
    doc.autoTable({
      head: [['Posição', 'Nome', 'Vitórias', 'Pontos', 'Pontos Perdidos', 'Total de Pontos']],
      body: rankingData,
      startY: 30,
      headStyles: { fillColor: '#4CAF50' } // Definir a cor do cabeçalho da tabela como string
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
          `Equipa ${timeIndex + 1}`, // Translate to "Equipa"
          time.jogadores.map(jogador => jogador.nome).join(', '),
          time.resultado.toString() // Transformar número em string
        ]);
        doc.autoTable({
          head: [['Equipa', 'Jogadores', 'Resultado']], // Translate header to "Equipa"
          body: campoData,
          startY: startY + 10,
          headStyles: { fillColor: '#4CAF50' } // Definir a cor do cabeçalho da tabela como string
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
    <div className={styles['export-button-container']}>
      <button onClick={exportPDF} className={styles.exportButton}>
        Exportar Resultados em PDF
      </button>
    </div>
  );
};

export default ExportButton;
