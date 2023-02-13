import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Navbar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";

export class RestPassowrd extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <SafeAreaView />
        <Navbar
          onPress={() => {
            this.props.navigation.goBack();
          }}
          Text={"Rest Passowrd"}
        />
        <View style={styles.sideImge}>
          <Image
            style={styles.imgeContainer}
            source={require("../../assets/1.png")}
          />
        </View>
        <View style={styles.loginScreen}>
          <Text style={styles.headingText}>Reset Password</Text>
          <Text style={styles.headingText2}>
            Enter your registered email below to receive reset password
            instruction.
          </Text>

          <View style={styles.TextinputFields}>
            <AppText
              Header={"EMAIL ADDRESS"}
              img={require("../../assets/mail.png")}
              placeholder={"johndoe@gmail.com"}
            />

            <Appbtn
              onPress={() => {
                this.props.navigation.navigate("ResetPassworded");
              }}
              txt={"Submit"}
            />
          </View>
        </View>
        <View style={styles.RegisterScreen}>
          <View style={styles.Register}>
            <Text style={styles.DoctorText}>Go back to </Text>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            >
              <Text style={styles.RegisterText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  sideImge: {
    backgroundColor: "#003C75",
    width: "50%",
    height: h("15%"),
    marginTop: h("2%"),
    borderBottomRightRadius: h("10%"),
    borderTopRightRadius: h("10%"),
    justifyContent: "center",
    alignItems: "flex-end",
  },
  imgeContainer: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  loginScreen: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("60%"),
    marginTop: h("2%"),
  },
  headingText: {
    fontSize: h("3.8%"),
    color: "black",
    marginLeft: h("2.2%"),
    marginTop: h("2%"),
  },
  headingText2: {
    color: "#0007",
    fontSize: h("2%"),
    marginLeft: h("2.2%"),
  },
  TextinputFields: {
    width: "100%",
    height: "80%",

    alignItems: "center",
    marginTop: h("3%"),
  },
  Forgotbutton: {
    marginTop: h("2%"),
  },
  ForgotbuttonText: {
    color: "#0007",
    fontSize: h("2.2%"),
    marginLeft: h("2%"),
  },
  RegisterScreen: {
    width: "100%",
    height: h("11%"),
    alignItems: "center",
  },
  Register: {
    width: "42%",
    height: h("6%"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  RegisterText: {
    color: "black",
    fontSize: h("2%"),
    fontWeight: "bold",
  },
  DoctorText: {
    color: "black",
    fontSize: h("2%"),
  },
});
