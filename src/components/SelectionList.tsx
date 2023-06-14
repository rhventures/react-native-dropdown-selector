import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import style from '../styles';
import type { Data, ListProperties } from '../types';

/* Renders a modal with a list of selectable items. Takes in props defined in the ListProperties type. */
const SelectionList = (props: ListProperties): JSX.Element => {
  if (!props.display) {
    return <View />;
  }

  const [listHeight, setListHeight] = useState<number>(-props.listHeight),
    [heightChecked, setHeightChecked] = useState<boolean>(false),
    [selectedList, setSelectedList] = useState<Data[]>([]),
    pos = { top: 0, bottom: 0 },
    windowHeight = Dimensions.get('window').height;

  props.selectorRef.current?.measureInWindow((_x, y, _width, height) => {
    pos.top = y - props.listHeight;
    pos.bottom = y + height;
  });

  return (
    <Modal transparent={true} onRequestClose={() => props.setDisplay(false)}>
      <TouchableOpacity
        activeOpacity={1}
        style={style.modalBackground}
        onPress={() => props.setDisplay(false)}
      >
        <View
          onLayout={(e: LayoutChangeEvent) => [
            setHeightChecked(true),
            setListHeight(
              windowHeight - pos.bottom < props.listHeight
                ? pos.top - 5
                : pos.bottom + 5
            ),
          ]}
          style={StyleSheet.flatten([
            style.list,
            props.styles.list,
            {
              maxHeight: props.listHeight,
              marginTop: listHeight,
              opacity: heightChecked ? 1 : 0,
            },
          ])}
        >
          <FlatList
            data={props.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (props.type === 'single') {
                    (props.onSelect as (e: Data) => void)(item);
                    props.setDisplay(false);
                  } else {
                    const list = selectedList.includes(item)
                      ? selectedList.filter((i) => i !== item)
                      : [...selectedList, item];
                    setSelectedList(list);
                    (props.onSelect as (e: Data[]) => void)(list);
                  }
                }}
                style={StyleSheet.flatten([
                  style.item,
                  (props.selected === item.label ||
                    selectedList.includes(item)) && [
                    style.itemSelected,
                    props.styles.itemSelected,
                  ],
                ])}
              >
                <Text style={[style.text, props.styles.text]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SelectionList;
