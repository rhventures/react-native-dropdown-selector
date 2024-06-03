import {
  type TextStyle,
  type TouchableOpacity,
  type ViewStyle,
  type ColorValue
} from 'react-native';

export interface Data {
  label: string | JSX.Element;
  priority?: boolean;
  data?: object;
}

export interface ListProperties {
  styles: {
    list: ViewStyle | undefined;
    text: TextStyle | undefined;
    itemSelected: TextStyle | undefined;
  };
  data: Data[];
  type: 'single' | 'multi';
  onSelect: ((e: Data) => void) | ((e: Data[]) => void);
  selected: Data[] | string | JSX.Element;
  listHeight: number;
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  selectorRef: React.RefObject<TouchableOpacity>;
  overflowNotif: number,
}

export interface MultiSelectProperties {
  data: Data[];
  onSelect: (e: Data[]) => void;
  defaultValue?: Data[];
  listHeight?: number;
  placeholderText?: string | JSX.Element;
  boxStyle?: ViewStyle;
  boxTextStyle?: TextStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  selectedItemStyle?: TextStyle;
  selectedItemHighlightStyle?: ViewStyle;
  dropdownArrowColor?: ColorValue;
}

export interface SelectorProperties {
  data: Data[];
  onSelect: (e: Data) => void;
  defaultValue?: Data;
  listHeight?: number;
  placeholderText?: string | JSX.Element;
  boxStyle?: ViewStyle;
  boxTextStyle?: TextStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  selectedItemStyle?: TextStyle;
  dropdownArrowColor?: ColorValue;
}
