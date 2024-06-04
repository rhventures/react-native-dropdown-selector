import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
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
    <View
      onLayout={(e: LayoutChangeEvent) => {
        console.log(e.nativeEvent.layout);
      }}
      style={StyleSheet.flatten([
        style.list,
        props.styles.list,
        {height: props.display ? 100 : 0},
      ])}
    >
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <View>
            <Text style={[style.text, props.styles.text]}>
              {item.label}
            </Text>
          </View>
        )}>

      </FlatList>
    </View>
  );
};

export default SelectionListNew;