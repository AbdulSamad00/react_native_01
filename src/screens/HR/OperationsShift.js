import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { Formik, useFormik } from "formik";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import countries from "../../api/countries";
import profiles from "../../api/profiles";
import shiftsApi, { saveTicket } from "../../api/shifts";
import { getUsers } from "../../api/users";
import AuthContext from "../../auth/context";
import { Navbar } from "../../components";
import ActivityIndicator from "../../components/ActivityIndicator";
import {
  ErrorMessage,
  Form,
  FormDatePicker,
  FormField,
  FormPicker,
  FormSingleImagePicker,
  SubmitButton,
} from "../../components/forms";
import { levelOptions } from "../../config/pickerElements";
import useApi from "../../hooks/useApi";
import { fetchUsers } from "../../store/users";
import { AppMultiDropdown } from "../homeo/components/InterviewTab";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  level: Yup.string().optional("Optional"),
  shiftNo: Yup.string().optional("Optional"),
  businessName: Yup.string().optional("Optional"),
  description: Yup.string().required("Optional"),
  department: Yup.string().optional("Optional"),
  note: Yup.string().optional("Optional"),
  reference: Yup.string().optional("Optional"),
  createdOn: Yup.string().optional("Optional"),  
});

const OperationsShift = ({ route, navigation }) => {


  const makeShiftNo = () => {
    let shiftNumber = "SK-";
    const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
    for (let i = 0; i <= 6; i++) shiftNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    return shiftNumber;
  }

  const { user, setUser } = useContext(AuthContext);
  const { users }         = useSelector((state) => state.users);
  const dispatch           = useDispatch()
  const [error, setError]                   = useState();
  const [selectedShift, setSelectedShift] = useState({});
  const [loading, setLoading]               = useState(false)
  const [participants, setParticipants]     = useState([])
  const date=new Date()

  const {
    // _id,
    name,
    // user,
    // participants,
    level,
    description,
    bussinessName,
    department,
    note,
    reference,
    createdOn,
  } = selectedShift;

  const [initialState, setInitialState] = useState({
    name: "",
    "user": user?user._id:"",
    level: "",
    description: "",
    businessName: "",
    department: "",
    note: "",
    shiftNo: makeShiftNo(),
    createdOn: new Date(),
    reference: "",
  })
// 
  useEffect(() => {
    // usersHandler()
    if(!users.length){
      dispatch(fetchUsers());
    }
    if (route.params) {
      setSelectedShift(route.params.selectedShift);
      console.log(route);
    }
   
  }, []);

  const {setFieldValue, values } = useFormik({
    validationSchema: validationSchema,
    initialValues: initialState
  })
  const handleSubmit = async (userInfo) => {
    // AuthContext.
    setLoading(true)
    const submitData = { ...userInfo };
    try {
      if (_id) {
        submitData["_id"] = _id;
      }
      const { ok, data } = await saveShift(submitData);
      setLoading(false)
      if (!ok) {
        if (data) setError(data.error);
        else {
          setError("An unexpected error occurred! ");
        }
        return;
      }
      alert("Shift added")
      // //if registration is success
      navigation.goBack();
    } catch (error) {
      console.log("error exception:   ", error);
    }
  };
  console.log(initialState.participants)
  const getUsers = () => {
    return users.map((user) => ({
      id: user._id,
      label: `${user.contactName.first} ${user.contactName.last}`,
      value: user._id,
    }));
  };

  const currentDate = new Date()
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
            Text={`${  "Add"} Shift`}
          />
          <ActivityIndicator
            visible={
              loading
              // saveShiftApi.loading 
              // getCountriesApi.loading ||
              // getProfilesApi.loading
            }
          />

          <View style={styles.loginScreen}>
            <Text style={styles.headingText}>{``}</Text>
            <Text style={styles.headingText2}>
              {``}
            </Text>

            <View style={styles.TextinputFields}>
              <Formik
                initialValues={initialState}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
              >
              <>
                <ErrorMessage error={error} visible={error} />
                {/* <View> */}
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
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Add Shift
                    </Title>
                  </View>

                   <View style={{width:"80%",marginTop:20}}>
                    <AppMultiDropdown
                      title="Users"
                      placeholder="Select Employee"
                      options={getUsers()}
                      value={values['users']}
                      onChange={(value) => {
                        console.log(value)
                        setFieldValue("users",value);
                      }}
                    />
                 </View>

                  <FormField
                    placeholder="Name"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="name"
                    width="100%"
                  />
                  <View
                    style={{
                      height: 64,
                      width: "84%",
                      marginTop: 20
                    }}
                  >
                    <Text>Level</Text>
                    <FormPicker
                      //label="Simple dropdown with avatar"
                      textInputPlaceholder="Select Level"
                      data={levelOptions}
                      mode="flat"
                      name="level"
                    />
                  </View>

                  <FormField
                    placeholder="Description"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="description"
                    width="100%"
                  />

                  <FormField
                    placeholder="Department"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="department"
                    width="100%"
                  />

                  <FormField
                    placeholder="Reference"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="reference"
                    width="100%"
                  />

                  <FormField
                    placeholder="Note"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="note"
                    width="100%"
                  />
                </View>

                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                >

                  <SubmitButton txt={"Submit"} />
                </View>
                </>
              </Formik>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default OperationsShift;

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
{/* <Text style={{ marginBottom: 5, textAlign: "center" }}>
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
                        label: `${profile.profileName}`,
                        value: profile._id,
                      }))}
                      mode="flat"
                      name="profile"
                    />
                  </View> */}
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
{/* <View
                  style={{
                    alignItems: "center",
                    margin: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
                    }}>
                   <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#f6f6f6",
                      paddingHorizontal: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      top: -18,
                      left: 24,
                    }}>
                    <Icon name="lock" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Login Data
                    </Title>
                  </View>
                  <FormField
                    Header={"username"}
                    // img={require("../../assets/icons/username.png")}
                    placeholder="username"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="username"
                  />
                  <FormField
                    Header={"Password"} 
                    // img={require("../../assets/icons/password.png")}
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
                }}>
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
                  Header={"city"}
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
                  Header={"state"}
                  img={require("../../assets/icons/mappin.png")}
                  placeholder="state"
                  //autoCapitalize="none"
                  secureTextEntry={false}
                  isMultiline={false}
                  name="state"
                />
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
                      avatarSource: { uri: country.flag },
                    }))}
                    mode="flat"
                    name="country"
                  />
                </View>
              </View>*/}
{/* </View> */ }