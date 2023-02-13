import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AppTextInputDisable = ({ title }) => {
  let color = "black";
  if (
    title === "Prefex" ||
    title === "First name" ||
    title === "Last name" ||
    title === "Date Of Birth" ||
    title === "Gender" ||
    title === "Mobile"
  ) {
    color = "#aaa";
  }
  return (
    <View
      style={{
        height: 48,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8,
        justifyContent: "center",
        backgroundColor: "#ddd",
      }}
    >
      <Text style={{ fontSize: 14, color: color }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppTextInputDisable;
