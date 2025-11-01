import { Platform, View } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { Text } from '@/components/ui/text';
import { NAV_THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';

const Appbar = ({
  back = false,
  title,
  left,
  right,
}: {
  back?: boolean;
  title?: string | React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) => {
  const { colorScheme } = useColorScheme();
  const { canGoBack, goBack } = useNavigation();

  const handleBackPress = () => {
    if (canGoBack()) {
      goBack();
    }
  };

  const height = Platform.OS === 'android' ? 'h-[60px]' : 'h-[44px]';
  const titleAlign = Platform.OS === 'android' ? 'text-left text-xl' : 'text-center text-lg';

  return (
    <>
      <View
        style={{ backgroundColor: NAV_THEME[colorScheme ?? 'light'].colors.background }}
        className={cn(['relative flex flex-row items-center', height])}>
        {(back || left) && (
          <View className="absolute left-0 z-50 mx-2 flex flex-row items-center gap-2">
            {back && (
              <Button
                className="rounded-full"
                size="icon"
                variant="ghost"
                onPress={handleBackPress}>
                <Icon as={ArrowLeft} className="z-50 size-6" />
              </Button>
            )}
            {left && left}
          </View>
        )}

        {title && typeof title === 'string' ? (
          <Text
            className={`flex flex-1 font-[600] ${left || back ? (Platform.OS === 'android' ? 'pl-14' : 'p-0') : 'pl-6'} ${titleAlign}`}>
            {title}
          </Text>
        ) : (
          title
        )}

        {right && <View className="absolute right-0 mx-2">{right}</View>}
      </View>
      <Separator />
    </>
  );
};

export default Appbar;
