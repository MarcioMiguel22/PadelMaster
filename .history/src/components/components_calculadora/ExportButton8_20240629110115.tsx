import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Jogador, Campo as CampoType } from '../../utils/types/types';
import styles from './ExportButton.module.css';

interface ExportButtonProps {
  jogadores: Jogador[];
  jogos: CampoType[][];
  gameInfo: { clube: string; local: string; organizador: string; horario: string }; // Add this prop
}

const ExportButton12: React.FC<ExportButtonProps> = ({ jogadores, jogos, gameInfo }) => {
  const exportAndSendPDF = async () => {
    const doc = new jsPDF();

    // Definir a cor do texto para verde
    doc.setTextColor(76, 175, 80);

    // Adicionar Informações do Jogo
    doc.setFontSize(18);
    doc.text('Informações do Jogo', 20, 20);
    doc.setFontSize(14);
    doc.text(`Clube: ${gameInfo.clube}`, 20, 30);
    doc.text(`Local: ${gameInfo.local}`, 20, 40);
    doc.text(`Organizador: ${gameInfo.organizador}`, 20, 50);
    doc.text(`Horário: ${gameInfo.horario}`, 20, 60);

    // Adicionar Ranking
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Ranking dos Jogadores', 20, 20);
    const rankingData = jogadores.map((jogador, index) => [
      (index + 1).toString(),
      jogador.nome,
      jogador.vitorias.toString(),
      jogador.pontos.toString(),
      jogador.pontosPerdidos.toString(),
      jogador.totalPontos.toString()
    ]);
    doc.autoTable({
      head: [['Posição', 'Nome', 'Vitórias', 'Pontos', 'Pontos Perdidos', 'Total de Pontos']],
      body: rankingData,
      startY: 30,
      headStyles: { fillColor: '#4CAF50' }
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
          `Equipa ${timeIndex + 1}`,
          time.jogadores.map(jogador => jogador.nome).join(', '),
          time.resultado.toString()
        ]);
        doc.autoTable({
          head: [['Equipa', 'Jogadores', 'Resultado']],
          body: campoData,
          startY: startY + 10,
          headStyles: { fillColor: '#4CAF50' }
        });
        startY += 10 + (campo.times.length * 10);
      });
      doc.addPage();
      startY = 30;
    });

    // Obter data no formato dd-mm-yyyy
    const getFormattedDate = () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    // Salvar PDF localmente com o nome formatado
    const formattedDate = getFormattedDate();
    doc.save(`PadelMaster_${formattedDate}.pdf`);

    // Enviar dados para o backend
    const data = {
      data: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      jogos: jogos.map((jogo, jogoIndex) => ({
        jogo: `Jogo ${jogoIndex + 1}`,
        jogadores: jogo.flatMap(campo =>
          campo.times.flatMap(time =>
            time.jogadores.map((jogador, jogadorIndex) => ({
              nome: jogador.nome,
              vitorias: jogador.vitorias,
              pontos: jogador.pontos,
              pontosPerdidos: jogador.pontosPerdidos,
              totalPontos: jogador.totalPontos,
              posicao: jogadorIndex + 1 // ou outra lógica para calcular a posição
            }))
          )
        )
      }))
    };
    console.log(data)
    try {
      const response = await fetch('/api/save-results/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso');
      } else {
        console.error('Erro ao enviar dados', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar dados', error);
    }
  };

  return (
    <div className={styles['export-button-container']}>
      <button onClick={exportAndSendPDF} className={styles.exportButton}>
        Exportar Resultados em PDF
      </button>
    </div>
  );
};

export default ExportButton12;
