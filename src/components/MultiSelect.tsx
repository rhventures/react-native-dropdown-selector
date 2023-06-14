import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dropdownArrow from '../assets/down.png';
import style from '../styles';
import type { Data, MultiSelectProperties } from '../types';
import SelectionList from './SelectionList';

const MultiSelect = (props: MultiSelectProperties): JSX.Element => {
  const [listDisplay, setListDisplay]: [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(false),
    defaultText: string | JSX.Element = props.placeholderText ?? 'Click me',
    [selected, setSelected]: [
      string | JSX.Element,
      React.Dispatch<React.SetStateAction<string | JSX.Element>>
    ] = useState<string | JSX.Element>(
      props.defaultValue
        ? props.defaultValue
            .map((item: Data): string | JSX.Element => item.label)
            .join(', ')
        : defaultText
    ),
    clickSelector = (): void => {
      setListDisplay(!listDisplay);
    },
    selectItem = (items: Data[]): void => {
      setSelected(
        items.length > 0
          ? items
              .map((item: Data): string | JSX.Element => item?.label)
              .join(', ')
          : defaultText
      );
      props.onSelect(items);
    },
    updatePriorities = (data: Data[]): Data[] => {
      return [
        ...data.filter((d: Data): boolean => !!d.priority),
        ...data.filter((d: Data): boolean => !d.priority),
      ];
    },
    ref: React.MutableRefObject<TouchableOpacity | null> = useRef(null);

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
        type="multi"
        onSelect={selectItem}
        selected={selected || ''}
        listHeight={props.listHeight ? props.listHeight : 200}
        display={listDisplay}
        setDisplay={setListDisplay}
        selectorRef={ref}
      />
    </View>
  );
};

export default MultiSelect;
