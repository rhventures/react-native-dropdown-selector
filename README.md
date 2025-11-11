# React Native Dropdown Selector

A custom React Native component for dropdown lists that emulates some functionality of the HTML `<select>` tag.

## Features

- Cross-platform uniformity
- Select one or more items from a list
- Support for custom component styling
- Import data with versatile structure
- Item prioritization

## Installation

```bash
npm i @rose-hulman/react-native-dropdown-selector
```

Since `react-native-svg` is a peer dependency, you will need to install it along with the component if you do not already have it in your project.

```bash
npm i react-native-svg
```

## How Do I Use It?

There are 2 components available for use:
[`Select`](https://github.com/rhventures/react-native-dropdown-selector/wiki/Select)
and
[`MultiSelect`](https://github.com/rhventures/react-native-dropdown-selector/wiki/MultiSelect)

Using one of these components looks something like the following:
```tsx
<Select
  data={data}
  onSelect={console.log}
/>
```
The data prop takes in an array of the [`Data`](https://github.com/rhventures/react-native-dropdown-selector/wiki/Data) object to act as options for the Selector, and the onSelect prop takes in a function that accepts an argument of type `Data` to be called when a new item is selected.

These components may also take in optional props. For more information about the usage of these components, check out the
[wiki](https://github.com/rhventures/react-native-dropdown-selector/wiki).

## How Do I *actually* Use It?

The following example uses TypeScript.

First, import a selector component and the `Data` type. In this case, we use `Select`:
```tsx
import { Select, type Data } from 'react-native-dropdown-selector';
```
Then, create an array of items of type `Data`. This will be used for the `data` prop of the selector:
```tsx
const data: Data[] = [
  { label: 'Item 1' },
  { label: 'Item 2' },
  { label: 'Item 3' },
]
```
Next, define that function that will be used for the `onSelect` prop:
```tsx
const onDataSelected = (data: Data) => {
  console.log(data.label + ' was selected!');
};
```
Finally, create the component with the previously defined props:
```tsx
<Select
  data={data}
  onSelect={onDataSelected}
/>
```
For a more detailed guide on the usage of these components, please read [Getting Started](https://github.com/rhventures/react-native-dropdown-selector/wiki/Getting-Started).

## Demo

Create a react native project with `example/App.tsx` as the main file. Running the example application will look similar to the screenshots below.

<img src="assets/demo-top.png" height="350px" /> <img src="assets/demo-bottom.png" height="350px" /> <img src="assets/demo-interaction.gif" height="350px" />

For an in-depth walkthrough, read through the [development guide](https://github.com/rhventures/react-native-dropdown-selector/wiki/Development).

## Contributing

To contribute to the development of this project, please refer to the [development guide](https://github.com/rhventures/react-native-dropdown-selector/wiki/Development).
