import type {
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export interface Data {
  label: string | React.JSX.Element;
  priority?: boolean;
}

export interface SelectorPos {
  top: number;
  bottom: number;
}

export interface ListProperties {
  styles: {
    list?: ViewStyle;
    text?: TextStyle;
    itemSelected?: TextStyle;
  };
  data: Data[];
  type: 'single' | 'multi';
  onSelect: ((e: Data) => void) | ((e: Data[]) => void);
  selected: Data[] | Data;
  clearSelected?: () => void;
  listHeight: number;
  display: boolean;
  hide: () => void;
  selectorRef: React.RefObject<TouchableOpacity>;
  selectorPos: SelectorPos;
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
  dropdownArrowColor?: string;
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
  dropdownArrowColor?: string;
}
