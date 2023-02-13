import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import SubmitButton from "./AppSubmitButton";
const Button = ({ title, onPress, style, textStyle }) => {
    const { handleSubmit } = useFormikContext();
  return (
    <SubmitButton
    style={style}
    textStyle={textStyle}
    title={title}
    //onPress={onPress(handleSubmit)}
    onPress={onPress}
  />
  );
};

export default Button;