import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Navbar, AppText2, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

export class Slot2 extends Component {
  state = { bank: "", stime: "", etime: "" };

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

          {/* end */}

          <View style={styles.lowerContainer}>
            {/* add card */}
            <View style={styles.loginScreen}>
              <Text style={styles.addcard}>Create a New Slot</Text>
              <View style={styles.TextinputFields}>
                <AppText2 Header={"START DATE"} placeholder={"Aug 20, 2020"} />

                <AppText2 Header={"END DATE"} placeholder={"Aug 30, 2020"} />

                <View style={[styles.topDateBox, { marginTop: h("2%") }]}>
                  <Text style={styles.HeaderTextf}>SLOT DURATION</Text>
                </View>

                {/* calander */}
                <View style={styles.topDateBox2}>
                  {this.state.stime === "25" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ stime: "" });
                      }}
                      style={styles.DateBox4}
                    >
                      <Text style={styles.dateText4}>25Min</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ stime: "25" });
                      }}
                      style={styles.DateBox5}
                    >
                      <Text style={styles.dateText}>25Min</Text>
                    </TouchableOpacity>
                  )}
                  {this.state.stime === "45" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ stime: "" });
                      }}
                      style={styles.DateBox4}
                    >
                      <Text style={styles.dateText4}>45Min</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ stime: "45" });
                      }}
                      style={styles.DateBox5}
                    >
                      <Text style={styles.dateText}>45Min</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={[styles.topDateBox, { marginTop: h("2%") }]}>
                  <Text style={styles.HeaderTextf}>WEEK DAYS</Text>
                </View>

                {/* calander */}
                <View style={styles.topDateBox2}>
                  {this.state.date === "Sun" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "" });
                      }}
                      style={styles.DateBox3}
                    >
                      <Text style={styles.dateText4}>Sun</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "Sun" });
                      }}
                      style={styles.DateBox}
                    >
                      <Text style={styles.dateText}>Sun</Text>
                    </TouchableOpacity>
                  )}

                  {this.state.date === "Mon" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "" });
                      }}
                      style={styles.DateBox3}
                    >
                      <Text style={styles.dateText4}>Mon</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "Mon" });
                      }}
                      style={styles.DateBox}
                    >
                      <Text style={styles.dateText}>Mon</Text>
                    </TouchableOpacity>
                  )}
                  {this.state.date === "Tue" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "" });
                      }}
                      style={styles.DateBox3}
                    >
                      <Text style={styles.dateText4}>Tue</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "Tue" });
                      }}
                      style={styles.DateBox}
                    >
                      <Text style={styles.dateText}>Tue</Text>
                    </TouchableOpacity>
                  )}
                  {this.state.date === "wed" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "" });
                      }}
                      style={styles.DateBox3}
                    >
                      <Text style={styles.dateText4}>Wed</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "wed" });
                      }}
                      style={styles.DateBox}
                    >
                      <Text style={styles.dateText}>Wed</Text>
                    </TouchableOpacity>
                  )}
                  {this.state.date === "thu" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "" });
                      }}
                      style={styles.DateBox3}
                    >
                      <Text style={styles.dateText4}>Thu</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "thu" });
                      }}
                      style={styles.DateBox}
                    >
                      <Text style={styles.dateText}>Thu</Text>
                    </TouchableOpacity>
                  )}
                  {this.state.date === "fri" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "" });
                      }}
                      style={styles.DateBox3}
                    >
                      <Text style={styles.dateText4}>Fri</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "fri" });
                      }}
                      style={styles.DateBox}
                    >
                      <Text style={styles.dateText}>Fri</Text>
                    </TouchableOpacity>
                  )}
                  {this.state.date === "sat" ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "" });
                      }}
                      style={styles.DateBox3}
                    >
                      <Text style={styles.dateText4}>Sat</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ date: "sat" });
                      }}
                      style={styles.DateBox}
                    >
                      <Text style={styles.dateText}>Sat</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.submitbuttonContainer}>
                  <Appbtn txt={"SAVE"} />
                </View>
              </View>
            </View>

            {/* end card */}
          </View>

          {/* end2 */}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: h("120%"),
    backgroundColor: "#f2f2f2",
    alignItems: "center",
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
    fontSize: h("2%"),
    fontWeight: "bold",
  },
  BoxContainer: {
    backgroundColor: "white",
    width: "100%",
    height: h("10%"),
    flexDirection: "row",
  },
  lowerContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: "100%",
    // marginTop: h('2%'),

    alignItems: "center",
  },
  Card: {
    backgroundColor: "#003C75",
    width: "90%",
    height: h("20%"),
    marginTop: h("2%"),
    borderRadius: h("2%"),
    flexDirection: "row",
  },
  upperCard: {
    // backgroundColor: 'red',
    width: "70%",
    height: "100%",
    justifyContent: "center",
    paddingLeft: h("2%"),
  },
  lowerCard: {
    // backgroundColor: 'gold',
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bankName: {
    color: "white",
    fontSize: h("2.5%"),
    marginTop: h("2%"),
  },
  twoFields: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("15%"),
    marginTop: h("2%"),
    flexDirection: "row",
  },
  leftFields: {
    // backgroundColor: 'green',
    width: "50%",
    height: h("15%"),
  },
  RightFields: {
    // backgroundColor: 'gold',
    width: "50%",
    height: h("15%"),
  },
  submitbuttonContainer: {
    // backgroundColor: 'red',
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: h("3%"),
  },
  loginScreen: {
    // backgroundColor: 'red',
    width: "90%",
    height: h("60%"),
    marginTop: h("2%"),
  },
  addcard: {
    color: "black",
    fontSize: h("2.4%"),
    fontWeight: "100",
  },
  container22: {
    // backgroundColor: '#f24',
    width: "95%",
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

  HeaderTextf: {
    color: "#0006",
    fontSize: h("2.2%"),
  },
  Topmargin: {
    marginTop: h("4%"),
  },
  picker: {
    // backgroundColor: 'green',
    width: "99%",

    borderBottomColor: "black",
    borderBottomWidth: h("1%"),
  },
  topDateBox: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("7%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: h("2%"),
    paddingRight: h("2%"),
  },
  topDateBox2: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("10%"),
    flexDirection: "row",
    justifyContent: "space-around",
  },
  DateBox: {
    // backgroundColor: 'gold',
    width: "13.5%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: h("0.5%"),
  },
  DateBox5: {
    // backgroundColor: "gold",
    width: "15.5%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: h("0.5%"),
  },
  DateBox3: {
    backgroundColor: "#003C75",
    width: "13.5%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: h("0.5%"),
  },
  DateBox4: {
    backgroundColor: "#003C75",
    width: "15.5%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: h("0.5%"),
  },
  dateText: {
    color: "#0007",
    fontSize: h("2%"),
  },
  dateText4: {
    color: "#ffff",
    fontSize: h("2%"),
  },

  dateText2: {
    color: "#000",
    fontSize: h("4%"),
  },
  dateText3: {
    color: "#fff",
    fontSize: h("4%"),
  },
});
