import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Navbar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

export class Register extends Component {
  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <StatusBar />
          <Navbar
            onPress={() => {
              this.props.navigation.goBack();
            }}
            Text={"Register"}
          />
          <View style={styles.sideImge}>
            <Image
              style={styles.imgeContainer}
              source={require("../../assets/1.png")}
            />
          </View>
          <View style={styles.loginScreen}>
            <Text style={styles.headingText}>Create Account</Text>
            <Text style={styles.headingText2}>
              Please fill the form to create your account.
            </Text>

            <View style={styles.TextinputFields}>
              <AppText
                Header={"firstName"} img={require("../../assets/user.png")} placeholder={"John"}
              />
              <AppText
                Header={"lastName"} img={require("../../assets/user.png")} placeholder={"Smith"}
              />
              <AppText
                Header={"DOB"} img={require("../../assets/user.png")} placeholder={"Day of Birth"}
              />
              <AppText
                Header={"country"} img={require("../../assets/user.png")} placeholder={"country"}
              />
			  
              <AppText
                Header={"email"} img={require("../../assets/user.png")} placeholder={"johnsmith@gmail.com"}
              />
			  
              <AppText
                Header={"MOBILE (OPTIONAL)"}
                img={require("../../assets/mobile.png")}
                placeholder={"+1-4353531414"}
              />
              <Appbtn
                onPress={() => {
                  this.props.navigation.navigate("ProfileSetup");
                }}
                txt={"Signin"}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: h("130%"),
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
    height: h("76%"),

    alignItems: "center",
    marginTop: h("3%"),
    // backgroundColor: 'red',
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
    // backgroundColor: 'green',
    marginTop: h("28%"),
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
