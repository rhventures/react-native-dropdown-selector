import React, { useState } from 'react';
import { Dimensions, useColorScheme } from 'react-native'
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

  return (<View>
    
  </View>);
};

export default SelectionListNew;