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
import { SearchBar, AppText2, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

export class PaymentDetail extends Component {
  state = {
    modalVisible: false,
  };

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
              <Text style={styles.text2}>Patient Detail & Documents</Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.text2}>Schedule & Communication</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.text}>Payment Detail</Text>
              <View style={styles.line} />
            </View>
          </View>

          {/* LOGIN SCREEN */}
          <View style={styles.topDateBox}>
            <Text style={styles.Texts}>Payment Detail</Text>
            <Text style={styles.Texts2}>$150.00</Text>
          </View>

          {/* card and login */}
          <View style={styles.lowerContainer}>
            <View style={styles.Card}>
              <View style={styles.upperCard}>
                <Text style={styles.bankName}>United Bank of Michigan</Text>
                <Text style={styles.bankName}>XXXX-XXXX-XXXX-4857</Text>
                <Text style={styles.bankName}>VISA</Text>
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
                    <AppText2 Header={"EXPIRY YEAR"} placeholder={"John Doe"} />
                  </View>
                </View>
                <AppText2 Header={"ENTER CVV"} placeholder={"123"} />
                <View style={styles.submitbuttonContainer}>
                  <Appbtn
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}
                    txt={"PAY NOW"}
                  />
                </View>
              </View>
            </View>
            {/* end card */}
          </View>
          {/* card and login */}
          {/* END LOGIN SCREEN */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={styles.modalDisplay}>
              <View style={styles.modalAlert}>
                <Text style={styles.modalHeaderText}>Appointment Booked!</Text>
                <Text style={styles.modalText}>
                  Your appointment with Dr John Doe has been booked
                  successfully.!
                </Text>
                <Appbtn
                  onPress={() => {
                    this.props.navigation.navigate("Consultant");
                    this.setState({ modalVisible: false });
                  }}
                  txt={"OK"}
                />
              </View>
            </View>
          </Modal>
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
  left: {
    // backgroundColor: 'green',
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
    // backgroundColor: 'orange',
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
    marginLeft: h("1%"),
    marginRight: h("1%"),
  },
  text2: {
    color: "#003C75",
    fontSize: h("1.3%"),

    marginLeft: h("1%"),
    marginRight: h("1%"),
  },
  line: {
    backgroundColor: "#003C75",
    width: "100%",
    height: h("0.6%"),
  },

  Texts: {
    color: "black",
    fontSize: h("2%"),
    fontWeight: "bold",
  },
  Texts2: {
    color: "#0007",
    fontSize: h("2%"),
    fontWeight: "bold",
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
    borderRadius: h("1%"),
    flexDirection: "row",
  },
  upperCard: {
    // backgroundColor: 'red',
    width: "70%",
    height: "100%",
    justifyContent: "center",
    paddingLeft: h("2%"),
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
    fontWeight: "bold",
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

  Topmargin: {
    marginTop: h("4%"),
  },
  picker: {
    // backgroundColor: 'green',
    width: "99%",

    borderBottomColor: "black",
    borderBottomWidth: h("1%"),
  },
  modalDisplay: {
    flex: 1,
    backgroundColor: "#0006",
    justifyContent: "center",
    alignItems: "center",
  },
  modalAlert: {
    backgroundColor: "white",
    width: "90%",
    height: h("30%"),
    borderRadius: h("2%"),
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: h("3%"),
    paddingRight: h("3%"),
  },
  modalHeaderText: {
    color: "black",
    fontSize: h("3%"),
    fontWeight: "bold",
    marginBottom: h("2%"),
  },
  modalText: {
    color: "black",
    fontSize: h("2.2%"),
    marginTop: h("2%"),
  },
});
