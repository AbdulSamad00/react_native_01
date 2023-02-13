import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
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
import * as Yup from "yup";
import shiftsApi from "../../api/shifts";
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
import useApi from "../../hooks/useApi";

const validationSchema = Yup.object().shape({
	
  userNo: Yup.string().required().label("userNo"),
  name: Yup.string().required().label("Name"),
  department: Yup.string().optional().label("Department"),
  location: Yup.string().optional().label("Location"),
  startTime: Yup.string().required().label("StartTime"),
  endTime: Yup.string().required().label("EndTime"),  
  status: Yup.string().required().label("Status"),

});

const Operationsshift = ({ route, navigation }) => {
  const saveshiftApi = useApi(shiftsApi.saveshift);
  const [error, setError] = useState();
  const [selectedshift, setSelectedshift] = useState({});

  useEffect(() => {
    if (route.params) {
      setSelectedshift(route.params.selectedshift);
      console.log(route);
    }
  }, []);

  const {
    _id,
    userNo,	
    Name,
    Department,	
    Location,
    StartTime,
    Endtime,
    Status,
  } = selectedshift;

  const handleSubmit = async (shiftInfo) => {
    console.log(shiftInfo);
    const submitData = { ...shiftInfo };
    try {
      if (_id) {
        submitData["_id"] = _id;
      }
      const result = await saveshiftApi.request(submitData);
      console.log("result: ", result.ok);
      console.log("result: ", result.data);
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred! ");
          console.log(result);
        }
        return;
      }
      // //if registration is success
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
            Text={`${_id ? "Update" : "Add"} shift`}
          />
          <ActivityIndicator
            visible={
              saveshiftApi.loading ||
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
              _id ? "Update" : "New"
            } shift`}</Text>
            <Text style={styles.headingText2}>
              {`Please fill the form to ${
                _id ? "update" : "create"
              } your account.`}
            </Text>

            <View style={styles.TextinputFields}>
              <Form
                initialValues={{
                  name: name ? name : "",
                  department: department ? department : "",				  
                  location: location ? location : "",
                  startTime: startTime ? startTime : "",
                  endTime: endTime ? endTime : "",				  
                  shiftname: shiftname ? shiftname : "",
                  status: status ? status : "",			  
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
                      <Icon name="shift" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Shift
                      </Title>
                    </View>

                    <FormField
                      Header={"Name"}
                      img={require("../../assets/icons/shift.png")}
                      placeholder="Name"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="name"
                    />
                    <FormField
                      Header={"Department"}
                      img={require("../../assets/icons/shift.png")}
                      placeholder="Department"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="Department"
                    />
                    <FormField
                      Header={"Location"}
                      img={require("../../assets/icons/shift.png")}
                      placeholder="Location"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="location"
                    />
                    <FormField
                      Header={"StartTime"}
                      img={require("../../assets/icons/gender.png")}
                      placeholder="StartTime"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="startTime"
                    />
                    <FormField
                      Header={"EndTime"}
                      img={require("../../assets/icons/gender.png")}
                      placeholder="EndTime"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="endTime"
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
                          label: `${profile.profileName}`,
                          value: profile._id,
                        }))}
                        mode="flat"
                        name="profile"
                      />
                    </View>
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

                  <SubmitButton txt={_id ? "Update" : "Register"} />
                </View>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default Operationsshift;

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
