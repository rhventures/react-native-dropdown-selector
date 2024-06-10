import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MultiSelect, Select, type Data } from 'react-native-dropdown-selector';

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
        <Select data={data} onSelect={onDataSelect} />
        <Text>Selected: {item || 'None'} (scroll down)</Text>
        <View style={{ height: 500 }} />
        <Text
          style={{
            alignSelf: 'center',
            width: 350,
          }}
        >
          The dropdown menu will display above the input box when there
          isn&quot;t enough space below
        </Text>
{/*
        <Select
          data={data}
          onSelect={(e: Data) => {
            console.log(e.label);
          }}
          placeholderText="Select an item"
          boxStyle={{
            alignSelf: 'center',
            width: 200,
          }}
          listStyle={{
            alignSelf: 'center',
            width: 200,
          }}
        />
*/}
        <MultiSelect
          data={data}
          onSelect={(e: Data[]) => console.log(e)}
        />
        <View style={{ height: 400 }}/>
        <Text>{'Single Selects:'}</Text>
        <View style={{ flexDirection: 'row', height: 100 }}>
          <View style={{ flex: 1 }}>
            <Select
              data={data}
              onSelect={(e: Data) => console.log(e)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Select
              data={data}
              onSelect={(e: Data) => console.log(e)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Select
              data={data}
              onSelect={(e: Data) => console.log(e)}
            />
          </View>
        </View>
        <Text>{'Multi Selects:'}</Text>
        <View style={{ height: 400 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <MultiSelect
                data={data}
                onSelect={(e: Data[]) => console.log(e)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <MultiSelect
                data={data}
                onSelect={(e: Data[]) => console.log(e)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <MultiSelect
                data={data}
                onSelect={(e: Data[]) => console.log(e)}
              />
            </View>
          </View>
          <Text style={{ textAlign: 'center' }}>
            {'Select more than one item and see me move!'}
          </Text>
        </View>
        <Text>{'Styled Single Select:'}</Text>
        <Select
          data={data}
          onSelect={(e: Data) => console.log(e)}
        />
        <Text>{'Styled Multi Select:'}</Text>
        <MultiSelect
          data={data}
          onSelect={(e: Data[]) => console.log(e)}
        />
        <View style={{ height: 400 }} />
      </ScrollView>
    </>
  );
}

export default App;
