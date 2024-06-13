import React, { useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  type NativeScrollRectangle,
} from 'react-native';
import styles from '../styles';
import type { Data, MultiSelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a multi-selector component. Takes in props defined in the MultiSelectProperties type. */
const MultiSelect = (props: MultiSelectProperties) => {
  const [listDisplay, setListDisplay] = useState<boolean>(false),
    defaultText = props.placeholderText ?? 'Click me',
    [selected, setSelected] = useState<Data[]>(
      props.data.filter((d: Data) =>
        props.defaultValue?.includes(d))
    ),
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
    [refRect, setRefRect] = useState<NativeScrollRectangle>({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }),
    updatePos = (display = false) =>
      ref.current?.measureInWindow((x, y, width, height) => {
        setRefRect({
          left: x,
          top: y - 5,
          right: x + width,
          bottom: y + height + 5,
        });
        if (display)
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
          clearButtonStyle: props.clearButtonStyle,
          clearButtonIconColor: props.clearButtonIconColor,
        }}
        data={updatePriorities(props.data)}
        type="multi"
        onSelect={selectItem}
        selected={selected}
        clearSelected={() => setSelected([])}
        listHeight={props.listHeight ?? 200}
        display={listDisplay}
        searchable={!!props.searchable}
        hide={() => setListDisplay(false)}
        selectorRect={refRect}
      />
    </View>
  );
};

export default MultiSelect;