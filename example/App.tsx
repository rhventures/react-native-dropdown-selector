import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MultiSelect, Select, type Data } from '@rose-hulman/react-native-dropdown-selector';

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

const options: Data[] = [
  { label: 'Disabled' },
  { label: 'Searchable' },
];

function App(): React.JSX.Element {
  const [selected, setSelected] = React.useState<string>('');
  const [removed, setRemoved] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState(false);
  const [searchable, setSearchable] = React.useState(false);
  const onDataSelect = (datum: Data) => {
    setSelected(datum.label as string);
    setRemoved('');
  };
  const onDataRemove = (datum: Data) => {
    setSelected(selected.split(', ').filter(item => item !== datum.label).join(', '));
    setRemoved(removed => removed + (removed.length === 0 ? '' : ', ') + datum.label);
  };
  const onMultiDataSelect = (data: Data[]) => {
    setSelected(data.map(datum => datum.label).join(", "));
    setRemoved('');
  };

  return (
    <>
      <View style={{ height: 40 }} />
      <ScrollView style={{ paddingHorizontal: 8 }}>
        <View style={{ height: 40 }} />
        <Select
          data={data}
          onSelect={onDataSelect}
          disabled={disabled}
          searchable={searchable}
        />
        <Text>
          Selected: {(selected || 'None')+'\n'}
          Removed: {(removed || 'None')+'\n'}
          (scroll down to see more examples)
        </Text>
        <View style={{ height: 500 }} />
        <Text
          style={{
            alignSelf: 'center',
            width: 350,
          }}
        >
          The dropdown menu will display above the input box when there
          isn&apos;t enough space below
        </Text>
        <Select
          data={data}
          onSelect={onDataSelect}
          disabled={disabled}
          searchable={searchable}
          placeholderText="Select an item"
          boxStyle={{
            alignSelf: 'center',
            width: 200,
          }}
        />
        <MultiSelect
          data={data}
          onSelect={onMultiDataSelect}
          onRemove={onDataRemove}
          disabled={disabled}
          searchable={searchable}
        />
        <View style={{ height: 400 }}/>
        <Text>Single Selects:</Text>
        <View style={{ flexDirection: 'row', height: 100 }}>
          <View style={{ flex: 1 }}>
            <Select
              data={data}
              onSelect={onDataSelect}
              disabled={disabled}
              searchable={searchable}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Select
              data={data}
              onSelect={onDataSelect}
              disabled={disabled}
              searchable={searchable}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Select
              data={data}
              onSelect={onDataSelect}
              disabled={disabled}
              searchable={searchable}
            />
          </View>
        </View>
        <Text>Multi Selects:</Text>
        <View style={{ height: 400 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <MultiSelect
                data={data}
                onSelect={onMultiDataSelect}
                onRemove={onDataRemove}
                disabled={disabled}
                searchable={searchable}
              />
            </View>
            <View style={{ flex: 1 }}>
              <MultiSelect
                data={data}
                onSelect={onMultiDataSelect}
                onRemove={onDataRemove}
                disabled={disabled}
                searchable={searchable}
              />
            </View>
            <View style={{ flex: 1 }}>
              <MultiSelect
                data={data}
                onSelect={onMultiDataSelect}
                onRemove={onDataRemove}
                disabled={disabled}
                searchable={searchable}
              />
            </View>
          </View>
          <Text style={{ textAlign: 'center', height: 100 }}>
            Select more than one item and see me move!
          </Text>
          <MultiSelect
            data={options}
            onSelect={(data: Data[]) => {
              if (data.includes(options[0])) {
                setDisabled(true);
              }
              if (data.includes(options[1])) {
                setSearchable(true);
              }
            }}
            onRemove={(data: Data) => {
              if (data === options[0]) {
                setDisabled(false);
              } else if (data === options[1]) {
                setSearchable(false);
              }
            }}
            placeholderText='Selector Settings'

          />
        </View>
        <Text>Styled Single Select:</Text>
        <Select
          data={data}
          onSelect={onDataSelect}
          disabled={disabled}
          searchable={searchable}
          defaultValue={data[0]}
          listHeight={300}
          placeholderText='I am very stylish'
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
            textShadowOffset: { width: -2, height: 2 },
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
            borderBottomWidth: 2,
            width: '50%',
          }}
          listTextStyle={{
            alignSelf: 'center',
            color: 'brown',
            fontFamily: 'times new roman',
            fontSize: 20,
          }}
          selectedItemStyle={{
            backgroundColor: 'yellow',
            borderTopColor: 'darkgreen',
            borderBottomColor: 'darkgreen',
            borderTopWidth: 2,
            borderBottomWidth: 2,
          }}
          dropdownArrowColor='darkgreen'
          searchBoxStyle={{
            backgroundColor: 'lightgray',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 16,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 30,
            borderColor: 'darkgreen',
            borderTopWidth: 4,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            color: 'brown',
            fontSize: 16,
            height: 46,
            paddingHorizontal: 12,
            paddingTop: 14,
          }}
        />
        <View style={{height: 50}} />
        <Text>Styled Multi Select:</Text>
        <MultiSelect
          data={data}
          onSelect={onMultiDataSelect}
          onRemove={onDataRemove}
          disabled={disabled}
          searchable={searchable}
          defaultValue={data}
          listHeight={300}
          placeholderText='I am very stylish'
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
            textShadowOffset: { width: -2, height: 2 },
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
            borderBottomWidth: 2,
            width: '50%',
          }}
          listTextStyle={{
            alignSelf: 'center',
            color: 'brown',
            fontFamily: 'times new roman',
            fontSize: 20,
          }}
          selectedItemStyle={{
            backgroundColor: 'yellow',
            borderTopColor: 'darkgreen',
            borderBottomColor: 'darkgreen',
            borderTopWidth: 2,
            borderBottomWidth: 2,
          }}
          dropdownArrowColor='darkgreen'
          clearButtonStyle={{
            backgroundColor: 'darkgreen',
            borderTopLeftRadius: 34,
            borderBottomRightRadius: 34,
            borderTopRightRadius: 6,
            borderBottomLeftRadius: 6,
            borderColor: 'darkgreen'
          }}
          clearButtonIconColor='#abc'
          searchBoxStyle={{
            backgroundColor: 'lightgray',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 16,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 30,
            borderColor: 'darkgreen',
            borderTopWidth: 4,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            color: 'brown',
            fontSize: 16,
            height: 46,
            paddingHorizontal: 12,
            paddingTop: 14,
          }}
        />
        <View style={{ height: 700 }} />
      </ScrollView>
    </>
  );
}

export default App;
