import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import styles from '../styles';
import type { Data, SelectorPos, SelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a selector component. Takes in props defined in the SelectProperties type. */
const Select = (props: SelectProperties): React.JSX.Element => {
  const style = styles[useColorScheme() === 'dark' ? 1 : 0];
  const ref = useRef<TouchableOpacity>(null);
  const [listWidth, setListWidth] = useState<string | number>(props.listStyle?.width ?? 0);
  const [listX, setListX] = useState<number>(0);
  const [listDisplay, setListDisplay] = useState<boolean>(false);
  const [pos, setPos] = useState<SelectorPos>({top: 0, bottom: 0});
  const [selected, setSelected] = useState<Data>(
    props.defaultValue && props.data.includes(props.defaultValue)
      ? props.defaultValue
      : {label: props.placeholderText ?? 'Click me'}
  );
  const selectItem = (item: Data) => {
    setSelected(item);
    props.onSelect(item);
  };
  const updatePriorities = (data: Data[]) => [
    ...data.filter((d: Data) => d.priority),
    ...data.filter((d: Data) => !d.priority),
  ];
  const updatePos = () =>
    ref.current?.measureInWindow((x, y, width, height) => {
      setListX(x);
      if (props.listStyle?.width === undefined) 
        setListWidth(width);
      setPos({
        top: y - (props.listHeight ?? 200) - 5,
        bottom: y + height + 5,
      });
      setListDisplay(true);
    });

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
        listX={listX}
        listWidth={listWidth}
        listHeight={props.listHeight ?? 200}
        display={listDisplay}
        hide={() => setListDisplay(false)}
        selectorPos={pos}
      />
    </View>
  );
};

export default Select;
