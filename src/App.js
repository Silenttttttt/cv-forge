import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import cvData from '../cv-data.json';

const App = () => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  const buttonText = {
    en: 'Switch to Portuguese',
    pt: 'Switch to English'
  };

  const downloadText = {
    en: 'Download PDF',
    pt: 'Baixar PDF'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>CV Generator</h1>
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={toggleLanguage}
            style={{
              padding: '8px 16px',
              backgroundColor: '#112131',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {buttonText[language]}
          </button>
          
          <PDFDownloadLink 
            document={<PDFDocument data={cvData} language={language} />} 
            fileName={`cv-${cvData.basics[language].name.toLowerCase().replace(/\s+/g, '-')}.pdf`}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            {({ blob, url, loading, error }) => 
              loading ? 'Loading document...' : downloadText[language]
            }
          </PDFDownloadLink>
        </div>
      </div>
      
      <div style={{ flex: 1 }}>
        <PDFViewer 
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none'
          }}
        >
          <PDFDocument data={cvData} language={language} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default App; 