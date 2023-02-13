import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormikContext } from "formik";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { useSnapshot } from "valtio";
import ErrorMessage from "./ErrorMessage";
const AppSingleDropdown = ({
    title,
    placeholder,
    options,
    value,
    name,
    isTablet,
   
    onChange,
    custom,
    //error,
    textStyle={},
    ...otherProps
  }) => {
    const { 
        errors,
        handleChange,
        setFieldValue,
        touched, 
        values } = useFormikContext();
    //const validationColor = error ? "#FF5A5F" : "#223e4b";
    //const { isTablet } = useSnapshot(state);
  
    return (
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
          {custom ? (
             <Dropdown
             textInputPlaceholder={placeholder}
             data={options}
             value={value}
             onChange={onChange}
             mode="flat"
             itemTextStyle={textStyle}
             {...otherProps}
             
           />
           ):
          (
          <Dropdown
            textInputPlaceholder={placeholder}
            data={options}
          
            value={values[name]}
            //onChange={onChange}
            onChange={value => {
              setFieldValue(name, value)
              //onGeTValue(value)
            }}
            mode="flat"
            itemTextStyle={textStyle}
            {...otherProps}
            
          />
          )}
        </View>
        <ErrorMessage error={errors[name]} visible={touched[name]} /> 
      </View>
    );
  };

export default AppSingleDropdown;  