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
  StatusBar,
  Platform,
} from "react-native";
import { Navbar2, AppText2, Appbtn } from "../../components";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-datepicker";
import { h } from "react-native-responsiveness";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

export class ProfileSetup extends Component {
  state = { Gender: "", date: "", City: "" };
  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <StatusBar />
          <Navbar2
            arrow={() => {
              this.props.navigation.goBack();
            }}
            RightText={"SKIP"}
            RightPress={() => {
              this.props.navigation.navigate("TabNavigation");
            }}
            Text={"Profile Setup"}
          />
          {/* Image Uploader */}
          <View style={styles.imgContainer}>
            <TouchableOpacity style={styles.imgContainer2}>
              <Image
                style={styles.img}
                source={require("../../assets/camera.png")}
              />
            </TouchableOpacity>
          </View>
          {/* Lower Container */}
          <View style={styles.LowerContainer}>
            <Text style={styles.Text1}>Welcome John.</Text>
            <Text style={styles.Text2}>
              Let’s take a moment to setup your profile.
            </Text>

            {/* start from here */}
            <AppText2 Header={"SPECIALITY"} placeholder={"Cardiology"} />
            {/* DOB DATEPICKER */}

            <DatePicker
              style={styles.Dob}
              date={this.state.dob}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              androidMode={"spinner"}
              onDateChange={(date) => {
                this.setState({ dob: date });
              }}
            />

            {/* END DOB DATEPICKER */}
            <AppText2 Header={"address1)"} placeholder={"Address 1"} />
            <AppText2 Header={"address2)"} placeholder={"Address 2"} />			
            <AppText2 Header={"address3)"} placeholder={"Address 3"} />			
            <AppText2 Header={"zip"} placeholder={"Zipcode"} />
            <AppText2 Header={"city"} placeholder={"City"} />
            <AppText2 Header={"state"} placeholder={"State"} />			
            <AppText2 Header={"country"} placeholder={"Country"} />			
            <AppText2 Header={"phones.phone"} placeholder={"Phone..."} />
            <AppText2 Header={"phones.mobile"} placeholder={"Mobile..."} />			
            <AppText2 Header={"phones.skype"} placeholder={"skype..."} />			
			
            <AppText2 Header={"bankInfo.IBAN)"} placeholder={"IBAN"} />
            <AppText2 Header={"bankInfo.bank)"} placeholder={"Bank"} />			
            <AppText2 Header={"bankInfo.branchOfBank)"} placeholder={"Branch Of Bank"} />			
            <AppText2 Header={"companyInfo.businessName"} placeholder={"Business Name"} />
            <AppText2 Header={"companyInfo.taxPayerNo"} placeholder={"Tax Payer No"} />
            <AppText2 Header={"companyInfo.website"} placeholder={"Website"} />			
            <AppText2 Header={"companyInfo.size"} placeholder={"Size"} />			
			
            <AppText2 Header={"professionalInfo.healthcareProviderIdentifierOrganisation"} placeholder={"HealthcareProvider Identifier Organisation"} />
            <AppText2 Header={"professionalInfo.healthcareProviderIdentifierIndividual"} placeholder={"HealthcareProvider Identifier Individual"} />			
            <AppText2 Header={"professionalInfo.treatments"} placeholder={"Treatments"} />			
            <AppText2 Header={"professionalInfo.licenseNo"} placeholder={"LicenseNo"} />
            <AppText2 Header={"professionalInfo.licenseValidTill"} placeholder={"License Valid Till"} />			

            <AppText2 Header={"membership.organizationAName"} placeholder={"organizationA Name"} />
            <AppText2 Header={"membership.organizationAMemberNo"} placeholder={"organizationA MemberNo"} />			
            <AppText2 Header={"membership.organizationBName"} placeholder={"organizationB Name"} />			
            <AppText2 Header={"membership.organizationBMemberNo"} placeholder={"organizationB MemberNo"} />		
			
            {/* APP TEXT AREA */}
            <View style={styles.Topmargin4}>
              <View style={styles.HeaderText4}>
                <Text style={styles.HeaderTextf4}>About You</Text>
              </View>
              <View style={styles.container4}>
                <TextInput
                  {...this.props}
                  style={styles.txtinput4}
                  placeholder={"Write something about you (max 100k words)"}
                  multiline={true}
                  maxLength={100000}
                  placeholderTextColor={"black"}
                  secureTextEntry={this.props.password}
                />
              </View>
            </View>

            <View style={styles.Topmargin4}>
              <View style={styles.HeaderText4}>
                <Text style={styles.HeaderTextf4}>Mood</Text>
              </View>
              <View style={styles.container4}>
                <TextInput
                  {...this.props}
                  style={styles.txtinput4}
                  placeholder={"Write something about your mood (max 100k words)"}
                  multiline={true}
                  maxLength={100000}
                  placeholderTextColor={"black"}
                  secureTextEntry={this.props.password}
                />
              </View>
            </View>

            {/*ENDING APP TEXT AREA */}
            <View style={styles.Appbtn}>
              <Appbtn
                txt={"SUBMIT"}
                onPress={() => {
                  this.props.navigation.navigate("TabNavigation");
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
    height: h("160%"),
    backgroundColor: "#F6F6F6",
  },
  imgContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("20%"),
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "80%",
    height: "90%",
    resizeMode: "center",
  },
  imgContainer2: {
    // backgroundColor: 'green',
    width: "40%",
    height: h("20%"),
    justifyContent: "center",
    alignItems: "center",
  },
  LowerContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("95%"),
    alignItems: "center",
  },
  Text1: {
    color: "black",
    fontSize: h("3%"),
    fontWeight: "600",
  },
  Text2: {
    color: "#0008",
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
  Dob: {
    // backgroundColor: 'red',
    width: "87%",
    height: h("5%"),
    marginTop: h("4%"),
  },
  container4: {
    // backgroundColor: '#fff',
    width: "97%",
    height: h("7%"),
    borderRadius: h("1.5%"),
    flexDirection: "row",
  },
  txtinput4: {
    // backgroundColor: 'tomato',
    width: "90%",
    height: h("19%"),
    paddingLeft: h("1.5%"),
    color: "black",
    borderWidth: h("0.1%"),
    borderColor: "#0007",
    borderRadius: h("1%"),
    marginTop: h("1%"),
  },

  HeaderText4: {
    // backgroundColor: 'red',
    width: "83%",
    height: h("2.8%"),
    justifyContent: "center",
    marginLeft: h("1%"),
  },
  HeaderTextf4: {
    color: "#0006",
    fontSize: h("2.2%"),
  },
  Topmargin4: {
    marginTop: h("4%"),
  },
  Appbtn: {
    width: "100%",
    height: h("10%"),
    marginTop: h("14%"),
    alignItems: "center",
    justifyContent: "center",
  },
  iosContainer: {
    width: "100%",
    height: h("10%"),
    marginTop: -h("8%"),
    // backgroundColor: "red",
  },
});
