import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Menu, Text } from "react-native-paper";

/** Component for gender selection
 * @param {{onSelect: (gender: 'Male' | 'Female' | 'Transgender') => void}} props
 */
export default function AppointmentType(props) {
  const [state, setState] = useState({ vis: false, gender: "Active" });
  const onSelect = (AppointmentType) => {
    setState({ vis: false, AppointmentType });
    props.onSelect(AppointmentType);
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
              state.AppointmentType === "Active"? "#007aff"
                : state.AppointmentType === "Re-open"? "#ff8888"
                : "#aaa",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {state.AppointmentType}
          </Text>
        </TouchableOpacity>
      }
      onDismiss={() => setState({ ...state, vis: false })}
      visible={state.vis}
    >
      <Menu.Item title="clinic" onPress={() => onSelect("Clinic")} />
      <Menu.Item title="home" onPress={() => onSelect("Home")} />
      <Menu.Item title="video" onPress={() => onSelect("Video")} />  
    </Menu>
  );
}
