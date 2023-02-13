import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Menu, Text } from "react-native-paper";

/** Component for gender selection
 * @param {{onSelect: (gender: 'Male' | 'Female' | 'Transgender') => void}} props
 */
export default function StatusAppointment(props) {
  const [state, setState] = useState({ vis: false, gender: "Active" });
  const onSelect = (statusAppointment) => {
    setState({ vis: false, statusAppointment });
    props.onSelect(statusAppointment);
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
              state.statusAppointment === "Active"? "#007aff"
                : state.statusAppointment === "Re-open"? "#ff8888"
                : "#aaa",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {state.statusAppointment}
          </Text>
        </TouchableOpacity>
      }
      onDismiss={() => setState({ ...state, vis: false })}
      visible={state.vis}
    >
      <Menu.Item title="active" onPress={() => onSelect("Active")} />
      <Menu.Item title="pending" onPress={() => onSelect("Pending")} />
      <Menu.Item title="canceled<24h" onPress={() => onSelect("Canceled<24h")} />
      <Menu.Item title="archived" onPress={() => onSelect("Archived")} />	  
      <Menu.Item title="intreatment" onPress={() => onSelect("In Treatment")} />
      <Menu.Item title="delayed" onPress={() => onSelect("Delayed")} />
      <Menu.Item title="invoiced" onPress={() => onSelect("Invoiced")} />
      <Menu.Item title="paid" onPress={() => onSelect("Paid")} />	  
    </Menu>
  );
}
