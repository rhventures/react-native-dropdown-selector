import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import dropdownArrow from '../assets/down.png';

export interface Data {
  label: string | JSX.Element;
  priority?: boolean;
  data?: object;
}
interface SelectorProperties {
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
interface ListProperties {
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

const style = StyleSheet.create({
  selectorBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    paddingHorizontal: 2,
    height: 40,
    margin: 5,
    backgroundColor: 'white',
  },
  selectorText: {
    fontSize: 16,
    paddingLeft: 2,
  },
  arrow: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    position: 'absolute',
    right: 5,
  },
  arrowListDisplayed: {
    transform: [{ rotate: '180deg' }],
  },
  list: {
    backgroundColor: 'white',
    flexGrow: 0,
    marginHorizontal: 5,
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  text: {
    fontSize: 16,
    paddingLeft: 5,
  },
  itemSelected: {
    backgroundColor: 'lightblue',
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
});

/* Renders a modal with a list of selectable items. Takes in props defined in the ListProperties type. */
const SelectionList = (props: ListProperties): JSX.Element => {
  if (!props.display) {
    return <View />;
  }

  const [listHeight, setListHeight] = useState<number>(-props.listHeight),
    [heightChecked, setHeightChecked] = useState<boolean>(false),
    pos = { top: 0, bottom: 0 },
    windowHeight = Dimensions.get('window').height;

  props.selectorRef.current?.measureInWindow((_x, y, _width, height) => {
    pos.top = y - props.listHeight;
    pos.bottom = y + height;
  });

  return (
    <Modal transparent={true} onRequestClose={() => props.setDisplay(false)}>
      <TouchableOpacity
        activeOpacity={1}
        style={style.modalBackground}
        onPress={() => props.setDisplay(false)}
      >
        <View
          onLayout={(e: LayoutChangeEvent) => [
            setHeightChecked(true),
            setListHeight(
              windowHeight - pos.bottom < props.listHeight
                ? pos.top - 5
                : pos.bottom + 5
            ),
          ]}
          style={StyleSheet.flatten([
            style.list,
            props.styles.list,
            {
              maxHeight: props.listHeight,
              marginTop: listHeight,
              opacity: heightChecked ? 1 : 0,
            },
          ])}
        >
          <FlatList
            data={props.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  props.onSelect(item);
                  props.setDisplay(false);
                }}
                style={StyleSheet.flatten([
                  style.item,
                  props.selected === item.label && style.itemSelected,
                  props.selected === item.label && props.styles.itemSelected,
                ])}
              >
                <Text style={[style.text, props.styles.text]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

/* Renders a selector component. Takes in props defined in the SelectorProperties type. */
const Selector = (props: SelectorProperties): JSX.Element => {
  const [listDisplay, setListDisplay] = useState<boolean>(false),
    [selected, setSelected] = useState<string | JSX.Element>(
      props.selected && props.data.includes(props.selected)
        ? props.selected.label
        : props.placeholderText
        ? props.placeholderText
        : 'Click me'
    ),
    clickSelector = (): void => {
      setListDisplay(!listDisplay);
    },
    selectItem = (item: Data): void => {
      setSelected(item.label);
      props.onSelect(item);
    },
    updatePriorities = (data: Data[]): Data[] => {
      return [
        ...data.filter((d) => d.priority),
        ...data.filter((d) => !d.priority),
      ];
    },
    ref = useRef(null);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.flatten([style.selectorBox, props.boxStyle])}
        onPress={clickSelector}
        ref={ref}
      >
        <Text
          style={StyleSheet.flatten([style.selectorText, props.boxTextStyle])}
        >
          {selected}
        </Text>
        <Image
          source={dropdownArrow}
          style={StyleSheet.flatten([
            style.arrow,
            listDisplay && style.arrowListDisplayed,
          ])}
        />
      </TouchableOpacity>
      <SelectionList
        styles={{
          list: props.listStyle ? props.listStyle : undefined,
          text: props.listTextStyle ? props.listTextStyle : undefined,
          itemSelected: props.selectedItemStyle
            ? props.selectedItemStyle
            : undefined,
        }}
        data={updatePriorities(props.data)}
        onSelect={selectItem}
        selected={selected}
        listHeight={props.listHeight ? props.listHeight : 200}
        display={listDisplay}
        setDisplay={setListDisplay}
        selectorRef={ref}
      />
    </View>
  );
};

export default Selector;
