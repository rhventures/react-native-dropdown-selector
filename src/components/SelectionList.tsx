import React from 'react';
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
const SelectionList = (props: ListProperties) => {
  const style = styles[useColorScheme() === 'dark' ? 1 : 0],
    windowHeight = Dimensions.get('window').height,
    windowWidth = Dimensions.get('window').width,
    listBottom = Math.min(
      props.listHeight,
      props.data.length * style.item.height
    ) + props.selectorRect.bottom,
    centeredListX = () => {
      const listX = props.selectorRect.left;
      let listWidth: number;
      if (props.styles.list?.width) {
        if (typeof props.styles.list.width === 'number') {
          listWidth = props.styles.list.width;
        }
        else {
          listWidth = Number(props.styles.list.width.replace('%', '')) / 100 * windowWidth;
        }
        const offset = (props.selectorRect.right - props.selectorRect.left - listWidth) / 2;
        return listX + offset;
      }
      return listX;
    };

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
              ? [
                  {
                    maxHeight: props.listHeight,
                    width: props.styles.list?.width
                      ?? props.selectorRect.right - props.selectorRect.left,
                    marginLeft: props.styles.list?.alignSelf === 'center'
                      ? 0
                      : centeredListX(),
                  },
                  listBottom < windowHeight
                    ? {
                        top: props.selectorRect.bottom,
                      }
                    : {
                        bottom: windowHeight - props.selectorRect.top,
                        marginTop: 'auto',
                      },
                ]
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
              props.styles.clearButtonStyle,
              windowHeight > windowWidth
                ? {
                    top: listBottom < windowHeight
                      ? props.selectorRect.top - 40
                      : props.selectorRect.bottom,
                    left: props.selectorRect.right - 40,
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