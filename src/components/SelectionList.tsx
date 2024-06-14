import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import styles from '../styles';
import type { Data, ListProperties } from '../types';

/* Renders a modal with a list of selectable items. Takes in props defined in the ListProperties type. */
const SelectionList = (props: ListProperties) => {
  const style = styles[useColorScheme() === 'dark' ? 1 : 0],
    windowHeight = Dimensions.get('window').height,
    windowWidth = Dimensions.get('window').width,
    [keyboardHeight, setKeyboardHeight] = useState<number>(0),
    [entries, setEntries] = useState<Data[]>(props.data),
    [currentListHeight, setCurrentListHeight] = useState<number>(0),
    [currentListWidth, setCurrentListWidth] = useState<number>(0),
    listBottom = currentListHeight + props.selectorRect.bottom;
    
  Keyboard.addListener(
    'keyboardDidShow',
    () => setKeyboardHeight(Keyboard.metrics()?.height ?? 0)
  );
  Keyboard.addListener(
    'keyboardDidHide',
    () => setKeyboardHeight(0)
  );

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
            setCurrentListHeight(nativeEvent.layout.height);
            setCurrentListWidth(nativeEvent.layout.width);
          }}
          style={[
            style.list,
            props.styles.list,
            windowHeight > windowWidth
              ? {
                  maxHeight: props.listHeight,
                  width: props.styles.list?.width
                    ?? props.selectorRect.right - props.selectorRect.left,
                  marginLeft: props.styles.list?.alignSelf === 'center'
                    ? 0
                    : props.styles.list?.width
                    ? props.selectorRect.left
                      + (props.selectorRect.right
                        - props.selectorRect.left
                        - currentListWidth) / 2
                    : props.selectorRect.left,
                  top: keyboardHeight > 0 && listBottom > windowHeight - keyboardHeight
                    ? windowHeight - keyboardHeight - currentListHeight - 5
                    : listBottom < windowHeight
                    ? props.selectorRect.bottom
                    : props.selectorRect.top - currentListHeight,
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
          {props.searchable &&
            <TextInput
              placeholder='Search'
              style={[style.searchBox, props.styles.searchBox]}
              onChangeText={(input: string) => 
                setEntries(props.data.filter((data: Data) => 
                  typeof data.label === 'string' &&
                  data.label.toLowerCase().includes(input.toLowerCase())
              ))}
              onLayout={() => setEntries(props.data)}
            />
          }
          <FlatList
            data={entries}
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
              props.styles.clearButtonStyle,
              windowHeight > windowWidth
                ? {
                    top: listBottom < windowHeight
                      ? props.selectorRect.top - 40
                      : props.selectorRect.bottom,
                    left: props.selectorRect.right - 40,
                    opacity: keyboardHeight > 0 ? 0 : 1,
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
                  color: props.styles.clearButtonIconColor ?? style.clearIcon.color,
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
