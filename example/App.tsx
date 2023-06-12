import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import Selector, { type Data } from '../index';

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
  const [item, setItem] = React.useState<string | JSX.Element>(''),
    onDataSelect = (e: Data): void => setItem(e.label);

  return (
    <>
      <View style={{ height: 40 }} />
      <ScrollView>
        <View style={{ height: 40 }} />
        <Selector data={data} onSelect={onDataSelect} />
        <Text>Selected: {item || 'None'} (scroll down)</Text>
        <View style={{ height: 700 }} />
        <Text>
          The dropdown menu will display above the input box when there
          isn&quot;t enough space below
        </Text>
        <Selector
          data={data}
          onSelect={(e: Data) => {
            console.log(e.label);
          }}
          placeholderText="Select an item"
        />
        <View style={{ height: 700 }} />
      </ScrollView>
    </>
  );
}

export default App;
