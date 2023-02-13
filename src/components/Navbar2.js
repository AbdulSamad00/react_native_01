import "react-native-gesture-handler";
import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";

export class Navbar2 extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Container}>
          <TouchableOpacity style={styles.left}>
            <TouchableOpacity
              onPress={this.props.arrow}
              delayPressIn={0}
              style={styles.icon}
            >
              <Icon
                name={"arrow-back-outline"}
                type="ionicon"
                color="#fff"
                size={35}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.middle}>
            <Text style={styles.TextFont}>{this.props.Text}</Text>
          </View>

          <TouchableOpacity
            delayPressIn={0}
            onPress={this.props.RightPress}
            style={styles.Right}
          >
            <Text style={styles.RText}>{this.props.RightText}</Text>
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
    width: "20%",
    height: "100%",
  },
  middle: {
    width: "55%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "gold",
  },
  Right: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  TextFont: {
    color: "white",
    fontSize: h("2.5%"),
    fontWeight: "bold",
  },
  icon: {
    // backgroundColor: 'tomato',
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  RText: {
    color: "white",
    fontSize: h("2%"),
    fontWeight: "bold",
  },
});
