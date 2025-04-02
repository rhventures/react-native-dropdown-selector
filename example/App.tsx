import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MultiSelect, Select, type Data } from '@rose-hulman/react-native-dropdown-selector';
import { useThemeStyles } from './styles';

const DEBUG_INSETS = false; // Set to true to show the safe area insets

const SafeAreaDebugOverlay = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        pointerEvents='none'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: insets.top,
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <Text style={{ color: 'white', fontSize: 12 }}>TopInset: {insets.top.toFixed(0)}</Text>
      </View>
      <View
        pointerEvents='none'
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: insets.bottom,
          backgroundColor: 'rgba(0, 0, 255, 0.3)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <Text style={{ color: 'white', fontSize: 12 }}>BottomInset: {insets.bottom.toFixed(0)}</Text>
      </View>
    </>
  );
};

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

const themes: Data[] = [
  { label: 'light' },
  { label: 'dark' },
  { label: 'system' },
];

function App(): React.JSX.Element {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system');
  const onThemeSelect = (datum: Data) => {
    setTheme(datum.label as 'light' | 'dark' | 'system');
  }

  return (
    <SafeAreaProvider>
      {__DEV__ && DEBUG_INSETS && <SafeAreaDebugOverlay />}
      <Content onThemeSelect={onThemeSelect} theme={theme} />
    </SafeAreaProvider>
  );
}

const Content = ({ onThemeSelect, theme }: ContentProperties): React.JSX.Element => {
  const [item, setItem] = React.useState<string | JSX.Element>('');
  const [disabled, setDisabled] = React.useState(false);
  const [searchable, setSearchable] = React.useState(false);
  const style = useThemeStyles(theme);

  const onSimpleDataSelect = (datum: Data) =>
    setItem(datum.label);
  const onSimpleMultiDataSelect = (data: Data[]) =>
    setItem(data.map((datum: Data) =>
      datum.label
    ).join(", "));
  const onDataSelect = (id: number) => (datum: Data) => {
    console.log(`selector ${id}: ${datum.label} selected`);
  };
  const onDataRemove = (id: number) => (datum: Data) => {
    console.log(`selector ${id}: ${datum.label} removed`);
  };
  const onMultiDataSelect = (id: number) => (data: Data[]) => {
    console.log(`selector ${id}: currently contains ${data.map(datum => datum.label).join(", ")}.`);
  };

  return (
    <SafeAreaView style={style.background}>
      <ScrollView style={{ paddingHorizontal: 8 }}>
        <View style={{ height: 40 }} />
        <Text style={[style.text, { textAlign: 'center' }]}>
          Safe area support is active if your app uses <Text style={{ fontWeight: 'bold' }}>SafeAreaProvider</Text>.
        </Text>
        <Select
          data={data}
          onSelect={onSimpleDataSelect}
          disabled={disabled}
          searchable={searchable}
          theme={theme}
        />
        <Text style={style.text}>
          Selected: {item || 'None'} (scroll down)
        </Text>
        <View style={{ height: 500 }} />
        <Text
          style={[
            style.text,
            {
            alignSelf: 'center',
            width: 350,
          }]}
        >
          The dropdown menu will display above the input box when there
          isn&apos;t enough space below
        </Text>
        <Select
          data={data}
          onSelect={onSimpleDataSelect}
          disabled={disabled}
          searchable={searchable}
          placeholderText="Select an item"
          theme={theme}
          boxStyle={{
            alignSelf: 'center',
            width: 200,
          }}
        />
        <MultiSelect
          data={data}
          onSelect={onSimpleMultiDataSelect}
          disabled={disabled}
          searchable={searchable}
          theme={theme}
        />
        <View style={{ height: 400 }}/>
        <Text style={style.text}>Single Selects:</Text>
        <View style={{ flexDirection: 'row', height: 100 }}>
          <View style={{ flex: 1 }}>
            <Select
              data={data}
              onSelect={onDataSelect(1)}
              disabled={disabled}
              searchable={searchable}
              theme={theme}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Select
              data={data}
              onSelect={onDataSelect(2)}
              disabled={disabled}
              searchable={searchable}
              theme={theme}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Select
              data={data}
              onSelect={onDataSelect(3)}
              disabled={disabled}
              searchable={searchable}
              theme={theme}
            />
          </View>
        </View>
        <Text style={style.text}>Multi Selects:</Text>
        <View style={{ height: 350 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <MultiSelect
                data={data}
                onSelect={onMultiDataSelect(4)}
                onRemove={onDataRemove(4)}
                disabled={disabled}
                searchable={searchable}
                theme={theme}
              />
            </View>
            <View style={{ flex: 1 }}>
              <MultiSelect
                data={data}
                onSelect={onMultiDataSelect(5)}
                onRemove={onDataRemove(5)}
                disabled={disabled}
                searchable={searchable}
                theme={theme}
              />
            </View>
            <View style={{ flex: 1 }}>
              <MultiSelect
                data={data}
                onSelect={onMultiDataSelect(6)}
                onRemove={onDataRemove(6)}
                disabled={disabled}
                searchable={searchable}
                theme={theme}
              />
            </View>
          </View>
          <Text style={[style.text, { textAlign: 'center', height: 100 }]}>
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
            theme={theme}
          />
        </View>
        <View style={{ height: 200 }}>
          <Select
            data={themes}
            onSelect={onThemeSelect}
            disabled={disabled}
            searchable={searchable}
            placeholderText={`Select a theme`}
            theme={theme}
          />
          <Text style={[style.text, { textAlign: 'center'}]}>
            Select a theme to see all the dropdowns change! Current theme is "{theme}"
          </Text>
        </View>
        <Text style={style.text}>Styled Single Select:</Text>
        <Select
          data={data}
          onSelect={onSimpleDataSelect}
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
        <Text style={style.text}>Styled Multi Select:</Text>
        <MultiSelect
          data={data}
          onSelect={onSimpleMultiDataSelect}
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
    </SafeAreaView>
  );
}

interface ContentProperties {
  onThemeSelect: (e: Data) => void;
  theme: 'light' | 'dark' | 'system';
}

export default App;
