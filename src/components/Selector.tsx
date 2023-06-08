import React, { useState } from "react";
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  Modal,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
const dropdownArrow = require("../assets/down.png");

export type Data = {
  label: string | JSX.Element;
  priority?: boolean;
  data?: object;
};
type SelectorProperties = {
  data: Data[];
  onSelect: Function;
  scrollOffset?: number;
  placeholderText?: string | JSX.Element;
  boxStyle?: ViewStyle;
  boxTextStyle?: TextStyle;
  listStyle?: ViewStyle;
  listTextStyle?: TextStyle;
  selectedItemStyle?: TextStyle;
};
type ListProperties = {
  styles: {
    list: ViewStyle | undefined;
    text: TextStyle | undefined;
    itemSelected: TextStyle | undefined;
  };
  data: Data[];
  onSelect: Function;
  selected: string | JSX.Element;
  display: boolean;
  setDisplay: Function;
  position: number[];
  scrollOffset?: number;
};

const style = StyleSheet.create({
  selectorBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0.5,
    paddingHorizontal: 2,
    height: 40,
    margin: 5,
    backgroundColor: "white",
  },
  selectorText: {
    fontSize: 16,
    paddingLeft: 2,
  },
  arrow: {
    height: 20,
    width: 20,
    alignSelf: "center",
    position: "absolute",
    right: 5,
  },
  arrowListDisplayed: {
    transform: [{ rotate: "180deg" }],
  },
  list: {
    backgroundColor: "white",
    maxHeight: 200,
    flexGrow: 0,
    marginHorizontal: 5,
    borderColor: "#ddd",
    borderWidth: 0.5,
  },
  text: {
    fontSize: 16,
    paddingLeft: 5,
  },
  itemSelected: {
    backgroundColor: "lightblue",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
  },
  item: {
    display: "flex",
    justifyContent: "center",
    height: 40,
  },
});

/* Renders a modal with a list of selectable items. Takes in props defined in the ListProperties type. */
const SelectionList = (props: ListProperties): JSX.Element => {
  if (!props.display) {
    return <View />;
  }

  const [height, setHeight] = useState<number>(200);

  return (
    <Modal transparent={true} onRequestClose={() => props.setDisplay(false)}>
      <TouchableOpacity
        activeOpacity={1}
        style={style.modalBackground}
        onPress={() => props.setDisplay(false)}
      >
        <View
          onLayout={(e: LayoutChangeEvent) =>
            height === 200 && setHeight(e.nativeEvent.layout.height)
          }
          style={[
            style.list,
            {
              marginTop:
                (height < 200 ? props.position[0] : props.position[1]) -
                (props.scrollOffset || 0),
            },
            props.styles.list,
          ]}
        >
          <FlatList
            data={props.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  props.onSelect(item);
                  props.setDisplay(false);
                }}
                style={[
                  style.item,
                  props.selected === item.label && style.itemSelected,
                  props.selected === item.label && props.styles.itemSelected,
                ]}
              >
                <Text style={[style.text, props.styles.text]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

/* Renders a selector component. Takes in props defined in the SelectorProperties type. */
const Selector = (props: SelectorProperties): JSX.Element => {
  const [listDisplay, setListDisplay] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | JSX.Element>(
    props.placeholderText ? props.placeholderText : "Click me"
  );
  const [position, setPosition] = useState<number[]>([]);

  const clickSelector = () => {
    setListDisplay(!listDisplay);
  };
  const selectItem = (item: Data) => {
    setSelected(item.label);
    props.onSelect(item);
  };
  const getPos = (e: LayoutChangeEvent) => {
    setPosition([
      e.nativeEvent.layout.y - 200,
      e.nativeEvent.layout.y + e.nativeEvent.layout.height,
    ]);
  };
  const updatePriorities = (data: Data[]): Data[] => {
    return [
      ...data.filter((d) => d.priority),
      ...data.filter((d) => !d.priority),
    ];
  };
  return (
    <View onLayout={getPos}>
      <TouchableOpacity
        activeOpacity={1}
        style={[style.selectorBox, props.boxStyle]}
        onPress={clickSelector}
      >
        <Text style={[style.selectorText, props.boxTextStyle]}>{selected}</Text>
        <Image
          source={dropdownArrow}
          style={[style.arrow, listDisplay && style.arrowListDisplayed]}
        />
      </TouchableOpacity>
      <SelectionList
        styles={{
          list: props.listStyle || undefined,
          text: props.listTextStyle || undefined,
          itemSelected: props.selectedItemStyle || undefined,
        }}
        data={updatePriorities(props.data)}
        onSelect={selectItem}
        selected={selected}
        display={listDisplay}
        setDisplay={setListDisplay}
        position={position}
        scrollOffset={props.scrollOffset}
      />
    </View>
  );
};

export default Selector;
