import React, { useLayoutEffect, useState } from 'react';
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
const SelectionList = (props: ListProperties): React.JSX.Element => {
  const style = styles[useColorScheme() === 'dark' ? 1 : 0];
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [entries, setEntries] = useState<Data[]>(props.data);
  const [listTop, setListTop] = useState<number>(0);
  const [listLeft, setListLeft] = useState<number>(0);
  const [buttonTop, setButtonTop] = useState<number>(0);
  const width = props.styles.list?.width ?? props.selectorRect.width;
  const listWidth = typeof width === 'string' ? windowWidth*Number(width.slice(0, -1))/100 : width;
  const itemHeight = (props.styles.text?.fontSize ?? 20) * 2;
  const listHeight = Math.min(props.listHeight, props.data.length * itemHeight);

  useLayoutEffect(() => {
    if (props.display === false)
      return;
    const listBottom = props.selectorRect.y + props.selectorRect.height + listHeight;
    console.log('props.selectorRect.y:', props.selectorRect.y, ', props.selectorRect.height:', props.selectorRect.height, ', currentListHeight:', listHeight);
    setListTop(
      keyboardHeight > 0 && listBottom > windowHeight - keyboardHeight
        ? windowHeight - keyboardHeight - listHeight - 5
        : listBottom < windowHeight
        ? props.selectorRect.y + props.selectorRect.height
        : props.selectorRect.y - listHeight
    );
    setListLeft(
      props.styles.list?.alignSelf === 'center'
        ? 0
        : props.styles.list?.width
        ? props.selectorRect.x
          + (typeof props.selectorRect.width === 'string'
            ? Number(props.selectorRect.width.slice(0, -1)) * windowWidth
            : props.selectorRect.width
            - listWidth) / 2
        : props.selectorRect.x
    );
    setButtonTop(
      listBottom < windowHeight
        ? props.selectorRect.y - 40
        : props.selectorRect.y + props.selectorRect.height
    );
  }, [props.display]);

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
          style={[
            style.list,
            props.styles.list,
            windowHeight > windowWidth
              ? {
                  left: listLeft,
                  width: props.styles.list?.width ?? props.selectorRect.width,
                  maxHeight: props.listHeight,
                  top: listTop,
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
              props.styles.clearButton,
              windowHeight > windowWidth
                ? {
                    top: buttonTop,
                    left: props.selectorRect.x - 40,
                    marginLeft: props.selectorRect.width,
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
