import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AppSubmitButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppSubmitButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00B7DD",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    color: "white",
    textTransform: "uppercase",
  },
});
