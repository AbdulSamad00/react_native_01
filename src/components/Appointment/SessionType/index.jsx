import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Menu, Text } from "react-native-paper";

/** Component for gender selection
 * @param {{onSelect: (gender: 'Male' | 'Female' | 'Transgender') => void}} props
 */
export default function SessionType(props) {
  const [state, setState] = useState({ vis: false, gender: "Active" });
  const onSelect = (SessionType) => {
    setState({ vis: false, SessionType });
    props.onSelect(SessionType);
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
              state.SessionType === "Active"? "#007aff"
                : state.SessionType === "Re-open"? "#ff8888"
                : "#aaa",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {state.SessionType}
          </Text>
        </TouchableOpacity>
      }
      onDismiss={() => setState({ ...state, vis: false })}
      visible={state.vis}
    >
      <Menu.Item title="intake" onPress={() => onSelect("Intake")} />
      <Menu.Item title="follow" onPress={() => onSelect("Follow")} />
    </Menu>
  );
}
