import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import styles from '../styles';
import type { Data, SelectorPos, SelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a selector component. Takes in props defined in the SelectProperties type. */
const Select = (props: SelectProperties): React.JSX.Element => {
  const [listDisplay, setListDisplay]: [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(false),
    [selected, setSelected]: [
      Data,
      React.Dispatch<React.SetStateAction<Data>>
    ] = useState<Data>(
      props.defaultValue && props.data.includes(props.defaultValue)
        ? props.defaultValue
        : {label: props.placeholderText ?? 'Click me'}
    ),
    selectItem = (item: Data): void => {
      setSelected(item);
      props.onSelect(item);
    },
    updatePriorities = (data: Data[]): Data[] => {
      return [
        ...data.filter((d: Data): boolean => !!d.priority),
        ...data.filter((d: Data): boolean => !d.priority),
      ];
    },
    ref: React.MutableRefObject<TouchableOpacity | null> = useRef(null),
    style: typeof styles[0] = styles[useColorScheme() === 'dark' ? 1 : 0],
    [pos, setPos]: [
      SelectorPos,
      React.Dispatch<React.SetStateAction<SelectorPos>>
    ] = useState<SelectorPos>({'top': 0, 'bottom': 0}),
    updatePos = (): void => {
      ref.current?.measureInWindow((_x, y, _width, height): void => {
        setPos({
          'top': y - (props.listHeight ?? 200) - 5,
          'bottom': y + height + 5
        });
        setListDisplay(true);
      });
    };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[style.selectorBox, props.boxStyle]}
        onPress={updatePos}
        ref={ref}
      >
        <Text
          style={[style.selectorText, props.boxTextStyle]}
        >
          {selected.label}
        </Text>
        <Text
          style={{
            ...style.arrow,
            color: props.dropdownArrowColor ?? style.arrow.color,
          }}
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
        type="single"
        onSelect={selectItem}
        selected={selected}
        listHeight={props.listHeight ?? 200}
        display={listDisplay}
        hide={(): void => setListDisplay(false)}
        selectorRef={ref}
        selectorPos={pos}
      />
    </View>
  );
};

export default Select;
