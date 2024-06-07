import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import styles from '../styles';
import type { Data, SelectorPos, MultiSelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a multi-selector component. Takes in props defined in the MultiSelectProperties type. */
const MultiSelect = (props: MultiSelectProperties) => {
  const [listDisplay, setListDisplay] = useState<boolean>(false),
    defaultText = props.placeholderText ?? 'Click me',
    [selected, setSelected] = useState<Data[]>([]),
    selectItem = (items: Data[]) => {
      setSelected(items);
      props.onSelect(items);
    },
    updatePriorities = (data: Data[]) => [
        ...data.filter((d: Data) => d.priority),
        ...data.filter((d: Data) => !d.priority),
    ],
    ref = useRef<TouchableOpacity>(null),
    style = styles[useColorScheme() === 'dark' ? 1 : 0],
    [pos, setPos] = useState<SelectorPos>({'top': 0, 'bottom': 0}),
    updatePos = (display = false) => {
      ref.current?.measureInWindow((_x, y, _width, height) => {
        setPos({
          'top': y - (props.listHeight ?? 200) - 5,
          'bottom': y + height + 5
        });
        if (display)
          setListDisplay(true);
      });
    };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[style.selectorBox, props.boxStyle]}
        onPress={() => updatePos(true)}
        ref={ref}
        onLayout={() => updatePos()}
      >
        {selected.length
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
              {defaultText}
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
        }}
        data={updatePriorities(props.data)}
        type="multi"
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

export default MultiSelect;
