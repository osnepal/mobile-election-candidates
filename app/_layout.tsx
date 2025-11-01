import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <I18nextProvider i18n={i18n} defaultNS={'translation'}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: NAV_THEME[colorScheme ?? 'light'].colors.background,
            }}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="[candidateId]" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="main" />
            </Stack>
          </SafeAreaView>
          <PortalHost />
        </I18nextProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
