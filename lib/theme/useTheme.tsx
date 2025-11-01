import { useColorScheme } from 'nativewind';
import { THEME } from '.';

const useTheme = () => {
  const { colorScheme } = useColorScheme();
  return THEME[colorScheme ?? 'light'];
};

export default useTheme;
