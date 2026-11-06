import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AssetProvider } from './context/AssetContext.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AssetProvider>
        <App />
      </AssetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
