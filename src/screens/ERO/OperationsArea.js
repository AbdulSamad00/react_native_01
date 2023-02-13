import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import {Alert, Image,SafeAreaView,StatusBar,StyleSheet,Text,View,} from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Yup from "yup";
import countries from "../../api/countries";
import profiles from "../../api/profiles";
import usersApi from "../../api/users";
import { Navbar } from "../../components";
import ActivityIndicator from "../../components/ActivityIndicator";
import {ErrorMessage,Form,FormDatePicker,FormField,FormPicker,FormSingleImagePicker,SubmitButton,} from "../../components/forms";
import useApi from "../../hooks/useApi";

const validationSchema = Yup.object().shape({
  prefix: Yup.string().optional().label("prefix"),  
  firstName: Yup.string().required().label("First Name"),
  initials: Yup.string().optional().label("initials"),
  lastName: Yup.string().required().label("Last Name"),
  username: Yup.string().required().min(3).label("username"),
  password: Yup.string() .matches(new RegExp("^[a-zA-Z0-9]{3,30}$")) .optional(),  
  email: Yup.string().email().required().label("Email"),
  dateBirth: Yup.date().required().label("Day of Birth"),
  gender: Yup.string().required().label("gender"),
  address1: Yup.string().required().label("Adress 1"),
  address2: Yup.string().optional().label("Adress 2"),
  address3: Yup.string().optional().label("Adress 3"),
  zip: Yup.string().optional().label("Zip Code"),  
  city: Yup.string().optional().label("City"),
  state: Yup.string().optional().label("State"),
  country: Yup.string().required().label("Country"),  
  phone: Yup.string().optional().label("Phone"),
  mobile: Yup.string().optional().label("Mobile"),
  skype: Yup.string().optional().label("Skype"),
  role: Yup.string().optional().label("Profile"),
});

export function OperationsUser ({ route, navigation }) {
  
  const saveUserApi = useApi(usersApi.saveUser);
  const getCountriesApi = useApi(countries.getCountries);
  const getProfilesApi = useApi(profiles.getProfiles);
  const [error, setError] = useState();
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    if (route.params) {
      setSelectedUser(route.params.selectedUser);
    }
    getCountriesApi.request();
    getProfilesApi.request();
  }, []);

  const {
    id,
    Prefix,	
    FirstName,
    Initials,	
    LastName,
    Username,
    Password,
    Email,
    dateBirth,
    Gender,
    Profile,
    Address1,
    Address2,
    Address3,
    Zip,
    City,
    State,
    Country,
    Phone,
    Mobile,
    Skype,
    Avatar,
  } = selectedUser;

  const handleSubmit = async (userInfo) => {
    const submitData = { ...userInfo };
    try {
      if (id) {   
        submitData["_id"] = id;
      }
      const result = await saveUserApi.request(submitData);
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred! ");
          // console.log(result);
        }
        return;
      }
      // //if registration is success
      Alert.alert(`user ${ id ? "updated" : "added" } successfully`);
      navigation.goBack();
    } catch (error) {
      console.log("error exception:   ", error);
    }
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
              navigation.goBack();
            }}
            Text={`${id ? "Update" : "Add"} User`}
          />
          <ActivityIndicator
            visible={
              saveUserApi.loading ||
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
            <Text style={styles.headingText}>{`${
              id ? "Update" : "New"
            } User`}</Text>
            <Text style={styles.headingText2}>
              {`Please fill the form to ${
                id ? "update" : "create"
              } your account.`}
            </Text>

            <View style={styles.TextinputFields}>
              <Form
                initialValues={{
                  prefix: Prefix ? Prefix : "",
                  firstName: FirstName ? FirstName : "",
                  initials: Initials ? Initials : "",				  
                  lastName: LastName ? LastName : "",
                  dateBirth: dateBirth ? new Date(dateBirth) : new Date(),				  
                  gender: Gender ? Gender : "",
                  username: Username ? Username : "",
                  password: Password ? Password : "",
                  email: Email ? Email : "",
                  role: Profile ? Profile._id : "",
                  address1: Address1 ? Address1 : "",
                  address2: Address2 ? Address2 : "",
                  address3: Address3 ? Address3 : "",
                  zip: Zip ? Zip : "",
                  city: City ? City : "",
                  state: State ? State : "",
                  country: Country ? Country : "",
                  phone: Phone ? Phone : "",
                  mobile: Mobile ? Mobile : "",
                  skype: Skype ? Skype : "",
                  imageSrc: Avatar ? Avatar : null,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
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
                      <Icon name="user" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Personalia
                      </Title>
                    </View>
                    <Text>Avatar:</Text>
                    <FormSingleImagePicker name="imageSrc" />
					
                    <FormPicker
                     style={{width: 250, marginVertical: 18}}
                      textInputPlaceholder={Prefix ? Prefix.toUpperCase() : "Prefix"}
                      data={["Mr.", "Mrs.", "Mss.","Prof.","Ms.","Dr."].map((prefix) => ({
                        label: prefix, value: prefix,
                      }))}
                      mode="flat"
                      name="prefix"
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
                    <FormPicker
                      style={{width: 250, marginVertical: 18}}
                      textInputPlaceholder={Gender ? Gender.toUpperCase() : "Gender"}
                      data={["Male", "Female", "Transgender"].map((gender) => ({
                        label: gender, value: gender,
                      }))}
                      mode="flat"
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
                      defaultDate={ id ? new Date(dateBirth) : new Date() }
                      maxYears="0"
                      minYears="130"
                      //onDateChange={(value) => console.log("Date:", value)}
                    />

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
                          label: `${profile.name}`,
                          value: profile?._id,
                        }))}
                        mode="flat"
                        name="role"
                      />
                    </View>
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
                        Login Data
                      </Title>
                    </View>
                    <FormField
                      Header={"username"}
                      img={require("../../assets/icons/username.png")}
                      placeholder="username"
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
                      placeholder={"johnsmith@email.com"}
                      name="email"
                      secureTextEntry={false}
                      isMultiline={false}
                      autoCapitalize="none"
                      keyboardType={"email-address"}
                    />
                  </View>
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
                        backgroundColor: "#f6f6f6",
                        paddingHorizontal: 5,
                        alignItems: "center",
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
                    Header={"City"}
                    img={require("../../assets/icons/mappin.png")}
                    placeholder="city"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="city"
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
                    Header={"State"}
                    img={require("../../assets/icons/mappin.png")}
                    placeholder="state"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="state"
                  />

                  {/* <View style={{ marginBottom: 16, flex: 1 }}> */}
                  <View
                      style={{
                        backgroundColor: "#f6f6f6",
                        paddingHorizontal: 8,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                    <Text style={{ textAlign: "center", marginTop: 15, marginRight: 10 }}>
                      Country
                    </Text>
                    <View
                      style={{
                        height: 64,
                        paddingVertical: 10,
                        width: "50%",
                      }}
                    >
                    
                      <FormPicker
                        //label="Simple dropdown with avatar"
                        textInputPlaceholder="Select Country"
                        data={getCountriesApi.data.map((country) => ({
                          label: country.name,
                          value: country.name,
                          avatarSource: { uri: country.flag },
                        }))}
                        mode="flat"
                        name="country"
                      />
                  </View>
				        </View>
                <View>
                  
                </View>
                <View style={{ position: "absolute", backgroundColor: "#f6f6f6", paddingHorizontal: 8, flexDirection: "row", alignItems: "center", top: -18,left: 24,}}>
                      <Icon name="phone" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Phones
                      </Title>
                </View>
                    <FormField
                      Header={"phone"}
                      img={require("../../assets/icons/phone.png")}
                      placeholder="phone"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="phone"
                    />

                    <FormField
                      Header={"mobile"}
                      img={require("../../assets/icons/mobile.png")}
                      placeholder={"mobile"}
                      name="mobile"
                      secureTextEntry={false}
                      isMultiline={false}
                      autoCapitalize="none"
                      keyboardType={"mobile"}
                    />
                    <FormField
                      Header={"skype"}
                      img={require("../../assets/icons/skype.png")}
                      placeholder={"skype"}
                      name="skype"
                      secureTextEntry={false}
                      isMultiline={false}
                      autoCapitalize="none"
                      keyboardType={"skype"}
                    />
					
                  </View>

                  {/* </View> */}
                </View>
				
                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                >
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

                  <SubmitButton txt={id ? "Update" : "Register"} />
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
