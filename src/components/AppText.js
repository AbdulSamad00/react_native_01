import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { w, h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export class AppText extends Component {
  render() {
    return (
      <>
        <View style={styles.Topmargin}>
          {this.props.Header && (
            <View style={styles.HeaderText}>
              <Text style={styles.HeaderTextf}>{this.props.Header}</Text>
            </View>
          )}
          <View
            style={[
              {
                width: this.props.width,
              },
              styles.container,
              this.props.style,
            ]}
          >
            {this.props.image && (
              <View style={styles.icon}>
                <Image style={styles.img} source={this.props.img} />
              </View>
            )}
            {this.props.inputType === "numeric" ? (
              <View style={styles.numericInput}>
                <TextInput
                  {...this.props}
                  style={[styles.txtinput]}
                  placeholder={this.props.placeholder}
                  placeholderTextColor={"black"}
                  secureTextEntry={this.props.password}
                />
                <View style={styles.numericContainer}>
                  <TouchableOpacity onPress={this.props.onPressUp}>
                    <Icon name="arrow-up" size={15} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.props.onPressDown}>
                    <Icon name="arrow-down" size={15} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TextInput
                {...this.props}
                style={[styles.txtinput]}
                placeholder={this.props.placeholder}
                placeholderTextColor={"black"}
                secureTextEntry={this.props.password}
              />
            )}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    width: "86%",
    height: h("7%"),
    borderRadius: h("1.5%"),
    flexDirection: "row",

    borderBottomColor: "#0005",
    borderBottomWidth: h("0.2%"),
  },
  txtinput: {
    // backgroundColor: 'tomato',
    width: "85%",
    height: h("7%"),
    paddingLeft: h("1.5%"),
    color: "black",
    fontSize:22
  },
  icon: {
    // backgroundColor: 'red',
    width: "15%",
    height: h("7%"),
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  HeaderText: {
    // backgroundColor: 'red',
    width: "83%",
    height: h("2.8%"),
    justifyContent: "center",
    marginLeft: h("1%"),
  },
  HeaderTextf: {
    color: "#000",
    fontSize: h("2.2%"),
    fontWeight: "bold",
  },
  Topmargin: {
    marginTop: h("1.5%"),
  },
  numericInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  numericContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});
