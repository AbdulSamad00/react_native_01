import React, { useRef, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import RBSheet from "react-native-raw-bottom-sheet";
import CalendarPicker from "react-native-calendar-picker";

const DateRange = ({ refRBSheet,onDateChange }) => {
  const [datee, setdate] = useState('Set Date')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const ref=refRBSheet
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setdate(date)
    // console.log("A date has been picked: ", datee);
    setstartDate(moment(date).format("MMM Do YY"))

    hideDatePicker();
  };

  return (
    <View>
       <Button color='#1239' title={"Date"} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> 
      <RBSheet
        ref={ref}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: { height: 'auto' },
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View style={{
          width: '100%',
          padding: 10,
          flexDirection: 'row', justifyContent: 'space-between'
        }}>
          <TouchableOpacity
            onPress={() => ref.current.close()}
            style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}
          // style={{ padding: 10 }}
          >
            <Text style={{ color: 'white' }} >Cancel</Text></TouchableOpacity>
          <TouchableOpacity
            onPress={() => ref.current.close()}
            style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 }}
          ><Text style={{ color: 'white' }} >Save</Text></TouchableOpacity>
        </View>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date(1970, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
          months={['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{
            fontFamily: 'Cochin',
            color: '#000000',
          }}
          onDateChange={(date,type)=>onDateChange(date,type)}
        />
      </RBSheet>
    </View>
  );
};

export default DateRange;