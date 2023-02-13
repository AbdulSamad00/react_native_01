import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { DatePickerPast } from "../DatePicker";
import GenderDropdown from "../GenderDropdown";

/** @param {{onChange: (data: any) => void}} props */
export default function PersonalInfo(props) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    initials: "",
    prefix: "",
    title: "",
    gender: "",
    dateOfBirth: "",
  });

  const onDataChange = (newData) => {
    setData(newData);
    props.onChange(newData);
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          dense
          mode="outlined"
          value={data.firstName}
          label="First Name"
          style={{ margin: 4, flexGrow: 1 }}
          onChangeText={(firstName) => onDataChange({ ...data, firstName })}
        />
        <TextInput
          dense
          mode="outlined"
          value={data.lastName}
          label="Last Name"
          style={{ margin: 4, flexGrow: 1 }}
          onChangeText={(lastName) => onDataChange({ ...data, lastName })}
        />
      </View>
      <TextInput
        dense
        mode="outlined"
        style={{ margin: 4 }}
        value={data.initials}
        label="Initials "
        onChangeText={(initials) => onDataChange({ ...data, initials })}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          dense
          mode="outlined"
          value={data.prefix}
          label="Prefix"
          style={{ flexGrow: 0.2, margin: 4 }}
          onChangeText={(prefix) => onDataChange({ ...data, prefix })}
        />
        <TextInput
          dense
          mode="outlined"
          value={data.title}
          label="Title"
          style={{ flexGrow: 1, margin: 4 }}
          onChangeText={(title) => onDataChange({ ...data, title })}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <Text>Date of birth: </Text>
        <DatePickerPast
          onPick={(date) => onDataChange({ ...data, dateOfBirth: date })}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <Text>Gender: </Text>
        <GenderDropdown
          onSelect={(gender) => onDataChange({ ...data, gender })}
        />
      </View>
    </>
  );
}
