import * as React from 'react';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGE_KEY } from '@/i18n';
import DropdownMenu from '../DropdownMenu';
import { useTranslation } from 'react-i18next';
import { Text } from './text';

export default function LanguageToggle() {
  const [language, setLanguage] = useState<string>('en');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadLanguage = async () => {
      const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (saved === 'ne') {
        setLanguage('ne');
      }
    };
    loadLanguage();
  }, []);

  const toggleLanguage = async (newLang: string) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    await AsyncStorage.setItem(LANGUAGE_KEY, newLang);
  };

  const languages = [
    { label: '🇬🇧 English ', value: 'en' },
    { label: '🇳🇵 Nepali ', value: 'ne' },
  ];

  const found = languages.find((i) => i.value === language);
  return (
    <DropdownMenu
      defaultvalue={found}
      value={language}
      data={languages}
      onChange={(v) => {
        if (v) {
          toggleLanguage(v);
        }
      }}
    />
  );
}
