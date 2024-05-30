import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native'
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
import styles from '../styles';
import type { Data, ListProperties } from '../types';

/* Renders a modal with a list of selectable items. Takes in props defined in the ListProperties type. */
const SelectionList = (props: ListProperties): JSX.Element => {
  if (!props.display) {
    return <View />;
  }
  const style = useColorScheme() === 'dark' ? styles[1] : styles[0];
  const [listHeight, setListHeight]: [
      number,
      React.Dispatch<React.SetStateAction<number>>
    ] = useState<number>(0),
    [heightChecked, setHeightChecked]: [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>
    ] = useState<boolean>(false),
    [selectedList, setSelectedList]: [
      Data[],
      React.Dispatch<React.SetStateAction<Data[]>>
    ] = useState<Data[]>([]),
    windowHeight: number = Dimensions.get('window').height,
    windowWidth: number = Dimensions.get('window').width,
    [orientation, setOrientation]: [
      string,
      React.Dispatch<React.SetStateAction<string>>
    ] = useState<string>(windowHeight > windowWidth ? 'portrait' : 'landscape'),
    pos: {
      top: number;
      bottom: number;
    } = { top: 0, bottom: 0 };

  props.selectorRef.current?.measureInWindow((_x, y, _width, height) => {
    pos.top = y - props.listHeight;
    pos.bottom = y + height;
  });

  useEffect(() => {
    if (props.type === 'multi') {
      setSelectedList(
        (props.selected as string)
          .split(', ')
          .map((s) => props.data.find((d) => d.label === s))
          .filter((d) => d !== undefined) as Data[]
      );
    }
  }, [props.selected]);

  return (
    <Modal
      transparent={true}
      onRequestClose={() => props.setDisplay(false)}
      supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}
      animationType={windowWidth > windowHeight ? 'slide' : 'none'}
      onOrientationChange={({
        nativeEvent,
      }: {
        nativeEvent: { orientation: string };
      }) => [
        nativeEvent.orientation !== orientation && props.setDisplay(false),
        setOrientation(nativeEvent.orientation),
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={style.modalBackground}
        onPress={() => props.setDisplay(false)}
      >
        <View
          key = {selectedList.toString()}
          onLayout={(e: LayoutChangeEvent) => {
            const newHeight =
              windowHeight - pos.bottom < props.listHeight
                ? pos.top - 5
                : pos.bottom + 5;
            setHeightChecked(
              listHeight === newHeight || windowWidth > windowHeight
            );
            setListHeight(newHeight);
          }}
          style={StyleSheet.flatten([
            style.list,
            props.styles.list,
            windowHeight > windowWidth
              ? {
                  maxHeight: props.listHeight,
                  marginTop: listHeight,
                  opacity: heightChecked ? 1 : 0,
                }
              : {
                  height: windowHeight - 40,
                  marginTop: 40,
                  marginHorizontal: 60,
                  borderRadius: 10,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
          ])}
        >
          <FlatList
            data={props.data}
            style={windowWidth > windowHeight && { marginBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (!heightChecked) return;
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
