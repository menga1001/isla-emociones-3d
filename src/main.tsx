import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const SAVE_KEY = 'isla-emociones-save';
const VERSION_KEY = 'isla-emociones-version';
const CURRENT_VERSION = '1.0.1';

const savedVersion = localStorage.getItem(VERSION_KEY);
if (savedVersion !== CURRENT_VERSION) {
  localStorage.removeItem(SAVE_KEY);
  localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
