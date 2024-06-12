import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View, useColorScheme,
  type LayoutChangeEvent
} from 'react-native';
import styles from '../styles';
import type { Data, MultiSelectProperties } from '../types';
import SelectionList from './SelectionList';

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
    clickSelector = (): void => {
      setListDisplay(!listDisplay);
    },
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
    style = useColorScheme() === 'dark' ? styles[1] : styles[0],
    [overflowNotif, setOverflowNotif] = useState<number>(0);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.flatten([style.selectorBox, props.boxStyle])}
        onPress={clickSelector}
        ref={ref}
        onLayout={(e: LayoutChangeEvent) => {
          setOverflowNotif(overflowNotif ? 0 : 1);
        }}
      >
        {selected.length > 0
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
          list: props.listStyle ? props.listStyle : undefined,
          text: props.listTextStyle ? props.listTextStyle : undefined,
          itemSelected: props.selectedItemStyle
            ? props.selectedItemStyle
            : undefined,
        }}
        data={updatePriorities(props.data)}
        type="multi"
        onSelect={selectItem}
        selected={selected}
        listHeight={props.listHeight ? props.listHeight : 200}
        display={listDisplay}
        setDisplay={setListDisplay}
        selectorRef={ref}
        overflowNotif={overflowNotif}
      />
    </View>
  );
};

export default MultiSelect;