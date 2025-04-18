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
  Platform,
  StatusBar,
} from 'react-native';
import { useThemeStyles } from '../styles';
import type { Data, ListProperties } from '../types';
import { parseWidth } from '../utils/conversions';

// Gracefully import useSafeAreaInsets from 'react-native-safe-area-context' if available
let useSafeAreaInsets: undefined | (() => { top: number; bottom: number; left: number; right: number });
try {
  useSafeAreaInsets = require('react-native-safe-area-context').useSafeAreaInsets;
} catch {
  console.log('useSafeAreaInsets not available');
}

/* Renders a modal with a list of selectable items. Takes in props defined in the ListProperties type. */
const SelectionList = (props: ListProperties): React.JSX.Element => {
  const style = useThemeStyles(props.theme ?? 'system');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Get the safe area insets if available
  let insets: { top: number; bottom: number; left: number; right: number } | undefined;
  try {
    insets = useSafeAreaInsets?.();
  } catch (e) {
    insets = undefined;
  }

  // Fall back to somewhat safe values if insets are not available
  const topInset = Math.max(insets?.top ?? (Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 45), 25);
  const bottomInset = Math.max(insets?.bottom ?? (Platform.OS === 'ios' ? 34 : 0), 20);
  const leftInset = insets?.left ?? 0;
  const rightInset = insets?.right ?? 0;

  const safeAreaHeight = windowHeight - topInset - bottomInset;

  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [entries, setEntries] = useState<Data[]>(props.data);
  const [currentListWidth, setCurrentListWidth] = useState<number>(0);
  const [currentListHeight, setCurrentListHeight] = useState<number>(0);
  const [isAbove, setIsAbove] = useState<boolean>(false);
  const [posReady, setPosReady] = useState<boolean>(false);
  let listBottom = props.selectorRect.y + props.selectorRect.height + currentListHeight;

  const updateListState = (listHeight: number) => {
    listBottom = props.selectorRect.y + props.selectorRect.height + listHeight;
    if (listBottom > safeAreaHeight !== isAbove) {
      setIsAbove(!isAbove);
    } else {
      setPosReady(true);
    }
  }

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
      onRequestClose={() => {
        setPosReady(false);
        props.hide();
      }}
      supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={style.modalBackground}
        onPress={() => {
          setPosReady(false);
          props.hide();
        }}
      >
        <View
          onLayout={({ nativeEvent }) => {
            setCurrentListWidth(nativeEvent.layout.width);
            setCurrentListHeight(nativeEvent.layout.height);
            updateListState(nativeEvent.layout.height);
          }}
          style={[
            style.list,
            props.styles.list,
            {
              left: props.styles.list?.alignSelf === 'center'
                ? 0
                : props.styles.list?.width
                ? props.selectorRect.x +
                    (parseWidth(props.selectorRect.width, windowWidth) - currentListWidth) / 2 - leftInset
                : props.selectorRect.x - leftInset,
              width: props.styles.list?.width ?? parseWidth(props.selectorRect.width, windowWidth),
              maxHeight: props.listHeight,
              top: keyboardHeight > 0 && listBottom > safeAreaHeight - keyboardHeight
                ? safeAreaHeight - keyboardHeight - currentListHeight - 5
                : isAbove
                ? Math.max(topInset, props.selectorRect.y - currentListHeight)
                : Math.min(
                    windowHeight - bottomInset - currentListHeight,
                    props.selectorRect.y + props.selectorRect.height
                  ),
              opacity: posReady ? 1 : 0,
            },
          ]}
        >
          {props.searchable &&
            <TextInput
              placeholder='Search'
              style={[style.searchBox, props.styles.searchBox]}
              placeholderTextColor={style.searchBox.color}
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
            contentContainerStyle={{ marginBottom: bottomInset }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (props.type === 'single') {
                    (props.setSelected as (d: Data) => void)(item);
                    (props.onSelect as (d: Data) => void)(item);
                    props.hide();
                  } else {
                    const selected = props.selected as Data[];
                    let newSelected: Data[];
                    if (selected.includes(item)) {
                      newSelected = selected.filter((d: Data) => d !== item);
                      (props.setSelected as (d: Data[]) => void)(newSelected);
                      props.onRemove?.(item);
                    } else {
                      newSelected = [...selected, item];
                      (props.setSelected as (d: Data[]) => void)(newSelected);
                      (props.onSelect as (d: Data[]) => void)(newSelected);
                    }
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
                    top: Math.min(
                      windowHeight - bottomInset - 40,
                      listBottom < safeAreaHeight
                        ? Math.max(topInset, props.selectorRect.y - 40)
                        : props.selectorRect.y + props.selectorRect.height
                    ),
                    left: props.selectorRect.x - 40,
                    marginLeft: parseWidth(props.selectorRect.width, windowWidth),
                    opacity: keyboardHeight === 0 && posReady ? 1 : 0,
                  }
                : {
                    // top: Math.max(topInset, props.selectorRect.y - 40),
                    // left: Math.min(
                    //   windowWidth - 40,
                    //   props.selectorRect.x + parseWidth(props.selectorRect.width, windowWidth) - 10
                    // ),
                    left: props.selectorRect.x + parseWidth(props.selectorRect.width, windowWidth) - 40 - leftInset,
                    top: Math.min(
                      windowHeight - bottomInset - 40,
                      listBottom < safeAreaHeight
                        ? Math.max(topInset, props.selectorRect.y - 40 - topInset)
                        : props.selectorRect.y + props.selectorRect.height
                    ),
                    opacity: keyboardHeight === 0 && posReady ? 1 : 0,
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
