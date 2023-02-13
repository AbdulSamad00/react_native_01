import "react-native-gesture-handler";
import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Navbar } from "../../components";
import { h } from "react-native-responsiveness";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import jwtDecode from "jwt-decode";
import * as Yup from "yup";


import doctorsApi from "./../../api/doctors";
import countries from "./../../api/countries";
import profiles from "./../../api/profiles";
import auth from "./../../api/auth";
import authStorage from "../../auth/storage";
import AuthContext from "../../auth/context";
import useApi from "./../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";
import {
  Form,
  FormField,
  FormPicker,
  FormDatePicker,
  FormSingleImagePicker,
  SubmitButton,
  ErrorMessage,
} from "./../../components/forms";
import { Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  initials: Yup.string().optional().label("Initials"),
  lastName: Yup.string().required().label("Last Name"),
  username: Yup.string().required().min(3).label("Username"),
  password: Yup.string().required().min(4).label("Password"),
  country: Yup.string().required().label("Country"),
  email: Yup.string().email().required().label("Email"),
  dateBirth: Yup.date().required().label("Day of Birth").nullable(),
  gender: Yup.string().required().label("Gender"),
  address1: Yup.string().required().label("Adress 1"),
  address2: Yup.string().optional().label("Adress 2"),
  address3: Yup.string().optional().label("Adress 3"),
  healthcareProviderIdentifierOrganisation: Yup.string().optional().label("Healthcare Provider Identifier Organisation"),
  organizationAName: Yup.string().optional().label("Organization A"),
  idPaper: Yup.string().optional().label("ID Paper"),
  organizationBName: Yup.string().optional().label("Organization B"),
  organizationAMemberNo: Yup.string().optional().label("Organization A Member No"),
  licenseValidTill: Yup.date().optional().label("License Valid Till").nullable(),
  idPaperValidTill: Yup.date().optional().label("ID Paper Valid Till").nullable(),
  organizationBMemberNo: Yup.string().optional().label("Organization B Member No"),
  licenseNo: Yup.string().optional().label("License No"),
  healthcareProviderIdentifierIndividual: Yup.string().optional().label("Healthcare Provider Identifier Individual"),
  treatments: Yup.string().optional().label("Treatments"),
  city: Yup.string().optional().label("City"),
  state: Yup.string().optional().label("State"),
  IBAN: Yup.string().optional().label("IBAN"),
  bank: Yup.string().optional().label("Bank"),
  branchOfBank: Yup.string().optional().label("Branch of Bank"),
  zip: Yup.string().optional().label("Zip Code"),
});

export const RegisterDoctor = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const addDoctorApi = useApi(doctorsApi.addDoctor);
  const authApi = useApi(auth.login);
  const getCountriesApi = useApi(countries.getCountries);
  const [error, setError] = useState();

  useEffect(() => {
    getCountriesApi.request();
  }, []);

  const handleSubmit = async (userInfo) => {
    console.log(userInfo);
    try {
      const result = await addDoctorApi.request(userInfo);
      console.log("result: ",result);
          if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred! ");
        console.log(result);
      }
      return;
    }
    //if registration is success
    
    const { data: authToken } = await authApi.request(
      userInfo.username,
      userInfo.password
    );
    console.log(authToken);
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.saveToken(authToken);
    } catch (error) {
      console.log("error exception:   ",error);
    }
     
     


    //props.navigation.navigate("ProfileSetup");
  };

  return (
    <>
      <View style={styles.Container}>
        {/* <ActivityIndicator visible={true} />  */}
        <KeyboardAwareScrollView>
          <SafeAreaView />

          <StatusBar />
          <Navbar
            onPress={() => {
              props.navigation.goBack();
            }}
            Text={"Register Doctor"}
          />
          <ActivityIndicator
            visible={
              addDoctorApi.loading ||
              authApi.loading ||
              getCountriesApi.loading
            }
          />

          <View style={styles.sideImge}>
            <Image
              style={styles.imgeContainer}
              source={require("../../assets/icons/logo.png")}
            />
          </View>
          <View style={styles.loginScreen}>
            <Text style={styles.headingText}>Create Account</Text>
            <Text style={styles.headingText2}>
              Please fill the form to create your account.
            </Text>

            <View style={styles.TextinputFields}>
              <Form
                initialValues={{
                  firstName: "",
                  initials: "",
                  lastName: "",
                  username: "",
                  password: "",
                  country: "",
                  email: "",
                  dateBirth: "",
                  gender: "",
                  address1: "",
                  address2: "",
                  address3: "",
                  healthcareProviderIdentifierOrganisation: "",
                  organizationAName: "",
                  idPaper: "",
                  organizationBName: "",
                  organizationAMemberNo: "",
                  licenseValidTill: "",
                  idPaperValidTill: "",
                  organizationBMemberNo: "",
                  licenseNo: "",
                  healthcareProviderIdentifierIndividual: "",
                  treatments: "",
                  city: "",
                  state: "",
                  IBAN: "",
                  bank: "",
                  branchOfBank: "",
                  zip: "",
                  imageSrc: null,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <ErrorMessage error={error} visible={error} />
                <View>
                  <View
                    style={{
                      alignItems: "center",
                      margin: 8,
                      borderWidth: 1,
                      borderColor: "#888",
                      borderRadius: 16,
                      paddingVertical: 16,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: "#f6f6f6",
                        paddingHorizontal: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        top: -18,
                        left: 24,
                      }}
                    >
                      <Icon name="doctor" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Personal Info
                      </Title>
                    </View>
                    <Text>Avatar:</Text>
                    <FormSingleImagePicker name="imageSrc" />

                    <FormField
                      Header={"First Name"}
                      img={require("../../assets/icons/user.png")}
                      placeholder="First Name"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="firstName"
                    />
                    <FormField
                      Header={"initials"}
                      img={require("../../assets/icons/user.png")}
                      placeholder="initials"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="initials"
                    />
                    <FormField
                      Header={"Last Name"}
                      img={require("../../assets/icons/user.png")}
                      placeholder="Last Name"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="lastName"
                    />
                    <FormField
                      Header={"Gender"}
                      img={require("../../assets/icons/gender.png")}
                      placeholder="Gender"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="gender"
                    />

                    <Text style={{ marginBottom: 5 }}>Date of Birth:</Text>

                    <FormDatePicker
                      left={
                        <Icon
                          name="calendar"
                          size={18}
                          style={{ alignSelf: "center" }}
                        />
                      }
                      name="dateBirth"
                      textStyle={{
                        paddingVertical: 4,
                        paddingHorizontal: 24,
                        borderColor: "grey",
                        borderRadius: 8,
                        borderWidth: 1,
                      }}
                      defaultDate="1992-10-01"
                      maxYears="0"
                      minYears="130"
                    //onDateChange={(value) => console.log("Date:", value)}
                    />
                  </View>				  
                  {/* <DatePicker
              style={styles.Dob}
              date={this.state.dob}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              androidMode={"spinner"}
              onDateChange={(date) => {
                //this.setState({ dob: date });
              }}
            /> */}
                  {/* <AppText
                  Header={"DOB"}
                  img={require("../../assets/icons/birthdaycake.png")}
                  placeholder={"Day of Birth"}
                  name="DOB"
                /> */}
                  {/* <Dropdown
                  Header={"country"}
                  img={require("../../assets/user.png")}
                  placeholder={"country"}
                  name="country"
                /> */}
                  <View
                    style={{
                      alignItems: "center",
                      margin: 8,
                      marginTop: 16,
                      borderWidth: 1,
                      borderColor: "#888",
                      borderRadius: 16,
                      paddingVertical: 16,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: "#f6f6f6",
                        paddingHorizontal: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        top: -18,
                        left: 24,
                      }}
                    >
                      <Icon name="lock" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Login Data
                      </Title>
                    </View>
                    <FormField
                      Header={"Username"}
                      img={require("../../assets/icons/username.png")}
                      placeholder="Username"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="username"
                    />
                    <FormField
                      Header={"Password"}
                      img={require("../../assets/icons/password.png")}
                      placeholder={"• • • • • • • •"}
                      password={true}
                      name="password"
                      secureTextEntry={false}
                      isMultiline={false}
                    />
                    <FormField
                      Header={"E-Mail"}
                      img={require("../../assets/icons/email.png")}
                      placeholder={"johnsmith@gmail.com"}
                      name="email"
                      secureTextEntry={false}
                      isMultiline={false}
                      autoCapitalize="none"
                      keyboardType={"email-address"}
                    />
                  </View>


                  {/* <FormField
                  Header={"MOBILE (OPTIONAL)"}
                  img={require("../../assets/mobile.png")}
                  placeholder={"+1-4353531414"}
                  name="phone"
                  secureTextEntry={false}
                  isMultiline={false}
                /> */}
                </View>

                {/* <View style={{ marginLeft: 30 }}>
                  <Gender />
                </View> */}

                <View
                  style={{
                    alignItems: "center",
                    margin: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
                  }}
                >
                  <FormField
                    Header={"Address 1"}
                    img={require("../../assets/icons/addressbook.png")}
                    placeholder="Address 1"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address1"
                  />
                  <FormField
                    Header={"Address 2"}
                    img={require("../../assets/icons/addressbook.png")}
                    placeholder="Address 2"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address2"
                  />
                  <FormField
                    Header={"Address 3"}
                    img={require("../../assets/icons/addressbook.png")}
                    placeholder="Address 3"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address3"
                  />
                  <FormField
                    Header={"Zip Code"}
                    img={require("../../assets/icons/mappin.png")}
                    placeholder="Zip Code"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="zip"
                  />
                  <FormField
                    Header={"City"}
                    img={require("../../assets/icons/mappin.png")}
                    placeholder="City"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="city"
                  />
                  <FormField
                    Header={"State"}
                    img={require("../../assets/icons/mappin.png")}
                    placeholder="State"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="state"
                  />
				  
                  {/* <View style={{ marginBottom: 16, flex: 1 }}> */}
                  <Text style={{ marginBottom: 5, textAlign: "center" }}>
                    Country
                  </Text>
                  <View
                    style={{
                      height: 64,
                      width: "80%",
                    }}
                  >
                    <FormPicker
                      //label="Simple dropdown with avatar"
                      textInputPlaceholder="Select Country"
                      data={getCountriesApi.data.map((country) => ({
                        label: country.name,
                        value: country.name,
                        avatarSource: { uri: country.flag }
                      }))}
                      mode="flat"
                      name="country"
                    />
                  </View>
                  {/* </View> */}
                </View>
                <View
                  style={{
                    alignItems: "center",
                    margin: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#f6f6f6",
                      paddingHorizontal: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      top: -18,
                      left: 24,
                    }}
                  >
                    {/* img={require("../../assets/icons/bank2.png")}				  
                   <Icon name="lock" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Telephone
                    </Title>
                  </View>
                  <FormField
                    Header={"Phone"}
                    img={require("../../assets/icons/phone.png")}
                    placeholder="phpne"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="phone"
                  />
                  <FormField
                    Header={"Mobile"}
                    img={require("../../assets/icons/mobile.png")}
                    placeholder="mobile"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="mobile"
                  />
                  <FormField
                    Header={"skype"}
                    img={require("../../assets/icons/skype.png")}
                    placeholder="skype"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="skype"
                  />

                </View>
				
                <View
                  style={{
                    alignItems: "center",
                    margin: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#f6f6f6",
                      paddingHorizontal: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      top: -18,
                      left: 24,
                    }}
                  >

                    {/* img={require("../../assets/icons/bank2.png")}				  
                   <Icon name="lock" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Bank-account Information
                    </Title>
                  </View>
                  <FormField
                    Header={"IBAN"}
                    img={require("../../assets/icons/bank2.png")}
                    placeholder="IBAN"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="IBAN"
                  />
				  
                  <FormField
                    Header={"Bank"}
                    img={require("../../assets/icons/bank2.png")}
                    placeholder="Bank"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="bank"
                  />
                  <FormField
                    Header={"Branch of Bank"}
                    img={require("../../assets/icons/bank2.png")}
                    placeholder="Branch of Bank"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="branchOfBank"
                  />

                </View>
                <View
                  style={{
                    alignItems: "center",
                    margin: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#f6f6f6",
                      paddingHorizontal: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      top: -18,
                      left: 24,
                    }}
                  >
                    {/* img={require("../../assets/icons/bank2.png")}				  
                   <Icon name="lock" size={24} /> */}
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Professional Information
                    </Title>
                  </View>
                  <FormField
                    Header={"Healthcare Provider Identifier Organisation"}
                    img={require("../../assets/icons/medicalbadge.png")}
                    placeholder="Healthcare Provider Identifier Organisation"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="healthcareProviderIdentifierOrganisation"
                  />
                  <FormField
                    Header={"Healthcare Provider Identifier Individual"}
                    img={require("../../assets/icons/medicalbadge.png")}
                    placeholder="Healthcare Provider Identifier Individual"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="healthcareProviderIdentifierIndividual"
                  />
                  <FormField
                    Header={"Treatments"}
                    img={require("../../assets/icons/service.png")}
                    placeholder="Treatments"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="treatments"
                  />
                  <FormField
                    Header={"License No"}
                    img={require("../../assets/icons/service.png")}
                    placeholder="License No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="licenseNo"
                  />
                  <Text style={{ marginBottom: 5 }}>License Valid Till:</Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="licenseValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "grey",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  //onDateChange={(value) => console.log("Date:", value)}
                  />
                  <FormField
                    Header={"ID Paper"}
                    img={require("../../assets/icons/fingerprint.png")}
                    placeholder="ID Paper"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="idPaper"
                  />
                  <Text style={{ marginBottom: 5 }}>ID PaperValidTill:</Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="idPaperValidTill"
                    textStyle={{
                      paddingVertical: 4,
                      paddingHorizontal: 24,
                      borderColor: "grey",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                  //onDateChange={(value) => console.log("Date:", value)}
                  />

                </View>
				
                <View
                  style={{
                    alignItems: "center",
                    margin: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#f6f6f6",
                      paddingHorizontal: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      top: -18,
                      left: 24,
                    }}
                  >
                    <Icon name="lock" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Membership
                    </Title>
                  </View>

                  <FormField
                    Header={"Organization A"}
                    img={require("../../assets/icons/membership.png")}
                    placeholder="Organization A"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationAName"
                  />
                  <FormField
                    Header={"Organization A Member No"}
                    img={require("../../assets/icons/membership.png")}
                    placeholder="Organization A Member No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationAMemberNo"
                  />

                  <FormField
                    Header={"Organization B Name"}
                    img={require("../../assets/icons/membership.png")}
                    placeholder="Organization B Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationBName"
                  />
                  <FormField
                    Header={"Organization B Member No"}
                    img={require("../../assets/icons/membership.png")}
                    placeholder="Organization B Member No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationBMemberNo"
                  />
                </View>

                <View style={{ alignItems: "center" }}>
                  {/* <FormDatePicker
        onPick={(date) => onDataChange({ ...data, dateOfBirth: date })}
      /> */}

                  {/* <AppText
                  Header={"CONFIRM PASSWORD"}
                  img={require("../../assets/lock.png")}
                  placeholder={"• • • • • • • •"}
                  password={true}
                  name="password"
                /> */}

                  {/* <DatePickerFuture />
                  <DatePickerPast />
                  <DatePickerCurrent /> */}

                  {/* <ImageInput 
             imageUri={imageUri}
             onChangeImage={(uri) => setImageUri(uri)} 
             /> */}

                  <SubmitButton txt={"Register"} />
                </View>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
  // container: {
  //   paddingTop: 30,
  //   marginLeft: 20,
  //   marginRight: 20,
  //   flex: 1,
  // },
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
    // alignItems: "center",
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
    alignItems: "center",
    // backgroundColor: 'green',
  },
  Register: {
    width: "42%",
    marginVertical: 16,
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
