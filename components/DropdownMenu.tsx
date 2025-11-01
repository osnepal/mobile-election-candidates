import { Platform } from 'react-native';
import React from 'react';
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
import { AutocompleteItem } from '@/lib/models';

export default function DropdownMenu({
  data,
  label,
  onChange,
  value,
  defaultvalue,
}: {
  data: AutocompleteItem[];
  defaultvalue?: AutocompleteItem | undefined;
  value?: string | undefined;
  label?: string;
  onChange: (i: string | undefined) => void;
}) {
  const ref = React.useRef<TriggerRef>(null);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  // Workaround for rn-primitives/select not opening on mobile
  function onTouchStart() {
    ref.current?.open();
  }

  const selectedValue = data.find((i) => i.value === value) || undefined;

  return (
    <Select
      className="mb-2"
      // @ts-ignore
      value={selectedValue || { label: undefined, value: undefined }}
      defaultvalue={defaultvalue}
      onValueChange={(v) => {
        onChange(v?.value);
      }}>
      <SelectTrigger ref={ref} className="">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent insets={contentInsets} align="end" className="w-[70%]">
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
