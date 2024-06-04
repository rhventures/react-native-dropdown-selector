import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    <ScrollView
      nestedScrollEnabled={true}
      horizontal={false} 
      style={StyleSheet.flatten([
        style.list,
        props.styles.list,
        {height: props.display ? 100 : 0},
      ])}
      onLayout={(e: LayoutChangeEvent) => {
        console.log(e.nativeEvent.layout);
      }}
    >
    <ScrollView horizontal={true} nestedScrollEnabled={true}>
    <FlatList
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
    </ScrollView>
    </ScrollView>
  );
};

export default SelectionListNew;