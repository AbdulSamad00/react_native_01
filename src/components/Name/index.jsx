import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import CountryDropdown from "../CountryDropdown";

/** @param {{onChange: (data: any) => void}} props */
export default function Name(props) {
  const [data, setData] = useState({
    prefix: "",
    firstName: "",
    initials: "",
    lastName: "",
    title: "",	
  });

  const onDataChange = (newData) => {
    setData(newData);
    props.onChange(newData);
  };

  return (
    <>
      <TextInput
        dense
        mode="outlined"
        value={data.prefix}
        label="prefix"
        style={{ margin: 4 }}
        onChangeText={(prefix) => onDataChange({ ...data, prefix})}
      />
      <TextInput
        dense
        mode="outlined"
        value={data.firstName}
        label="First Name"
        style={{ margin: 4 }}
        onChangeText={(firstName => onDataChange({ ...data, firstName})}
      />
      <TextInput
        dense
        mode="outlined"
        value={data.initials}
        label="initials"
        style={{ margin: 4 }}
        onChangeText={(initials) => onDataChange({ ...data, initials})}
      />
      <TextInput
        dense
        mode="outlined"
        value={data.lastName}
        label="Last Name"
        style={{ margin: 4 }}
        onChangeText={(lastName => onDataChange({ ...data, lastName})}
      />
	  
      <TextInput
        dense
        mode="outlined"
        style={{ margin: 4 }}
        value={data.title}
        label="title"
        onChangeText={(title) => onDataChange({ ...data, title})}
      />
    </>
  );
}
