import Appbar from '@/components/Appbar';
import { CandidateCard } from '@/components/CandidateItem';
import FilterForm from '@/components/forms/filter-form';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import LanguageToggle from '@/components/ui/language-toggle';
import { Text } from '@/components/ui/text';
import ThemeToggle from '@/components/ui/theme-toggle';
import { candidates } from '@/lib/fake';
import { THEME } from '@/lib/theme';
import useTheme from '@/lib/theme/useTheme';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Link, Stack } from 'expo-router';
import { Filter, X , Settings} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import R from 'ramda';

const SCREEN_OPTIONS = {
  light: {
    title: 'VoteMe',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ToggleButtonGroup />,
  },
  dark: {
    title: 'VoteMe',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ToggleButtonGroup />,
  },
};

type Filters = {
  [key: string]: any;
  province?: string | undefined;
  district?: string | undefined;
  muncipality?: string | undefined;
  country: string;
};
export default function Screen() {
  const { colorScheme } = useColorScheme();
  const searchRef = React.useRef<any | undefined>(undefined);
  const [search, setSearch] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const { background, foreground, border } = useTheme();
  const [filters, setFilters] = React.useState<Filters | undefined>({
    country: 'Nepal',
  });
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const [prevOffset, setPrevOffset] = React.useState(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const height = useSharedValue(80);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (Math.abs(currentOffset - prevOffset) < 5) {
      return;
    }

    if (currentOffset < prevOffset) {
      translateY.value = withTiming(0, { duration: 300, easing: Easing.ease });
      opacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
      height.value = withTiming(80, { duration: 300, easing: Easing.ease });
      bottomSheetModalRef.current?.present();
      bottomSheetModalRef.current?.snapToIndex(0);
    } else if (currentOffset > prevOffset) {
      translateY.value = withTiming(-80, { duration: 300, easing: Easing.ease });
      opacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
      height.value = withTiming(0, { duration: 300, easing: Easing.ease });
      bottomSheetModalRef.current?.close();
    }
    setPrevOffset(currentOffset);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
      height: height.value,
    };
  });

  const handleOpenFilter = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseFilter = React.useCallback(() => {
    Keyboard.dismiss();

    bottomSheetModalRef.current?.snapToIndex(0);
  }, []);

  React.useEffect(() => {
    handleOpenFilter();
  }, []);
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
      <Appbar
        title="Election Candidates"
        right={
          <Link href={"/settings"} asChild>
            <Button variant="ghost" size="icon" className='rounded-full'>
              <Icon as={Settings} className='size-5' />
            </Button>
          </Link>
        }
      />

      <Animated.View style={[animatedStyles, { zIndex: -100, position: 'relative' }]}>
        {filters && (
          <View>
            <Text className="px-4 py-1 text-muted-foreground">{t('home.filters')}</Text>
            <ScrollView horizontal className="px-2 pb-1">
              {Object.keys(filters).map(
                (key, index) =>
                  filters[key] && (
                    <View
                      key={key}
                      className="mx-1 flex flex-row items-center justify-center rounded-full border pl-3"
                      style={{ borderColor: border }}>
                      <Text className="text-sm">{filters[key]}</Text>
                      <TouchableOpacity
                        disabled={index === 0}
                        onPress={() => {
                          const removed = R.omit([key], filters) as Filters;
                          setFilters(removed);
                        }}
                        className="m-0 rounded-full px-2.5 py-2.5">
                        <Icon as={X} />
                      </TouchableOpacity>
                    </View>
                  )
              )}
            </ScrollView>
          </View>
        )}
      </Animated.View>

      <ScrollView onScroll={handleScroll} scrollEventThrottle={16} bounces={false}>
        <View className="gap-4 px-4 pb-[80px]">
          {candidates.map((i) => (
            <Link
              key={i.id}
              href={{
                pathname: '/[candidateId]',
                params: {
                  candidateId: i.id,
                },
              }}>
              <CandidateCard data={i} />
            </Link>
          ))}

          {/* TODO :: Experimental Candidate Swipables */}
          <Link
            href={{
              pathname: '/main',
              params: {
                candidateId: '123',
              },
            }}
            asChild>
            <Button>
              <Text>Slider</Text>
            </Button>
          </Link>
        </View>
      </ScrollView>
      <Button
        size="icon"
        variant="outline"
        onPress={handleOpenFilter}
        className="absolute bottom-4 right-4 rounded-full p-6 shadow-md">
        <Icon as={Filter} className="size-5" />
      </Button>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          style={{
            shadowColor: colorScheme === 'dark' ? '#fff' : '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 10,
          }}
          enablePanDownToClose={false}
          snapPoints={focused ? undefined : [70, '30%', '50%', '60%', '70%']}
          backgroundStyle={{
            backgroundColor: background,
            borderTopWidth: 0,
            borderColor: '#b2b2b2',
            // borderRadius: 0,
          }}
          handleIndicatorStyle={{
            backgroundColor: foreground,
          }}
          // handleComponent={() => undefined}
        >
          <BottomSheetView className="gap-4 px-4 pb-4">
            <View>
              <BottomSheetTextInput
                ref={searchRef}
                placeholder="Search"
                multiline={false}
                placeholderTextColor="gray"
                className="rounded-md border-[1.5px] border-border px-4 py-3 text-primary transition-all duration-75 focus:border-[1px] focus:border-primary dark:border-gray-700"
                value={search}
                onFocus={() => {
                  setFocused(true);
                }}
                onBlur={() => {
                  setFocused(false);
                }}
                clearButtonMode={search?.length > 0 ? 'always' : 'while-editing'}
                onChangeText={setSearch}
                // onEndEditing={() => {
                //   bottomSheetModalRef.current?.snapToIndex(0);
                // }}
              />
            </View>

            <FilterForm
              onClose={() => {
                console.log('Closing...');
                Keyboard.dismiss();
                handleCloseFilter();
                setFilters(undefined);
              }}
              onSubmit={(data) => {
                setFilters(data);
                handleCloseFilter();
              }}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
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
