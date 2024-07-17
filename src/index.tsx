// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals()