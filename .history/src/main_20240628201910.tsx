import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Supondo que você tenha um elemento com id 'root' no seu HTML
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
