import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from '../app/types';
import en from './en.json';
import vi from './vi.json';

export const LANGUAGE_STORAGE_KEY = 'tarot_language';

export type TranslationKey = keyof typeof en;

const dictionaries: Record<Language, Record<string, string>> = {
  en,
  vi,
};

export function detectDefaultLanguage(): Language {
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === 'en' || stored === 'vi') {
        return stored;
      }
    } catch {
      // Ignore storage access errors
    }
  }

  const browserLang =
    (typeof navigator !== 'undefined' ? navigator.language : '')
      ?.toLowerCase() ?? '';
  if (browserLang.startsWith('vi')) {
    return 'vi';
  }

  return 'en';
}

export function translate(
  language: Language,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const currentDict = dictionaries[language] ?? dictionaries.en;
  let text = currentDict[key] ?? dictionaries.en[key] ?? key;

  if (params) {
    for (const [paramKey, paramValue] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
    }
  }

  return text;
}

export interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export interface I18nProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

export function I18nProvider({
  children,
  initialLanguage,
}: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(
    () => initialLanguage ?? detectDefaultLanguage()
  );

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {
      // Ignore localStorage errors
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore localStorage errors
    }
  }, [language]);

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    return translate(language, key, params);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
