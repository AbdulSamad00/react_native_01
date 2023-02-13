import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Menu, Text } from "react-native-paper";

/** Component for gender selection
 * @param {{onSelect: (gender: 'Male' | 'Female' | 'Transgender') => void}} props
 */
export default function StatusTicket(props) {
  const [state, setState] = useState({ vis: false, gender: "Active" });
  const onSelect = (statusTicket) => {
    setState({ vis: false, statusTicket });
    props.onSelect(statusTicket);
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
              state.statusTicket === "Active"? "#007aff"
                : state.statusTicket === "Re-open"? "#ff8888"
                : "#aaa",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {state.statusTicket}
          </Text>
        </TouchableOpacity>
      }
      onDismiss={() => setState({ ...state, vis: false })}
      visible={state.vis}
    >
      <Menu.Item title="active" onPress={() => onSelect("Active")} />
      <Menu.Item title="pending" onPress={() => onSelect("Pending")} />
      <Menu.Item title="re-open" onPress={() => onSelect("Re-open")} />
      <Menu.Item title="archived" onPress={() => onSelect("Archived")} />	  
    </Menu>
  );
}
