import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import styles from '../styles';
import type { Data, SelectorPos, MultiSelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a multi-selector component. Takes in props defined in the MultiSelectProperties type. */
const MultiSelect = (props: MultiSelectProperties): JSX.Element => {
  const [listDisplay, setListDisplay]: [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(false),
    defaultText: string | JSX.Element = props.placeholderText ?? 'Click me',
    [selected, setSelected]: [
      Data[],
      React.Dispatch<React.SetStateAction<Data[]>>
    ] = useState<Data[]>([]),
    selectItem = (items: Data[]): void => {
      setSelected(items);
      props.onSelect(items);
    },
    updatePriorities = (data: Data[]): Data[] => {
      return [
        ...data.filter((d: Data): boolean => !!d.priority),
        ...data.filter((d: Data): boolean => !d.priority),
      ];
    },
    ref: React.MutableRefObject<TouchableOpacity | null> = useRef(null),
    style = styles[useColorScheme() === 'dark' ? 1 : 0],
    [pos, setPos]: [
      SelectorPos,
      React.Dispatch<React.SetStateAction<SelectorPos>>
    ] = useState<SelectorPos>({'top': 0, 'bottom': 0}),
    updatePos = (display: boolean = false): void => {
      ref.current?.measureInWindow((_x, y, _width, height) => {
        setPos({
          'top': y - (props.listHeight ?? 200) - 5,
          'bottom': y + height + 5
        });
        if (display) setListDisplay(true);
      });
    };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.flatten([style.selectorBox, props.boxStyle])}
        onPress={() => updatePos(true)}
        ref={ref}
        onLayout={() => updatePos()}
      >
        {selected.length
          ? selected.map((data) =>
              <View
                style={StyleSheet.flatten([
                  style.selectedInMultiHighlight,
                  props.boxTextHighlightStyle])}
                key={data.label.toString()}
              >
                <Text
                  style={StyleSheet.flatten([
                    style.selectorText,
                    {marginVertical: 0},
                    props.boxTextStyle])}
                >
                  {data.label}
                </Text>
              </View>
            )
          : <Text
              style={StyleSheet.flatten([style.selectorText, props.boxTextStyle])}
            >
              {defaultText}
            </Text>
        }
        <Text
          style={StyleSheet.flatten([
            style.arrow,
            {color: props.dropdownArrowColor ?? style.arrow.color}])}
        >
          {listDisplay ? 'ᨈ' : 'ᨆ'}
        </Text>
      </TouchableOpacity>
      <SelectionList
        styles={{
          list: props.listStyle,
          text: props.listTextStyle,
          itemSelected: props.selectedItemStyle,
        }}
        data={updatePriorities(props.data)}
        type="multi"
        onSelect={selectItem}
        selected={selected}
        listHeight={props.listHeight ?? 200}
        display={listDisplay}
        setDisplay={setListDisplay}
        selectorRef={ref}
        selectorPos={pos}
      />
    </View>
  );
};

export default MultiSelect;
