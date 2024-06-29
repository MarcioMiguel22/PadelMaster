import React, { useState } from 'react';
import styles from './PopupForm.module.css';

interface PopupFormProps {
  onSave: (data: { clube: string; local: string; organizador: string; horario: string }) => void;
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ onSave, onClose }) => {
  const [clube, setClube] = useState('');
  const [local, setLocal] = useState('');
  const [organizador, setOrganizador] = useState('');
  const [horario, setHorario] = useState('dia');

  const handleSave = () => {
    onSave({ clube, local, organizador, horario });
    onClose(); // Fechar o popup ao salvar
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Informações do Jogo</h2>
        <div className={styles.formGroup}>
          <label>Clube:</label>
          <input type="text" value={clube} onChange={(e) => setClube(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Local:</label>
          <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Organizador:</label>
          <input type="text" value={organizador} onChange={(e) => setOrganizador(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Horário:</label>
          <select value={horario} onChange={(e) => setHorario(e.target.value)}>
            <option value="dia">Dia</option>
            <option value="noite">Noite</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
