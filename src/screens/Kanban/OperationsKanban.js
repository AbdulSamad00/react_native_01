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
import kanbansApi, { saveKanban } from "../../api/kanbans";
import { getUsers } from "../../api/users";
import AuthContext from "../../auth/context";
import { Navbar } from "../../components";
import ActivityIndicator from "../../components/ActivityIndicator";
import {ErrorMessage,Form,FormDatePicker,FormField,FormPicker,FormSingleImagePicker,SubmitButton,} from "../../components/forms";
import useApi from "../../hooks/useApi";
import { fetchUsers } from "../../store/users";
import AppMultiDropdown  from "../../components/forms/AppMultiDropdown";
import _ from "lodash";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required").label("name"),
  businessName: Yup.string().optional("Optional").label("businessName"),
  participants: Yup.string().optional("Optional").label("participants"),  
  department: Yup.string().optional("Optional").label("department"),
  subDepartment: Yup.string().optional("Optional").label("subDepartment"),
  tags: Yup.string().optional("Optional").label("tags"),
  locations: Yup.string().optional("Optional").label("locations"),
  documentNo: Yup.string().optional("Optional").label("documentNo"),
  field: Yup.string().optional("Optional").label("field"),
  description: Yup.string().optional("Optional").label("description"),
  priority: Yup.string().required("Required").label("priority"),
  category: Yup.string().required("Required").label("category"),
  subCategory: Yup.string().required("Required").label("subCategory"),
  
  kanbanNo: Yup.string().optional("Optional"),
  createdOn: Yup.string().optional("Optional"),
  Locations: Yup.string().optional("Optional"),
  Participants: Yup.string().optional("Optional"),  
  documentNo: Yup.string().optional("Optional"),
  field: Yup.string().optional("Optional"),
  tags: Yup.string().optional("Optional"),
  status: Yup.string().required("Required"),
  reference: Yup.string().optional("Optional"),
});

const OperationsKanban = ({ route, navigation }) => {
  const makeKanbanNo = () => {
    let kanbanNumber = "TA-";
    const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
    for (let i = 0; i <= 6; i++)
      kanbanNumber += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    return kanbanNumber;
  };

  const { user, setUser } = useContext(AuthContext);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const { selectedKanban } = route.params;

  const [initialState, setInitialState] = useState({
    name: "",
    user: user?._id ,
    participants: [],
    description: "",
    category: "",
    businessName: "",
    priority: "",
    department: "",
    subDepartment: "",
    locations: "",
    kanbanNo: makeKanbanNo(),
    documentNo: "",
    field: "",
    tags: "",
    reference: "",
    subCategory: "",
    note: "",
    // sharingLink: "",
    // sharedTo: "",
    // sharedTill: new Date(),
    status: "",
  });

  useEffect(() => {
    // usersHandler()
    if (!users.length) {
      dispatch(fetchUsers());
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(selectedKanban)) {
      setInitialState({
        ...selectedKanban,
        participants: selectedKanban.participants.map((item) => item._id),
        user: user?._id,
        kanbanNo: makeKanbanNo(),
      });
    }
  }, [selectedKanban]);

  const { setFieldValue, values } = useFormik({
    validationSchema: validationSchema,
    initialValues: initialState,
  });
  const handleSubmit = async (userInfo) => {
    // AuthContext.
    setLoading(true);
    const submitData = { ...userInfo };
    try {
      const { ok, data } = await saveKanban(submitData);
      console.log(ok)
      setLoading(false);
      if (!ok) {
        if (data) setError(data.error);
        else {
          setError("An unexpected error occurred! ");
        }
        return;
      }
      alert(submitData._id ? "Kanban Updated" : "Kanban added");
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
            Text={!_.isEmpty(selectedKanban) ? "Edit Kanban" : "Add Kanban"}
          />
          <ActivityIndicator
            visible={
              loading
              // saveKanbanApi.loading
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
                        {!_.isEmpty(selectedKanban)
                          ? selectedKanban.name
                          : "Add Kanban"}
                      </Title>
                    </View>
                    <FormField
                      placeholder="Name"
                      Header="Name"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="name"
                      width="100%"
                    />
                    <FormField
                      placeholder="Description"
                      Header="Description"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="description"
                      width="100%"
                    />
					
                    <FormField
                      placeholder="Business Name"
                      Header="Business Name"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="businessName"
                      width="100%"
                    />
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
                      placeholder="Tags"
                      Header="Tags"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="tags"
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
                      placeholder="DocumentNo"
                      Header="DocumentNo"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="documentNo"
                      width="100%"
                    />
                    <FormField
                      placeholder="Field"
                      Header="Field"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="field"
                      width="100%"
                    />
                    <FormField
                      placeholder="Sub Category"
                      Header="Sub Category"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="subCategory"
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
                    <FormField
                      placeholder="Narrative"
                      Header="Narrative"
                      secureTextEntry={false}
                      isMultiline={true}
                      multiline
                      numberOfLines={2}
                      name="description"
                      width="100%"
                      textAlignVertical="top"
                    />
                    <View style={{ width: "80%", marginTop: 20 }}>
                      <AppMultiDropdown
                        title="Participants"
                        placeholder="Select Participants"
                        options={getUsers()}
                      />
                    </View>
                    <View
                      style={{
                        height: 64,
                        width: "84%",
                        marginTop: 20,
                      }}
                    >
                      <Text>Priority</Text>
                      <FormPicker
                        //label="Simple dropdown with avatar"
                        textInputPlaceholder="Select Priority"
                        data={priorityOptions}
                        mode="flat"
                        name="priority"
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
                        textInputPlaceholder="Select Category"
                        data={categoryOptions}
                        mode="flat"
                        name="category"
                        enableAvatar={false}
                      />
                    </View>
                    <View style={{ width: "82%", marginTop: 15 }}>
                      <Text
                        style={{
                          marginBottom: 5,
                          fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        Deadline:
                      </Text>

                      <FormDatePicker
                        left={
                          <Icon
                            name="calendar"
                            size={18}
                            style={{ alignSelf: "center" }}
                          />
                        }
                        name="deadline"
                        textStyle={{
                          paddingVertical: 4,
                          paddingHorizontal: 24,
                          borderColor: "grey",
                          borderRadius: 8,
                          borderWidth: 1,
                        }}
                        defaultDate={initialState.deadline}
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
                        textInputPlaceholder="Select Status"
                        data={statusOptions}
                        mode="flat"
                        name="status"
                      />
                    </View>
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

export default OperationsKanban;

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
