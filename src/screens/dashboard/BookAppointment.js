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
import { SearchBar, AppText2, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

export class BookAppointment extends Component {
  state = {};

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <View style={styles.TopContainer}>
            <View style={styles.ContainerForPic}>
              <View style={styles.TopLeftContianer}>
                <TouchableOpacity
                  style={styles.BackButton}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                >
                  <Icon
                    name="close-outline"
                    type="ionicon"
                    color="#ffff"
                    size={35}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.TopMiddleContianer}>
                <Text style={styles.HeaderText}>Book Appointment</Text>
              </View>
              <TouchableOpacity
                style={styles.TopRightContianer}
              ></TouchableOpacity>
            </View>
          </View>

          <View style={styles.BoxContainer}>
            <View style={styles.left}>
              <Text style={styles.text}>Patient Detail & Documents</Text>

              <View style={styles.line} />
            </View>
            <View style={styles.middle}>
              <Text style={styles.text2}>Schedule & Communication</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.text2}>Payment Detail</Text>
            </View>
          </View>

          <Text style={styles.Texts}>Tell Us About Patient</Text>
          {/* LOGIN SCREEN */}
          <View style={styles.loginScreen}>
            <View style={styles.TextinputFields}>
              <AppText2 Header={"PATIENT NAME"} placeholder={"Sam Alex"} />
              <View style={styles.twoFields}>
                <View style={styles.leftFields}>
                  <AppText2
                    Header={"DATE OF BIRTH"}
                    placeholder={"Feb 15, 1980"}
                  />
                </View>
                <View style={styles.RightFields}>
                  <AppText2 Header={"PATIENT AGE (YEARS)"} placeholder={"40"} />
                </View>
              </View>
              <View style={styles.Gender}>
                <View style={styles.GenderText}>
                  <Text style={styles.gendertextcss}>GENDER</Text>
                </View>
                <View style={styles.img}>
                  {this.state.gender === "Male" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ gender: "" });
                      }}
                      style={styles.genderButton}
                    >
                      <Image
                        style={styles.icons}
                        source={require("../../assets/m2.png")}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ gender: "Male" });
                      }}
                      style={styles.genderButton}
                    >
                      <Image
                        style={styles.icons}
                        source={require("../../assets/m1.png")}
                      />
                    </TouchableOpacity>
                  )}
                  {this.state.gender === "Female" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ gender: "" });
                      }}
                      style={styles.genderButton}
                    >
                      <Image
                        style={styles.icons}
                        source={require("../../assets/f2.png")}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ gender: "Female" });
                      }}
                      style={styles.genderButton}
                    >
                      <Image
                        style={styles.icons}
                        source={require("../../assets/f1.png")}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.DcoumentContainer}>
                  <Text style={styles.docText}>DOCUMENTS</Text>
                  {/* upload button */}
                  <TouchableOpacity style={styles.uploadContainer}>
                    <View style={styles.leftsContainer}>
                      <Image
                        style={styles.icons}
                        source={require("../../assets/doc.png")}
                      />
                    </View>
                    <View style={styles.RightsContainer}>
                      <Text style={styles.Uploadtext}>BLOOD REPORT</Text>
                    </View>
                    <View style={styles.leftbContainer}>
                      <Icon
                        name={"close-outline"}
                        type="ionicon"
                        color="#E93030"
                        size={35}
                      />
                    </View>
                  </TouchableOpacity>
                  {/* end upload button */}
                  {/* upload button */}
                  <TouchableOpacity style={styles.uploadContainer}>
                    <View style={styles.leftsContainer}>
                      <Image
                        style={styles.icons}
                        source={require("../../assets/doc.png")}
                      />
                    </View>
                    <View style={styles.RightsContainer}>
                      <Text style={styles.Uploadtext}>BLOOD REPORT</Text>
                    </View>
                    <View style={styles.leftbContainer}>
                      <Icon
                        name={"close-outline"}
                        type="ionicon"
                        color="#E93030"
                        size={35}
                      />
                    </View>
                  </TouchableOpacity>
                  {/* end upload button */}
                  <TouchableOpacity style={styles.uploadContainer}>
                    <View style={styles.leftContainer}>
                      <Image
                        style={styles.icons}
                        source={require("../../assets/u.png")}
                      />
                    </View>
                    <View style={styles.RightContainer}>
                      <Text style={styles.Uploadtext}>Upload File</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.submitbuttonContainer}>
                  <Appbtn
                    onPress={() => {
                      this.props.navigation.navigate("Schedule");
                    }}
                    txt={"PROCEED"}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* END LOGIN SCREEN */}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: h("150%"),
    backgroundColor: "#F6F6F6",
  },
  TopContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
    height: h("9%"),
    alignItems: "center",
  },
  ContainerForPic: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("8%"),
    flexDirection: "row",
    marginTop: h("1%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "15%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "70%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // paddingLeft: h('2%'),
  },
  TopRightContianer: {
    // backgroundColor: 'tomato',
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  icons: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  HeaderText: {
    color: "white",
    fontSize: h("2.5%"),
    fontWeight: "bold",
  },
  BoxContainer: {
    backgroundColor: "white",
    width: "100%",
    height: h("10%"),
    flexDirection: "row",
  },
  left: {
    // backgroundColor: "green",
    width: "33%",
    height: "100%",
    justifyContent: "space-between",
    paddingTop: h("3%"),
    alignItems: "center",
  },
  right: {
    // backgroundColor: "gold",
    width: "33%",
    height: "100%",
    justifyContent: "space-between",
    paddingTop: h("3%"),
    alignItems: "center",
  },
  middle: {
    // backgroundColor: "orange",
    width: "33%",
    height: "100%",
    justifyContent: "space-between",
    paddingTop: h("3%"),
    alignItems: "center",
  },
  text: {
    color: "#003C75",
    fontSize: h("1.5%"),
    fontWeight: "bold",
    marginLeft: h("2%"),
    marginRight: h("2%"),
  },
  text2: {
    color: "#003C75",
    fontSize: h("1.3%"),

    marginLeft: h("2%"),
    marginRight: h("2%"),
  },
  line: {
    backgroundColor: "#003C75",
    width: "100%",
    height: h("0.6%"),
  },
  loginScreen: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("120%"),
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
  HeaderText2: {
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
  twoFields: {
    // backgroundColor: 'red',
    width: "95%",
    height: h("15%"),
    marginTop: h("2%"),
    flexDirection: "row",
  },
  leftFields: {
    // backgroundColor: 'green',
    width: "50%",
    height: h("15%"),
    paddingLeft: h("2%"),
    paddingRight: h("2%"),
  },
  RightFields: {
    // backgroundColor: 'gold',
    width: "50%",
    height: h("15%"),
    paddingLeft: h("2%"),
    paddingRight: h("2%"),
  },
  Gender: {
    // backgroundColor: 'red',
    width: "90%",
    height: h("20%"),
    marginTop: h("2%"),
  },

  img: {
    // backgroundColor: 'gold',
    width: "100%",
    height: h("15%"),
    flexDirection: "row",
  },
  GenderText: {
    // backgroundColor: 'green',
    width: "100%",
    height: h("3%"),
    flexDirection: "row",
  },
  gendertextcss: {
    color: "#0006",
    fontSize: h("2.2%"),
  },
  genderButton: {
    // backgroundColor: 'green',
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadContainer: {
    backgroundColor: "white",
    width: "100%",
    height: h("10%"),
    flexDirection: "row",
    borderRadius: h("1%"),
    marginTop: h("2%"),
  },
  leftContainer: {
    // backgroundColor: 'gold',
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  RightContainer: {
    // backgroundColor: 'green',
    width: "80%",
    height: "100%",
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  Uploadtext: {
    color: "#000",
    fontSize: h("2%"),
  },
  submitbuttonContainer: {
    // backgroundColor: 'red',
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: h("3%"),
  },
  Texts: {
    color: "black",
    fontSize: h("2.5%"),
    fontWeight: "bold",
    marginLeft: h("2%"),
    marginTop: h("2%"),
  },
  DcoumentContainer: {
    // backgroundColor: 'gold',
    width: "100%",
    height: h("42%"),
  },
  uploadsContainer: {
    backgroundColor: "white",
    width: "90%",
    height: h("10%"),
    flexDirection: "row",
    borderRadius: h("1%"),
    marginTop: h("2%"),
  },
  leftsContainer: {
    // backgroundColor: 'gold',
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  RightsContainer: {
    // backgroundColor: 'red',
    width: "60%",
    height: "100%",
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  leftbContainer: {
    // backgroundColor: 'orange',
    width: "20%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  Uploadstext: {
    color: "#000",
    fontSize: h("3%"),
  },
  docText: {
    color: "#0004",
    fontSize: h("2.2%"),
  },
});
