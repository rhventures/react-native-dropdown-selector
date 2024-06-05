import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import styles from '../styles';
import type { Data, ListProperties } from '../types';

/* Renders a modal with a list of selectable items. Takes in props defined in the ListProperties type. */
const SelectionList = (props: ListProperties): React.JSX.Element => {
  const style: typeof styles[0] = styles[useColorScheme() === 'dark' ? 1 : 0],
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
      onRequestClose={props.hide}
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
        nativeEvent.orientation !== orientation && props.hide(),
        setOrientation(nativeEvent.orientation),
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={style.modalBackground}
        onPress={props.hide}
      >
        <View
          style={[
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
          ]}
        >
          <FlatList
            data={props.data}
            style={windowWidth > windowHeight && { marginBottom: 20 }}
            renderItem={({ item }): React.JSX.Element => (
              <TouchableOpacity
                onPress={(): void => {
                  if (props.type === 'single') {
                    (props.onSelect as (d: Data) => void)(item);
                    props.hide();
                  } else {
                    const list = (props.selected as Data[]).includes(item)
                      ? (props.selected as Data[]).filter((d: Data): boolean => d !== item)
                      : [...(props.selected as Data[]), item];
                    (props.onSelect as (d: Data[]) => void)(list);
                  }
                }}
                style={[
                  style.item,
                  (props.selected === item.label ||
                    (props.selected as Data[]).includes(item)) && [
                    style.itemSelected,
                    props.styles.itemSelected,
                  ],
                ]}
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
