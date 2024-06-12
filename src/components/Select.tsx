import React, { useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  type NativeScrollRectangle,
} from 'react-native';
import styles from '../styles';
import type { Data, SelectProperties } from '../types';
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
    [refRect, setRefRect] = useState<NativeScrollRectangle>({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }),
    updatePos = () =>
      ref.current?.measureInWindow((x, y, width, height) => {
        setRefRect({
          left: x,
          top: y - 5,
          right: x + width,
          bottom: y + height + 5,
        });
        setListDisplay(true);
      });

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[style.selectorBox, props.boxStyle]}
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
        }}
        data={updatePriorities(props.data)}
        type="single"
        onSelect={selectItem}
        selected={selected}
        listHeight={props.listHeight ?? 200}
        display={listDisplay}
        hide={() => setListDisplay(false)}
        selectorRect={refRect}
      />
    </View>
  );
};

export default Select;
