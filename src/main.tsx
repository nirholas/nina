/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Code is poetry written for machines 📝
 */

/**
 * Lyra Web3 Playground
 * https://lyra.works
 * 
 * Copyright (c) 2025 nirholas
 * Licensed under MIT License
 * 
 * @author nich (@nichxbt)
 * @repository https://github.com/nirholas/lyra-web3-playground
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Watermark - Lyra Web3 Playground
if (typeof window !== 'undefined') {
  console.log(
    '%c🎮 Lyra Web3 Playground',
    'font-size: 20px; font-weight: bold; color: #0ea5e9;'
  );
  console.log(
    '%chttps://lyra.works | github.com/nirholas/lyra-web3-playground',
    'font-size: 12px; color: #8b5cf6;'
  );
  console.log(
    '%c© 2025 nich (@nichxbt) | MIT License',
    'font-size: 11px; color: #64748b;'
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
