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
  modern: {
    primary: '#2C3E50',
    secondary: '#3498DB',
    background: '#FFFFFF',
    text: '#2C3E50',
    lightText: '#7F8C8D',
    highlight: '#E74C3C',
    border: '#ECF0F1',
  },
  minimal: {
    primary: '#000000',
    secondary: '#666666',
    background: '#FFFFFF',
    text: '#333333',
    lightText: '#999999',
    highlight: '#000000',
    border: '#EEEEEE',
  },
  dark: {
    primary: '#E0E0E0',
    secondary: '#BDBDBD',
    background: '#212121',
    text: '#E0E0E0',
    lightText: '#BDBDBD',
    highlight: '#64B5F6',
    border: '#424242',
  },
  nature: {
    primary: '#2E7D32',
    secondary: '#558B2F',
    background: '#FFFFFF',
    text: '#1B5E20',
    lightText: '#558B2F',
    highlight: '#43A047',
    border: '#C8E6C9',
  }
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
  borderColor: '#dddddd',
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
  // Whether to show skill years in parentheses
  showSkillYearsInParentheses: false,
  // Whether to capitalize skill names
  capitalizeSkillNames: true,
  // Whether to show bullet points for responsibilities
  showBulletPoints: true,
  // Whether to show tech stack in italics
  showTechStackInItalics: true,
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