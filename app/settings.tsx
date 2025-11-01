import { View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from '@/components/ui/text';
import LanguageToggle from '@/components/ui/language-toggle';
import ThemeToggle, { THEME_ICONS } from '@/components/ui/theme-toggle';
import { Icon } from '@/components/ui/icon';
import { useColorScheme } from 'nativewind';
import { Switch } from '@/components/ui/switch';
import Apppbar from '@/components/Appbar';
import { Languages } from 'lucide-react-native';

const settings = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <Apppbar title="Settings" back />
      <ScrollView className="">
        <View className="flex flex-row items-center justify-between px-4 py-3">
          <View className="flex flex-row items-center gap-4">
            <Icon as={Languages} className="size-5" />
            <View>
              <Text>App Language</Text>
              <Text className="text-sm text-muted-foreground">Select your preferred language</Text>
            </View>
          </View>
          <LanguageToggle />
        </View>

        <View className="flex flex-row items-center justify-between px-4 py-3">
          <View className="flex flex-row items-center gap-4">
            <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
            <View>
              <Text>Dark Mode</Text>
              <Text className="text-sm text-muted-foreground">
                Change to {colorScheme === 'dark' ? 'light' : 'dark'} theme
              </Text>
            </View>
          </View>
          <Switch
            className="h-6 w-9"
            checked={colorScheme === 'dark'}
            onCheckedChange={toggleColorScheme}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default settings;
