import React from "react";
import Picker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import moment from "moment";
import colors from "../../config/colors";

/** @param {{minDate?: Date; maxDate?: Date; time?: string; onPick: (date)=>void;disabled:boolean;...otherProps}} props */
export default function TimePicker(props) {
  const [state, setState] = useState({
    show: false,
    time: new Date(),
  });
  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setState({ ...state, show: !props.disabled && true })}>
        <Text style={{color: props.disabled?"grey":"black"}}>{props.time ? props.time : "00:00"}</Text>
      </TouchableOpacity>

      {state.show && (
        <Picker
         
          mode="time"
          is24Hour={true}
          value={state.time}
          maximumDate={props.maxDate}
          minimumDate={props.minDate}
          onChange={(e) => {
            const d = e?.nativeEvent?.timestamp;
            if (d) {
              props.onPick(d);
              setState({ time: d, show: false });
              return;
            }
            setState({ ...state, show: false });
          }}
          {...props.otherProps}
        />
      )}
    </>
  );
}

// /** @param {{onPick: (date)=>void; date?: date}} props */
// export const DatePickerPast = (props) => (
//   <DatePicker {...props} maxDate={new Date()} />
// );

// /** @param {{onPick: (date)=>void; date?: date}} props */
// export const DatePickerFuture = (props) => (
//   <DatePicker {...props} minDate={new Date()} />
// );

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    margin: 4,
  },
});
