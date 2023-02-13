import "react-native-gesture-handler";
import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";

export class Navbar3 extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Container}>
          <View style={styles.middle}>
            <Text style={styles.TextFont}>{this.props.Text}</Text>
          </View>
          <TouchableOpacity
            onPress={this.props.Plus}
            delayPressIn={0}
            style={styles.Right}
          >
            <Icon name={"add-outline"} type="ionicon" color="#fff" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.bell}
            delayPressIn={0}
            style={styles.left}
          >
            <Image
              style={styles.icons}
              source={require("../assets/bell.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#00B7DD",
    width: w("100%"),
    height: h("7%"),
    flexDirection: "row",
  },
  left: {
    width: "15%",
    height: "100%",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  middle: {
    width: "65%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "gold",
    paddingLeft: h("15%"),
  },
  Right: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
  },
  TextFont: {
    color: "white",
    fontSize: h("2.5%"),
    fontWeight: "bold",
  },
  icon: {
    // backgroundColor: "tomato",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  RText: {
    color: "white",
    fontSize: h("2.2%"),
    fontWeight: "bold",
  },
  icons: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
});
