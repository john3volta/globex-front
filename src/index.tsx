import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss';

fetch('/sprite.svg')
  .then(response => response.text())
  .then(svgContent => {
    const div = document.createElement('div');
    div.innerHTML = svgContent;
    div.style.display = 'none';
    document.body.appendChild(div);
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 