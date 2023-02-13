import React, { forwardRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { state } from "../../../App";

const AppTextInput = forwardRef(
  ({ icon, label, error, touched, containerStyle, ...otherProps }, ref) => {
    const validationColor = !touched
      ? "#223e4b"
      : error
      ? "#FF5A5F"
      : "#223e4b";
    return (
      <View
        style={[
          { marginBottom: 16, width: "100%" },
          containerStyle,
        ]}
      >
        {label && <Text style={{ marginBottom: 5 }}>{label}</Text>}
        <View
          style={[
            {
              height: 58,
              minHeight: 48,
              borderRadius: 8,
              borderColor: validationColor,
              borderWidth: StyleSheet.hairlineWidth,
              padding: 8,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(34, 62, 75, 0.7)"
              returnKeyType="next"
              returnKeyLabel="next"
              autoCapitalize="none"
              multiline={true}
              style={{
                fontSize: 12,
                height: "100%",
                width: "100%",
                textAlignVertical: "top"
              }}
              ref={ref}
              {...otherProps}
            />
          </View>
        </View>
        {error && (
          <Text style={{ fontSize: 10, color: validationColor, marginTop: 10 }}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
});

export default AppTextInput;
