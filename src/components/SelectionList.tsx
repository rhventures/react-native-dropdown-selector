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
  const style = useColorScheme() === 'dark' ? styles[1] : styles[0],
    windowHeight: number = Dimensions.get('window').height,
    windowWidth: number = Dimensions.get('window').width,
    [orientation, setOrientation]: [
      string,
      React.Dispatch<React.SetStateAction<string>>
    ] = useState<string>(windowHeight > windowWidth ? 'portrait' : 'landscape');

  return (
    <Modal
      visible={props.display}
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
          onLayout={(e: LayoutChangeEvent) => {
            console.log('onLayout');
          }}
          style={StyleSheet.flatten([
            style.list,
            props.styles.list,
            windowHeight > windowWidth
              ? {
                  maxHeight: props.listHeight,
                  marginTop: props.selectorPos.bottom + props.listHeight < windowHeight
                    ? props.selectorPos.bottom
                    : props.selectorPos.top,
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
                  if (props.type === 'single') {
                    (props.onSelect as (e: Data) => void)(item);
                    props.setDisplay(false);
                  } else {
                    const list = (props.selected as Data[]).includes(item)
                      ? (props.selected as Data[]).filter((i) => i !== item)
                      : [...(props.selected as Data[]), item];
                    (props.onSelect as (e: Data[]) => void)(list);
                  }
                }}
                style={StyleSheet.flatten([
                  style.item,
                  (props.selected === item.label ||
                    (props.selected as Data[]).includes(item)) && [
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
