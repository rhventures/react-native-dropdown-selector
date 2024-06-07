import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import styles from '../styles';
import type { Data, SelectorPos, SelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a selector component. Takes in props defined in the SelectProperties type. */
const Select = (props: SelectProperties) => {
  const [listDisplay, setListDisplay] = useState<boolean>(false),
    [selected, setSelected] = useState<Data>(
      props.defaultValue && props.data.includes(props.defaultValue)
        ? props.defaultValue
        : {label: props.placeholderText ?? 'Click me'}
    ),
    selectItem = (item: Data) => {
      setSelected(item);
      props.onSelect(item);
    },
    updatePriorities = (data: Data[]) => [
      ...data.filter((d: Data) => d.priority),
      ...data.filter((d: Data) => !d.priority),
    ],
    ref = useRef<TouchableOpacity>(null),
    style = styles[useColorScheme() === 'dark' ? 1 : 0],
    [pos, setPos] = useState<SelectorPos>({top: 0, bottom: 0}),
    updatePos = () => {
      ref.current?.measureInWindow((_x, y, _width, height) => {
        setPos({
          top: y - (props.listHeight ?? 200) - 5,
          bottom: y + height + 5,
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
        hide={() => setListDisplay(false)}
        selectorRef={ref}
        selectorPos={pos}
      />
    </View>
  );
};

export default Select;
