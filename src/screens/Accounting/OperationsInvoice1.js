import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import {Alert, Image,SafeAreaView,StatusBar,StyleSheet,Text,View,} from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Yup from "yup";
import users from "../../api/users";
import invoicesApi from "../../api/invoices";
import { getPatients } from "../../../api/patients";
import { Navbar } from "../../components";
import ActivityIndicator from "../../components/ActivityIndicator";
import {ErrorMessage,Form,FormDatePicker,FormField,FormPicker,FormSingleImagePicker,SubmitButton,} from "../../components/forms";
import useApi from "../../hooks/useApi";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("FirstName"),
  initials: Yup.string().optional().label("initials"),
  lastName: Yup.string().required().label("LastName"),  
  paidDate: Yup.date().optional().label("PaidDate"),
  dueDate: Yup.date().optional().label("DueDate"),  
  amount: Yup.string().required().label("Amount"),
  currency: Yup.string().required().label("Currency"),
  product: Yup.string().optional().label("Product"),
  service: Yup.string().optional().label("Service"),
  reference: Yup.string().optional().label("Reference"),  
  note: Yup.string().optional().label("Note"),
  clinic: Yup.string().optional().label("Clinic"),
});

export function OperationsInvoice ({ route, navigation }) {
  
  const saveInvoiceApi = useApi(invoicesApi.saveInvoice);
  const getUsersApi = useApi(users.getUsers);
  const [error, setError] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState({});

  useEffect(() => {
    if (route.params) {
      setSelectedInvoice(route.params.selectedInvoice);
    }
    getUsersApi.request();
    getProfilesApi.request();
  }, []);

  const {
    id,
   FirstName,
    Initials,	
    LastName,
    Username,
    Amount,
    Currency,
    PaidDate,
	DueDate,	
    Product,
    Service,
    Reference,
    Note,
  } = selectedInvoice;

  const handleSubmit = async (userInfo) => {
    const submitData = { ...userInfo };
    try {
      if (id) {   
        submitData["_id"] = id;
      }
      const result = await saveInvoiceApi.request(submitData);
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
            Text={`${id ? "Update" : "Add"} Invoice`}
          />
          <ActivityIndicator
            visible={
              saveInvoiceApi.loading ||
              getUsersApi.loading
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
            } Invoice`}</Text>
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
                  username: Username ? Username : "",
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
					<View
					  style={{
						marginBottom: 16,
						width: "100%",
						flexDirection: isTablet ? "row" : "column",
						alignItems: isTablet ? "center" : null,
					  }}
					>
					  <Text style={{ marginVertical: 10 }}>
						Select registered patient from administration * :
					  </Text>
					  <View
						style={{
						  width: isTablet ? 350 : "100%",
						  marginLeft: isTablet ? 30 : 0,
						}}
					  >
						<Dropdown
						  textInputPlaceholder="Select Patient"
						  data={patientOptions}
						  value={
							selectedPatient
							  ? selectedPatient?.id
								? selectedPatient?.id
								: ""
							  : ""
						  }
						  onChange={(value) => handleSelect(value)}
						  mode="flat"
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
