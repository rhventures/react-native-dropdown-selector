import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeStyles } from '../styles';
import type { Data, SelectorRect, MultiSelectProperties } from '../types';
import SelectionList from './SelectionList';

/* Renders a multi-selector component. Takes in props defined in the MultiSelectProperties type. */
const MultiSelect = (props: MultiSelectProperties): React.JSX.Element => {
  const style = useThemeStyles(props.theme ?? 'system');
  const ref = useRef<TouchableOpacity>(null);
  const [listDisplay, setListDisplay] = useState<boolean>(false);
  const testID = props.testID ?? 'selector';
  const [refRect, setRefRect] = useState<SelectorRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [selected, setSelected] = useState<Data[]>(
    props.data.filter((d: Data) =>
    props.defaultValue?.includes(d))
  );
  const updatePriorities = (data: Data[]) => [
    ...data.filter((d: Data) => d.priority),
    ...data.filter((d: Data) => !d.priority),
  ];
  const updatePos = (display = false) =>
    ref.current?.measureInWindow((x, y, width, height) => {
      setRefRect({
        x: x,
        y: y - 5,
        width: props.boxStyle?.width ?? width,
        height: height + 10,
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
        <Text testID={ testID }></Text>
      </TouchableOpacity>
      <SelectionList
        styles={{
          list: props.listStyle,
          text: props.listTextStyle,
          itemSelected: props.selectedItemStyle,
          clearButton: props.clearButtonStyle,
          clearButtonIcon: props.clearButtonIconColor,
          searchBox: props.searchBoxStyle,
        }}
        data={updatePriorities(props.data)}
        type="multi"
        onSelect={props.onSelect}
        onRemove={props.onRemove}
        selected={selected}
        setSelected={setSelected}
        clearSelected={() => {
          if (props.onRemove) {
            selected.forEach(props.onRemove);
          }
          setSelected([]);
        }}
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

export default MultiSelect;
