import React, { useState } from 'react';
import styles from './Selector.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';
import PopupForm from './PopupForm';

interface SelectorProps {
  onSaveGameInfo: (data: { clube: string; local: string; organizador: string; horario: string }) => void;
}

const Selector: React.FC<SelectorProps> = ({ onSaveGameInfo }) => {
  const [selectedOption, setSelectedOption] = useState<string>('manual');
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const toggleOption = () => {
    setSelectedOption(prevOption => (prevOption === 'manual' ? 'automatic' : 'manual'));
    setShowPopup(true); // Mostrar o popup ao alternar a opção
  };

  const handleSave = (data: { clube: string; local: string; organizador: string; horario: string }) => {
    onSaveGameInfo(data); // Passar os dados para o componente pai
    setShowPopup(false); // Fechar o popup
  };

  const handleClose = () => {
    setShowPopup(false); // Fechar o popup
  };

  const handleBack = () => {
    window.history.back(); // Simular o comportamento de voltar ao clicar no botão "Fechar"
  };

  return (
    <div className={styles.selectorContainer} onClick={toggleOption}>
      <div className={styles.bolaContainer}>
        <img
          src={tennisBall}
          alt="Bola de Tênis"
          className={`${styles.bola} ${selectedOption === 'manual' ? styles.manual : styles.automatic}`}
        />
      </div>
      <div className={styles.optionText}>
        {selectedOption === 'manual' ? 'Manual' : 'Automático'}
      </div>
      {showPopup && (
        <PopupForm
          onSave={handleSave}
          onClose={handleClose}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Selector;
