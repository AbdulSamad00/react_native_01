import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, Menu, Text } from "react-native-paper";

/** Provides a drop down interface that allows selection through options
 * @param {{options: {name: string, value: string}[]; onSelect: (option: {name: string, value: string}) => void}} props
 */
export default function Dropdown(props) {
  const [state, setState] = useState({ vis: false, option: props.options[0] });
  const onSelect = (option) => {
    setState({ vis: false, option });
    props.onSelect(option);
  };
  return (
    <Menu
      anchor={
        <TouchableOpacity
          onPress={() => setState({ ...state, vis: true })}
          style={{
            padding: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#aaa",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>{state.option.name}</Text>
            <IconButton
              icon="chevron-down"
              style={{ margin: 0, padding: 0, marginLeft: "auto" }}
            />
          </View>
        </TouchableOpacity>
      }
      onDismiss={() => setState({ ...state, vis: false })}
      visible={state.vis}
    >
      {props.options.map((o) => (
        <Menu.Item key={o.value} title={o.name} onPress={() => onSelect(o)} />
      ))}
    </Menu>
  );
}
