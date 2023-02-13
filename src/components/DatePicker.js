import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Platform,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
//import { Text } from "react-native-paper";
import moment from "moment";

const DatePicker = ({
  textStyle,
  defaultDate,
  placeholder,
  onDateChange,
  left,
  maxYears,
  minYears,
  disabled = false,
  ...otherProps
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  useEffect(() => {
    setDate(new Date(defaultDate))
  },[defaultDate])
  //ios
  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
  };
  //android
  const onAndroidChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(moment(selectedDate));
      onDateChange(selectedDate);
    }
  };

  const onPressOk = () => {
    onDateChange(date);
    setShow(false);
  };

  const onPressCancel = () => {
    // setDate(moment(defaultDate));
    setShow(false);
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        timeZoneOffsetInMinutes={0}
        value={new Date(date)}
        mode="date"
        //minimumDate={new Date()}
        minimumDate={new Date(moment().subtract(minYears, "years"))}
        maximumDate={new Date(moment().add(maxYears, "years"))}
        onChange={Platform.OS === "ios" ? onChange : onAndroidChange}
        //from ios 14
        display={Platform.OS === "ios" ? "spinner" : "default"}
      />
    );
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={() => setShow(true)}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eee",
            ...textStyle,
          }}
        >
          {left || <></>}
          <Text>{moment(date).format("YYYY-MM-DD")}</Text>
        </View>
        {Platform.OS !== "ios" && show && renderDatePicker()}
        {Platform.OS === "ios" && (
          <Modal
            transparent={true}
            animationType={"slide"}
            visible={show}
            supportedOrientations={["portrait"]}
            onRequestClose={() => setShow(false)}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  flexDirection: "row",
                }}
                activeOpacity={1}
                visible={show}
                onPress={() => setShow(false)}
              >
                <TouchableOpacity
                  underlayColor={"#FFFFFF"}
                  style={{
                    flex: 1,
                    borderTopColor: "#E9E9E9",
                    borderTopWidth: 1,
                  }}
                  onPress={() => console.log("modal press")}
                >
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      height: 256,
                      overflow: "hidden",
                    }}
                  >
                    <View style={{ marginTop: 20 }}>{renderDatePicker()}</View>
                    <TouchableOpacity
                      underlayColor={"transparent"}
                      onPress={onPressCancel}
                      style={[styles.btnText, styles.btnCancel]}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      underlayColor={"transparent"}
                      onPress={onPressOk}
                      style={[styles.btnText, styles.btnOk]}
                    >
                      <Text>Ok</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </TouchableOpacity>
  );
};

DatePicker.defaultProps = {
  textStyle: {},
  defaultDate: moment(),
  onDateChange: () => {},
  maxYears: 20,
  minYears: 20,
};

const styles = StyleSheet.create({
  btnText: {
    position: "absolute",
    top: 0,
    height: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancel: {
    left: 0,
  },
  btnOk: {
    right: 0,
  },
});

export default DatePicker;
