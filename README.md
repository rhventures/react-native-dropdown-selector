# React Native Dropdown Selector

A custom react native component for dropdown lists. Emulates some functionality of the HTML `<select>` tag.

## Features

- Cross-platform uniformity
- Select one or more items from the list
- Support for custom component styling
- Import data with versatile structure
- Item prioritization

## Demo

Create a react native project with `example/App.tsx` as the main file. Running the application will look similar to the screenshots below.

<img src="assets/demo-top.png" height="350px" />
<img src="assets/demo-bottom.png" height="350px" />
<img src="assets/demo-interaction.gif" height="350px" />

## Usage

All example code is written in TypeScript. <br />
Begin by importing the Selector component and Data type.

```tsx
import Selector, { Data } from 'react-native-dropdown-selector';
```

Define your Data array. The label field is required for each entry, but priority and data are optional.

```tsx
const data: Data[] = [
  { label: 'Item 1' },
  { label: 'Item 2', data: { additionalParam: 'value' } },
  { label: 'Item 3', priority: true },
];
```

Define your onSelect function. Your function will only take in a Data object.

```tsx
const onDataSelect = (data: Data) => {
  // Do something
};
```

Add a Selector component to your view.

```tsx
<>
  <Selector.Select data={data} onSelect={onDataSelect} />
  {/* or use the MultiSelect component */}
  <Selector.MultiSelect data={data} onSelect={onMultiDataSelect} />
</>
```

That's it! Run your app to see the selector in action.

## The `Data` Object

Sample usage:

```tsx
const data: Data = {
  label: 'displayed text',
  priority: true,
  data: { country: 'USA' },
};
```

### `label` **(required)**

The value of the item shown in the selector. <br />
Type: `string | JSX.Element`

### `priority`

If enabled, the element will move to the top of the list regardless of its current position. <br />
Type: `boolean` <br />
**Default value:** `undefined`

### `data`

Additional data for the item. This is not directly used by the Selector component. <br />
Type: `object` <br />
**Default value:** `undefined`

## Selector Props

Sample usage:

```tsx
<Select
  data={data}
  onSelect={console.log}
  defaultValue={data[0]}
  listHeight={300}
  placeholderText='Hello!'
  boxStyle={{
    backgroundColor: '#48c',
  }}
  boxTextStyle={{
    fontFamily: 'times new roman',
  }}
  listStyle={{
    backgroundColor: '#abc',
  }}
  listTextStyle={{
    color: 'brown',
    fontFamily: 'times new roman',
  }}
  selectedItemStyle={{
    backgroundColor: 'green',
  }}
  dropdownArrowColor='darkgreen'
/>
```

### `data` **(required)**

Holds the items used for the Selector. <br />
**Type:** `Data[]`

### `defaultValue`

Choose an item to be selected before the user interacts with the Selector. <br />
**Type:** `Data` (single select) or `Data[]` (multi select) <br />
**Default value:** `undefined`

### `listHeight`

The height of the dropdown list. <br />
**Type:** `number` <br />
**Default value:** `200`

### `placeholderText`

Replace the default Selector text when an item hasn't been selected. <br />
**Type:** `string | JSX.Element` <br />
**Default value:** `'Click me'`

### `boxStyle`

Custom styles for the main Selector box. <br />
**Type:** `ViewStyle` <br />
**Default value:** 
```tsx
{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  alignContent: 'space-between',
  paddingVertical: 4,
  paddingLeft: 8,
  paddingRight: 24,
  borderColor: 'black',
  borderWidth: 0.5,
  margin: 5,
  backgroundColor: 'white', // '#444' for dark mode
  overflow: 'hidden',
  flexWrap: 'wrap',
}
```

### `boxTextStyle`

Custom styles for the text inside the main Selector box. <br />
**Type:** `ViewStyle` <br />
**Default value:** 
```tsx
{
  fontSize: 16,
  overflow: 'hidden',
  color: '#444', // '#ddd' for dark mode
  marginVertical: 4,
}
```

### `boxTextHighlightStyle` (MultiSelect only)

Custom styles for the text highlight inside the main Selector box. <br />
**Type:** `ViewStyle` <br />
**Default value:** 
```tsx
{
  backgroundColor: '#ccc', // '#222' for dark mode
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 12,
  marginRight: 6,
  marginVertical: 2,
}
```

### `listStyle`

Custom styles for the Selector dropdown list. <br />
**Type:** `ViewStyle` <br />
**Default value:** 
```tsx
{
  backgroundColor: 'white', // '#444' for dark mode
  borderColor: 'black',
  borderWidth: 0.5,
  overflow: 'hidden',
}
```

### `listTextStyle`

Custom styles for the text inside the Selector dropdown list. <br />
**Type:** `ViewStyle` <br />
**Default value:** 
```tsx
{
  fontSize: 16,
  paddingLeft: 8,
  color: '#444', // '#ddd' for dark mode
}
```

### `selectedItemStyle`

Custom styles for the active item inside the Selector dropdown list. <br />
**Type:** `ViewStyle` <br />
**Default value:** 
```tsx
{
  backgroundColor: 'lightblue',
  fontWeight: 'bold',
}
```

### `dropdownArrowColor`

Custom color for the dropdown arrow inside the main Selector box. <br />
**Type:** `ColorValue` <br />
**Default value:** `black` or `white` for dark mode

### `clearButtonStyle` (MultiSelect only)

Custom color for the clear button. <br />
**Type:** `ViewStyle` <br />
**Default value:** 
```tsx
{
  width: 40,
  height: 40,
  backgroundColor: 'white', // '#444' for dark mode
  position: 'absolute',
  borderColor: 'black',
  borderWidth: 0.5,
  borderRadius: 8,
  right: 5,
}
```

### `clearButtonIconColor` (MultiSelect only)

Custom color for the icon inside the clear button. <br />
**Type:** `ColorValue` <br />
**Default value:** `black` or `white` for dark mode

## Callbacks

### `onSelect` **(required)**

Called when the user selects an item from the selector. <br />
**Type:** `Function (e: Data) => void` (single select) or `Function (e: Data[]) => void` (multi select) <br />

## Development

To contribute to the development of this project, please refer to the [development guide](./docs/Development.md).