#!/usr/bin/env node

const path = require('path');
const React = require('react');
const ReactPDF = require('@react-pdf/renderer');

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  extensions: ['.js', '.jsx'],
  ignore: [/node_modules/],
});

const supportedAssetExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
supportedAssetExtensions.forEach((extension) => {
  require.extensions[extension] = (module, filename) => {
    module.exports = filename;
  };
});

const PDFDocument = require('../src/PDFDocument').default;
const cvData = require('../cv-data.json');

const rootDir = path.resolve(__dirname, '..');

async function generate(language, outputFile) {
  const outputPath = path.join(rootDir, outputFile);
  console.log(`Generating ${outputFile} from language "${language}"...`);

  await ReactPDF.render(
    React.createElement(PDFDocument, { data: cvData, language }),
    outputPath
  );

  console.log(`Saved ${outputFile}`);
}

async function main() {
  try {
    await generate('en', 'muni_besen_en.pdf');
    await generate('pt', 'muni_besen_pt.pdf');
    console.log('PDF generation complete.');
  } catch (error) {
    console.error('Failed to generate PDFs:', error);
    process.exit(1);
  }
}

main();

