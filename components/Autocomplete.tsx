import { View, Text, FlatList } from 'react-native';
import React from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const Autocomplete = ({
  data,
  label,
}: {
  data: { label: string; value: string }[];
  label: string;
}) => {
  const { colorScheme } = useColorScheme();
  const searchRef = React.useRef<any | undefined>(undefined);
  const [search, setSearch] = React.useState('');

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handleOpenFilter = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Input placeholder="Select" onPressIn={handleOpenFilter} editable={false} />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={['50%', '60%', '70%']}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,
            elevation: 15,
          }}
          backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? '#1d1d1d' : 'white' }}
          // handleComponent={() => undefined}
        >
          <BottomSheetView className="gap-4 px-4 pb-4">
            <BottomSheetTextInput
              ref={searchRef}
              placeholder="Search"
              className="rounded-full border-[1px] border-muted-foreground p-4 text-primary transition-all duration-75 focus:border-2 focus:border-primary"
              value={search}
              clearButtonMode={search?.length > 0 ? 'always' : 'while-editing'}
              onChangeText={setSearch}
              // onEndEditing={() => {
              //   bottomSheetModalRef.current?.snapToIndex(0);
              // }}
            />

            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View className="bg-slate-500 px-4 py-4">
                  <Text>{item.label}</Text>
                </View>
              )}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TriggerRef } from '@rn-primitives/select';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from './ui/select';
import { Input } from './ui/input';
import { useColorScheme } from 'nativewind';

export function Dropdown({
  data,
  label,
}: {
  data: { value: string; label: string }[];
  label?: string;
}) {
  const ref = React.useRef<TriggerRef>(null);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  return (
    <Select className="mb-2">
      <SelectTrigger ref={ref} className="">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent insets={contentInsets} className="w-[70%]">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {data.map((item) => (
            <SelectItem key={item.value} label={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Autocomplete;
