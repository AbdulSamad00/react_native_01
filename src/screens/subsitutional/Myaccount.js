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
import { Navbar2, AppText2, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

export class Myaccount extends Component {
  state = { City: "" };
  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <Navbar2
            arrow={() => {
              this.props.navigation.goBack();
            }}
            Text={"Profile"}
          />

          <View style={styles.loginScreen}>
            <View style={styles.TextinputFields}>
              <AppText2 Header={"FULL NAME"} placeholder={"John Doe"} />
              <AppText2
                Header={"EMAIL ADDRESS"}
                placeholder={"johndoe@gmail.com"}
              />
              <AppText2 Header={"MOBILE"} placeholder={"+91-123-232-3434"} />

              <AppText2
                Header={"MBBS REGISTRATION NUMBER"}
                placeholder={"LKD232929DSD3332"}
              />

              <AppText2 Header={"CITY"} placeholder={"New Delhi"} />

              <AppText2 Header={"Whatsapp"} placeholder={"+91-123-232-3434"} />

              <Appbtn
                txt={"Submit"}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
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
    height: h("120%"),
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
  picker: {
    // backgroundColor: 'green',
    width: "99%",

    borderBottomColor: "black",
    borderBottomWidth: h("1%"),
  },
  container22: {
    // backgroundColor: '#fff',
    width: "89%",
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
  },

  img22: {
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
    color: "#0006",
    fontSize: h("2.2%"),
  },
  Topmargin: {
    marginTop: h("4%"),
  },
});
