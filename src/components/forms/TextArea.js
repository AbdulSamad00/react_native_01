import React, { forwardRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
//import { useSnapshot } from "valtio";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const AppTextArea = forwardRef(
  ({ icon,  name, label, isTablet, ...otherProps }, ref) => {
    const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();
    const validationColor = !touched
      ? "#223e4b"
      : errors[name]
      ? "#FF5A5F"
      : "#223e4b";
      //const { isTablet } = useSnapshot(state);  

    return (
      <View
        style={{ marginBottom: 16, width: isTablet ? "70%" : "100%" }}
      >
        <Text style={{ marginBottom: 5 }}>{label}</Text>
        <View
          style={{
            minHeight: 48,
            borderRadius: 8,
            borderColor: validationColor,
            borderWidth: StyleSheet.hairlineWidth,
            padding: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(34, 62, 75, 0.7)"
              returnKeyType="next"
              returnKeyLabel="next"
              autoCapitalize="none"
              numberOfLines={4}
              style={{ width: "100%" }}
              value={values[name]}
              onChangeText={handleChange(name)}
              ref={ref}
              {...otherProps}
            />
          </View>
        </View>
        <ErrorMessage error={errors[name]} visible={touched[name]} /> 
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
});

export default AppTextArea;