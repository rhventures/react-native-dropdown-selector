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
        />
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
          defaultValue={data[0]}
          listHeight={300}
          placeholderText={'I am very stylish'}
          boxStyle={{
            alignSelf: 'center',
            backgroundColor: '#48c',
            borderTopRightRadius: 34,
            borderBottomRightRadius: 16,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 34,
            borderColor: 'darkgreen',
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderTopWidth: 1,
            borderBottomWidth: 4,
            height: 50,
            width: 300,
          }}
          boxTextStyle={{
            color: 'yellow',
            fontFamily: 'courier new',
            fontSize: 24,
            fontStyle: 'italic',
            fontWeight: 'bold',
            paddingHorizontal: 8,
            textShadowColor: 'brown',
            textShadowOffset: {width: -2, height: 2},
            textShadowRadius: 4,
          }}
          listStyle={{
            backgroundColor: '#abc',
            borderTopRightRadius: 16,
            borderBottomRightRadius: 34,
            borderTopLeftRadius: 34,
            borderBottomLeftRadius: 16,
            borderColor: 'darkgreen',
            borderLeftWidth: 4,
            borderRightWidth: 4,
            borderTopWidth: 8,
            borderBottomWidth: 1,
            height: 250,
          }}
          listTextStyle={{
            alignSelf: 'center',
            color: 'brown',
            fontFamily: 'times new roman',
            fontSize: 20,
          }}
          selectedItemStyle={{
            backgroundColor: 'green',
            borderTopColor: 'darkgreen',
            borderBottomColor: 'darkgreen',
            borderTopWidth: 2,
            borderBottomWidth: 2,
          }}
          dropdownArrowColor={'darkgreen'}
        />
        <View style={{height: 50}} />
        <Text>{'Styled Multi Select:'}</Text>
        <MultiSelect
          data={data}
          onSelect={(e: Data[]) => console.log(e)}
          defaultValue={data}
          listHeight={300}
          placeholderText={'I am very stylish'}
          boxStyle={{
            alignSelf: 'center',
            backgroundColor: '#48c',
            borderTopRightRadius: 34,
            borderBottomRightRadius: 16,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 34,
            borderColor: 'darkgreen',
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderTopWidth: 1,
            borderBottomWidth: 4,
            height: 50,
            width: 300,
          }}
          boxTextStyle={{
            color: 'yellow',
            fontFamily: 'courier new',
            fontSize: 24,
            fontStyle: 'italic',
            fontWeight: 'bold',
            paddingHorizontal: 8,
            textShadowColor: 'brown',
            textShadowOffset: {width: -2, height: 2},
            textShadowRadius: 4,
          }}
          boxTextHighlightStyle={{
            backgroundColor: 'darkgreen',
            borderColor: '#abc',
            borderLeftWidth: 4,
            borderRightWidth: 4,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 10,
            paddingHorizontal: 2,
          }}
          listStyle={{
            backgroundColor: '#abc',
            borderTopRightRadius: 16,
            borderBottomRightRadius: 34,
            borderTopLeftRadius: 34,
            borderBottomLeftRadius: 16,
            borderColor: 'darkgreen',
            borderLeftWidth: 4,
            borderRightWidth: 4,
            borderTopWidth: 8,
            borderBottomWidth: 1,
            height: 250,
          }}
          listTextStyle={{
            alignSelf: 'center',
            color: 'brown',
            fontFamily: 'times new roman',
            fontSize: 20,
          }}
          selectedItemStyle={{
            backgroundColor: 'green',
            borderTopColor: 'darkgreen',
            borderBottomColor: 'darkgreen',
            borderTopWidth: 2,
            borderBottomWidth: 2,
          }}
          dropdownArrowColor={'darkgreen'}
          clearButtonStyle={{
            backgroundColor: 'darkgreen',
            borderTopLeftRadius: 34,
            borderBottomRightRadius: 34,
            borderTopRightRadius: 6,
            borderBottomLeftRadius: 6,
            borderColor: 'darkgreen'
          }}
          clearButtonIconColor={'#abc'}
        />
        <View style={{ height: 400 }} />
      </ScrollView>
    </>
  );
}

export default App;
