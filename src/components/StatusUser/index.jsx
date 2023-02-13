import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Menu, Text } from "react-native-paper";

/** Component for gender selection
 * @param {{onSelect: (gender: 'Male' | 'Female' | 'Transgender') => void}} props
 */
export default function StatusUser(props) {
  const [state, setState] = useState({ vis: false, status: "Active" });
  const onSelect = (status) => {
    setState({ vis: false, status });
    props.onSelect(status);
  };
  return (
    <Menu
      anchor={
        <TouchableOpacity
          onPress={() => setState({ ...state, vis: true })}
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor:
              state.status === "Active"? "#79cc79"
                : state.status === "Banned"? "#f71717"
                : state.status === "Pending"? "#9fc5e8"				
                : state.status === "Archived"? "#aaa",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {state.status}
          </Text>
        </TouchableOpacity>
      }
      onDismiss={() => setState({ ...state, vis: false })}
      visible={state.vis}
    >
      <Menu.Item title="active" onPress={() => onSelect("Active")} />
      <Menu.Item title="pending" onPress={() => onSelect("Pending")} />
      <Menu.Item title="banned" onPress={() => onSelect("Banned")} />
      <Menu.Item title="archived" onPress={() => onSelect("Archived")} />	  
    </Menu>
  );
}
