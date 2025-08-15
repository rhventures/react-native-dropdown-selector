import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useThemeStyles } from '../styles';
import type { Data, ListProperties } from '../types';

/* Renders a modal with a list of selectable items. Takes in props defined in the ListProperties type. */
const SelectionList = (props: ListProperties): React.JSX.Element => {
  const sidewaysTopMargin = 40;
  const sidewaysHorizontalMargin = 60;
  const sidewaysBorderRadius = 10;
  const sidewaysBorderRadiusBL = 0;
  const sidewaysBorderRadiusBR = 0;
  const uprightTopMargin = 40;
  const style = useThemeStyles(props.theme ?? 'system');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [entries, setEntries] = useState<Data[]>(props.data);
  const [currentListWidth, setCurrentListWidth] = useState<number>(0);
  const [currentListHeight, setCurrentListHeight] = useState<number>(0);
  const [isAbove, setIsAbove] = useState<boolean>(false);
  const [posReady, setPosReady] = useState<boolean>(false);
  let listBottom = props.selectorRect.y + props.selectorRect.height + currentListHeight;

  const updateListState = (listHeight: number) => {
    listBottom = props.selectorRect.y + props.selectorRect.height + listHeight;
    if (listBottom > windowHeight !== isAbove) {
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
      animationType={windowWidth > windowHeight ? 'slide' : 'none'}
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
            windowHeight > windowWidth
              ? {//phone is held vertical
                  left: props.styles.list?.alignSelf === 'center'
                    ? 0
                    : props.styles.list?.width
                    ? props.selectorRect.x
                      + (typeof props.selectorRect.width === 'string'
                        ? Number(props.selectorRect.width.slice(0, -1)) * windowWidth
                        : props.selectorRect.width
                        - currentListWidth) / 2
                    : props.selectorRect.x,
                  width: props.styles.list?.width ?? props.selectorRect.width,
                  maxHeight: props.listHeight,
                  top: keyboardHeight > 0 && listBottom > windowHeight - keyboardHeight
                    ? windowHeight - keyboardHeight - currentListHeight - 5
                    : isAbove
                    ? props.selectorRect.y - currentListHeight
                    : props.selectorRect.y + props.selectorRect.height,
                  opacity: posReady ? 1 : 0,
                }
              : {//phone is held horizontal
                  height: windowHeight - sidewaysTopMargin,
                  marginTop: sidewaysTopMargin,
                  marginHorizontal: sidewaysHorizontalMargin,
                  borderRadius: sidewaysBorderRadius,
                  borderBottomLeftRadius: sidewaysBorderRadiusBL,
                  borderBottomRightRadius: sidewaysBorderRadiusBR,
                },
          ]}
        >
          {props.searchable &&
            <TextInput
              placeholder='Search'
              accessible = {true}
              accessibilityRole='search'
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
            style={windowWidth > windowHeight && { marginBottom: 20 }}
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
                <Text 
                  accessible = {true}
                  accessibilityRole='menuitem'
                  accessibilityState={{selected : (props.type === 'single' ? props.selected === item : (props.selected as Data[]).includes(item))}}
                  style={[style.text, props.styles.text]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {props.type === 'multi' && (props.selected as Data[]).length > 0 &&
          <View
            style={[
              style.clearButton, //move the clear button to the right spot
              props.styles.clearButton,
              windowHeight > windowWidth
                ? {//phone upright
                    top: listBottom < windowHeight
                      ? props.selectorRect.y - uprightTopMargin
                      : props.selectorRect.y + props.selectorRect.height,
                    left: props.selectorRect.x - uprightTopMargin, 
                    marginLeft: props.selectorRect.width,
                    opacity: keyboardHeight === 0 && posReady ? 1 : 0,
                  }
                : {//phone sideways
                    top: sidewaysTopMargin,
                    right: sidewaysBorderRadius,
                  }

            ]}
          >
            <TouchableOpacity
              onPress={props.clearSelected}
            >
              <Text
                accessible = {true}
                accessibilityRole='button'
                accessibilityLabel='clear list'
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
