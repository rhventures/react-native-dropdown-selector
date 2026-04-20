import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeStyles } from '../styles';
import type { Data, SelectorRect, SelectProperties } from '../types';
import SelectionList from './SelectionList';
import Svg, {Path} from 'react-native-svg';
import { createMeasureHandler, updatePriorities, renderDropdownArrow } from '../utils/SelectorUtils';

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
  const updatePos = createMeasureHandler(ref, setRefRect, setListDisplay, props.boxStyle?.width);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          style.selectorBox,
          props.boxStyle,
          {opacity: props.disabled ? disabledOpacity : enabledOpacity},
        ]}
        disabled={props.disabled}
        onPress={() => updatePos(true)}
        ref={ref}
      >
        <Text
          style={[style.selectorText, props.boxTextStyle]}
        >
          {selected.label}
        </Text>
        {renderDropdownArrow(
          listDisplay,
          props.dropdownArrowColor ?? style.arrow?.color ?? '#000'
        )}
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
