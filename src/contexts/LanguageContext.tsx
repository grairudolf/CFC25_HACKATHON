import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'pid';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (texts: { en: string; fr: string; pid: string } | undefined, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translate = (texts: { en: string; fr: string; pid: string } | undefined, defaultText: string = 'Not available') => {
    if (!texts) return defaultText;
    return texts[language] || texts.en || defaultText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
