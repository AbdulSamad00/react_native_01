import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View,} from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import countries from "../../api/countries";
import { addero } from "../../api/eros";
import { Navbar } from "../../components";
import ActivityIndicator from "../../components/ActivityIndicator";
//import { ErrorMessage, Form, FormDatePicker, FormField, FormPicker, FormSingleImagePicker, SubmitButton, } from "../../components/forms";
import {ErrorMessage,Form,FormDatePicker,FormField,FormPicker,FormSingleImagePicker,} from "../../components/forms";
import useApi from "../../hooks/useApi";
import Submit from "./Submit";

let schema = {
  prefix: Yup.string().optional().label("prefix"),
  firstName: Yup.string().required().label("First Name"),
  initials: Yup.string().optional().label("initials"),
  lastName: Yup.string().required().label("Last Name"),
  username: Yup.string().required().min(3).label("username"),
  password: Yup.string().matches(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Yup.string().email().required().label("Email"),
  dateBirth: Yup.date().required().label("Day of Birth").nullable(),
  gender: Yup.string().required().label("gender"),
  address1: Yup.string().optional().label("Adress 1"),
  address2: Yup.string().optional().label("Adress 2"),
  address3: Yup.string().optional().label("Adress 3"),
  zip: Yup.string().optional().label("Zip Code"),
  city: Yup.string().optional().label("City"),
  state: Yup.string().optional().label("State"),
  country: Yup.string().required().label("Country"),
  phone: Yup.string().optional().label("Phone"),
  mobile: Yup.string().optional().label("Mobile"),
  skype: Yup.string().optional().label("Skype"),
  primInsurance: Yup.string().optional().label("Prim. Insurance"),
  primInsuranceNo: Yup.string().optional().label("Prim. Insurance-No"),
  primInsuranceValidTill: Yup.date().optional().label("Prim.Insurance Valid Till").nullable(),
  secInsurance: Yup.string().optional().label("Sec. Insurance"),
  secInsuranceNo: Yup.string().optional().label("Sec. Insurance-No"),
  secInsuranceValidTill: Yup.date().optional().label("Sec. Insurance Valid Till").nullable(),
  idPaper: Yup.string().optional().label("ID Paper"),
  idPaperValidTill: Yup.date().optional().label("ID Paper Valid Till").nullable(),
  IBAN: Yup.string().optional().label("IBAN"),
  bank: Yup.string().optional().label("Bank"),
  branchOfBank: Yup.string().optional().label("Branch of Bank"),
  organizationAName: Yup.string().optional().label("OrganizationA Name"),
  organizationAMemberNo: Yup.string().optional().label("OrganizationAMemberNo"),
  organizationBName: Yup.string().optional().label("OrganizationB Name"),
  organizationBMemberNo: Yup.string().optional().label("OrganizationBMemberNo"),
  skill: Yup.string().optional().label("Skill"),
  level: Yup.string().optional().label("Level"),
  certificate: Yup.string().optional().label("certificate"),
  certificateNo: Yup.string().optional().label("Certificate-No"),
  certificateValidFrom: Yup.date().optional().label("Certificate Valid From").nullable(),
}

let validationSchema;

export function OperationsERO({ route, navigation, errors: E }) {
  const [selected, setSelected] = useState({});

  const eroApi = useApi(addero);
  const getCountriesApi = useApi(countries.getCountries);
  const [error, setError] = useState(E);

  useEffect(() => {
    if (route.params) {
      setSelected(route.params.selectedERO);
      if (route.params.selectedERO.id) {
        schema.password = Yup.string()
        .matches(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .optional()
      }
      validationSchema = Yup.object().shape(schema);
    }
    getCountriesApi.request();
  }, []);

  const {
    id,
    prefix,
    FirstName,
    Initials,
    LastName,
    username,
    password,
    Email,
    BirthDate,
    Gender,
    profile,
    Address1,
    Address2,
    Address3,
    ZipCode,
    City,
    State,
    Country,
    Phone,
    mobile,
    skype,
    Avatar,
    IBAN,
    bank,
    BranchOfBank,
    PrimInsuranceNo,
    PrimInsurance,
    PrimInsuranceValidFrom,
    SecInsuranceNo,
    SecInsurance,
    SecInsuranceValidFrom,
    IdPaper,
    IdPaperValidFrom,
    organizationAName,
    organizationAMemberNo,
    organizationBName,
    organizationBMemberNo,
    Skill,
    Level,
    Certificate,
    CertificateNo,
    CertificateValidFrom,
  } = selected;

  const handleSubmit = (userInfo) => {
    console.log("here")
    console.log(userInfo.imageSrc.substring(0, 100))
    const submitData = { ...userInfo };
    if (id) {
      submitData.id = id;
      console.log(id);
    }
      delete submitData.idPaperValidFrom;
      delete submitData.primInsuranceValidFrom;
      delete submitData.secInsuranceValidFrom;
    
    eroApi
      .request(submitData)
      .then((result) => {
        console.log("result: ", result.ok);
        if (!result.ok) {
          if (result.data) {setError(result.data.error); console.log(result.data)}
          else {
            setError("An unexpected error occurred! ");
            console.log(result);
          }
          return;
        } else navigation.goBack();
      })
      .catch((e) => console.error(e));
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
            Text={`${id ? "Update" : "Add"} ERO`}
          />

          <ActivityIndicator
            visible={eroApi.loading || getCountriesApi.loading}
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
            } ERO`}</Text>
            <Text style={styles.headingText2}>
              {`Please fill the form to ${
                id ? "update" : "create"
              } your account.`}
            </Text>

            <View style={styles.TextinputFields}>
              <Form
                initialValues={{
                  firstName: FirstName ? FirstName : "",
                  lastName: LastName ? LastName : "",
                  initials: Initials ? Initials : "",
                  username: username ? username : "",
                  password: "",
                  email: Email ? Email : "",
                  dateBirth: BirthDate ? BirthDate : "",
                  imageSrc: Avatar ? Avatar : null,
                  gender: Gender ? Gender : "",
                  prefix: prefix ? prefix : "",
                  status: "",
                  address1: Address1 ? Address1 : "",
                  address2: Address2 ? Address2 : "",
                  address3: Address3 ? Address3 : "",
                  city: City ? City : "",
                  zip: ZipCode ? ZipCode : "",
                  state: State ? State : "",
                  country: Country ? Country : "",
                  phone: Phone ? Phone : "",
                  mobile: mobile ? mobile : "",
                  skype: skype ? skype : "",
                  IBAN: IBAN ? IBAN : "",
                  bank: bank ? bank : "",
                  branchOfBank: BranchOfBank ? BranchOfBank : "",
                  idPaper: IdPaper ? IdPaper : "",
                  idPaperValidFrom: IdPaperValidFrom ? IdPaperValidFrom : "",
                  primInsurance: PrimInsurance ? PrimInsurance : "",
                  primInsuranceNo: PrimInsuranceNo ? PrimInsuranceNo : "",
                  primInsuranceValidFrom: PrimInsuranceValidFrom
                    ? PrimInsuranceValidFrom
                    : "",
                  secInsurance: SecInsurance ? SecInsurance : "",
                  secInsuranceNo: SecInsuranceNo ? SecInsuranceNo : "",
                  secInsuranceValidFrom: SecInsuranceValidFrom
                    ? SecInsuranceValidFrom
                    : "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                isInitialValid={id ? true : false}
                enableReinitialize={true}
              >
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
                      <Icon name="ero" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Personalia
                      </Title>
                    </View>
                    <Text>Avatar:</Text>
                    <FormSingleImagePicker name="imageSrc" />
                    <FormPicker
                     style={{width: 250, marginVertical: 18}}
                      textInputPlaceholder={Prefix ? Gender.toUpperCase() : "Prefix"}
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
                      defaultDate={BirthDate}
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
                        Header={"Password"}
                        img={require("../../assets/icons/password.png")}
                        placeholder={""}
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
                    name="primInsuranceValidFrom"
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
                    name="secInsuranceValidFrom"
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
                  <Text style={{ marginBottom: 5 }}>ID PaperValidFrom:</Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="idPaperValidFrom"
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
                    <Icon name="licensed" size={24} />
                    <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Certifications
                    </Title>
                  </View>
                  <FormField
                    Header={"Certificate"}
                    img={require("../../assets/icons/license1.png")}
                    placeholder="Certificate"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="certificate"
                  />

                  <FormField
                    Header={"Certificate No"}
                    img={require("../../assets/icons/license1.png")}
                    placeholder="Certificate No"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="certificateNo"
                  />

                  <Text style={{ marginBottom: 5 }}>
                    Certificate Valid Till:
                  </Text>

                  <FormDatePicker
                    left={
                      <Icon
                        name="calendar"
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    }
                    name="certificateValidFrom"
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

                  <Submit txt={id ? "Update" : "Register"} />
                </View>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

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
  EROText: {
    color: "black",
    fontSize: h("2%"),
  },
});