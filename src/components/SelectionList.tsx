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
  const style = styles[useColorScheme() === 'dark' ? 1 : 0];
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [currentListWidth, setCurrentListWidth] = useState<number>(0);
  const [currentListHeight, setCurrentListHeight] = useState<number>(0);
  const listBottom = props.selectorRect.y + props.selectorRect.height + currentListHeight;

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
    >
      <TouchableOpacity
        activeOpacity={1}
        style={style.modalBackground}
        onPress={props.hide}
      >
        <View
          onLayout={({ nativeEvent }) => {
            setCurrentListWidth(nativeEvent.layout.width);
            setCurrentListHeight(nativeEvent.layout.height);
          }}
          style={[
            style.list,
            props.styles.list,
            windowHeight > windowWidth
              ? {
                  left: props.styles.list?.alignSelf === 'center'
                    ? 0
                    : props.styles.list?.width
                    ? props.selectorRect.x
                      + ((typeof props.selectorRect.width === 'string'
                        ? Number(props.selectorRect.width.replace('%', '')) / 100 * windowWidth
                        : props.selectorRect.width)
                          - currentListWidth) / 2
                    : props.selectorRect.x,
                  width: props.styles.list?.width ?? props.selectorRect.width,
                  maxHeight: props.listHeight,
                  top: listBottom < windowHeight
                    ? props.selectorRect.y + props.selectorRect.height
                    : props.selectorRect.y - currentListHeight,
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
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (props.type === 'single') {
                    (props.onSelect as (d: Data) => void)(item);
                    props.hide();
                  } else {
                    const selected = props.selected as Data[],
                      newSelected = selected.includes(item)
                        ? selected.filter((d: Data) => d !== item)
                        : [...selected, item];
                    (props.onSelect as (d: Data[]) => void)(newSelected);
                  }
                }}
                style={[
                  style.item,
                  (props.type === 'single'
                    ? props.selected === item
                    : (props.selected as Data[]).includes(item))
                    && [
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
        {props.type === 'multi' && (props.selected as Data[]).length > 0 &&
          <View
            style={[
              style.clearButton,
              props.styles.clearButton,
              windowHeight > windowWidth
                ? {
                    top: listBottom < windowHeight
                      ? props.selectorRect.y - 40
                      : props.selectorRect.y + props.selectorRect.height,
                    left: props.selectorRect.x - 40,
                    marginLeft: props.selectorRect.width,
                  }
                : {
                    top: 40,
                    right: 10,
                  }
              
            ]}
          >
            <TouchableOpacity
              onPress={props.clearSelected}
            >
              <Text
                style={{
                  ...style.clearIcon,
                  color: props.styles.clearButtonIcon ?? style.clearIcon.color,
                }}
              >
                {'×'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      </TouchableOpacity>
    </Modal>
  );
};

export default SelectionList;
