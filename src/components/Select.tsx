import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import styles from '../styles';
import type { Data, SelectorRect, SelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a selector component. Takes in props defined in the SelectProperties type. */
const Select = (props: SelectProperties): React.JSX.Element => {
  const style = styles[useColorScheme() === 'dark' ? 1 : 0];
  const ref = useRef<TouchableOpacity>(null);
  const [listDisplay, setListDisplay] = useState<boolean>(false);
  const [refRect, setRefRect] = useState<SelectorRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [selected, setSelected] = useState<Data>(
    props.defaultValue && props.data.includes(props.defaultValue)
      ? props.defaultValue
      : {label: props.placeholderText ?? 'Click me'}
  );
  const updatePriorities = (data: Data[]) => [
    ...data.filter((d: Data) => d.priority),
    ...data.filter((d: Data) => !d.priority),
  ];
  const updatePos = () =>
    ref.current?.measureInWindow((x, y, width, height) => {
      setRefRect({
        x: x,
        y: y - 5,
        width: props.boxStyle?.width ?? width,
        height: height + 10,
      });
      setListDisplay(true);
    });

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          style.selectorBox,
          props.boxStyle,
          {opacity: props.disabled ? .5 : 1},
        ]}
        disabled={props.disabled}
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
          searchBox: props.searchBoxStyle,
        }}
        data={updatePriorities(props.data)}
        type="single"
        onSelect={props.onSelect}
        selected={selected}
        setSelected={setSelected}
        listHeight={props.listHeight ?? 200}
        display={listDisplay}
        searchable={!!props.searchable}
        hide={() => setListDisplay(false)}
        selectorRect={refRect}
      />
    </View>
  );
};

export default Select;
