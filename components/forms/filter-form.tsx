import { View } from 'react-native';
import React from 'react';
import { Text } from '../ui/text';
import Dropdown from '../DropdownMenu';
import { countries, districts, muncipalities, provinces } from '@/lib/fake';
import { Button } from '../ui/button';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { filterCandidatesSchema } from '@/lib/schemas';
import { Icon } from '../ui/icon';
import { X } from 'lucide-react-native';

export const intialFilterValue = {
  country: 'Nepal',
  province: '',
  district: '',
  muncipality: '',
};
const FilterForm = ({
  onSubmit,
  onClose,
}: {
  onClose?: () => void;
  onSubmit: (data: typeof filterCandidatesSchema.__outputType) => void;
}) => {
  const { control, setValue, handleSubmit, getValues } = useForm({
    defaultValues: intialFilterValue,
    resolver: yupResolver(filterCandidatesSchema),
  });

  return (
    <View className="gap-2">
      <Text>Country</Text>
      <Controller
        name="country"
        render={({ field: { value, onChange } }) => (
          <Dropdown data={countries} label="Country" value={value} onChange={onChange} />
        )}
        control={control}
      />
      <Text>Province</Text>
      <Controller
        name="province"
        render={({ field: { value, onChange } }) => (
          <Dropdown data={provinces} label="Province" value={value} onChange={onChange} />
        )}
        control={control}
      />

      <Text>District</Text>
      <Controller
        name="district"
        render={({ field: { value, onChange } }) => (
          <Dropdown data={districts} label="District" value={value} onChange={onChange} />
        )}
        control={control}
      />

      <Text>Muncipality</Text>
      <Controller
        name="muncipality"
        render={({ field: { value, onChange } }) => (
          <Dropdown data={muncipalities} label="Muncipality" value={value} onChange={onChange} />
        )}
        control={control}
      />

      <View className="flex flex-row items-center gap-4">
        <Button onPress={handleSubmit(onSubmit)} className="my-4 flex-1">
          <Text>Apply</Text>
        </Button>

        <Button
          onPress={() => {
            setValue('country', 'Nepal');
            setValue('province', '');
            setValue('district', '');
            setValue('muncipality', '');

            console.log('nnnn', getValues('country'));
            console.log('dddd', getValues('province'));

            if (onClose) {
              onClose();
            }
          }}
          size="icon"
          variant="outline">
          <Icon as={X} />
        </Button>
      </View>
    </View>
  );
};

export default FilterForm;
