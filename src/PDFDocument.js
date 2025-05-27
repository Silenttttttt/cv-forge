import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
// Import the config
import { sectionTitles, tableHeaders } from './config';
// Import images
import linkedinImage from '../public/images/linkedin.jpg';
import whatsappImage from '../public/images/WhatsApp.png';

// Component to generate the PDF
const PDFDocument = ({
  data,
  language = 'en',
  primaryColor,
  secondaryColor,
  backgroundColor,
  textColor,
  lightTextColor,
  highlightColor,
  borderColor,
  headerBackground,
  headerTextColor,
  evenRowBackground,
  oddRowBackground,
  tableBorderColor,
  addHyphenToSkills,
  addColonToSkills,
  addColonToLanguages,
  addYearsTextToExperience,
  showSkillYearsInParentheses,
  capitalizeSkillNames,
  showBulletPoints,
  showTechStackInItalics,
  enableWhatsApp,
  enableEmail,
  enableLinkedIn,
  enableGitHub
}) => {
  // Get localized data
  const basics = data.basics[language];
  const languages = data.languages[language];
  const experience = data.experience[language];
  const education = data.education[language];
  const certifications = data.certifications[language];
  const skills = data.skills;

  // Get titles from config
  const titles = sectionTitles[language];
  const headers = tableHeaders[language];
  
  // Current date for footer
  const currentDate = new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US');

  // Format skill years display to include "years" text
  const formatSkillYears = (years) => {
    if (!addYearsTextToExperience) return years;
    
    // If already contains "years" or has a "+" sign, return as is
    if (years.includes('years') || years.includes('year')) return years;
    if (years.includes('+')) return `${years} years`;
    
    // Otherwise add "years" text
    return years === '1' ? '1 year' : `${years} years`;
  };

  // Format skill name with optional hyphen and colon
  const formatSkillName = (name) => {
    let formattedName = name;
    if (capitalizeSkillNames) formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    if (addHyphenToSkills) {
      formattedName = `- ${formattedName}`;
    }
    if (addColonToSkills) {
      formattedName = `${formattedName}:`;
    }
    return formattedName;
  };

  // Format language name with optional colon
  const formatLanguageName = (name) => {
    let formattedName = name;
    if (addColonToLanguages) {
      formattedName = `${formattedName}:`;
    }
    return formattedName;
  };

  // Format phone number for WhatsApp link (remove spaces, parentheses, etc.)
  const formatPhoneForWhatsApp = (phone) => {
    return phone.replace(/[\s()\-+]/g, '');
  };
  
  // Generate WhatsApp link
  const whatsappLink = `https://wa.me/${formatPhoneForWhatsApp(basics.phone)}`;

  // Create styles with the provided color scheme
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: backgroundColor,
      padding: 30,
      fontFamily: 'Helvetica',
    },
    header: {
      marginBottom: 25,
      borderBottomWidth: 2,
      borderBottomColor: primaryColor,
      borderBottomStyle: 'solid',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 15,
    },
    headerLeft: {
      flexDirection: 'column',
      width: '70%',
    },
    headerRight: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      width: '30%',
    },
    profileImage: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginBottom: 10,
      alignSelf: 'flex-end',
      objectFit: 'cover',
      border: `1px solid ${borderColor}`,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
      color: primaryColor,
    },
    subtitle: {
      fontSize: 12,
      marginBottom: 10,
      color: secondaryColor,
    },
    contactInfo: {
      fontSize: 10,
      marginBottom: 4,
      color: textColor,
    },
    contactLink: {
      textDecoration: 'underline',
      color: highlightColor,
    },
    contactRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 3,
    },
    contactLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      marginRight: 5,
      color: textColor,
    },
    contactValue: {
      fontSize: 10,
      color: textColor,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 15,
      marginBottom: 8,
      fontWeight: 'bold',
      color: primaryColor,
      borderBottomWidth: 1,
      borderBottomColor: primaryColor,
      borderBottomStyle: 'solid',
      paddingBottom: 3,
    },
    profileText: {
      fontSize: 10,
      marginBottom: 10,
      textAlign: 'justify',
      lineHeight: 1.6,
      color: textColor,
    },
    jobTitle: {
      fontSize: 13,
      marginBottom: 3,
      color: textColor,
    },
    jobCompany: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 2,
      color: primaryColor,
    },
    jobPeriod: {
      fontSize: 9,
      color: lightTextColor,
      marginBottom: 3,
      fontStyle: 'italic',
    },
    jobDescription: {
      fontSize: 9,
      marginBottom: 3,
      textAlign: 'justify',
      lineHeight: 1.4,
      color: textColor,
    },
    list: {
      marginLeft: 10,
      marginTop: 3,
    },
    listItem: {
      fontSize: 9,
      marginBottom: 3,
      lineHeight: 1.3,
      color: textColor,
      fontStyle: showTechStackInItalics ? 'italic' : 'normal',
    },
    // Table-like skills layout
    skillsTable: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 5,
      width: '100%',
      borderWidth: 1,
      borderColor: tableBorderColor,
    },
    skillRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: tableBorderColor,
      paddingVertical: 2,
    },
    skillRowEven: {
      backgroundColor: evenRowBackground,
    },
    skillRowOdd: {
      backgroundColor: oddRowBackground,
    },
    skillCol: {
      padding: 3,
      borderRightWidth: 1,
      borderRightColor: tableBorderColor,
      justifyContent: 'center',
    },
    skillName: {
      fontSize: 9,
      color: textColor,
      fontWeight: 'bold',
    },
    skillYears: {
      fontSize: 9,
      textAlign: 'center',
    },
    
    // Table headers
    tableHeader: {
      flexDirection: 'row', 
      backgroundColor: headerBackground,
      padding: 5,
    },
    headerCell: {
      color: headerTextColor,
      fontSize: 9,
      fontWeight: 'bold',
      textAlign: 'center',
      borderRightWidth: 1,
      borderRightColor: headerTextColor,
    },
    
    // Languages section styled as a proper table
    languagesTable: {
      marginTop: 8,
    },
    languageRow: {
      marginBottom: 4,
    },
    languageItem: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    languageName: {
      fontSize: 10,
      fontWeight: 'bold',
      marginRight: 5,
    },
    languageLevel: {
      fontSize: 10,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: 'center',
      fontSize: 8,
      color: lightTextColor,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: borderColor,
      borderTopStyle: 'solid',
    },
    jobRole: {
      fontSize: 12,
      fontStyle: 'italic',
      marginBottom: 3,
      color: secondaryColor,
    },
    // Social media links
    socialLinks: {
      marginTop: 5,
    },
    socialLink: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    socialIcon: {
      width: 12,
      height: 12,
      marginRight: 4,
      objectFit: 'contain',
    },
    whatsappLink: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{basics.name}</Text>
            <Text style={styles.subtitle}>{basics.country}</Text>
            
            {/* Social Links */}
            <View style={styles.socialLinks}>
              {enableLinkedIn && (
                <View style={styles.socialLink}>
                  <Text style={styles.contactInfo}>
                    LinkedIn: <Link src="https://www.linkedin.com/in/muni-besen/" style={styles.contactLink}>{basics.linkedin}</Link>
                  </Text>
                </View>
              )}
              
              {enableGitHub && (
                <View style={styles.socialLink}>
                  <Text style={styles.contactInfo}>
                    GitHub: <Link src="https://github.com/silenttttttt" style={styles.contactLink}>{basics.github}</Link>
                  </Text>
                </View>
              )}
              
              {enableWhatsApp && (
                <View style={styles.socialLink}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image src={whatsappImage} style={{width: 12, height: 12, marginRight: 4}} />
                    <Text style={styles.contactInfo}>
                      WhatsApp: <Link src={whatsappLink} style={styles.contactLink}>{basics.phone}</Link>
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.headerRight}>
            {/* Profile Image */}
            <Image style={styles.profileImage} src={linkedinImage} />
            
            {/* Contact Info */}
            {enableEmail && (
              <Text style={styles.contactInfo}>Email: {basics.email}</Text>
            )}
            
            <Text style={styles.contactInfo}>
              Phone: {basics.phone}
            </Text>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.profile}</Text>
          <Text style={styles.profileText}>{basics.profile}</Text>
        </View>

        {/* Skills Section - Table format with original CV layout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.skills}</Text>
          <View style={styles.skillsTable}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { width: '25%' }]}>{headers.skills.name}</Text>
              <Text style={[styles.headerCell, { width: '25%' }]}>{headers.skills.years}</Text>
              <Text style={[styles.headerCell, { width: '25%' }]}>{headers.skills.name}</Text>
              <Text style={[styles.headerCell, { width: '25%', borderRightWidth: 0 }]}>{headers.skills.years}</Text>
            </View>
            
            {/* Create rows with pairs of skills */}
            {(() => {
              let rows = [];
              for (let i = 0; i < skills.length; i += 2) {
                const skill1 = skills[i];
                const skill2 = i + 1 < skills.length ? skills[i + 1] : null;
                
                rows.push(
                  <View key={i} style={[
                    styles.skillRow, 
                    i % 4 < 2 ? styles.skillRowEven : styles.skillRowOdd,
                    i >= skills.length - 2 ? { borderBottomWidth: 0 } : {}
                  ]}>
                    <View style={[styles.skillCol, { width: '25%' }]}>
                      <Text style={styles.skillName}>{formatSkillName(skill1.name)}</Text>
                    </View>
                    <View style={[styles.skillCol, { width: '25%' }]}>
                      <Text style={styles.skillYears}>{formatSkillYears(skill1.years)}</Text>
                    </View>
                    
                    {skill2 ? (
                      <>
                        <View style={[styles.skillCol, { width: '25%' }]}>
                          <Text style={styles.skillName}>{formatSkillName(skill2.name)}</Text>
                        </View>
                        <View style={[styles.skillCol, { width: '25%', borderRightWidth: 0 }]}>
                          <Text style={styles.skillYears}>{formatSkillYears(skill2.years)}</Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={[styles.skillCol, { width: '25%' }]}>
                          <Text style={styles.skillName}></Text>
                        </View>
                        <View style={[styles.skillCol, { width: '25%', borderRightWidth: 0 }]}>
                          <Text style={styles.skillYears}></Text>
                        </View>
                      </>
                    )}
                  </View>
                );
              }
              return rows;
            })()}
          </View>
        </View>

        {/* Languages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.languages}</Text>
          <View style={styles.languagesTable}>
            {languages.map((lang, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.languageName}>{formatLanguageName(lang.language)}</Text>
                <Text style={styles.languageLevel}>{lang.level}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.experience}</Text>
          {experience.map((job, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text style={styles.jobCompany}>{job.company}</Text>
              <Text style={styles.jobRole}>{job.role}</Text>
              <Text style={styles.jobPeriod}>{job.period}</Text>
              <Text style={styles.jobDescription}>{job.description}</Text>
              
              {job.responsibilities && job.responsibilities.length > 0 && (
                <View style={styles.list}>
                  {job.responsibilities.map((resp, idx) => (
                    <Text key={idx} style={styles.listItem}>• {resp}</Text>
                  ))}
                </View>
              )}
              
              <Text style={{ ...styles.listItem, marginTop: 3 }}>
                <Text style={{ fontWeight: 'bold' }}>Tech Stack: </Text>
                {job.tech_stack}
              </Text>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.education}</Text>
          {education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 7 }}>
              <Text style={styles.jobCompany}>{edu.institution}</Text>
              <Text style={styles.jobPeriod}>{edu.period}</Text>
              <Text style={styles.jobDescription}>{edu.description}</Text>
            </View>
          ))}
        </View>

        {/* Certifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{titles.certifications}</Text>
          <View style={{...styles.list, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {certifications.map((cert, index) => (
              <Text key={index} style={{...styles.listItem, width: '50%'}}>• {cert}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument; 