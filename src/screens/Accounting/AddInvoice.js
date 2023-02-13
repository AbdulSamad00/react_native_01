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

import invoicesApi from "./../../api/invoices";
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
  // products.quantity: Yup.string().required().label("Product Quantity"),
  // products.amount: Yup.string().required().label("Product Amount"),
  // products.name: Yup.string().required().label("Product-name"),    
  // products.No: Yup.string().required().label("Product-no"),    
  // serices.quantity: Yup.string().required().label("serices Quantity"),
  // serices.amount: Yup.string().required().label("serices Amount"),
  // serices.name: Yup.string().required().label("serices-name"),    
  // serices.No: Yup.string().required().label("serices-no"),    
  
  currency: Yup.string().required().label("Currency"),
  amount: Yup.string().required().label("Amount"),  
  paidDate: Yup.date().required().label("Paid Date").nullable(),
  dueDate: Yup.date().required().label("Due Date").nullable(),  
  treatmentDate: Yup.date().required().label("Day of Treatment").nullable(),    
  paidMethod: Yup.string().optional().label("Paid Method"),
  reference: Yup.string().optional().label("Reference"),
  note: Yup.string().optional().label("Note"),  
  status: Yup.string().optional().label("status"),
  createdOn: Yup.date().required().label("Day of creation").nullable(),      
});

export const AddInvoice = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const addInvoiceApi = useApi(invoicesApi.addInvoice);
  const authApi = useApi(auth.login);
  const [error, setError] = useState();

  useEffect(() => {
    getCountriesApi.request();
  }, []);

  const handleSubmit = async (userInfo) => {
    console.log(userInfo);
    try {
      const result = await addInvoiceApi.request(userInfo);
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
            Text={"Create Invoice"}
          />
          <ActivityIndicator
            visible={
              addInvoiceApi.loading ||
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
            <Text style={styles.headingText}>Create Invoice</Text>
            <Text style={styles.headingText2}>
              Please fill the form to create the Invoice.
            </Text>

            <View style={styles.TextinputFields}>
              <Form
                initialValues={{
                  currency: "",
                  amount: "",
                  treatementDate: "",				  
                  paidDate: "",
                  dueDate: "",
                  paidMethod: "",
                  reference: "",
                  note: "",
                  createdOn: "",
                  status: "",
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
                      <Icon name="invoice" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Personal Info
                      </Title>
                    </View>

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
                      img={require("../../assets/icons/treatementDate.png")}
                      placeholder="Gender"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="treatementDate"
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
                      placeholder="Username"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="username"
                    />
                    <FormField
                      Header={"E-Mail"}
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
                    placeholder="Address 1"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address1"
                  />
                  <FormField
                    Header={"Address 2"}
                    placeholder="Address 2"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address2"
                  />
                  <FormField
                    Header={"Address 3"}
                    placeholder="Address 3"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="address3"
                  />
                  <FormField
                    Header={"Zip Code"}
                    placeholder="Zip Code"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="zip"
                  />
                  <FormField
                    Header={"City"}
                    placeholder="City"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="city"
                  />
                  <FormField
                    Header={"State"}
                    placeholder="State"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="state"
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
                      Telephone
                    </Title>
                  </View>
                  <FormField
                    Header={"Phone"}
                    placeholder="phpne"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="phone"
                  />
                  <FormField
                    Header={"Mobile"}
                    placeholder="mobile"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="mobile"
                  />
                  <FormField
                    Header={"skype"}
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
                    placeholder="IBAN"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="IBAN"
                  />
				  
                  <FormField
                    Header={"Bank"}
                    placeholder="Bank"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="bank"
                  />
                  <FormField
                    Header={"Branch of Bank"}
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
                    placeholder="Healthcare Provider Identifier Organisation"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="healthcareProviderIdentifierOrganisation"
                  />
                  <FormField
                    Header={"Healthcare Provider Identifier Individual"}
                    placeholder="Healthcare Provider Identifier Individual"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="healthcareProviderIdentifierIndividual"
                  />
                  <FormField
                    Header={"Treatments"}
                    placeholder="Treatments"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="treatments"
                  />
                  <FormField
                    Header={"License No"}
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
                    placeholder="Organization A"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationAName"
                  />
                  <FormField
                    Header={"Organization A Member No"}
                    placeholder="Organization A Member No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="organizationAMemberNo"
                  />

                  <FormField
                    Header={"Organization B Name"}
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
  InvoiceText: {
    color: "black",
    fontSize: h("2%"),
  },
});