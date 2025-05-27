# CV Forge

A modern, customizable CV/resume generator built with React that creates beautiful PDF resumes from JSON data.

## Features

- 📄 Generate professional PDF resumes with a clean, modern design
- 🌐 Multilingual support (English and Portuguese)
- 🎨 Customizable styling through configuration
- 📱 Social media integration (LinkedIn, GitHub, WhatsApp)
- 📊 Table-based skills layout for clear presentation
- 📝 Easily update content by editing a single JSON file

## Preview

[CV Preview](muni_besen_en.pdf)

## Installation

```bash
git clone https://github.com/Silenttttttt/cv-forge.git
cd cv-forge
npm install
```

## Usage

1. Edit the `cv-data.json` file with your personal information
2. Customize appearance in `src/config.js` if desired
3. Run the development server:

```bash
npm start
```

4. Access the application at http://localhost:3001
5. Your PDF will be generated automatically

## Customization

### Data Structure

Edit the `cv-data.json` file to update your CV information. The file is structured with the following sections:

- `basics`: Personal information, contact details
- `skills`: Technical skills with experience level
- `languages`: Language proficiency
- `experience`: Work experience
- `education`: Educational background
- `certifications`: Professional certifications

Each section supports both English and Portuguese content.

### Configuration

The `src/config.js` file allows you to customize:

- Color schemes
- Table styles
- Contact options (WhatsApp, LinkedIn, GitHub)
- Text formatting
- Section titles

## Build

To build the project for production:

```bash
npm run build
```

## Technologies Used

- React
- @react-pdf/renderer for PDF generation
- Webpack
- Node.js (Express server)
