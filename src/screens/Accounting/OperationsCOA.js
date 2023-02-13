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
import coasApi from "../../api/coas";
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
  prefix: Yup.string().optional().label("prefix"),  
  firstName: Yup.string().required().label("First Name"),
  initials: Yup.string().optional().label("initials"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  dateBirth: Yup.date().required().label("Day of Birth").nullable(),
  gender: Yup.string().required().label("gender"),
  address1: Yup.string().required().label("Adress 1"),
  address2: Yup.string().optional().label("Adress 2"),
  address3: Yup.string().optional().label("Adress 3"),
  zip: Yup.string().optional().label("Zip Code"),  
  city: Yup.string().optional().label("City"),
  state: Yup.string().optional().label("State"),
  country: Yup.string().required().label("Country"),  
  phone: Yup.string().required().label("Phone"),
  mobile: Yup.string().optional().label("Mobile"),
  skype: Yup.string().optional().label("Skype"),
  primInsurance: Yup.string().required().label("Prim. Insurance"),
  primInsuranceNo: Yup.string().required().label("Prim. Insurance-No"),  
  primInsuranceValidTill: Yup.date().optional().label("Prim.Insurance Valid Till").nullable(),
  secInsurance: Yup.string().optional().label("Sec. Insurance"),
  secInsuranceNo: Yup.string().optional().label("Sec. Insurance-No"),  
  secInsuranceValidTill: Yup.date().optional().label("Sec. Insurance Valid Till").nullable(),  
  idPaper: Yup.string().optional().label("ID Paper"),
  idPaperValidTill: Yup.date().optional().label("ID Paper Valid Till").nullable(),  
  IBAN: Yup.string().required().label("IBAN"),
  bank: Yup.string().required().label("Bank"),
  branchOfBank: Yup.string().optional().label("Branch of Bank"),
  organizationAName: Yup.string().optional().label("OrganizationA Name"),
  organizationAMemberNo: Yup.string().optional().label("OrganizationAMemberNo"),
  organizationBName: Yup.string().optional().label("OrganizationB Name"),  
  organizationBMemberNo: Yup.string().optional().label("OrganizationBMemberNo"),  
  healthcareProviderIdentifierOrganisation: Yup.string().optional().label("HPIO"),
  healthcareProviderIdentifierIndividual: Yup.string().optional().label("HPII"),  
  treatments: Yup.string().optional().label("treatments"),
  licenseNo: Yup.string().optional().label("License-No"),  
  licenseValidTill: Yup.date().optional().label("License Valid Till").nullable(),  
  
});

const Operationscoa = ({ route, navigation }) => {
  const [selected, setSelected] = useState({});

  const coaApi = useApi(coasApi.savecoa);
  const getCountriesApi = useApi(countries.getCountries);
  const [error, setError] = useState();

  useEffect(() => {
    if (route.params) {
      setSelected(route.params.selectedcoa);
    }
    getCountriesApi.request();
  }, []);

  const {
    _id,
    prefix,	
    firstName,
    initials,	
    lastName,
    username,
    email,
    dateBirth,
    gender,
    profile,
    address1,
    address2,
    address3,
    zip,
    city,
    state,
    country,
    phone,
	mobile,
	skype,
    imageSrc,
    IBAN,
    bank,
    branchOfBank,
    primInsuranceNo,
    primInsurance,
    primInsuranceValidTill,
    secInsuranceNo,
    secInsurance,
    secInsuranceValidTill,
    idPaper,
    idPaperValidTill,
    organizationAName,
    organizationAMemberNo,
	organizationBName,  
	organizationBMemberNo,
    healthcareProviderIdentifierOrganisation,
    healthcareProviderIdentifierIndividual,  
	treatments,
	licenseNo,  
	licenseValidTill,  	
	
  } = selected;

  const handleSubmit = async (userInfo) => {
    console.log(userInfo);

    const submitData = { ...userInfo };
    try {
      if (_id) {
        submitData["_id"] = _id;
      }
      const result = await coaApi.request(submitData);
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
      //if registration is success
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
            Text={`${_id ? "Update" : "Add"} coa`}
          />

          <ActivityIndicator
            visible={coaApi.loading || getCountriesApi.loading}
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
            } coa`}</Text>
            <Text style={styles.headingText2}>
              {`Please fill the form to ${
                _id ? "update" : "create"
              } your account.`}
            </Text>

            <View style={styles.TextinputFields}>
              <Form
                initialValues={{
                  firstName: firstName ? firstName : "",
                  lastName: lastName ? lastName : "",
                  initials: initials ? initials : "",
                  username: username ? username : "",
                  email: email ? email : "",
                  dateBirth: dateBirth ? dateBirth : "",
                  imageSrc: imageSrc ? imageSrc : null,
                  gender: gender ? gender : "",
                  prefix: prefix ? prefix : "",
                  address1: address1 ? address1 : "",
                  address2: address2 ? address2 : "",
                  address3: address3 ? address3 : "",
                  city: city ? city : "",
                  zip: zip ? zip : "",
                  state: state ? state : "",
                  country: country ? country : "",
                  phone: phone ? phone : "",
                  mobile: mobile ? mobile : "",
                  skype: skype ? skype : "",				  
                  IBAN: IBAN ? IBAN : "",
                  bank: bank ? bank : "",
                  branchOfBank: branchOfBank ? branchOfBank : "",
                  idPaper: idPaper ? idPaper : "",				  
                  idPaperValidTill: idPaperValidTill ? idPaperValidTill : "",
                  primInsurance: primInsurance ? primInsurance : "",				  
                  primInsuranceNo: primInsuranceNo ? primInsuranceNo : "",
                  primInsuranceValidTill: primInsuranceValidTill ? primInsuranceValidTill: "",				  
                  secInsurance: secInsurance ? secInsurance : "",				  
                  secInsuranceNo: secInsuranceNo ? secInsuranceNo : "",
                  secInsuranceValidTill: secInsuranceValidTill? secInsuranceValidTill: "",
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
                      <Icon name="coa" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Personalia
                      </Title>
                    </View>
                    <Text>Avatar:</Text>
                    <FormSingleImagePicker name="imageSrc" />
                    <FormField
                      Header={"Prefix"}
                      img={require("../../assets/icons/user.png")}
                      placeholder="prefix"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
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
                    <FormField
                      Header={"Gender"}
                      img={require("../../assets/icons/gender.png")}
                      placeholder="gender"
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
                      Bank-Account Information
                    </Title>
                  </View>
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
                  <FormField
                    Header={"IBAN"}
                    img={require("../../assets/icons/bank2.png")}
                    placeholder="IBAN"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="IBAN"
                  />
				  
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
                      Insurances
                    </Title>
                  </View>
				  
                  <FormField
                    Header={"Prim. Insurance"}
                    img={require("../../assets/icons/medicalbadge.png")}
                    placeholder="Prim. Insurance"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="primInsurance"
                  />
                  <FormField
                    Header={"Prim. Insurance-No"}
                    img={require("../../assets/icons/medicalbadge.png")}
                    placeholder="Prim. Insurance-No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="primInsuranceNo"
                  />
                  <Text style={{ marginBottom: 5 }}>
                    Prim Insurance Valid Till:
                  </Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="primInsuranceValidTill"
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
                    Header={"Sec Insurance"}
                    img={require("../../assets/icons/medicalbadge.png")}
                    placeholder="secInsurance"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="secInsurance"
                  />
                  <FormField
                    Header={"Sec. Insurance-No"}
                    img={require("../../assets/icons/medicalbadge.png")}
                    placeholder="Sec. Insurance-No"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="secInsuranceNo"
                  />

                  <Text style={{ marginBottom: 5 }}>
                    Sec Insurance Valid Till:
                  </Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="secInsuranceValidTill"
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
                    <Icon name="fingerprint" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Identification
                    </Title>
                  </View>

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
                      borderColor: "gray",
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
                      <Icon name="membership" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Membership
                      </Title>
                    </View>
                    <FormField
                      Header={"Organization A Name"}
                      img={require("../../assets/icons/membership.png")}
                      placeholder="Organization A Name"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="organizationAName"
                    />
                    <FormField
                      Header={"OrganizationA MemberNo"}
                      img={require("../../assets/icons/membership.png")}
                      placeholder="OrganizationA MemberNo"
                      //autoCapitalize="none"
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
                      Header={"OrganizationB MemberNo"}
                      img={require("../../assets/icons/membership.png")}
                      placeholder="OrganizationB MemberNo"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="organizationBMemberNo"
                    />
                  </View>
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
                      <Icon name="license1" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Licenses
                      </Title>
                    </View>
                    <FormField
                      Header={"healthcareProviderIdentifierOrganisation"}
                      img={require("../../assets/icons/licensed.png")}
                      placeholder="HPIO"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="healthcareProviderIdentifierOrganisation"
                    />
                    <FormField
                      Header={"healthcareProviderIdentifierIndividual"}
                      img={require("../../assets/icons/licensed.png")}
                      placeholder="HPII"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="healthcareProviderIdentifierIndividual"
                    />
					
                    <FormField
                      Header={"Treatments"}
                      img={require("../../assets/icons/licensed.png")}
                      placeholder="Treatments"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="treatments"
                    />

                    <FormField
                      Header={"License No"}
                      img={require("../../assets/icons/licensed.png")}
                      placeholder="License No"
                      //autoCapitalize="none"
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
						  borderColor: "gray",
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

export default Operationscoa;
