import React from "react";
import Picker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

/** @param {{minDate?: Date; maxDate?: Date; date?: Date; onPick: (date)=>void}} props */
export default function DatePicker(props) {
  const [state, setState] = useState({
    show: false,
    date: props.date || new Date(),
  });
  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setState({ ...state, show: true })}
      >
        <Text>{state.date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {state.show && (
        <Picker
          value={state.date}
          maximumDate={props.maxDate}
          minimumDate={props.minDate}
          onChange={(e) => {
            const d = e?.nativeEvent?.timestamp;
            if (d) {
              props.onPick(d);
              setState({ date: d, show: false });
              return;
            }
            setState({ ...state, show: false });
          }}
        />
      )}
    </>
  );
}

/** @param {{onPick: (date)=>void; date?: date}} props */
export const DatePickerPast = (props) => (
  <DatePicker {...props} maxDate={new Date()} />
);

/** @param {{onPick: (date)=>void; date?: date}} props */
export const DatePickerFuture = (props) => (
  <DatePicker {...props} minDate={new Date()} />
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    margin: 4,
  },
});
