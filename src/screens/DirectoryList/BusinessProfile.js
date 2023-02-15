import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  Linking,
  Button,
} from "react-native";
import * as Yup from "yup";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import QRCode from "react-native-qrcode-svg";
const deviceWidth = Dimensions.get("window").width;
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
//import SharingInfo from "../../components/SharingInfo/index";
import TabComments from "../../components/TabComments";
import TabNotes from "../../components/TabNotes";
// react native hook
import { useDeviceOrientation } from "@react-native-community/hooks";
// @package
import * as Device from "expo-device";
import Checkbox from "expo-checkbox";
//import DatePickerFuture from "../../components/DatePickerFuture";
import { AirbnbRating } from "react-native-ratings";
import  AppSingleDropdown  from "../../components/forms/AppSingleDropdown";
import { options, actions } from "../../config/pickerElements";
import DropdownActions from "../../components/DropdownActions";
import NavigationDropdown from "../../components/NavigationDropdown";

import TabSharing from "../../components/TabSharing";

import { getClinics } from "../../api/clinics";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Formik, useFormik, Field } from "formik";
import AppTextInput from "../../components/forms/AppTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  ErrorMessage,
  Form,
  FormDatePicker,
  FormField,
  FormPicker,
  FormSingleImagePicker,
  SubmitButton,
} from "../../components/forms";
import { Title } from "react-native-paper";

const { width } = Dimensions.get("screen");
const log = console.log;
// import Header from './components/Header';
export default function BusinessProfile(props) {
  const { landscape } = useDeviceOrientation();
  const [deviceType, setDeviceType] = useState("");
  const [navPicker, setnavPicker] = useState("basic_information");
  const [Actions, setActions] = useState("actions");
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [view, setView] = useState(false);
  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);
  const [counter, setCounter] = useState(1);
  const [components, setComponents] = useState([1]);
  const [accordion1, setAccordion1] = useState(false);
  const [accordion2, setAccordion2] = useState(false);
  const [accordion3, setAccordion3] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const item = props.route?.params?.item;
  const [selectedAppointment, setSelectedAppointment] = useState(item);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [clinic, setClinic] = useState();
  const [clinics, setClinics] = useState();
  const [companyInfo, setCompanyInfo] = useState();
  const [companyAddress, setCompanyAddress] = useState();
  const [companyImage, setCompanyImage] = useState();
  const [companyPhones, setCompanyPhones] = useState();
  const [companyEmail, setCompanyEmail] = useState();
  const [companyWorkingTime, setCompanyWorkingTime] = useState();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "about_me", title: "About me" },
    { key: "adress", title: "Adress" },
    { key: "working_time", title: "Working Time" },
    { key: "business_information", title: "Business Information" },
    { key: "testimonials", title: "Testimonials" },
  ]);
  const [initDatePicker, setInitDatePicker] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );
  const [initStartTime, setInitStartTime] = useState(
    new Date(new Date().getTime())
  );
  const [initEndTime, setInitEndTime] = useState(
    new Date(new Date().getTime() + 15 * 60000)
  );
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [show2, setShow2] = useState(false);
  const [endTime, setEndTime] = useState(null);
  

  const handleSubmit = async () => {
    console.log("Send Request");
  };

  function addComponent() {
    setCounter(counter + 1);
    components.push(counter);
  }

  function removeComponent() {
    components.pop();
    setCounter(counter - 1);
  }

  useEffect(async () => {
    try {
      let device_type = await Device.getDeviceTypeAsync();
      if (device_type === 1) setDeviceType("Mobile");
      else if (device_type === 2) setDeviceType("Tablet");
    } catch (err) {
      log("error", err);
    }
  }, [selectedAppointment]);

  const fetchClinics = async () => {
    await getClinics().then((res) => {
      setClinics(res.data);
      setClinic(res.data[0]);
      setLoading(false);
      console.log(res.data[0]);
    });
  };

  useEffect(() => fetchClinics(), []);

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "white" }} />
  );

  const SecondRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "10%",
            //borderWidth: 1,
          }}
        >
          <Entypo name="location-pin" size={24} color="red" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16 }}>
            {clinic.clinics.Address.address1}
          </Text>
          <Text style={{ fontSize: 16 }}>{clinic.clinics.Address.zip}</Text>
          <Text style={{ fontSize: 16 }}>{clinic.clinics.Address.state}</Text>
          <Text style={{ fontSize: 16 }}>{clinic.clinics.Address.country}</Text>
        </View>
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity>
          <LinearGradient
            colors={["#FF4400", "#FFE043"]}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 7,
              borderRadius: 40,
            }}
            end={{ x: 1.5, y: 0.5 }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {" "}
              Route me to this address{" "}
            </Text>
            <AntDesign name="arrowright" size={16} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            clinic.clinics.phones.phone
              ? Linking.openURL(`tel:${clinic.clinics.phones.phone}`)
              : alert("Not a valid number");
          }}
        >
          <Image
            style={{ width: 18, height: 18, marginRight: 5 }}
            source={require("../../assets/icons/phone.png")}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 16 }}>{clinic.clinics.phones.phone}</Text>
      </View>

      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            clinic.clinics.phones.mobile
              ? Linking.openURL(`tel:${clinic.clinics.phones.mobile}`)
              : alert("Not a valid number");
          }}
        >
          <FontAwesome
            name="mobile-phone"
            size={26}
            color="red"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>{clinic.clinics.phones.mobile}</Text>
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          //flexDirection: "row",
          marginBottom: 5,
          padding: 5,
        }}
      >
        <View
          style={{
            //width: "90%",
            //alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
            padding: 5,
          }}
        >
          <Image
            style={{ width: 15, height: 15, marginRight: 5 }}
            source={require("../../assets/icons/email.png")}
          />
          {/* <MaterialCommunityIcons
                        name="file-document-edit-outline"
                        size={24}
                        color="red"
                      /> */}
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Send an email to clinic
          </Text>
        </View>

        <View style={{ width: "80%", marginLeft: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 0.3,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="user-circle-o"
              size={16}
              color="red"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{ width: "100%" }}
              placeholder="Your Name"
              //value={text}
              //onChangeText={text => setText(text)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 0.3,
              marginBottom: 10,
            }}
          >
            <FontAwesome
              name="envelope-o"
              size={16}
              color="red"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{ width: "100%" }}
              placeholder="Your Email"
              //value={text}
              //onChangeText={text => setText(text)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 0.3,
              marginBottom: 20,
            }}
          >
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={16}
              color="red"
              style={{ marginRight: 10 }}
            />

            <TextInput
              style={{ width: "100%" }}
              placeholder="Message"
              //value={text}
              //onChangeText={text => setText(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          delayPressIn={1000}
          style={{
            alignItems: "center",
            width: "40%",
            padding: 10,
            borderWidth: 1,
            borderColor: "red",
            borderRadius: 50,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "red",
            }}
          >
            Send your mail
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const FourthRoute = () => (
    <View
      style={{ flex: 1, backgroundColor: "white", width: "80%", margin: 20 }}
    >
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Entypo
          name="check"
          size={24}
          color="red"
          style={{ marginRight: 10 }}
        />
        <Text>Membership:</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Entypo
          name="check"
          size={24}
          color="red"
          style={{ marginRight: 10 }}
        />
        <Text>
          {clinic.membership.organizationAMemberNo === undefined
            ? `Membership-Nr: ${clinic.membership.organizationAMemberNo}`
            : `Membership-Nr: 0`}
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Entypo
          name="check"
          size={24}
          color="red"
          style={{ marginRight: 10 }}
        />
        <Text>
          {clinic.professionalInfo.healthcareProviderIdentifierOrganisation ===
          undefined
            ? `Healthcare Provider Identifier Organisation: ${clinic.professionalInfo.healthcareProviderIdentifierOrganisation}`
            : `Healthcare Provider Identifier Organisation: 0`}
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Entypo
          name="check"
          size={24}
          color="red"
          style={{ marginRight: 10 }}
        />
        <Text>
          {clinic.professionalInfo.healthcareProviderIdentifierIndividual ===
          undefined
            ? `Healthcare Provider Identifier Individual: ${clinic.professionalInfo.healthcareProviderIdentifierIndividual}`
            : `Healthcare Provider Identifier Individual: 0`}
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Entypo
          name="check"
          size={24}
          color="red"
          style={{ marginRight: 10 }}
        />
        <Text>
          {`Chamber of Commerce-Nr: ${clinic.companyInfo.chamberCommerceNo}`}
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Entypo
          name="check"
          size={24}
          color="red"
          style={{ marginRight: 10 }}
        />
        <Text>
          {clinic.companyInfo.taxPayerNo === undefined
            ? `Taxpayer-Nr: ${clinic.companyInfo.taxPayerNo}`
            : `Taxpayer-Nr: 0`}
        </Text>
      </View>
    </View>
  );
  const FifthRoute = () => (
    <View style={{ flex: 1, backgroundColor: "white" }} />
  );
  const renderScene = SceneMap({
    about_me: FirstRoute,
    adress: SecondRoute,
    working_time: ThirdRoute,
    business_information: FourthRoute,
    testimonials: FifthRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "red" }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ fontSize: 13, color: "#000", fontWeight: "bold" }}
      scrollEnabled={true}
    />
  );

  if (appointmentModal) {
    return (
      <OperationsAppointment
        visible={appointmentModal}
        setVisible={setAppointmentModal}
        selectedDate={new Date()}
        selectedAppointment={{
          ...item,
          clinicNo: item.clinicNo._id,
          patientNo: item.patientNo._id,
          doctorNo: item.doctorNo._id,
        }}
        setSelectedAppointment={setSelectedAppointment}
        updateAppointments={() => console.log("appointment updated")}
      />
    );
  }
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.TopContainer]}>
          <View style={styles.ContainerForPic}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("DirectoryList");
              }}
              style={styles.TopLeftContianer}
            >
              <Icon
                name={"arrow-back-outline"}
                type="ionicon"
                color="#fff"
                size={35}
              />
            </TouchableOpacity>
            <View style={styles.TopMiddleContianer}>
              <Text style={styles.nameText}>DirectoryList</Text>
            </View>
          </View>
        </View>
        {loading ? null : (
          <View
            //scrollEnabled={true}
            style={{ flex: 1, paddingBottom: 50, overflow: "hidden" }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "40%",
                marginBottom: 10,
                marginTop: 10,
                justifyContent: "space-between",
                marginLeft: 30,
              }}
            >
              <View style={{ width: "100%" }}>
                <Image
                  //source={require("../../assets/icons/email.png")}
                  source={{ uri: clinic.clinics.imageSrc }}
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                />
              </View>
              <View style={{ width: "100%" }}>
                <Text style={{ fontSize: 20 }}>
                  {clinic.companyInfo.businessName}
                </Text>
                <Rating
                  imageSize={12}
                  style={{
                    alignSelf: "flex-start",
                    marginBottom: 5,
                    marginTop: 5,
                  }}
                  readonly={true}
                  startingValue={3}
                />
                <View
                  style={{
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      clinic.clinics.phones.phone
                        ? Linking.openURL(`tel:${clinic.clinics.phones.phone}`)
                        : alert("Not a valid number");
                    }}
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require("../../assets/icons/phone.png")}
                    />
                  </TouchableOpacity>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../../assets/icons/email.png")}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      clinic.clinics.email
                        ? Linking.openURL(`skype:${clinic.clinics.email}?chat`)
                        : alert("Not a valid email");
                    }}
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require("../../assets/icons/skype.png")}
                    />
                  </TouchableOpacity>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../../assets/icons/address.png")}
                  />
                </View>
                <View style={{ margin: 10 }}>
                  <QRCode
                    value={`Qr code value here`}
                    //logoSize={20}
                    logoBackgroundColor="transparent"
                    size={50}
                  />
                </View>
              </View>
            </View>

            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: width }}
              renderTabBar={renderTabBar}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   statusAndPriorityContainer: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "flex-start",
//     justifyContent: "space-around",
//   },
//   CategoryFieldPicker2: {
//     width: "50%",
//     flexDirection: "column",
//   },
// });

const styles = StyleSheet.create({
  textTab: {
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  statusAndPriorityContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  createdAndDeadlineContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  CategoryFieldPicker2: {
    width: "50%",
    flexDirection: "column",
  },
  CategoryFieldPicker3: {
    flexDirection: "row",
    width: "50%",
  },
  CategoryFieldPicker: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerPicker: {
    padding: 10,
    borderColor: "black",
  },

  navTab: {
    backgroundColor: "#00ACAC",
    padding: 10,
    borderRadius: 5,
    margin: 0.5,
  },
  fieldPicker: {
    width: "70%",
    // width: deviceWidth / 1.5,
    borderColor: "#1239",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  navPicker: {
    width: "60%",
    // borderColor: '#1239',
    // borderWidth: 1,
    // borderRadius: 5,
    padding: 5,
  },
  navBarContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingBottom: 20,
  },
  assignedTO: {
    paddingLeft: 10,
    borderColor: "#1239",
    borderWidth: 0.8,
    width: deviceWidth / 2 + 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  assignedTOContainer: {
    width: deviceWidth / 1.5,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    justifyContent: "space-between",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#1239",
  },
  //
  //

  TopContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
    //height: h("8%"),
    alignItems: "center",
  },
  ContainerForPic: {
    // backgroundColor: "red",
    width: "100%",
    height: h("6%"),
    flexDirection: "row",
    marginTop: h("1%"),
    paddingLeft: h("2%"),
    paddingRight: h("3%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "90%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  TopRightContianer: {
    // backgroundColor: 'tomato',
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgRenderDesgin: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 110 / 2,
  },
  nameText: {
    fontSize: h("2.5%"),
    fontWeight: "bold",
    color: "white",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 5,
    width: "100%",
  },

  // lowerContaierFlatlist: {

  //   backgroundColor: "#F6F6F6",
  //   width: "100%",
  //   height: h("120%"),
  //   alignItems: "center",
  // },
  flatlistContainer: {
    // backgroundColor: 'tomato',
    backgroundColor: "white",
    // flex: 1,
    width: w("94%"),
    //height: h("40%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    // overflow: "hidden",
    elevation: 1,
  },
  flatlistContainer4: {
    // backgroundColor: "green",
    backgroundColor: "white",
    width: w("90%"),
    height: h("30%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    // overflow: "hidden",
    // elevation: h('0.1%'),
  },
  flatlistContainer2: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("30%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    // overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange"
  },
  flatlistContainer3: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("43%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    // overflow: "hidden",
    alignItems: "center",
    // elevation: h('0.1%'),
  },

  Flatlist: {
    // backgroundColor: '#f2f2',
    alignItems: "center",
  },
  FlatListTopView: {
    // backgroundColor: 'purple',
    width: "100%",
    height: h("5%"),
    alignItems: "flex-end",
  },
  FlatListMiddleView: {
    // backgroundColor: 'pink',
    width: "100%",
    height: h("14%"),
    paddingVertical: "2%",
    flexDirection: "row",
  },
  FlatListBottomView: {
    // backgroundColor: 'green',
    width: "100%",
    height: h("6%"),
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: h("1.5%"),
    paddingVertical: h("2%"),
  },
  ItemContainer: {
    backgroundColor: "#003C75",
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ItemContainer2: {
    backgroundColor: "#3DC03A",
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemAppoinment: {
    color: "white",
    fontSize: h("2%"),
  },
  FlatlistMiddleLeft: {
    // backgroundColor: 'red',
    width: "24%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  FlatlistMiddleMiddle: {
    // backgroundColor: 'gold',
    width: "75%",
    height: "100%",
  },
  ProfileImg: {
    // backgroundColor: 'white',
    width: 75,
    height: 75,
    borderRadius: 110 / 2,
  },
  imge: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  Itemname: {
    color: "black",
    fontSize: h("3%"),
  },
  ItemTime: {
    color: "#003C75",
    fontSize: h("2.2%"),
    fontWeight: "bold",
  },
  ItemTime3: {
    color: "#D0021B",
    fontSize: h("2.2%"),
    fontWeight: "bold",
  },
  ItemSpecilist: {
    color: "#0006",
    fontSize: h("2%"),
  },
  ItemTime2: {
    color: "#0006",
    fontSize: h("2%"),
  },
  Buttons: {
    width: "45%",
    height: h("5%"),
    // borderColor: "blue",
    // borderWidth: 1,
    // borderRadius: h("12%"),
    flexDirection: "row",
    alignItems: "center",
  },
  Buttonicons: {
    height: "50%",
    width: "40%",
    // backgroundColor: "red",
    resizeMode: "contain",
  },
  ButtonText: {
    fontSize: h("2%"),
    color: "#003C75",
  },
  DocDetails: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("8%"),
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  DetailsContainer: {
    // backgroundColor: 'gold',
    width: "100%",
    height: h("10%"),
    paddingLeft: h("1.5%"),
    justifyContent: "center",
  },
  DetailsContainer3: {
    // backgroundColor: 'green',
    width: "100%",
    height: h("16%"),

    justifyContent: "center",
  },
  DetailsContainer2: {
    // backgroundColor: 'gold',
    width: "100%",
    height: h("5%"),
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  DocText: {
    color: "black",
    fontSize: h("3%"),
    fontWeight: "bold",
  },
  DocTextabc: {
    textTransform: "capitalize",
    color: "black",
    fontSize: h("2.2%"),
  },
  uploadContainer: {
    backgroundColor: "white",
    width: "90%",
    height: h("10%"),
    flexDirection: "row",
    borderRadius: h("1%"),
    marginTop: h("2%"),
  },
  leftContainer: {
    // backgroundColor: 'gold',
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  RightContainer: {
    // backgroundColor: 'red',
    width: "60%",
    height: "100%",
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  leftbContainer: {
    // backgroundColor: 'orange',
    width: "20%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  Uploadtext: {
    color: "#000",
    fontSize: h("2.5%"),
  },
  icons: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  icons2: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  paymentSlip: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("4%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  PaymentHeader: {
    color: "#0007",
    fontSize: h("2.5%"),
  },
  PaymentChild: {
    color: "#000",
    fontSize: h("2.2%"),
  },
  //---------------
  statusAndPriorityContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  createdAndDeadlineContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  CategoryFieldPicker2: {
    width: "50%",
    flexDirection: "column",
  },
  CategoryFieldPicker3: {
    flexDirection: "row",
    width: "50%",
  },
  CategoryFieldPicker: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerPicker: {
    padding: 10,
    borderColor: "black",
  },
  attachmentContainer: {
    width: "32%",
    height: 80,
    borderWidth: 0.8,
    borderColor: "#1239",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  navTab: {
    backgroundColor: "#00ACAC",
    padding: 10,
    borderRadius: 5,
    margin: 0.5,
  },
  fieldPicker: {
    width: "70%",
    // width: deviceWidth / 1.5,
    borderColor: "#1239",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  navPicker: {
    width: "60%",
    borderColor: "#1239",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  navBarContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  assignedTO: {
    paddingLeft: 10,
    borderColor: "#1239",
    borderWidth: 0.8,
    width: deviceWidth / 2 + 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  assignedTOContainer: {
    width: deviceWidth / 1.5,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    justifyContent: "space-between",
  },
  headingContainer: {
    marginVertical: 10,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});