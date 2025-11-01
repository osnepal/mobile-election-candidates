import { ImageSourcePropType } from 'react-native';

export type AutocompleteItem = {
  label: string;
  value: string;
};

export type Candidate = {
  id: number;
  name: string;
  party: string;
  avatar: ImageSourcePropType;
  votes?: number;
  verified: boolean;
};
