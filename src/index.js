import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Apply some basic styles
const style = document.createElement('style');
style.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  body, html {
    height: 100%;
    width: 100%;
  }
  
  #root {
    height: 100%;
  }
`;
document.head.appendChild(style);

// Render the App
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />); 