import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import CountryDropdown from "../CountryDropdown";

/** @param {{onChange: (data: any) => void}} props */
export default function Membership(props) {
  const [data, setData] = useState({
    organizationAName: "",
    organizationAMemberNo: "",
    organizationBName: "",
    organizationBMemberNo: "",
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
        value={data.organizationAName}
        label="OrganizationA Name"
        style={{ margin: 4 }}
        onChangeText={(organizationAName) => onDataChange({ ...data, organizationAName})}
      />
      <TextInput
        dense
        mode="outlined"
        value={data.organizationAMemberNo}
        label="OrganizationA MemberNo"
        style={{ margin: 4 }}
        onChangeText={(organizationAMemberNo => onDataChange({ ...data, organizationAMemberNo})}
      />
      <TextInput
        dense
        mode="outlined"
        value={data.organizationBName}
        label="OrganizationB Name"
        style={{ margin: 4 }}
        onChangeText={(organizationBName) => onDataChange({ ...data, organizationBName})}
      />
      <TextInput
        dense
        mode="outlined"
        value={data.organizationBMemberNo}
        label="OrganizationB MemberNo"
        style={{ margin: 4 }}
        onChangeText={(organizationBMemberNo => onDataChange({ ...data, organizationBMemberNo})}
      />
    </>
  );
}
