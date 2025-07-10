import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeStyles } from '../styles';
import type { Data, SelectorRect, SelectProperties } from '../types';
import SelectionList from './SelectionList';
import Svg, {Path} from 'react-native-svg';

/* Renders a selector component. Takes in props defined in the SelectProperties type. */
const Select = (props: SelectProperties): React.JSX.Element => {
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
        <View style={{ position: 'absolute', right: 0, paddingBottom: 4 }}>
          {listDisplay ? (
            // This is the up arrow "ᨈ"
            <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
              <Path d="M17 14l-5-5-5 5" stroke={props.dropdownArrowColor ?? style.arrow.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>) : (
            // This is the down arrow "ᨆ"
            <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
              <Path d="M7 10l5 5 5-5" stroke={props.dropdownArrowColor ?? style.arrow.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>)}
        </View>
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
        theme={props.theme}
      />
    </View>
  );
};

export default Select;
