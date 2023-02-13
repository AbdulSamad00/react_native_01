import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
} from "react-native";
import { Navbar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";

export class Otp extends Component {
  state = {
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    modalVisible: false,
  };
  render() {
    return (
      <View style={styles.Container}>
        <SafeAreaView />
        <StatusBar />
        <Navbar
          onPress={() => {
            this.props.navigation.goBack();
          }}
          Text={"Email Verfication"}
        />
        <View style={styles.sideImge}>
          <Image
            style={styles.imgeContainer}
            source={require("../../assets/1.png")}
          />
        </View>
        <View style={styles.loginScreen}>
          <Text style={styles.headingText}>Enter OTP to Verify Email</Text>
          <Text style={styles.headingText2}>
            A 4 - digit code has been sent to your email. Please check your
            email and enter the code below.
          </Text>

          <View style={styles.TextinputFields}>
            <View style={styles.TextinputContainer}>
              <TextInput
                maxLength={1}
                style={[styles.TextInput]}
                keyboardType={"number-pad"}
                ref={"pin1Ref"}
                value={this.state.pin1}
                onChangeText={(pin1) => {
                  this.setState({ pin1 });
                  if (pin1 !== "") {
                    this.refs.pin2Ref.focus();
                  }
                }}
              />
              <TextInput
                maxLength={1}
                style={styles.TextInput}
                keyboardType={"number-pad"}
                ref={"pin2Ref"}
                value={this.state.pin2}
                onChangeText={(pin2) => {
                  this.setState({ pin2 });
                  if (pin2 !== "") {
                    this.refs.pin3Ref.focus();
                  }
                }}
              />
              <TextInput
                maxLength={1}
                style={styles.TextInput}
                keyboardType={"number-pad"}
                ref={"pin3Ref"}
                value={this.state.pin3}
                onChangeText={(pin3) => {
                  this.setState({ pin3 });
                  if (pin3 !== "") {
                    this.refs.pin4Ref.focus();
                  }
                }}
              />
              <TextInput
                maxLength={1}
                style={styles.TextInput}
                keyboardType={"number-pad"}
                value={this.state.pin4}
                ref={"pin4Ref"}
                onChangeText={(pin4) => {
                  this.setState({ pin4 });
                }}
              />
            </View>
            <Appbtn
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              txt={"Submit"}
            />
          </View>
        </View>
        <View style={styles.RegisterScreen}>
          <View style={styles.Register}>
            <Text style={styles.DoctorText}>Didn’t received code?</Text>
            <TouchableOpacity>
              <Text style={styles.RegisterText}> Resend </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={styles.Modal}>
            <View style={styles.ModalContainer}>
              <Text style={styles.PasswordText}>Congratulations!</Text>
              <Text style={[styles.PasswordChangeText, { marginTop: h("2%") }]}>
                You are successfully registered with us. Now let’s take a moment
                to create your profile.
              </Text>

              <View style={styles.Top}>
                <Appbtn
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    this.props.navigation.navigate("ProfileSetup");
                  }}
                  txt={"OK"}
                />
              </View>
            </View>
          </View>
        </Modal>
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
    fontSize: h("1.5%"),
    fontWeight: "bold",
  },
  DoctorText: {
    color: "black",
    fontSize: h("1.5%"),
  },
  TextInput: {
    // backgroundColor: "red",
    width: w("20%"),
    height: h("10%"),
    paddingLeft: h("3.5%"),
    paddingRight: h("3.2%"),
    fontSize: h("2.5%"),
    fontWeight: "bold",
    borderBottomColor: "#00B7DD",
    borderBottomWidth: h("0.6%"),
    color: "#00B7DD",
  },
  TextinputContainer: {
    // backgroundColor: "green",
    width: "100%",
    height: h("15%"),
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  Modal: {
    backgroundColor: "#0007",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalContainer: {
    backgroundColor: "white",
    width: "90%",
    height: h("30%"),
    borderRadius: h("2%"),
    alignItems: "center",
    paddingLeft: h("3.3%"),
    paddingRight: h("3.3%"),
  },
  PasswordText: {
    fontSize: h("3%"),
    color: "black",
    fontWeight: "bold",
    marginTop: h("1%"),
  },
  PasswordChangeText: {
    color: "#000",
    fontSize: h("2.1%"),
    fontWeight: "100",
  },
  Top: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("12%"),
    marginTop: h("2%"),
    alignItems: "center",
  },
});
