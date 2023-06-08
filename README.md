# React Native Dropdown Selector

A custom react native component for dropdown lists. Emulates some functionality of the HTML `<select>` tag.

## Features
- Cross-platform uniformity
- Support for custom component styling
- Import data with versatile structure
- Item prioritization

## Demo
Create a react native project with `example/App.tsx` as the main file. Running the application will look similar to the screenshots below.

<img src="example/img/demo-dropdown.png" height="350px" /> <img src="example/img/demo-item-selected.png" height="350px" />

## Usage
All example code is written in TypeScript. <br />
Begin by importing the Selector component and Data type.
``` tsx
import Selector, { Data } from 'react-native-dropdown-selector';
```

Define your Data array. The label field is required for each entry, but priority and data are optional.
``` tsx
const data: Data[] = [
  { label: 'Item 1' },
  { label: 'Item 2', data: { additionalParam: 'value' } },
  { label: 'Item 3', priority: true }
];
```

Define your onSelect function. Your function will only take in a Data object.
``` tsx
const onDataSelect = (data: Data) => {
    // Do something
}
```

Add a Selector component you your view.
``` tsx
<Selector data={data} onSelect={onDataSelect} />
```

That's it! Run your app to see the selector in action.

## The `Data` Object
You must follow the formatting of this object for the selector component to function.

### `label` **(required)**
The value of the item shown in the selector. <br />
Type: `string | JSX.Element`
### `priority`
If enabled, the element will move to the top of the list regardless of its current position. <br />
Type: `boolean`
### `data`
Additional data for the item. This is not directly used by the Selector component. <br />
Type: `object`

## Props
### `data` **(required)**
Holds the items used for the selector. <br />
Type: `Data[]`
### `boxStyle`
Custom styles for the main selector box. <br />
Type: `ViewStyle`
### `boxTextStyle`
Custom styles for the text inside the main selector box. <br />
Type: `ViewStyle`
### `listStyle`
Custom styles for the selector dropdown list. <br />
Type: `ViewStyle`
### `listTextStyle`
Custom styles for the text inside the selector dropdown list. <br />
Type: `ViewStyle`
### `selectedItemStyle`
Custom styles for the active item inside the selection dropdown list. <br />
Type: `ViewStyle`

## Callbacks
### `onSelect` **(required)**
Called when the user selects an item from the selector. <br />
Type: `Function`