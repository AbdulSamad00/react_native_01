import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import dayjs from "dayjs";

export default function AppointementDatePicker({ values, setFieldValue, name }) {
   
    const [ datePickerVisibility, setDatePickerVisibility ] = useState(false);

    const handleConfirm = (date) => {
        if(name === "start"){
            setFieldValue("end", new Date(date.getTime() + 5 * 60000));
        }
        setFieldValue(name, date);
        hideDatePicker();
    } 

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
  
    return (
        <View>
            <TouchableOpacity onPress={ showDatePicker }>
                <Text style={styles.dateAndTimePicker}>
                    { values[name]
                      ? dayjs(values[name]).format("HH:mm")
                      : `Select ${ name === "end" ? "End" : "Start" }-Time` }
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={datePickerVisibility}
                // is24Hour={ true }
                minuteInterval={ 5 }
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                // minimumDate={ new Date() }
            />
        </View>
  )
}

const styles = StyleSheet.create({
    dateAndTimePicker: {
      width: "100%",
      height: 48,
      paddingTop: 12,
      backgroundColor: "#ddd",
      alignItems: "center",
      justifyContent: "center",
      textAlign: 'center',
      borderRadius: 10
    },
    timeWrapper : {
        alignItems: 'center',
        justifyContent: 'center'
    }
});