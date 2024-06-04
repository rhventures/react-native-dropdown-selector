import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  type LayoutChangeEvent,
} from 'react-native';
import { View } from 'react-native';
import styles from '../styles';
import type { Data, ListProperties } from '../types';

const SelectionListNew = (props: ListProperties): JSX.Element => {
  const [listHeight, setListHeight] : [
      number,
      React.Dispatch<React.SetStateAction<number>>
    ] = useState<number>(0),
    windowHeight: number = Dimensions.get('window').height,
    windowWidth: number = Dimensions.get('window').width,
    style = useColorScheme() === 'dark' ? styles[1] : styles[0];

  return (
    <Modal
      transparent
      visible={props.display}
      onRequestClose={() => {
        props.setDisplay(false);
      }}
      onLayout={(e: LayoutChangeEvent) => {
        console.log(e.nativeEvent.layout);
      }}
    >
      <TouchableWithoutFeedback
        onPressIn={() => {
          props.setDisplay(false);
        }}
      >
        <View
        style={{backgroundColor:'green', flex:1}}>
        <FlatList
          style={{backgroundColor:'black', height: 200}}
          nestedScrollEnabled={true}
          data={props.data}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>{}}>
              <Text style={[style.text, props.styles.text]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}>
        </FlatList>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SelectionListNew;