import {
  type TextStyle,
  type TouchableOpacity,
  type ViewStyle,
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
    theme?: 'default' | 'light' | 'dark';
  };
  data: Data[];
  type: 'single' | 'multi';
  onSelect: ((e: Data) => void) | ((e: Data[]) => void);
  selected: string | JSX.Element;
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
  theme?: 'default' | 'light' | 'dark';
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
  theme?: 'default' | 'light' | 'dark';
}
