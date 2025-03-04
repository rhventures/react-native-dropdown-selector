import { StyleSheet, ViewStyle, TextStyle, useColorScheme } from 'react-native';

type CommonStyles = {
  background: ViewStyle;
  text: TextStyle;
};

const commonStyles: CommonStyles = {
  background: {},
  text: {},
};

const lightTheme: Partial<CommonStyles> = {
  background: { backgroundColor: '#fafafa' },
  text: { color: '#737373' },
};

const darkTheme: Partial<CommonStyles> = {
  background: { backgroundColor: '#2e2e2e' },
  text: { color: '#c1c1c1' },
};

// Original implementation in ../src/styles.ts
export const useThemeStyles = (mode: 'dark' | 'light' | 'system') => {
  const systemTheme = useColorScheme();
  const selectedTheme = mode === 'system' ? systemTheme : mode;
  const theme = selectedTheme === 'dark' ? darkTheme : lightTheme;

  return StyleSheet.create(
    Object.keys(commonStyles).reduce((acc, key) => {
      const styleKey = key as keyof CommonStyles;
      acc[styleKey] = {
        ...commonStyles[styleKey],
        ...(theme[styleKey] || {}),
      };
      return acc;
    }, {} as CommonStyles)
  );
};