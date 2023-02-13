import React, { forwardRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { state } from "../../../App";

const AppTextArea = forwardRef(
  ({ icon, error, label, touched, ...otherProps }, ref) => {
    const validationColor = !touched
      ? "#223e4b"
      : error
      ? "#FF5A5F"
      : "#223e4b";
    return (
      <View
        style={{ marginBottom: 16, width: "100%" }}
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
              multiline={true}
              style={{ width: "100%",textAlignVertical: "top" }}
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

export default AppTextArea;
