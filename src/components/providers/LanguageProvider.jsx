'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(undefined);

// Translation dictionary
const translations = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.map': 'Map',
    'nav.tools': 'Safety Tools',
    'nav.contacts': 'Contacts',
    'nav.settings': 'Settings',
    'nav.history': 'History',
    'sos.button': 'Emergency SOS',
    'sos.activating': 'Activating SOS...',
    'sos.active': 'SOS Active',
    'sos.cancel': 'Cancel',
    'greeting.morning': 'Good morning',
    'greeting.afternoon': 'Good afternoon',
    'greeting.evening': 'Good evening',
    'greeting.night': 'Good night',
    'location.sharing': 'Location Sharing',
    'location.active': 'Active',
    'location.inactive': 'Inactive',
    'location.accuracy': 'Accuracy: {{accuracy}}m',
    'checkin.title': 'Check-in Timer',
    'checkin.next': 'Next check-in in',
    'checkin.overdue': 'Check-in overdue!',
    'checkin.checkin': 'Check In',
    'tools.checkin': 'Check-in Timer',
    'tools.safewalk': 'Safe Walk',
    'tools.deadman': 'Dead Man Switch',
    'tools.discreet': 'Discreet Mode',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.privacy': 'Privacy',
    'settings.notifications': 'Notifications',
    'theme.dark': 'Dark',
    'theme.light': 'Light',
    'theme.high-contrast': 'High Contrast',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
  },
  hi: {
    'nav.dashboard': 'डैशबोर्ड',
    'nav.map': 'नक्शा',
    'nav.tools': 'सुरक्षा उपकरण',
    'nav.contacts': 'संपर्क',
    'nav.settings': 'सेटिंग्स',
    'nav.history': 'इतिहास',
    'sos.button': 'आपातकालीन SOS',
    'sos.activating': 'SOS सक्रिय कर रहा है...',
    'sos.active': 'SOS सक्रिय',
    'sos.cancel': 'रद्द करें',
    'greeting.morning': 'सुप्रभात',
    'greeting.afternoon': 'नमस्कार',
    'greeting.evening': 'शुभ संध्या',
    'greeting.night': 'शुभ रात्रि',
    'location.sharing': 'स्थान साझाकरण',
    'location.active': 'सक्रिय',
    'location.inactive': 'निष्क्रिय',
    'location.accuracy': 'सटीकता: {{accuracy}}मी',
    'checkin.title': 'चेक-इन टाइमर',
    'checkin.next': 'अगला चेक-इन',
    'checkin.overdue': 'चेक-इन लंबित!',
    'checkin.checkin': 'चेक इन',
    'tools.checkin': 'चेक-इन टाइमर',
    'tools.safewalk': 'सुरक्षित यात्रा',
    'tools.deadman': 'डेड मैन स्विच',
    'tools.discreet': 'गुप्त मोड',
    'settings.theme': 'थीम',
    'settings.language': 'भाषा',
    'settings.privacy': 'गोपनीयता',
    'settings.notifications': 'सूचनाएं',
    'theme.dark': 'डार्क',
    'theme.light': 'लाइट',
    'theme.high-contrast': 'हाई कंट्रास्ट',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
  },
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({
  children,
  defaultLanguage = 'en',
  storageKey = 'guardian-language',
}) {
  const [language, setLanguageState] = useState(defaultLanguage);

  useEffect(() => {
    // Load language from localStorage
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['en', 'hi'].includes(stored)) {
        setLanguageState(stored);
      }
    } catch (error) {
      console.warn('Failed to load language from localStorage:', error);
    }
  }, [storageKey]);

  const setLanguage = (newLanguage) => {
    setLanguageState(newLanguage);
    try {
      localStorage.setItem(storageKey, newLanguage);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  };

  const t = (key, variables) => {
    const langTranslations = translations[language] || translations.en;
    let translation = langTranslations[key] || key;
    
    // Replace variables in the translation
    if (variables) {
      Object.entries(variables).forEach(([varKey, varValue]) => {
        translation = translation.replace(`{{${varKey}}}`, varValue);
      });
    }
    
    return translation;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}