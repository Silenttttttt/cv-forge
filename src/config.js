// CV Generator configuration file

// Color schemes for the CV
const colorSchemes = {
  default: {
    primary: '#112131',
    secondary: '#4a6da7',
    background: '#FFFFFF',
    text: '#333333',
    lightText: '#555555',
    highlight: '#0077B5',
    border: '#dddddd',
  },
  professional: {
    primary: '#1D3557',
    secondary: '#457B9D',
    background: '#FFFFFF',
    text: '#333333',
    lightText: '#555555',
    highlight: '#E63946',
    border: '#dddddd',
  },
};

// Active color scheme
const activeColorScheme = 'default';
const colors = colorSchemes[activeColorScheme];

// Contact options
const contactOptions = {
  // Enable WhatsApp button that links to the provided phone number
  enableWhatsApp: true,
  // Enable email button
  enableEmail: true,
  // Enable LinkedIn button
  enableLinkedIn: true,
  // Enable GitHub button
  enableGitHub: true,
};

// Table styles
const tableStyles = {
  headerBackground: '#0f2440',
  headerTextColor: 'white',
  evenRowBackground: '#f8f9fa',
  oddRowBackground: '#ffffff',
  borderColor: colors.border,
};

// Text formatting options
const textFormatting = {
  // Whether to add hyphen before skill names
  addHyphenToSkills: false,
  // Whether to add colon after skill names
  addColonToSkills: false,
  // Whether to add colon after language names
  addColonToLanguages: true,
  // Whether to add "years" text to experience values
  addYearsTextToExperience: true,
};

// Section titles based on language
const sectionTitles = {
  en: {
    profile: 'Professional Profile',
    experience: 'Professional Experience',
    education: 'Education',
    skills: 'Technical Skills',
    languages: 'Languages',
    certifications: 'Certifications'
  },
  pt: {
    profile: 'Perfil Profissional',
    experience: 'Experiência Profissional',
    education: 'Educação',
    skills: 'Habilidades Técnicas',
    languages: 'Idiomas',
    certifications: 'Certificações'
  }
};

// Table column headers based on language
const tableHeaders = {
  en: {
    skills: {
      name: 'Skill',
      years: 'Years'
    },
    languages: {
      language: 'Language',
      level: 'Level'
    }
  },
  pt: {
    skills: {
      name: 'Habilidade',
      years: 'Anos'
    },
    languages: {
      language: 'Idioma',
      level: 'Nível'
    }
  }
};

export {
  colors,
  colorSchemes,
  tableStyles,
  textFormatting,
  sectionTitles,
  tableHeaders,
  contactOptions
}; 