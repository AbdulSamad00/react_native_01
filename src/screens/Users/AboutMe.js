import "react-native-gesture-handler";
import React, { Component, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar
} from "react-native";
import { Navbar2, AppText2, Appbtn, AppText } from "../../components";
import { w, h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import NavigationDropdown from "../../components/NavigationDropdown";
import { profileOptions } from "../../config/pickerElements";
const deviceWidth = Dimensions.get('window').width;
import {
  ErrorMessage,
  Form,
  FormDatePicker,
  FormField,
  FormPicker,
  FormSingleImagePicker,
  FormTimePicker,
  SubmitButton,
  WorkingHours,
} from "../../components/forms";
// import { StatusBar } from "expo-status-bar";
import colors from "../../config/colors";
import countries from "../../api/countries";
import { getClinic, getClinics, getClinicUser, updateClinic, updateClinicUser } from "../../api/clinics";
import AuthContext from "../../auth/context";
import { SvgUri } from "react-native-svg";
import { getUser } from "../../api/users";

const validationSchema = Yup.object().shape({
  // prefix:    Yup.string().optional().label("prefix"),
  // firstName: Yup.string().required().label("First Name"),
  // initials: Yup.string().optional().label("initials"),
  // lastName: Yup.string().required().label("Last Name"),
  // username: Yup.string().required().min(3).label("username"),
  password: Yup.string().matches(new RegExp("^[a-zA-Z0-9]{3,30}$")).optional("Required"),
  confirmPassword: Yup.string().matches(new RegExp("^[a-zA-Z0-9]{3,30}$")).optional("Required"),
  // email: Yup.string().email().required().label("Email"),
  // dateBirth: Yup.date().required().label("Day of Birth").nullable(),
  // gender: Yup.string().required().label("gender"),
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

  businessName: Yup.string().optional().label("Business Name"),
  taxPayerNo: Yup.string().optional().label("Tax-payer Nr"),
  chamberCommerceNo: Yup.string().optional().label("chamberCommerceNo"),
  industry: Yup.string().optional().label("Industry"),
  size: Yup.string().optional().label("Size"),
  website: Yup.string().optional().label("Website"),

  primInsurance: Yup.string().optional().label("Prim. Insurance"),
  primInsuranceNo: Yup.string().optional().label("Prim. Insurance-No"),
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
  workingHours: Yup.array().optional().label("Working Hours")

});
export default function Myaccount({ navigation }) {
  // state = { City: "" };
  const [navPicker, setnavPicker] = useState('about')
  const [selected, setSelected] = useState({});
  const [error, setError] = useState();
  const getCountriesApi = useApi(countries.getCountries);
  const { user, setUser } = useContext(AuthContext);


  const getProfileData = async () => {
    const { data, ok } = await getClinicUser(user._id)
    const result = data
    console.log(result.workingHours)
    if (ok) {
      const { data, ok } = await getUser(result.user)
      // console.log(data,ok)
      const userObj = data
      setSelected({
        _id: result._id,
        mood: userObj.mood,
        aboutMe: userObj.about,
        imageSrc: userObj.imageSrc,
        address1: userObj.Address.address1,
        address2: userObj.Address.address2,
        address3: userObj.Address.address3,
        country: userObj.Address.country,
        state: userObj.Address.state,
        city: userObj.Address.city,
        zip: userObj.Address.zip,
        phone: userObj.phones.phone,
        mobile: userObj.phones.mobile,
        skype: userObj.phones.skype,
        IBAN: result.bankInfo.IBAN,
        bank: result.bankInfo.bank,
        // branchOfBank: result.bank.branchOfBank.toString(),
        size: result.companyInfo.size,
        taxPayerNo: result.companyInfo.taxPayerNo,
        website: result.companyInfo.webiste,
        businessName: result.companyInfo.businessName,
        chamberCommerceNo: result.companyInfo.chamberCommerceNo,
        organizationAMemberNo: result.membership.organizationAMemberNo,
        organizationAName: result.membership.organizationAName,
        organizationBMemberNo: result.membership.organizationBMemberNo,
        organizationBName: result.membership.organizationBName,
        healthcareProviderIdentifierIndividual: result.professionalInfo.healthcareProviderIdentifierIndividual,
        healthcareProviderIdentifierOrganisation: result.professionalInfo.healthcareProviderIdentifierOrganisation,
        licenseNo: result.membership.licenseNo,
        licenseValidTill: result.professionalInfo.licenseValidTill,
        treatments: result.professionalInfo.treatments,
        workingHours: result.workingHours

      })
    }
  }
  useEffect(() => {
    getCountriesApi.request();
    console.log(getCountriesApi.data[0], '====')
    getProfileData()
  }, [])
  const {
    _id,
    mood,
    aboutMe,
    password,
    imageSrc,
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
    language,
    businessName,
    taxPayerNo,
    chamberCommerceNo,
    industry,
    size,
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
    website,
    workingHours

  } = selected;

  const dayExists = (toFind) => {
    const day = workingHours?.filter(item => item.day == toFind.toLowerCase())
    return day ? day[0] : false
  }
  const [timings, setTimings] = useState([
    { title: "Monday", checked: dayExists('monday') },
    { title: "Tuesday", checked: dayExists('tuesday') },
    { title: "Wednesday", checked: dayExists('wednesday') },
    { title: "Thursday", checked: dayExists('thursday') },
    { title: "Friday", checked: dayExists('friday') },
    { title: "Saturday", checked: dayExists('saturday') },
    { title: "Sunday", checked: dayExists('sunday') },
  ])
  const handleSubmit = async (userInfo) => {

    const submitData = { ...userInfo };
    try {
      if (_id) {
        submitData["_id"] = _id;
      }
      const { data, ok } = await updateClinic(_id, submitData);
      console.log(data, ok, '=======Result')
      if (!ok) {
        if (data) setError(data.error);
        else {
          setError("An unexpected error occurred! ");
          console.log(data);
        }
        return;
      }
      navigation.goBack()
      return;

    } catch (error) {
      console.log("error exception:   ", error);
    }
  };
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={'#00B7DD'} />

      <SafeAreaView />
      <Navbar2
        arrow={() => {
          navigation.goBack();
        }}
        Text={"Profile"}
      />
      <KeyboardAwareScrollView style={{ flex: 1, paddingBottom: 30 }}>
        <>
          <View style={styles.sideImge}>
            <Image
              style={styles.imgeContainer}
              source={require("../../assets/icons/logo.png")}
            />
          </View>

          {/* <ScrollView scrollEnabled={true} style={{ flex: 1, paddingBottom: 50, overflow: "hidden", }} > */}
          {/* nav bar */}
          <View style={[styles.navBarContainer]}>
            {deviceWidth < 800 ? (
              <View style={{ width: '100%', paddingVertical: 15 }}>
                <NavigationDropdown options={profileOptions} onChange={val => setnavPicker(val)} />
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: profileOptions[0]['bgColor'] }]}
                  onPress={() => setnavPicker('about')}
                >
                  <Text>About</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: profileOptions[1]['bgColor'] }]}
                >
                  <Text>Bank</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setnavPicker('bank')}
                  style={[styles.navTab, { backgroundColor: profileOptions[2]['bgColor'] }]}
                >
                  <Text>Professional Info</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setnavPicker('membership')}
                  style={[styles.navTab, { backgroundColor: profileOptions[3]['bgColor'] }]}
                >
                  <Text>Membership</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: profileOptions[4]['bgColor'] }]}
                  onPress={() => setnavPicker('password')}
                >
                  <Text>Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: profileOptions[4]['bgColor'] }]}
                  onPress={() => setnavPicker('insurance')}
                >
                  <Text>Insurances</Text>
                </TouchableOpacity>

              </View>
            )}


          </View>
          {/* <DropdownActions /> */}

          <View style={{ paddingVertical: 10, }}>


            <View style={styles.TextinputFields}>
              <Form
                initialValues={{
                  mood: mood ? mood : "",
                  aboutMe: aboutMe ? aboutMe : "",
                  password: password ? password : "",
                  confirmPassowrd: "",
                  // email: email ? email : "",
                  // dateBirth: dateBirth ? dateBirth : "",
                  imageSrc: imageSrc ? imageSrc : null,
                  // gender: gender ? gender : "",
                  // prefix: prefix ? prefix : "",
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
                  language: language ? language : "",
                  businessName: businessName ? businessName : "",
                  webiste: website ? website : "",
                  industry: industry ? industry : "",
                  size: size ? size : "",
                  chamberCommerceNo: chamberCommerceNo ? chamberCommerceNo : "",
                  taxPayerNo: taxPayerNo ? taxPayerNo : "",
                  healthcareProviderIdentifierOrganisation: healthcareProviderIdentifierOrganisation ? healthcareProviderIdentifierOrganisation : "",
                  healthcareProviderIdentifierIndividual: healthcareProviderIdentifierIndividual ? healthcareProviderIdentifierIndividual : "",
                  treatments: treatments ? treatments : "",
                  licenseNo: licenseNo ? licenseNo : "",
                  licenseValidTill: licenseValidTill ? licenseValidTill : "",
                  IBAN: IBAN ? IBAN : "",
                  bank: bank ? bank : "",
                  branchOfBank: branchOfBank ? branchOfBank : "",
                  idPaper: idPaper ? idPaper : "",
                  idPaperValidTill: idPaperValidTill ? idPaperValidTill : "",
                  primInsurance: primInsurance ? primInsurance : "",
                  primInsuranceNo: primInsuranceNo ? primInsuranceNo : "",
                  primInsuranceValidTill: primInsuranceValidTill ? primInsuranceValidTill : "",
                  secInsurance: secInsurance ? secInsurance : "",
                  secInsuranceNo: secInsuranceNo ? secInsuranceNo : "",
                  secInsuranceValidTill: secInsuranceValidTill ? secInsuranceValidTill : "",
                  organizationAName: organizationAName ? organizationAName : "",
                  organizationAMemberNo: organizationAMemberNo ? organizationAMemberNo : "",
                  organizationBName: organizationBName ? organizationBName : "",
                  organizationBMemberNo: organizationBMemberNo ? organizationBMemberNo : "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
              >
                <ErrorMessage error={error} visible={error} />
                {navPicker == 'about' ?
                  <>
                    <View>

                      <View
                        style={{
                          alignItems: "center",
                          // margin: 8,
                          marginTop: 10,
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
                          {/* <Icon name="lock" size={24} /> */}
                          <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                            About
                          </Title>
                        </View>

                        <Text>Avatar:</Text>
                        <FormSingleImagePicker name="imageSrc" />
                        <View style={{ width: '110%', alignItems: "center" }}>
                          <FormField
                            Header={"Mood"}
                            img={require("../../assets/icons/username.png")}
                            placeholder="Mood"
                            autoCapitalize="none"
                            secureTextEntry={false}
                            isMultiline={true}
                            name="mood"
                          />


                          <FormField
                            Header={"About Me"}
                            img={require("../../assets/icons/email.png")}
                            placeholder={""}
                            name="aboutMe"
                            secureTextEntry={false}
                            isMultiline={true}
                            autoCapitalize="none"

                          />

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
                          <View style={{ width: '75%', marginTop: 16, marginBottom: 12 }}>
                            <Text style={{ paddingLeft: 10, fontWeight: "bold", fontSize: 18, textAlign: "left" }}>
                              Country
                            </Text>
                            <View
                              style={{
                                height: 64,
                                width: "99%",
                                marginTop: 15
                              }}
                            >
                              <FormPicker
                                //label="Simple dropdown with avatar"
                                textInputPlaceholder="Select Country"
                                data={getCountriesApi.data.map((country) => ({
                                  label: `${country.name}`,
                                  value: country.name,
                                  avatarSource: { uri: country.flag },
                                }))}

                                enableAvatar={true}
                                mode="flat"
                                name="country"
                              />
                            </View>
                          </View>
                          <View style={{ width: '75%', marginTop: 16, marginBottom: 12 }}>
                            <Text style={{ paddingLeft: 10, fontWeight: "bold", fontSize: 18, textAlign: "left" }}>
                              Phone
                            </Text>
                            <View style={styles.phoneInput}>
                              <View
                                style={{
                                  height: "90%",
                                  width: "41%",

                                }}
                              >
                                <FormPicker

                                  //label="Simple dropdown with avatar"
                                  style={{ backgroundColor: "white" }}
                                  textInputPlaceholder=""
                                  data={getCountriesApi.data.map((country) => ({
                                    label: `${country.phonePrefix}`,
                                    value: `${country.phonePrefix} `,
                                    avatarSource: { uri: country.flag },
                                  }))}

                                  enableAvatar={false}
                                  mode="flat"
                                // name="phone"
                                />
                              </View>
                              <FormField

                                style={{ height: '100%', borderBottomWidth: 0, width: '70%', alignItems: "center" }}
                                // Header={}
                                img={require("../../assets/icons/phone.png")}
                                placeholder="phone"
                                //autoCapitalize="none"
                                secureTextEntry={false}
                                isMultiline={false}
                                name="phone"
                              />
                            </View>
                          </View>
                          <View style={{ width: '75%', marginTop: 16, marginBottom: 12 }}>
                            <Text style={{ paddingLeft: 10, fontWeight: "bold", fontSize: 18, textAlign: "left" }}>
                              Phone
                            </Text>
                            <View style={styles.phoneInput}>
                              <View
                                style={{
                                  height: "90%",
                                  width: "41%",

                                }}
                              >
                                <FormPicker

                                  //label="Simple dropdown with avatar"
                                  style={{ backgroundColor: "white" }}
                                  textInputPlaceholder=""
                                  data={getCountriesApi.data.map((country) => ({
                                    label: `${country.phonePrefix}`,
                                    value: `${country.phonePrefix} `,
                                    avatarSource: { uri: country.flag },
                                  }))}

                                  enableAvatar={false}
                                  mode="flat"
                                // name="phone"
                                />
                              </View>
                              <FormField

                                style={{ height: '100%', borderBottomWidth: 0, width: '70%', alignItems: "center" }}
                                // Header={}
                                img={require("../../assets/icons/mobile.png")}
                                placeholder="mobile"
                                //autoCapitalize="none"
                                secureTextEntry={false}
                                isMultiline={false}
                                name="mobile"
                              />
                            </View>
                          </View>


                          {/* <SvgUri width={30} height={30} uri="http://itransportindex.com:4500/api/public/flags/4x3/af.svg"/> */}
                          <FormField
                            Header={"Skype"}
                            img={require("../../assets/icons/skype.png")}
                            placeholder="skype"
                            //autoCapitalize="none"
                            secureTextEntry={false}
                            isMultiline={false}
                            name="skype"
                          />
                          <FormField
                            Header={"Language"}
                            img={require("../../assets/icons/skype.png")}
                            placeholder="language"
                            //autoCapitalize="none"
                            secureTextEntry={false}
                            isMultiline={false}
                            name="language"
                          />

                        </View>
                      </View>
                    </View>
                  </>
                  : navPicker == 'bank' ?
                    <>

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
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            top: -18,
                            left: 24,
                          }}
                        >
                          {/* img={require("../../assets/icons/bank2.png")}				  
                              <Icon name="lock" size={24} /> */}
                          {/* <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                                Bank-Account Information
                              </Title> */}
                        </View>
                        <FormField
                          Header={"IBAN"}
                          img={require("../../assets/icons/bank2.png")}
                          placeholder="IBAN"
                          autoCapitalize="none"
                          secureTextEntry={false}
                          isMultiline={false}
                          name="IBAN"
                        />
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

                      </View>
                    </>
                    : navPicker == 'insurance' ?
                      <>
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
                              paddingHorizontal: 12,
                              flexDirection: "row",
                              alignItems: "center",
                              top: -18,
                              left: 24,
                            }}
                          >

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
                      </>
                      : navPicker == 'membership' ?
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
                        : navPicker == "password" ?
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
                              <Icon name="lock" size={24} />
                              <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                                Password
                              </Title>
                            </View>
                            <FormField
                              Header={"New Password"}
                              img={require("../../assets/icons/password.png")}
                              placeholder={"• • • • • • • •"}
                              password={true}
                              name="newPassword"
                              secureTextEntry={false}
                              isMultiline={false}
                            />
                            <FormField
                              Header={"Confirm Password"}
                              img={require("../../assets/icons/password.png")}
                              placeholder={"• • • • • • • •"}
                              password={true}
                              name="confirmPassword"
                              secureTextEntry={false}
                              isMultiline={false}
                            />
                          </View>
                          :
                          <>

                            <View
                              style={{
                                alignItems: "center",
                                // margin: 8,
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
                                </Title>
                              </View>



                              {/* <Text style={{ marginBottom: 5 }}>ID PaperValidTill: </Text> */}

                              <FormField
                                Header={"Business Name"}
                                img={require("../../assets/icons/membership.png")}
                                placeholder="Business Name"
                                //autoCapitalize="none"
                                secureTextEntry={false}
                                isMultiline={false}
                                name="businessName"
                              />
                              <FormField
                                Header={"Website"}
                                img={require("../../assets/icons/membership.png")}
                                placeholder="Website"
                                //autoCapitalize="none"
                                secureTextEntry={false}
                                isMultiline={false}
                                name="website"
                              />
                              <FormField
                                Header={"Industry"}
                                img={require("../../assets/icons/membership.png")}
                                placeholder="Industry"
                                //autoCapitalize="none"
                                secureTextEntry={false}
                                isMultiline={false}
                                name="industry"
                              />
                              <FormField
                                Header={"Size"}
                                img={require("../../assets/icons/membership.png")}
                                placeholder="Size"
                                //autoCapitalize="none"
                                secureTextEntry={false}
                                isMultiline={false}
                                name="size"
                              />
                              <FormField
                                Header={"Chamber of Commerce No"}
                                img={require("../../assets/icons/membership.png")}
                                placeholder="Chamber of Commerce No"
                                //autoCapitalize="none"
                                secureTextEntry={false}
                                isMultiline={false}
                                name="chamberCommerceNo"
                              />
                              <FormField
                                Header={"Tax Payer No"}
                                img={require("../../assets/icons/membership.png")}
                                placeholder="Tax Payer"
                                //autoCapitalize="none"
                                secureTextEntry={false}
                                isMultiline={false}
                                name="taxPayerNo"
                              />
                              <FormField
                                Header={"Healthcare Organisation"}
                                img={require("../../assets/icons/licensed.png")}
                                placeholder="HPIO"
                                autoCapitalize="none"
                                secureTextEntry={false}
                                isMultiline={false}
                                name="healthcareProviderIdentifierOrganisation"
                              />
                              <FormField
                                Header={"Healthcare Individual"}
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
                                textStyle={{
                                  paddingVertical: 8,
                                  paddingHorizontal: 24,
                                  borderColor: "gray",
                                  borderRadius: 8,
                                  borderWidth: 1,
                                  marginBottom: 15
                                }}
                                name="licenseValidTill"
                                defaultDate="2020-01-01"
                                maxYears="70"
                                minYears="0"
                              //onDateChange={(value) => console.log("Date:", value)}
                              />
                              <View style={{ margin: 15, alignSelf: "flex-start" }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{"Working Hours"} </Text>
                              </View>

                              {timings.map((item,i) => (

                                <WorkingHours index={i} timings={timings} setTimings={setTimings} title={item.title} checked={dayExists(item.title)} />
                              ))}
                             
                            </View>


                          </>
                }
                <SubmitButton txt={_id ? "Update" : "Submit"} />
              </Form>
            </View>

          </View>

        </>
      </KeyboardAwareScrollView>
    </View >
  );

}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
    // height:"100%",
    // height: h("120%"),
    backgroundColor: "#F6F6F6",
    // marginBottom:50,
  },
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
    // height: h("100%"),
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
    // height: h("76%"),
    alignItems: "center",
    marginTop: h("3%"),
    // backgroundColor: 'red',
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
    height: h("11%"),
    alignItems: "center",
    // backgroundColor: 'green',
    marginTop: h("28%"),
  },
  Register: {
    width: "42%",
    height: h("6%"),
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
  picker: {
    // backgroundColor: 'green',
    width: "99%",
    borderBottomColor: "black",
    borderBottomWidth: h("1%"),
  },
  container22: {
    // backgroundColor: '#fff',
    width: "89%",
    height: h("7%"),
    borderRadius: h("1.5%"),
    flexDirection: "row",

    borderBottomColor: "#0005",
    borderBottomWidth: h("0.2%"),
  },
  txtinput: {
    // backgroundColor: 'tomato',
    width: "85%",
    height: h("7%"),
    paddingLeft: h("1.5%"),
    color: "black",
  },

  img22: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  HeaderText: {
    // backgroundColor: 'red',
    width: "83%",
    height: h("2.8%"),
    justifyContent: "center",
    marginLeft: h("1%"),
  },
  HeaderTextf: {
    color: "#0006",
    fontSize: h("2.2%"),
  },
  Topmargin: {
    marginTop: h("4%"),
  },
  navBarContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  navTab: {
    backgroundColor: '#00ACAC',
    padding: 10,
    borderRadius: 5,
    margin: 0.5,
  },
  phoneInput: { height: 64, flexDirection: "row", backgroundColor: 'white', marginTop: 15, borderBottomWidth: 1, borderBottomColor: "#0005" }
});
/**
 *   <View
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
                            <Icon name="clinic" size={24} />
                            <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                             About
                            </Title>
                          </View>

                          <FormField
                            Header={""}
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

                          <Text style={{ marginBottom: 5 }}>Date of Birth: </Text>

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
 */