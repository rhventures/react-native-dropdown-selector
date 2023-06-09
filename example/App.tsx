import React from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Selector, { Data } from '../index';

const data: Data[] = [
  { label: 'Item 1' },
  { label: 'Item 2' },
  { label: 'Item 3', priority: true },
  { label: 'Item 4' },
  { label: 'Item 5' },
  { label: 'Item 6' },
  { label: 'Item 7', priority: true },
  { label: 'Item 8' },
];

function App(): JSX.Element {
  const [item, setItem] = React.useState<string | JSX.Element>('');
  const [offset, setOffset] = React.useState<number>(0);
  const onDataSelect = (e: Data): void => setItem(e.label);

  return (
    <ScrollView
      onScroll={({
        nativeEvent,
      }: NativeSyntheticEvent<NativeScrollEvent>): void => {
        setOffset(nativeEvent.contentOffset.y);
      }}
      scrollEventThrottle={50}
    >
      <View style={{ height: 40 }} />
      <Selector data={data} onSelect={onDataSelect} scrollOffset={offset} />
      <Text>Selected: {item || 'None'} (scroll down)</Text>
      <View style={{ height: 700 }} />
      <Text>
        The dropdown menu will display above the input box when there isn&quot;t
        enough space below
      </Text>
      <Selector
        data={data}
        onSelect={(e: Data) => {
          console.log(e.label);
        }}
        scrollOffset={offset}
        placeholderText="Select an item"
      />
      <View style={{ height: 700 }} />
    </ScrollView>
  );
}

export default App;
