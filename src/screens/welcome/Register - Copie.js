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

import DatePicker from "../../components/DatePicker";
import usersApi from "./../../api/users";
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
  username: Yup.string().required().min(3).label("Username"),
  password: Yup.string().required().min(4).label("Password"),
  dateBirth: Yup.date().required().label("Day of Birth").nullable(),
  country: Yup.string().required().label("Country"),
  profile: Yup.string().required().label("Profile"),
  firstName: Yup.string().required().label("First Name"),
  initials: Yup.string().optional().label("Initials"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  //imageSrc:Yup.mixed().optional().label("Avatar"),
});


const Profiles = ["Solo", "Clinic", "Patient"];

export const Register = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const addUserApi = useApi(usersApi.addUser);
  const authApi = useApi(auth.login);

  const getCountriesApi = useApi(countries.getCountries);
  const getProfilesApi = useApi(profiles.getProfiles);

  const [error, setError] = useState();

  //const [imageUri,setImageUri] = useState();

  useEffect(() => {
    getCountriesApi.request();
    getProfilesApi.request();
  }, []);

  const handleSubmit = async (userInfo) => {
    console.log(userInfo);
    //const result = await usersApi.addUser(userInfo);
    const result = await addUserApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred! ");
        console.log(result);
      }
      return;
    }
    //if registration is success
    //const {data:authToken} = await auth.login(userInfo.username,userInfo.password);
    const { data: authToken } = await authApi.request(
      userInfo.username,
      userInfo.password
    );
    console.log(authToken);
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.saveToken(authToken);

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
            Text={"Register"}
          />
          <ActivityIndicator
            visible={
              addUserApi.loading ||
              authApi.loading ||
              getCountriesApi.loading ||
              getProfilesApi.loading
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
                  profile: "",
                  email: "",
                  dateBirth: "",

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
                      <Icon name="account" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Personal Info
                      </Title>
                    </View>
                    <Text>Avatar:</Text>
                    <FormSingleImagePicker name="imageSrc" />
                    <Text style={{ marginBottom: 5 }}>Birth Date:</Text>
                    {/* <DatePicker
                      left={
                        <Icon
                          name="calendar"
                          size={18}
                          style={{ alignSelf: "center" }}
                        />
                      }
                      textStyle={{
                        paddingVertical: 4,
                        paddingHorizontal: 24,
                        borderColor: "grey",
                        borderRadius: 8,
                        borderWidth: 1,
                      }}
                      defaultDate="1992-10-01"
                      onDateChange={(value) => console.log("Date:", value)}
                    /> */}

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
                      data={getCountriesApi.data.map((country) =>
                      ({
                        label: country.name,
                        value: country.name,
                        avatarSource: {
                          uri: country.flag
                        }
                      })
                      )
                      }
                      mode="flat"
                      name="country"
                    />
                  </View>
                  {/* </View> */}
                  <Text style={{ marginBottom: 5, textAlign: "center" }}>
                    Profile
                  </Text>
                  <View
                    style={{
                      height: 64,
                      width: "80%",
                    }}
                  >
                    <FormPicker
                      //label="Simple dropdown with avatar"
                      textInputPlaceholder="Select Profile"
                      data={getProfilesApi.data.map((profile) => ({
                        label: profile.profileName,
                        value: profile._id,
                      })).filter(el => Profiles.includes(el.label))}
                      mode="flat"
                      name="profile"
                    />
                  </View>
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

                  <View style={styles.Forgotbutton}>
                    <Text style={styles.ForgotbuttonText}>
                      By continuing, you agree to all Terms & Conditions.
                    </Text>
                  </View>

                  {/* <Appbtn
                  onPress={() => {
                    props.navigation.navigate("ProfileSetup");
                  }}
                  txt={"Signin"}
                />  */}

                  <SubmitButton txt={"Register"} />
                </View>
              </Form>
            </View>
          </View>
          <View style={styles.RegisterScreen}>
            <View style={styles.Register}>
              <Text style={styles.DoctorText}>Existing User?</Text>
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => {
                  props.navigation.navigate("Login");
                }}
              >
                <Text style={styles.RegisterText}> Login</Text>
              </TouchableOpacity>
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
