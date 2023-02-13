import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";

export class Appbtn extends Component {
  render() {
    return (
      <TouchableOpacity
        delayPressIn={0}
        {...this.props}
        style={[styles.container, this.props.style]}
      >
        <Text style={styles.txt}>{this.props.txt}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00B7DD",
    width: "85%",
    height: h("7%"),
    borderRadius: h("10%"),
    flexDirection: "row",
    marginTop: h("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "white",
    fontSize: h("2.4%"),
  },
});
