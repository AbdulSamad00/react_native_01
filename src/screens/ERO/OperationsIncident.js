import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { Formik, useFormik, useFormikContext } from "formik";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {Image,SafeAreaView,StatusBar,StyleSheet,Text,View,} from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import profiles from "../../api/profiles";
import incidentsApi, { saveIncident } from "../../api/incidents";
import { getUsers } from "../../api/users";
import AuthContext from "../../auth/context";
import { Navbar } from "../../components";
import ActivityIndicator from "../../components/ActivityIndicator";
import {ErrorMessage,Form,FormDatePicker,FormField,FormPicker,FormSingleImagePicker,SubmitButton,} from "../../components/forms";
import { categoryOptions,statusOptions } from "../../config/pickerIncident";
import useApi from "../../hooks/useApi";
import { fetchUsers } from "../../store/users";
import AppMultiDropdown from "../../components/forms/AppMultiDropdown";
import _ from "lodash";

const validationSchema = Yup.object().shape({
  user: Yup.string().optional().label("user"),  
  businessNo: Yup.string().required().label("BusinessNo"),
  narrative: Yup.string().optional().label("narrative"),
  reporter: Yup.string().required().label("Reporter"),
  name: Yup.string().required().min(3).label("name"),
  incidentNo: Yup.string().required().label("incidendentNo"),
  date: Yup.date().required().label("Day of Incident").nullable(),
  victim: Yup.string().required().label("victim"),
  witness: Yup.string().optional().label("Witness"),  
  category: Yup.string().optional().label("Category"),
  department: Yup.string().optional().label("Department"),
  subDepartment: Yup.string().optional().label("Sub-Department"),  
  location: Yup.string().required().label("Location"),  
  LTI: Yup.string().required().label("LTI"),
  note: Yup.string().optional().label("Note"),
  reference: Yup.string().optional().label("Reference"),
  status: Yup.string().optional().label("Status"),
});

const OperationsIncident = ({ route, navigation }) => {
  const makeIncidentNo = () => {
    let incidentNumber = "TK-";
    const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
    for (let i = 0; i <= 6; i++)
      incidentNumber += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    return incidentNumber;
  };

  const { user, setUser } = useContext(AuthContext);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const { selectedIncident } = route.params;

  const [initialState, setInitialState] = useState({
    _id,
    user,	
    businessNo,
    narrative,	
    reporter,
    name,
    incidentNo,
    date,
    victim,
    witness,
    category,
    department,
    subDepartment,	
    location,
    LTI,
	note,
	reference,
    imageSrc,
  });

  useEffect(() => {
    // usersHandler()
    if (!users.length) {
      dispatch(fetchUsers());
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(selectedIncident)) {
      setInitialState({
        ...selectedIncident,
        participants: selectedIncident.participants.map((item) => item._id),
        user: user?._id,
        incidentNo: makeIncidentNo(),
      });
    }
  }, [selectedIncident]);

  const { setFieldValue, values } = useFormik({
    validationSchema: validationSchema,
    initialValues: initialState,
  });
  const handleSubmit = async (userInfo) => {
    // AuthContext.
    setLoading(true);
    const submitData = { ...userInfo };
    try {
      const { ok, data } = await saveIncident(submitData);
      console.log(ok)
      setLoading(false);
      if (!ok) {
        if (data) setError(data.error);
        else {
          setError("An unexpected error occurred! ");
        }
        return;
      }
      alert(submitData._id ? "Incident Updated" : "Incident added");
      // //if registration is success
      navigation.goBack();
    } catch (error) {
      console.log("error exception:   ", error);
    }
  };
  const getUsers = () => {
    return users.map((user) => ({
      id: user._id,
      label: `${user.contactName.first} ${user.contactName.last}`,
      value: user._id,
    }));
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
            Text={!_.isEmpty(selectedIncident) ? "Edit Incident" : "Add Incident"}
          />
          <ActivityIndicator
            visible={
              loading
              // saveIncidentApi.loading
              // getCountriesApi.loading ||
              // getProfilesApi.loading
            }
          />

          <View style={styles.loginScreen}>
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
                        {!_.isEmpty(selectedIncident)
                          ? selectedIncident.name
                          : "Add Incident"}
                      </Title>
                    </View>
					<Text>Image of Incident:</Text>
                    <FormSingleImagePicker name="imageSrc" />
					
                    <FormField
                      Header={"Reporter"}
                      img={require("../../assets/icons/user.png")}
                      placeholder="reporter"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="reporter"
                    />
					
                    <FormField
                      Header={"Victim"}
                      img={require("../../assets/icons/user.png")}
                      placeholder="victim"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="victim"
                    />
                    <View
                      style={{
                        height: 64,
                        width: "84%",
                        marginTop: 20,
                      }}
                    >
                      <Text>Category of Incident</Text>
                      <FormPicker
                        //label="Simple dropdown with avatar"
                        textInputPlaceholder="Select Category"
                        data={categoryOptions}
                        mode="flat"
                        name="category"
                      />
                    </View>

                    <View
                      style={{
                        height: 64,
                        width: "84%",
                        marginTop: 20,
                      }}
                    >
                      <Text>Category</Text>
                      <FormPicker
                        //label="Simple dropdown with avatar"
                        textInputPlaceholder="Select Category" data={categoryOptions} mode="flat" name="category" enableAvatar={false}
                      />
                    </View>

                    <FormField
                      Header={"Narrative"}
                      img={require("../../assets/icons/incident.png")}
                      placeholder="narrative"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="narrative"
                    />
                    <FormField
                      Header={"Victim"}
                      img={require("../../assets/icons/victim.png")}
                      placeholder="victim"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="victim"
                    />

                    <View style={{ width: "80%", marginTop: 20 }}>
                      <AppMultiDropdown
                        title="Participants"
                        placeholder="Select Participants"
                        options={getUsers()}
                      />
                    </View>
					
                    <FormField
                      Header={"username"}
                      img={require("../../assets/icons/incident.png")}
                      placeholder="Name of Witnesses"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="witness"
                    />

                    <Text style={{ marginBottom: 5, textAlign: "center" }}>
                      Reporter
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
                  
					  <View
						style={{
						  width: isTablet ? wp("27%") : wp("100%"),
						}}
					  >
						<Text>Date</Text>
						<DatePicker
						  placeholder="New Date"
						  defaultDate={values["date"]}
						  textStyle={{ height: 48 }}
						  onDateChange={(date) => {
							setFieldValue("date", date);
						  }}
						  maxYears={20}
						  minYears={20}
						/>
					  </View>

                    <FormField
                      placeholder="Department"
                      Header="Department"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="department"
                      width="100%"
                    />
                    <FormField
                      placeholder="Sub Department"
                      Header="Sub Department"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="subDepartment"
                      width="100%"
                    />
                    <FormField
                      placeholder="Locations"
                      Header="Locations"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="locations"
                      width="100%"
                    />
                    <FormField
                      placeholder="Reference"
                      Header="Reference"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="reference"
                      width="100%"
                    />
                    <FormField
                      placeholder="Note"
                      Header="Note"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="note"
                      width="100%"
                    />
                    <View style={{ width: "82%", marginTop: 15 }}>

                      <FormDatePicker
                        left={
                          <Icon
                            name="calendar"
                            size={18}
                            style={{ alignSelf: "center" }}
                          />
                        }
                        name="date"
                        textStyle={{
                          paddingVertical: 4,
                          paddingHorizontal: 24,
                          borderColor: "grey",
                          borderRadius: 8,
                          borderWidth: 1,
                        }}
                        defaultDate={initialState.date}
                        // maxYears="0"
                        // minYears="130"
                        //onDateChange={(value) => console.log("Date:", value)}
                      />
                    </View>
                    <View
                      style={{
                        height: 64,
                        width: "80%",
                        marginTop: 20,
                      }}
                    >
                      <Text>Status</Text>
                      <FormPicker
                        //label="Simple dropdown with avatar"
                        textInputPlaceholder="Select Status" data={statusOptions} mode="flat"name="status"
                      />
                    </View>
             

                  <View
                    style={{
                      alignItems: "center",
                      paddingBottom: 10,
                    }}
                  >
                    <SubmitButton txt={"Register"} />
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

export default OperationsIncident;

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
{
  /* <Text style={{ marginBottom: 5, textAlign: "center" }}>
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
                  </View> */
}
{
  /* <FormDatePicker
                  onPick={(date) => onDataChange({ ...data, dateOfBirth: date })}
                    /> */
}

{
  /* <AppText
                  Header={"CONFIRM PASSWORD"}
                  img={require("../../assets/lock.png")}
                  placeholder={"• • • • • • • •"}
                  password={true}
                  name="password"
                /> */
}

{
  /* <DatePickerFuture />
                  <DatePickerPast />
                  <DatePickerCurrent /> */
}

{
  /* <ImageInput 
             imageUri={imageUri}
             onChangeImage={(uri) => setImageUri(uri)} 
             /> */
}
{
  /* <View
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
              </View>*/
}
{
  /* </View> */
}
