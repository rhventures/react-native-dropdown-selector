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
  };
  data: Data[];
  onSelect: (e: Data) => void;
  selected: string | JSX.Element;
  listHeight: number;
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  selectorRef: React.RefObject<TouchableOpacity>;
}

export interface SelectorProperties {
  data: Data[];
  onSelect: (e: Data) => void;
  selected?: Data;
  listHeight?: number;
  placeholderText?: string | JSX.Element;
  boxStyle?: ViewStyle;
  boxTextStyle?: TextStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  selectedItemStyle?: TextStyle;
}
