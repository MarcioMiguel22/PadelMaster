import React, { useState } from 'react';
import styles from './Selector.module.css';
import tennisBall from '../../assets/images/tennis-ball.png';
import PopupForm from './PopupForm'; // Import the PopupForm

const Selector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('manual');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [gameInfo, setGameInfo] = useState<{ clube: string; local: string; organizador: string; horario: string } | null>(null);

  const toggleOption = () => {
    setSelectedOption(prevOption => (prevOption === 'manual' ? 'automatic' : 'manual'));
    setShowPopup(true); // Show the popup when the option is toggled
  };

  const handleSave = (data: { clube: string; local: string; organizador: string; horario: string }) => {
    setGameInfo(data);
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
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Selector;
