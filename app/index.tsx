import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';
import ThemeToggle from '@/components/ui/theme-toggle';
import { useTranslation } from 'react-i18next';
import '@/src/i18n';
import LanguageToggle from '@/components/ui/language-toggle';

const APP_NAME = 'OSNepal';

const SCREEN_OPTIONS = {
  light: {
    title: APP_NAME,
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ToggleButtonGroup />,
  },
  dark: {
    title: APP_NAME,
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ToggleButtonGroup />,
  },
};

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
      <View className="flex-1 items-center justify-center">
        <Text className={'text-2xl font-bold'}>{t('home.welcome')}</Text>
        <Text className={'text-gray-500'}>{t('home.description')}</Text>
      </View>
    </>
  );
}

function ToggleButtonGroup() {
  return (
    <View className="flex-row items-center justify-end">
      <LanguageToggle />
      <ThemeToggle />
    </View>
  );
}
