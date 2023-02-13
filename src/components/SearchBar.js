import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Animated,
  Image,
} from "react-native";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";

export class SearchBar extends Component {
  render() {
    return (
      <Animated.View style={[styles.container]}>
        <TextInput
          {...this.props}
          style={styles.txtinput}
          placeholder={"Search by name, specialty, keywords..."}
          placeholderTextColor={"#0006"}
        />
        <TouchableOpacity
          {...this.props}
          onPress={this.props.cart}
          delayPressIn={0}
          style={styles.icon}
        >
          <Image
            style={styles.icons}
            source={require("../assets/search.png")}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "90%",
    height: h("6%"),
    // borderRadius: h('1.5%'),
    flexDirection: "row",
    marginTop: h("5%"),
    borderRadius: h("10%"),
    // elevation: h('2%'),
  },
  txtinput: {
    // backgroundColor: 'tomato',
    width: "85%",
    height: h("6%"),
    paddingLeft: h("1.5%"),
    color: "black",
  },
  icon: {
    // backgroundColor: "red",
    width: "12%",
    height: h("6%"),
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
});
