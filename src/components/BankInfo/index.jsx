import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import CountryDropdown from "../CountryDropdown";

/** @param {{onChange: (data: any) => void}} props */
export default function BankInfo(props) {
  const [data, setData] = useState({
    Bank: "",
    IBAN: "",
    branchOfBank: "",
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
        value={data.Bank}
        label="Bank"
        style={{ margin: 4 }}
        onChangeText={(Bank) => onDataChange({ ...data, Bank})}
      />
      <TextInput
        dense
        mode="outlined"
        value={data.IBAN}
        label="IBAN"
        style={{ margin: 4 }}
        onChangeText={(IBAN => onDataChange({ ...data, IBAN})}
      />
      <TextInput
        dense
        mode="outlined"
        style={{ margin: 4 }}
        value={data.branchOfBank}
        label="BranchOfBank"
        onChangeText={(branchOfBank) => onDataChange({ ...data, branchOfBank })}
      />
    </>
  );
}
