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
import { Navbar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

export class ConsultantDetails extends Component {
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
                    name="arrow-back-outline"
                    type="ionicon"
                    color="#ffff"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.TopMiddleContianer}>
                <View style={styles.imgRenderDesgin}>
                  <Image
                    style={styles.faceImg}
                    source={require("../../assets/man.png")}
                  />
                </View>
                <Text style={styles.nameText}>Hi John!</Text>
                <Text style={styles.DateText}>Cardiologist New Delhi</Text>
              </View>
              <TouchableOpacity
                style={styles.TopRightContianer}
              ></TouchableOpacity>
            </View>
            <View style={styles.TopBottomContainer}>
              <View style={styles.TopContain}>
                <Text style={styles.Apponimtnnumber}>23</Text>
                <Text style={styles.AppoinmntText}>Experience (Years)</Text>
              </View>
              <View style={styles.MiddleContain}>
                <Text style={styles.Apponimtnnumber}>12</Text>
                <Text style={styles.AppoinmntText}>
                  Consultations Completed
                </Text>
              </View>
              <View style={styles.BottomContain}>
                <Text style={styles.Apponimtnnumber}>₹ 1000</Text>
                <Text style={styles.AppoinmntText}>Conultation Fee</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("BookAppointment");
              }}
              delayPressIn={0}
              style={styles.Btncontainer}
            >
              <Text style={styles.Btntxt}>BOOK APPOINTMENT</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Containerbox}>
            <Text style={styles.TopBoxText}>About</Text>
            <Text>
              Dr. John Doe, DM cardiology(Gold Medalist) is one of the senior
              interventional cardiologists. He is highly competent, learned &
              skilled cardiologist & is a pioneer of radial angiography and has
              done more than 9000 cardiac procedures till 2016. He is expert in
              radial angioplasty & stent placement & pacemaker implantations. He
              is also a consulting cardiologist & echocardiologist.
            </Text>
          </View>
          <View style={styles.Containerbox}>
            <Text style={styles.TopBoxText}>Services</Text>
            <Text>
              • Cardiac Catheterisation • Implantable
              Cardioverter-Defibrillators (Icds) • Patent Ductus Artriosus
              Device Closure • Non-Invasive Cardiology • Peripheral
              Interventions • Mitral/Heart Valve Replacement • ASD / VSD Device
              Closure • Cardiac Invasive Procedures • Balloon Mitral
              Valvuloplasty • Peripheral Vascular Disease
            </Text>
          </View>
          <View style={styles.Containerbox}>
            <Text style={styles.TopBoxText}>Experience</Text>
            <Text>
              • 2009 - 2010 Interventional & Consultant cardiologist at Escorts
              Arneja Heart Institute • 2009 - 2009 Post DM Residency in
              Cardiology at Post Graduate Institute of Medical Education &
              Research • 2010 - 2015 Chief Consultant Cardiologist at Mohak
              Hitech Hospital • 2010 - 2015 Chief Consultant Cardiologist at
              Bhandari Hospital & Research centre • 2010 - 2015 Associate
              Professor Cardiology at Sri Aurbindo Institute of Medical
              Sciences, SAIMS
            </Text>
          </View>
          <View style={[styles.Containerbox, { height: h("13%") }]}>
            <Text style={styles.TopBoxText}>Registrations</Text>
            <Text>• REG0028433 International Medical Council, 2003</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: h("170%"),
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  TopContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
    height: h("52%"),
    alignItems: "center",
  },
  ContainerForPic: {
    // backgroundColor: 'red',
    width: "90%",
    height: h("22%"),
    flexDirection: "row",
    marginTop: h("2.5%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "20%",
    height: "100%",

    // justifyContent: 'center',
    alignItems: "flex-start",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "55%",
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
  imgRenderDesgin: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 110 / 2,
  },
  nameText: {
    fontSize: h("3%"),
    fontWeight: "bold",
    color: "white",
  },
  DateText: {
    fontSize: h("2%"),
    color: "white",
  },
  icons: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
  },
  faceImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  TopBottomContainer: {
    // backgroundColor: 'red',
    width: "95%",
    height: h("15%"),
    marginTop: h("1%"),
    flexDirection: "row",
    alignItems: "center",
  },
  TopContain: {
    // backgroundColor: "green",
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    // paddingLeft: h("2.5%"),
    // paddingRight: h("2%"),
    borderRightColor: "#0003",
    borderRightWidth: h("0.1%"),
  },
  MiddleContain: {
    // backgroundColor: "gold",
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("2.2%"),
    paddingRight: h("2.2%"),
    borderRightColor: "#0003",
    borderRightWidth: h("0.1%"),
  },
  BottomContain: {
    // backgroundColor: "tomato",
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    // paddingLeft: h("3%"),
    // paddingRight: h("2%"),
  },
  Apponimtnnumber: {
    fontSize: h("2.5%"),
    fontWeight: "bold",
    color: "white",
  },
  AppoinmntText: {
    fontSize: h("1.5%"),
    color: "white",
  },

  lowerContaierFlatlist: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: h("120%"),
    alignItems: "center",
  },
  BackButton: {
    // backgroundColor: 'red',
    width: "50%",
    height: h("7%"),
    justifyContent: "center",
  },
  Btncontainer: {
    backgroundColor: "#fff",
    width: "85%",
    height: h("7%"),
    borderRadius: h("10%"),
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
    marginTop: h("2%"),
  },
  Btntxt: {
    color: "#000",
    fontSize: h("2.4%"),
  },
  Containerbox: {
    backgroundColor: "white",
    width: "95%",
    height: h("30%"),
    marginTop: h("2%"),
    paddingLeft: h("3%"),
    paddingTop: h("2%"),
    paddingRight: h("2%"),
  },
  TopBoxText: {
    color: "black",
    fontSize: h("3%"),
    fontWeight: "bold",
  },
});
