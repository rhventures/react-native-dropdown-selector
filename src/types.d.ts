import {
  type ColorValue,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

export interface Data {
  label: string | React.JSX.Element;
  priority?: boolean;
  data?: object;
}

export interface SelectorRect {
  x: number;
  y: number;
  width: string | number;
  height: number;
}

export interface ListProperties {
  styles: {
    list?: ViewStyle;
    text?: TextStyle;
    itemSelected?: TextStyle;
    clearButton?: ViewStyle;
    clearButtonIcon?: ColorValue;
    searchBox?: TextStyle & ViewStyle;
  };
  data: Data[];
  type: 'single' | 'multi';
  onSelect: ((e: Data) => void) | ((e: Data[]) => void);
  selected: Data[] | Data;
  clearSelected?: () => void;
  listHeight: number;
  display: boolean;
  searchable: boolean;
  hide: () => void;
  selectorRect: SelectorRect;
}

export interface MultiSelectProperties {
  data: Data[];
  onSelect: (e: Data[]) => void;
  defaultValue?: Data[];
  listHeight?: number;
  placeholderText?: string | React.JSX.Element;
  searchable?: boolean;
  boxStyle?: ViewStyle;
  boxTextStyle?: TextStyle;
  boxTextHighlightStyle?: ViewStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  selectedItemStyle?: TextStyle;
  dropdownArrowColor?: ColorValue;
  clearButtonStyle?: ViewStyle;
  clearButtonIconColor?: ColorValue;
  searchBoxStyle?: TextStyle & ViewStyle;
}

export interface SelectProperties {
  data: Data[];
  onSelect: (e: Data) => void;
  defaultValue?: Data;
  listHeight?: number;
  placeholderText?: string | React.JSX.Element;
  searchable?: boolean;
  boxStyle?: ViewStyle;
  boxTextStyle?: TextStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  selectedItemStyle?: TextStyle;
  dropdownArrowColor?: ColorValue;
  searchBoxStyle?: TextStyle & ViewStyle;
}
