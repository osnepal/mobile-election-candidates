import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

import translationEn from './locales/en-US/translations.json';
import translationNe from './locales/ne-NP/translations.json';

const resources = {
  'en-US': { translation: translationEn },
  en: { translation: translationEn },
  'ne-NP': { translation: translationNe },
  ne: { translation: translationNe },
};

export const LANGUAGE_KEY = '@app_language';

const initI18n = async () => {
  try {
    // Try to get saved language preference
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

    let selectedLanguage = savedLanguage;

    if (!selectedLanguage) {
      const deviceLocales = Localization.getLocales();
      const deviceLocale = deviceLocales[0]?.languageTag || 'en-US';
      const languageCode = deviceLocale.split('-')[0];

      // Match exact locale first
      if (deviceLocale in resources) {
        selectedLanguage = deviceLocale;
      }
      // Then match language code
      else if (languageCode in resources) {
        selectedLanguage = languageCode;
      } else {
        selectedLanguage = 'en-US';
      }
    }

    // Nepali and English are LTR, so no RTL needed
    if (I18nManager.isRTL) {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }

    await i18n.use(initReactI18next).init({
      resources,
      lng: selectedLanguage,
      fallbackLng: 'en-US',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });

    // Save language if not already saved
    if (!savedLanguage) {
      await AsyncStorage.setItem(LANGUAGE_KEY, selectedLanguage);
    }
  } catch (error) {
    console.error('Error initializing i18n:', error);
    await i18n.use(initReactI18next).init({
      resources,
      lng: 'en-US',
      fallbackLng: 'en-US',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  }
};

initI18n();

export default i18n;
