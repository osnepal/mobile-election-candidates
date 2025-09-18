import i18n from 'i18next';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGE_KEY } from '@/src/i18n';
import { Text } from '@/components/ui/text';

export default function LanguageToggle() {
  const [language, setLanguage] = useState<'en' | 'ne'>('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (saved === 'ne') {
        setLanguage('ne');
      }
    };
    loadLanguage();
  }, []);

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'ne' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    await AsyncStorage.setItem(LANGUAGE_KEY, newLang);
  };

  return (
    <Button onPress={toggleLanguage} size="icon" variant="ghost" className="rounded-full web:mx-4">
      <Text variant={'large'}>{language === 'en' ? '🇺🇸' : '🇳🇵'}</Text>
    </Button>
  );
}
