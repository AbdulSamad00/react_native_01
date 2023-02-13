import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Navbar, AppText2, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

export class PaymentsDetails extends Component {
  state = {
    active: "Active",
    AppoinmentSwitch: true,
    bank: "",
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <View style={styles.TopContainer}>
            <View style={styles.ContainerForPic}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={styles.TopLeftContianer}
              >
                <Icon
                  name={"arrow-back-outline"}
                  type="ionicon"
                  color="#fff"
                  size={35}
                />
              </TouchableOpacity>
              <View style={styles.TopMiddleContianer}>
                <Text style={styles.nameText}>Payment Details</Text>
              </View>
              <View style={styles.TopRightContianer}></View>
            </View>
            <View style={styles.TopActiveContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ active: "Active" });
                }}
                style={styles.TopLeftActiveContainer}
              >
                {this.state.active === "Active" ? (
                  <>
                    <Text style={styles.ActiveText}>To Pay</Text>
                    <View style={styles.underline} />
                  </>
                ) : (
                  <Text style={styles.ActiveText2}>To Pay</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ active: "Past" });
                }}
                style={styles.TopRightActiveContainer}
              >
                {this.state.active === "Past" ? (
                  <>
                    <Text style={styles.ActiveText}>To Receive</Text>
                    <View style={styles.underline} />
                  </>
                ) : (
                  <Text style={styles.ActiveText2}>To Receive</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* lower container */}

          {this.state.active === "Active" ? (
            <View style={styles.lowerContainer}>
              <View style={styles.Card}>
                <View style={styles.upperCard}>
                  <Text style={styles.bankName}>United Bank of Michigan</Text>
                  <Text style={styles.bankName}>XXXX-XXXX-XXXX-4857</Text>
                  <Text style={styles.bankName}>VISA</Text>
                </View>
                <View style={styles.lowerCard}>
                  <TouchableOpacity>
                    <Image
                      style={styles.icons2}
                      source={require("../../assets/dell.png")}
                    />
                  </TouchableOpacity>
                  <Switch
                    trackColor={{ false: "#767577", true: "#3DC03A" }}
                    thumbColor={
                      this.state.AppoinmentSwitch ? "#f4f3f4" : "#f4f3f4"
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      this.setState({
                        AppoinmentSwitch: !this.state.AppoinmentSwitch,
                      });
                    }}
                    value={this.state.AppoinmentSwitch}
                  />
                </View>
              </View>

              {/* add card */}
              <View style={styles.loginScreen}>
                <Text style={styles.addcard}>Add New Card</Text>
                <View style={styles.TextinputFields}>
                  <AppText2
                    Header={"NAME ON THE CARD"}
                    placeholder={"John Doe"}
                  />
                  <AppText2 Header={"CARD NUMBER"} placeholder={"John Doe"} />

                  <View style={styles.twoFields}>
                    <View style={styles.leftFields}>
                      <AppText2
                        Header={"EXPIRY MONTH"}
                        placeholder={"Feb 15, 1980"}
                      />
                    </View>
                    <View style={styles.RightFields}>
                      <AppText2
                        Header={"EXPIRY YEAR"}
                        placeholder={"John Doe"}
                      />
                    </View>
                  </View>
                  <AppText2 Header={"ENTER CVV"} placeholder={"123"} />
                  <View style={styles.submitbuttonContainer}>
                    <Appbtn txt={"SAVE"} />
                  </View>
                </View>
              </View>

              {/* end card */}
            </View>
          ) : (
            <View style={styles.lowerContainer}>
              <View style={styles.Card}>
                <View style={styles.upperCard}>
                  <Text style={styles.bankName}>United Bank of Michigan</Text>
                  <Text style={styles.bankName}>XXXX-XXXX-XXXX-4857</Text>
                  <Text style={styles.bankName}>VISA</Text>
                </View>
                <View style={styles.lowerCard}>
                  <TouchableOpacity>
                    <Image
                      style={styles.icons2}
                      source={require("../../assets/dell.png")}
                    />
                  </TouchableOpacity>
                  <Switch
                    trackColor={{ false: "#767577", true: "#3DC03A" }}
                    thumbColor={
                      this.state.AppoinmentSwitch ? "#f4f3f4" : "#f4f3f4"
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      this.setState({
                        AppoinmentSwitch: !this.state.AppoinmentSwitch,
                      });
                    }}
                    value={this.state.AppoinmentSwitch}
                  />
                </View>
              </View>

              {/* add card */}
              <View style={styles.loginScreen}>
                <Text style={styles.addcard}>Add New Bank Account</Text>
                <View style={styles.TextinputFields}>
                  <AppText2
                    Header={"Add New Bank Account"}
                    placeholder={"United Bank of Michigan"}
                  />

                  <AppText2
                    Header={"ACCOUNT HOLDER NAME"}
                    placeholder={"Enter Account Holder Name"}
                  />

                  <AppText2
                    Header={"BANK ACCOUNT NUMBER"}
                    placeholder={"Enter Account Number"}
                  />
                  <AppText2
                    Header={"IFSC CODE"}
                    placeholder={"Enter IFSC Code"}
                  />
                  <View style={styles.submitbuttonContainer}>
                    <Appbtn txt={"SAVE"} />
                  </View>
                </View>
              </View>

              {/* end card */}
            </View>
          )}
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
    alignItems: "center",
  },
  TopContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
    height: h("25%"),
    alignItems: "center",
  },
  ContainerForPic: {
    // backgroundColor: 'red',
    width: "90%",
    height: h("15%"),
    flexDirection: "row",
    marginTop: h("2.5%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  TopRightContianer: {
    // backgroundColor: 'tomato',
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgRenderDesgin: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 110 / 2,
  },
  nameText: {
    fontSize: h("2.4%"),
    fontWeight: "bold",
    color: "white",
  },

  icons: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
  },
  icons2: {
    width: "20%",
    height: "20%",
    resizeMode: "contain",
    marginBottom: h("3%"),
  },

  TopActiveContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("7%"),
    flexDirection: "row",
  },
  TopLeftActiveContainer: {
    // backgroundColor: 'green',
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopRightActiveContainer: {
    // backgroundColor: 'gold',
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ActiveText: {
    color: "white",
    fontSize: h("2.4%"),
    fontWeight: "bold",
    marginTop: h("4%"),
  },
  ActiveText2: {
    color: "white",
    fontSize: h("2.4%"),
    marginTop: h("3%"),
  },
  underline: {
    backgroundColor: "white",
    width: "100%",
    height: h("0.8%"),
    marginTop: h("1%"),
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
    fontSize: h("2%"),
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
    fontSize: h("3%"),
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
  picker: {
    // backgroundColor: 'green',
    width: "99%",

    borderBottomColor: "black",
    borderBottomWidth: h("1%"),
  },
});
