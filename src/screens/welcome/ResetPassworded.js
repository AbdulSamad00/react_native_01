import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Navbar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";

export class ResetPassworded extends Component {
  state = {
    modalVisible: false,
  };
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
          <Text style={styles.headingText2}>Enter your new Password.</Text>

          <View style={styles.TextinputFields}>
            <AppText
              Header={"PASSWORD"}
              img={require("../../assets/lock.png")}
              placeholder={"• • • • • • • •"}
              password={true}
            />
            <AppText
              Header={"CONFIRM PASSWORD"}
              img={require("../../assets/lock.png")}
              placeholder={"• • • • • • • •"}
              password={true}
            />

            <Appbtn
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              txt={"Submit"}
            />
          </View>
        </View>
        <View style={styles.RegisterScreen}></View>
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
              <Text style={styles.PasswordText}>Password Changed</Text>
              <Text style={[styles.PasswordChangeText, { marginTop: h("4%") }]}>
                Your password has been changed
              </Text>
              <Text style={styles.PasswordChangeText}>successfully.</Text>
              <View style={styles.Top}>
                <Appbtn
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    this.props.navigation.navigate("Login");
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
    fontSize: h("2%"),
    fontWeight: "bold",
  },
  DoctorText: {
    color: "black",
    fontSize: h("2%"),
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
    fontSize: h("2.2%"),
    fontWeight: "100",
  },
  Top: {
    // backgroundColor: "red",
    width: "100%",
    height: h("12%"),
    marginTop: h("4%"),
    alignItems: "center",
  },
});
