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
  const style = useColorScheme() === 'dark' ? styles[1] : styles[0];
  const [expanded, setExpanded] = useState<string>('');
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
        onLayout={(e: LayoutChangeEvent) => {
          setExpanded(expanded+1);
          console.log(expanded);
        }}
      >
        {selected === defaultText
          ? <Text
              style={StyleSheet.flatten([style.selectorText, props.boxTextStyle])}
              numberOfLines={1}
            >
              {selected}
            </Text>
          : (selected as string)
            .split(', ')
            .map((str) =>
              <View 
                style={style.selectedInMultiHighlight}
                key={str}
              >
                <Text
                  style={style.selectedInMulti}
                >
                  {str}
                </Text>
              </View>
          )}
        <Text
          style={style.arrow}
        >
          {listDisplay ? 'ᨈ' : 'ᨆ'}
        </Text>
      </TouchableOpacity>
      <SelectionList
        key = {expanded}
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
