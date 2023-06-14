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
} from 'react-native';
import dropdownArrow from '../assets/down.png';
import style from '../styles';
import type { Data, ListProperties, SelectorProperties } from '../types';

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
const Select = (props: SelectorProperties): JSX.Element => {
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

export default Select;
