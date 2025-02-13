import { StyleSheet, ViewStyle, TextStyle, useColorScheme } from 'react-native';

type CommonStyles = {
  selectorBox: ViewStyle;
  selectorText: TextStyle;
  selectedInMultiHighlight: ViewStyle;
  arrow: TextStyle;
  clearButton: ViewStyle;
  clearIcon: TextStyle;
  searchBox: TextStyle & ViewStyle;
  list: ViewStyle;
  text: TextStyle;
  itemSelected: TextStyle;
  modalBackground: ViewStyle;
  item: ViewStyle;
};

const commonStyles: CommonStyles = {
  selectorBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'space-between',
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 24,
    borderWidth: 0.5,
    margin: 5,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  selectorText: {
    fontSize: 16,
    overflow: 'hidden',
    marginVertical: 4,
  },
  selectedInMultiHighlight: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 6,
    marginVertical: 2,
  },
  arrow: {
    width: 28,
    position: 'absolute',
    right: 0,
    paddingBottom: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    borderWidth: 0.5,
    borderRadius: 8,
    right: 5,
  },
  clearIcon: {
    alignSelf: 'center',
    fontSize: 26,
  },
  searchBox: {
    paddingHorizontal: 8,
    height: 40,
    borderWidth: 1,
    margin: 8,
  },
  list: {
    position: 'absolute',
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    paddingLeft: 8,
  },
  itemSelected: {
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    height: 40,
  },
};

const lightTheme: Partial<CommonStyles> = {
  selectorBox: { borderColor: 'black', backgroundColor: 'white' },
  selectorText: { color: '#444' },
  selectedInMultiHighlight: { backgroundColor: '#ccc' },
  arrow: { color: 'black' },
  clearButton: { backgroundColor: 'white', borderColor: 'black' },
  clearIcon: { color: 'black' },
  searchBox: {
    backgroundColor: 'white',
    borderColor: 'black',
    color: '#444',
  },
  list: { backgroundColor: 'white', borderColor: 'black' },
  text: { color: '#444' },
  itemSelected: { backgroundColor: 'lightblue' },
};

const darkTheme: Partial<CommonStyles> = {
  selectorBox: { borderColor: 'black', backgroundColor: '#444' },
  selectorText: { color: '#ddd' },
  selectedInMultiHighlight: { backgroundColor: '#222' },
  arrow: { color: 'white' },
  clearButton: { backgroundColor: '#444', borderColor: 'black' },
  clearIcon: { color: 'white' },
  searchBox: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#ddd',
  },
  list: { backgroundColor: '#444', borderColor: 'black' },
  text: { color: '#ddd' },
  itemSelected: { backgroundColor: 'teal' },
};

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
