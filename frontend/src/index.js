import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { SkillsContextProvider } from './context/SkillContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SkillsContextProvider>
        <App />
      </SkillsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);