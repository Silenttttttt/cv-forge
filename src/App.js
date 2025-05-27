import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import cvData from '../cv-data.json';
import { colors, colorSchemes, textFormatting, contactOptions, tableStyles } from './config';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [activeColorScheme, setActiveColorScheme] = useState('default');
  const [customTextFormatting, setCustomTextFormatting] = useState(textFormatting);
  const [customContactOptions, setCustomContactOptions] = useState(contactOptions);
  const [customTableStyles, setCustomTableStyles] = useState(tableStyles);
  const [showCustomization, setShowCustomization] = useState(false);

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

  const customizationText = {
    en: 'Customize',
    pt: 'Personalizar'
  };

  const handleColorSchemeChange = (scheme) => {
    setActiveColorScheme(scheme);
  };

  const handleTextFormattingChange = (key) => {
    setCustomTextFormatting(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleContactOptionChange = (key) => {
    setCustomContactOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTableStyleChange = (key, value) => {
    setCustomTableStyles(prev => ({
      ...prev,
      [key]: value
    }));
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
          
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4a6da7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {customizationText[language]}
          </button>
          
          <PDFDownloadLink 
            document={
              <PDFDocument 
                data={cvData} 
                language={language}
                primaryColor={colorSchemes[activeColorScheme].primary}
                secondaryColor={colorSchemes[activeColorScheme].secondary}
                backgroundColor={colorSchemes[activeColorScheme].background}
                textColor={colorSchemes[activeColorScheme].text}
                lightTextColor={colorSchemes[activeColorScheme].lightText}
                highlightColor={colorSchemes[activeColorScheme].highlight}
                borderColor={colorSchemes[activeColorScheme].border}
                headerBackground={customTableStyles.headerBackground}
                headerTextColor={customTableStyles.headerTextColor}
                evenRowBackground={customTableStyles.evenRowBackground}
                oddRowBackground={customTableStyles.oddRowBackground}
                tableBorderColor={customTableStyles.borderColor}
                addHyphenToSkills={customTextFormatting.addHyphenToSkills}
                addColonToSkills={customTextFormatting.addColonToSkills}
                addColonToLanguages={customTextFormatting.addColonToLanguages}
                addYearsTextToExperience={customTextFormatting.addYearsTextToExperience}
                showSkillYearsInParentheses={customTextFormatting.showSkillYearsInParentheses}
                capitalizeSkillNames={customTextFormatting.capitalizeSkillNames}
                showBulletPoints={customTextFormatting.showBulletPoints}
                showTechStackInItalics={customTextFormatting.showTechStackInItalics}
                enableWhatsApp={customContactOptions.enableWhatsApp}
                enableEmail={customContactOptions.enableEmail}
                enableLinkedIn={customContactOptions.enableLinkedIn}
                enableGitHub={customContactOptions.enableGitHub}
              />
            } 
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
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Customization Sidebar */}
        {showCustomization && (
          <div style={{
            width: 370,
            minWidth: 320,
            maxWidth: 400,
            background: '#fff',
            borderRight: '1px solid #eee',
            boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
            padding: 20,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24
          }}>
            <h3 style={{ marginBottom: 10, fontSize: 20, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Customization Options</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {/* Color Scheme */}
              <div style={{ flex: '1 1 150px', minWidth: 150 }}>
                <h4 style={{ marginBottom: 8 }}>Color Scheme</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {Object.keys(colorSchemes).map(scheme => (
                    <button
                      key={scheme}
                      onClick={() => handleColorSchemeChange(scheme)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: activeColorScheme === scheme ? '#4CAF50' : '#e0e0e0',
                        color: activeColorScheme === scheme ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: activeColorScheme === scheme ? 'bold' : 'normal',
                        minWidth: 60
                      }}
                    >
                      {scheme}
                    </button>
                  ))}
                </div>
              </div>
              {/* Text Formatting */}
              <div style={{ flex: '1 1 180px', minWidth: 180 }}>
                <h4 style={{ marginBottom: 8 }}>Text Formatting</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {Object.entries(customTextFormatting).map(([key, value]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 14 }}>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleTextFormattingChange(key)}
                      />
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {/* Contact Display */}
              <div style={{ flex: '1 1 150px', minWidth: 150 }}>
                <h4 style={{ marginBottom: 8 }}>Contact Display</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {Object.entries(customContactOptions).map(([key, value]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 14 }}>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleContactOptionChange(key)}
                      />
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  ))}
                </div>
              </div>
              {/* Table Styles */}
              <div style={{ flex: '1 1 180px', minWidth: 180 }}>
                <h4 style={{ marginBottom: 8 }}>Table Styles</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: 14 }}>Header Background Color:</label>
                    <input
                      type="color"
                      value={customTableStyles.headerBackground}
                      onChange={(e) => handleTableStyleChange('headerBackground', e.target.value)}
                      style={{ marginLeft: '10px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 14 }}>Header Text Color:</label>
                    <input
                      type="color"
                      value={customTableStyles.headerTextColor}
                      onChange={(e) => handleTableStyleChange('headerTextColor', e.target.value)}
                      style={{ marginLeft: '10px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 14 }}>Even Row Background:</label>
                    <input
                      type="color"
                      value={customTableStyles.evenRowBackground}
                      onChange={(e) => handleTableStyleChange('evenRowBackground', e.target.value)}
                      style={{ marginLeft: '10px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 14 }}>Odd Row Background:</label>
                    <input
                      type="color"
                      value={customTableStyles.oddRowBackground}
                      onChange={(e) => handleTableStyleChange('oddRowBackground', e.target.value)}
                      style={{ marginLeft: '10px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 14 }}>Border Color:</label>
                    <input
                      type="color"
                      value={customTableStyles.borderColor}
                      onChange={(e) => handleTableStyleChange('borderColor', e.target.value)}
                      style={{ marginLeft: '10px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* PDF Preview */}
        <div style={{ flex: 1, minWidth: 0, background: '#f4f4f4', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
          <PDFViewer 
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none',
              minHeight: 0
            }}
          >
            <PDFDocument 
              data={cvData} 
              language={language}
              primaryColor={colorSchemes[activeColorScheme].primary}
              secondaryColor={colorSchemes[activeColorScheme].secondary}
              backgroundColor={colorSchemes[activeColorScheme].background}
              textColor={colorSchemes[activeColorScheme].text}
              lightTextColor={colorSchemes[activeColorScheme].lightText}
              highlightColor={colorSchemes[activeColorScheme].highlight}
              borderColor={colorSchemes[activeColorScheme].border}
              headerBackground={customTableStyles.headerBackground}
              headerTextColor={customTableStyles.headerTextColor}
              evenRowBackground={customTableStyles.evenRowBackground}
              oddRowBackground={customTableStyles.oddRowBackground}
              tableBorderColor={customTableStyles.borderColor}
              addHyphenToSkills={customTextFormatting.addHyphenToSkills}
              addColonToSkills={customTextFormatting.addColonToSkills}
              addColonToLanguages={customTextFormatting.addColonToLanguages}
              addYearsTextToExperience={customTextFormatting.addYearsTextToExperience}
              showSkillYearsInParentheses={customTextFormatting.showSkillYearsInParentheses}
              capitalizeSkillNames={customTextFormatting.capitalizeSkillNames}
              showBulletPoints={customTextFormatting.showBulletPoints}
              showTechStackInItalics={customTextFormatting.showTechStackInItalics}
              enableWhatsApp={customContactOptions.enableWhatsApp}
              enableEmail={customContactOptions.enableEmail}
              enableLinkedIn={customContactOptions.enableLinkedIn}
              enableGitHub={customContactOptions.enableGitHub}
            />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

export default App; 