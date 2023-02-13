import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormikContext } from "formik";
import { MultiselectDropdown } from "sharingan-rn-modal-dropdown";
//import { useSnapshot } from "valtio";
import ErrorMessage from "./ErrorMessage";

const AppMultiDropdown = ({     
    title,
    placeholder,
    options,
    name,
    //onChange,
    isTablet,
    ...otherProps 
}) => {
const { 
    errors,
    handleChange,
    setFieldValue,
    touched, 
    values } = useFormikContext();

    //const { isTablet } = useSnapshot(state);
    return (
        <>
      <View
        style={{
          marginBottom: 16,
          width: "100%",
          flexDirection: isTablet ? "row" : "column",
          alignItems: isTablet ? "center" : null,
        }}
      >
        <Text
          style={{
            marginBottom: isTablet ? 0 : 5,
            minWidth: isTablet ? 200 : null,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            width: isTablet ? 350 : "100%",
            marginLeft: isTablet ? 50 : 0,
          }}
        >
          <MultiselectDropdown
            emptySelectionText={`Select ${placeholder}`}
            selectedItemsText={`Selected ${placeholder}`}
            data={options}
            //value={value || []}
            value={values[name] || []}
            //onChange={onChange}
            onChange={value => {
              setFieldValue(name, value)
              //onGeTValue(value)
            }}
            mode="flat"
            {...otherProps}
          />
        </View>
       <ErrorMessage error={errors[name]} visible={touched[name]} /> 
      </View>
      </>
    );
};

export default AppMultiDropdown;