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
  };
  data: Data[];
  type: 'single' | 'multi';
  onSelect: ((e: Data) => void) | ((e: Data[]) => void);
  selected: Data[] | Data;
  clearSelected?: () => void;
  listX: number;
  listWidth: string | number;
  listHeight: number;
  display: boolean;
  hide: () => void;
  selectorRect: SelectorRect;
}

export interface MultiSelectProperties {
  data: Data[];
  onSelect: (e: Data[]) => void;
  defaultValue?: Data[];
  listHeight?: number;
  placeholderText?: string | React.JSX.Element;
  boxStyle?: ViewStyle;
  boxTextStyle?: TextStyle;
  boxTextHighlightStyle?: ViewStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  selectedItemStyle?: TextStyle;
  dropdownArrowColor?: ColorValue;
  clearButtonStyle?: ViewStyle;
  clearButtonIconColor?: ColorValue;
}

export interface SelectProperties {
  data: Data[];
  onSelect: (e: Data) => void;
  defaultValue?: Data;
  listHeight?: number;
  placeholderText?: string | React.JSX.Element;
  boxStyle?: ViewStyle;
  boxTextStyle?: TextStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  selectedItemStyle?: TextStyle;
  dropdownArrowColor?: ColorValue;
}
