import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dropdownArrow from '../assets/down.png';
import style from '../styles';
import type { Data, SelectorProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a selector component. Takes in props defined in the SelectorProperties type. */
const Select = (props: SelectorProperties): JSX.Element => {
  const [listDisplay, setListDisplay] = useState<boolean>(false),
    [selected, setSelected] = useState<string | JSX.Element>(
      props.defaultValue && props.data.includes(props.defaultValue)
        ? props.defaultValue.label
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
          numberOfLines={1}
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
        type="single"
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
