import React from "react";
import { Text, View } from "react-native";

import Selector, { Data } from "../index";

const data: Data[] = [
  { label: "Item 1" },
  { label: "Item 2" },
  { label: "Item 3", priority: true },
  { label: "Item 4" },
  { label: "Item 5" },
  { label: "Item 6" },
  { label: "Item 7", priority: true },
  { label: "Item 8" },
];

function App(): JSX.Element {
  const [item, setItem] = React.useState<string | JSX.Element>("");
  const onDataSelect = (e: Data) => setItem(e.label);

  return (
    <View style={{ marginTop: 40 }}>
      <Selector data={data} onSelect={onDataSelect} />
      <Text>Selected: {item || "None"}</Text>
    </View>
  );
}

export default App;
