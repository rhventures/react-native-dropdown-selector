import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeStyles } from '../styles';
import type { Data, SelectorRect, SelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a selector component. Takes in props defined in the SelectProperties type. */
const Select = (props: SelectProperties): React.JSX.Element => {
  const defaultPlaceholderText = 'Click me';
  const disabledOpacity = .5;
  const enabledOpacity = 1;
  const refRectYOffset = 5;
  const defaultListHeight = 200;
  const style = useThemeStyles(props.theme ?? 'system');
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
      : {label: props.placeholderText ?? defaultPlaceholderText}
  );
  const updatePriorities = (data: Data[]) => [
    ...data.filter((d: Data) => d.priority),
    ...data.filter((d: Data) => !d.priority),
  ];
  const updatePos = () =>
    ref.current?.measureInWindow((x, y, width, height) => {
      setRefRect({
        x: x,
        y: y - refRectYOffset,
        width: props.boxStyle?.width ?? width,
        height: height + 2*refRectYOffset,
      });
      setListDisplay(true);
    });

  return (
    <View>
      <TouchableOpacity
        accessible = {true}
        accessibilityRole='menu'
        accessibilityLabel='single-select dropdown'
        accessibilityValue={{text: (selected.label + ' selected' )}}
        activeOpacity={1}
        style={[
          style.selectorBox,
          props.boxStyle,
          {opacity: props.disabled ? disabledOpacity : enabledOpacity},
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
        listHeight={props.listHeight ?? defaultListHeight}
        display={listDisplay}
        searchable={!!props.searchable}
        hide={() => setListDisplay(false)}
        selectorRect={refRect}
        theme={props.theme}
      />
    </View>
  );
};

export default Select;
