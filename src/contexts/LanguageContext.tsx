import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { supportedLanguages, translations } from '../data/languages';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(supportedLanguages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    document.documentElement.lang = language.code;
    document.documentElement.dir = ['ur', 'ar'].includes(language.code) ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage.code as keyof typeof translations] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const isRTL = ['ur', 'ar'].includes(currentLanguage.code);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};