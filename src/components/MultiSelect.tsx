import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import styles from '../styles';
import type { Data, SelectorPos, MultiSelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a multi-selector component. Takes in props defined in the MultiSelectProperties type. */
const MultiSelect = (props: MultiSelectProperties): React.JSX.Element => {
  const style = styles[useColorScheme() === 'dark' ? 1 : 0];
  const ref = useRef<TouchableOpacity>(null);
  const [listWidth, setListWidth] = useState<string | number>(props.listStyle?.width ?? 0);
  const [listX, setListX] = useState<number>(0);
  const [listDisplay, setListDisplay] = useState<boolean>(false);
  const [pos, setPos] = useState<SelectorPos>({top: 0, bottom: 0});
  const [selected, setSelected] = useState<Data[]>([]);
  const selectItem = (items: Data[]) => {
    setSelected(items);
    props.onSelect(items);
  };
  const updatePriorities = (data: Data[]) => [
    ...data.filter((d: Data) => d.priority),
    ...data.filter((d: Data) => !d.priority),
  ];
  const updatePos = (display = false) => 
    ref.current?.measureInWindow((x, y, width, height) => {
      setListX(x);
      if (props.listStyle?.width === undefined)
        setListWidth(width);
      setPos({
        top: y - (props.listHeight ?? 200) - 5,
        bottom: y + height + 5,
      });
      if (display)
        setListDisplay(true);
    });

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[style.selectorBox, props.boxStyle]}
        onPress={() => updatePos(true)}
        ref={ref}
        onLayout={() => updatePos()}
      >
        {selected.length > 0
          ? selected.map((data) =>
              <View
                key={data.label as string}
                style={[
                  style.selectedInMultiHighlight,
                  props.boxTextHighlightStyle,
                ]}
              >
                <Text
                  style={{
                    ...style.selectorText,
                    marginVertical: 0,
                    ...props.boxTextStyle,
                  }}
                >
                  {data.label}
                </Text>
              </View>
            )
          : <Text
              style={[style.selectorText, props.boxTextStyle]}
            >
              {props.placeholderText ?? 'Click me'}
            </Text>
        }
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
          clearButton: props.clearButtonStyle,
          clearButtonIcon: props.clearButtonIconColor,
        }}
        data={updatePriorities(props.data)}
        type="multi"
        onSelect={selectItem}
        selected={selected}
        clearSelected={() => setSelected([])}
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

export default MultiSelect;
