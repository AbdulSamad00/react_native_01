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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import QRCode from "react-native-qrcode-svg";
const deviceWidth = Dimensions.get("window").width;
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import SharingInfo from "../../components/SharingInfo/index";
import TabComments from "../../components/TabComments";
import TabNotes from "../../components/TabNotes";
// react native hook
import { useDeviceOrientation } from "@react-native-community/hooks";
// @package
import * as Device from "expo-device";
import Checkbox from "expo-checkbox";
import DatePickerFuture from "../../components/DatePickerFuture";
import { AirbnbRating } from "react-native-ratings";
import AppSingleDropdown from "../../components/forms/AppSingleDropdown";
import { options, actions } from "../../config/pickerElements";
import DropdownActions from "../../components/DropdownActions";
import moment from "moment";
import NavigationDropdown from "../../components/NavigationDropdown";
import OperationsAppointment from "./OperationsAppointment";

export default  AppointmentProfile = (props) =>  {
  
  const { landscape } = useDeviceOrientation();
  const [deviceType, setDeviceType] = useState("");
  const [navPicker, setnavPicker] = useState("basic_information");
  const [Actions, setActions] = useState("actions");
  const [date, setDate] = useState(new Date());
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
  const [selectedAppointment, setSelectedAppointment] = useState(props.route?.params?.item);

  function addComponent() {
    setCounter(counter + 1);
    components.push(counter);
  }

  function removeComponent() {
    components.pop();
    setCounter(counter - 1);
  }

  let phoneNumber = selectedAppointment?.clinicNo?.user?.phones?.phone;
  let username = selectedAppointment?.clinicNo?.user?.phones?.skype;

  useEffect(async () => {
    try {
      let device_type = await Device.getDeviceTypeAsync();
      if (device_type === 1) setDeviceType("Mobile");
      else if (device_type === 2) setDeviceType("Tablet");
    } catch (err) {
      console.log("error", err);
    }
  }, [selectedAppointment]);
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
        {/* Header */}
        <View style={[styles.TopContainer]}>
          <View style={styles.ContainerForPic}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
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
              <Text style={styles.nameText}>
                Appointment of {setSelectedAppointment?.name}
              </Text>
            </View>
          </View>
        </View>
        {/* Header */}
        <ScrollView
          scrollEnabled={true}
          style={{ flex: 1, paddingBottom: 50, overflow: "hidden" }}
        >
          {/* nav bar */}
          <View style={[styles.navBarContainer]}>
            {deviceWidth < 800 ? (
              <View style={{ width: "59%" }}>
                <NavigationDropdown
                  options={options}
                  onChange={(val) => setnavPicker(val)}
                />
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: "#FFC69F" }]}
                  onPress={() => setnavPicker("basic_information")}
                >
                  <Text>Basic Information</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: "#DED99F" }]}
                >
                  <Text>Data Spreadsheet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setnavPicker("comments")}
                  style={[styles.navTab, { backgroundColor: "#FFC6FF" }]}
                >
                  <Text>Comments</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: "#FFF5AD" }]}
                >
                  <Text>Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: "#A2F5AD" }]}
                  onPress={() => setnavPicker("sharing")}
                >
                  <Text>Sharing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setnavPicker("notes")}
                  style={[styles.navTab, { backgroundColor: "#FFFFC9" }]}
                >
                  <Text>Notes</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ width: "38%" }}>
              <DropdownActions
                value={Actions}
                onChange={(val) => {
                  setActions(val);
                  val == "edit" ? setAppointmentModal(true) : null;
                }}
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            {navPicker == "basic_information" ? (
              <>
                <View>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      Basic Information
                    </Text>
                  </View>

                  <View style={styles.flatlistContainer}>
                    <View style={styles.FlatListTopView}>
                      <View style={styles.ItemContainer}>
                        <Text
                          style={[
                            styles.itemAppoinment,
                            { textTransform: "capitalize" },
                          ]}
                        >
                          {selectedAppointment?.status
                            ? selectedAppointment?.status
                            : ""}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.DocDetails}>
                      <Text style={styles.DocText}>
                        Clinic :{" "}
                        {
                          selectedAppointment?.clinicNo?.companyInfo
                            ?.businessName
                        }
                      </Text>
                    </View>
                    <View style={[styles.FlatListMiddleView]}>
                      <View style={styles.FlatlistMiddleLeft}>
                        <View style={styles.ProfileImg}>
                          <Image
                            style={styles.imge}
                            source={{
                              uri: selectedAppointment?.clinicNo?.user?.imageSrc,
                            }}
                          />
                        </View>
                      </View>

                      <View style={[styles.DetailsContainer, { width: "75%" }]}>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingRight: 7,
                          }}
                        >
                          <View>
                            <Text style={styles.DocTextabc}>
                              Date :{selectedAppointment?.start?.split("T")[0]}
                            </Text>
                            <Text style={styles.DocTextabc}>
                              {moment(selectedAppointment?.start)?.format(
                                "hh:mm A"
                              )}{" "}
                              -{" "}
                              {moment(selectedAppointment?.end).format(
                                "hh:mm A"
                              )}{" "}
                            </Text>
                            <Text style={styles.DocTextabc}>
                              {selectedAppointment?.Appointment_Type}
                            </Text>
                            <Text style={styles.DocTextabc}>
                              {selectedAppointment?.Session_Type}{" "}
                            </Text>
                          </View>
                          <QRCode
                            size={50}
                            value={
                              props?.route?.params?.selectedAppt?.share?.link
                            }
                            logoSize={50}
                            logoBackgroundColor="transparent"
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.FlatListBottomView]}>
                      <TouchableOpacity
                        onPress={() => {
                          phoneNumber
                            ? Linking.openURL(`tel:${phoneNumber}`)
                            : alert("Not a valid number");
                        }}
                        style={[styles.Buttons, { width: "15%" }]}
                      >
                        <Image
                          style={styles.imge}
                          source={require("../../assets/icons/phone.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          phoneNumber
                            ? Linking.openURL(`tel:${phoneNumber}`)
                            : alert("Not a valid number");
                        }}
                        style={[
                          styles.Buttons,
                          { marginLeft: h("1%"), width: "15%" },
                        ]}
                      >
                        <Image
                          style={styles.imge}
                          source={require("../../assets/icons/mobile.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          phoneNumber
                            ? Linking.openURL(`skype:${username}?chat`)
                            : alert("Not a valid number");
                        }}
                        style={[
                          styles.Buttons,
                          { marginLeft: h("1%"), width: "15%" },
                        ]}
                      >
                        <Image
                          style={styles.imge}
                          source={require("../../assets/icons/skype.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.Buttons,
                          { marginLeft: h("1%"), width: "15%" },
                        ]}
                      >
                        <Image
                          style={styles.imge}
                          source={require("../../assets/icons/videochat.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setnavPicker("comments")}
                        style={[
                          styles.Buttons,
                          { marginLeft: h("1%"), width: "15%" },
                        ]}
                      >
                        <Image
                          style={styles.imge}
                          source={require("../../assets/icons/comment.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.Buttons,
                          { marginLeft: h("1%"), width: "15%" },
                        ]}
                      >
                        <Image
                          style={styles.imge}
                          source={require("../../assets/icons/address.png")}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.DocDetails]}>
                      <Text style={styles.DocText}>
                        Patient :
                        <Text
                          style={[
                            styles.DocText,
                            { textTransform: "capitalize" },
                          ]}
                        >
                          {" "}
                          {selectedAppointment?.name}
                        </Text>
                      </Text>
                    </View>
                    <View style={[styles.FlatListMiddleView]}>
                      <View style={styles.FlatlistMiddleLeft}>
                        <View style={styles.ProfileImg}>
                          <Image
                            style={[styles.imge, { borderRadius: 50 }]}
                            source={{ uri: selectedAppointment?.image }}
                          />
                        </View>
                      </View>
                      <View style={styles.DetailsContainer}>
                        <Text style={styles.DocTextabc}>
                          {selectedAppointment?.name}{" "}
                        </Text>
                        <Text style={styles.DocTextabc}>
                          {selectedAppointment?.gender}{" "}
                        </Text>
                        <Text style={styles.DocTextabc}>
                          {moment().diff(
                            selectedAppointment?.dateBirth,
                            "years"
                          )}{" "}
                          Years Old
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.DocDetails}>
                        <Text style={styles.DocText}>Complaint</Text>
                      </View>
                      <View style={styles.DetailsContainer}>
                        <Text style={styles.DocTextabc}>
                          {selectedAppointment?.title}{" "}
                        </Text>
                      </View>

                      <View style={[styles.DocDetails]}>
                        <Text style={styles.DocText}>
                          Doctor/Therapist :
                          <Text
                            style={[
                              styles.DocText,
                              { textTransform: "capitalize" },
                            ]}
                          >
                            {selectedAppointment?.doctorNo?.user?.contactName
                              ?.first +
                              " " +
                              selectedAppointment?.doctorNo?.user?.contactName
                                ?.last}
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.FlatListMiddleView,
                          { flexDirection: "row" },
                        ]}
                      >
                        <View style={styles.FlatlistMiddleLeft}>
                          <View style={styles.ProfileImg}>
                            <Image
                              style={[styles.imge, { borderRadius: 50 }]}
                              source={{
                                uri: selectedAppointment?.doctorNo?.user
                                  .imageSrc,
                              }}
                            />
                          </View>
                        </View>
                        <View style={styles.FlatlistMiddleLeft}> 
                          <Text style={styles.ItemSpecilist}>Cardiologist </Text> 
                          <View style={styles.FlatlistMiddleMiddle}>
                            <Text style={styles.Itemname}>{`${selectedAppointment?.doctorNo?.user.contactName.first}  ${selectedAppointment?.doctorNo?.user.contactName.last}`}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.FlatListBottomView]}>
                      <TouchableOpacity
                        style={[styles.Buttons, { width: "28%" }]}
                      >
                        <Image
                          style={styles.imge}
                          source={require("../../assets/icons/homeosession.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.Buttons,
                          { marginLeft: h("1%"), width: "28%" },
                        ]}
                      >
                        <Image
                          style={styles.imge}
                          source={require("../../assets/icons/invoice.jpg")}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.flatlistContainer4}>
                      <View style={styles.FlatListTopView}>
                        <View style={styles.ItemContainer2}>
                          <Text style={styles.itemAppoinment}>Invoiced</Text>
                        </View>
                      </View>
                      <View style={styles.DocDetails}>
                        <Text style={styles.DocText}>Payment Details</Text>
                      </View>

                      <View style={styles.DetailsContainer3}>
                        <View style={styles.paymentSlip}>
                          <Text style={styles.PaymentHeader}>Amount</Text>
                          <Text style={styles.PaymentHeader}>
                            Payment Method
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.paymentSlip,
                            { paddingRight: h("2%") },
                          ]}
                        >
                          <Text
                            style={[
                              styles.PaymentChild,
                              { marginRight: h("5%") },
                            ]}
                          >
                            ₹100.00
                          </Text>
                          <TouchableOpacity style={styles.Buttons}>
                            <Image
                              style={styles.Buttonicons}
                              source={require("../../assets/icons/payment2.png")}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.paymentSlip}>
                          <Text style={styles.PaymentHeader}>
                            Transaction Id
                          </Text>
                          <Text style={styles.PaymentHeader}>
                            Transaction Date & Time
                          </Text>
                        </View>
                        <View style={styles.paymentSlip}>
                          <Text style={styles.PaymentChild}>22124009800</Text>
                          <Text style={styles.PaymentChild}>
                            04/15/2020 10:30 AM
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            ) : navPicker == "comments" ? (
              <>
                <TabComments navigation={props.navigation} />
              </>
            ) : navPicker == "notes" ? (
              <>
                <TabNotes navigation={props.navigation} />
              </>
            ) : navPicker == "attachments" ? (
              <>
                <View>
                  <TouchableOpacity
                    style={[styles.Buttons, { marginLeft: h("1%") }]}
                  >
                    <Image
                      style={styles.Buttonicons}
                      source={require("../../assets/icons/import.png")}
                    />
                    <Text style={styles.ButtonText}>Upload</Text>
                  </TouchableOpacity>

                  <View style={styles.flatlistContainer2}>
                    <View style={styles.DocDetails}>
                      <Text style={styles.DocText}>Documents & Reports</Text>

                      <TouchableOpacity style={styles.uploadContainer}>
                        <View style={styles.leftContainer}>
                          <Image
                            style={styles.icons}
                            source={require("../../assets/doc.png")}
                          />
                        </View>
                        <View style={styles.RightContainer}>
                          <Text style={styles.Uploadtext}>Upload File</Text>
                        </View>
                        <View style={styles.leftbContainer}>
                          <Image
                            style={styles.icons2}
                            source={require("../../assets/eye.png")}
                          />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.uploadContainer}>
                        <View style={styles.leftContainer}>
                          <Image
                            style={styles.icons}
                            source={require("../../assets/doc.png")}
                          />
                        </View>
                        <View style={styles.RightContainer}>
                          <Text style={styles.Uploadtext}>Upload File</Text>
                        </View>
                        <View style={styles.leftbContainer}>
                          <Image
                            style={styles.icons2}
                            source={require("../../assets/eye.png")}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.flatlistContainer3}>
                    <View style={styles.DocDetails}>
                      <Text style={styles.DocText}>Prescriptions</Text>
                    </View>
                    <TouchableOpacity style={styles.uploadContainer}>
                      <View style={styles.leftContainer}>
                        <Image
                          style={styles.icons}
                          source={require("../../assets/doc.png")}
                        />
                      </View>
                      <View style={styles.RightContainer}>
                        <Text style={styles.Uploadtext}>Upload File</Text>
                      </View>
                      <View style={styles.leftbContainer}>
                        <Icon
                          name={"close-outline"}
                          type="ionicon"
                          color="#E93030"
                          size={35}
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.uploadContainer}>
                      <View style={styles.leftContainer}>
                        <Image
                          style={styles.icons}
                          source={require("../../assets/doc.png")}
                        />
                      </View>
                      <View style={styles.RightContainer}>
                        <Text style={styles.Uploadtext}>Upload File</Text>
                      </View>
                      <View style={styles.leftbContainer}>
                        <Icon
                          name={"close-outline"}
                          type="ionicon"
                          color="#E93030"
                          size={35}
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.uploadContainer}>
                      <View style={styles.leftContainer}>
                        <Image
                          style={styles.icons}
                          source={require("../../assets/u.png")}
                        />
                      </View>
                      <View style={styles.RightContainer}>
                        <Text style={styles.Uploadtext}>Upload File</Text>
                      </View>
                      <View style={styles.leftbContainer}></View>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : navPicker == "reviews" ? (
              <>
                <View height={"100%"}>
                  <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Reviews</Text>
                  </View>
                  <View>
                    <AirbnbRating reviews={["😟", "🙂", "🙂", "😀", "😀"]} />
                  </View>
                </View>
              </>
            ) : (
              navPicker == "sharing" && (
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      Share with others
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: Dimensions.get("screen").width * 0.8,
                        marginTop: 20,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: "45%",
                          backgroundColor: "green",
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          Copy sharing link
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: "45%",
                          backgroundColor: "#49B6D6",
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                        onPress={() => addComponent()}
                      >
                        <Text style={{ color: "white" }}>Add User/Email</Text>
                      </TouchableOpacity>
                    </View>
                    {components.map((component) => (
                      <View
                        key={component}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 30,
                          width: "100%",
                        }}
                      >
                        {counter > 1 && (
                          <TouchableOpacity
                            style={{
                              width: "45%",
                              backgroundColor: "red",
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30,
                            }}
                            onPress={() => removeComponent()}
                          >
                            <Text style={{ color: "white" }}>Delete</Text>
                          </TouchableOpacity>
                        )}
                        <SharingInfo />
                      </View>
                    ))}

                    <TouchableOpacity
                      style={{
                        width: "45%",
                        backgroundColor: "#49B6D6",
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 30,
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ color: "white" }}>Send invitation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: Dimensions.get("screen").width,
                        height: 50,
                        backgroundColor: "black",
                        marginTop: 20,
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                      onPress={() => setAccordion1(!accordion1)}
                    >
                      <Text style={{ color: "white", marginLeft: 10 }}>
                        Access Control List
                      </Text>
                    </TouchableOpacity>
                    {accordion1 && (
                      <>
                        <View
                          style={{
                            width: "70%",
                            height: 50,
                            backgroundColor: "#c4c4c4",
                            borderRadius: 30,
                            paddingLeft: 10,
                            marginTop: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            User: Dr. No
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "70%",
                            height: 50,
                            backgroundColor: "#c4c4c4",
                            borderRadius: 30,
                            paddingLeft: 10,
                            marginTop: 20,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            Email: info@gmail.com
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "80%",
                            alignSelf: "center",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "25%",
                              alignItems: "center",
                            }}
                          >
                            <Checkbox
                              value={view}
                              onValueChange={setView}
                              style={{ marginRight: 10 }}
                            />
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                marginTop: 10,
                                marginBottom: 10,
                              }}
                            >
                              View
                            </Text>
                          </View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "25%",
                              alignItems: "center",
                            }}
                          >
                            <Checkbox
                              value={comment}
                              onValueChange={setComment}
                              style={{ marginRight: 10 }}
                            />
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                marginTop: 10,
                                marginBottom: 10,
                              }}
                            >
                              Comment
                            </Text>
                          </View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "25%",
                              alignItems: "center",
                            }}
                          >
                            <Checkbox
                              value={edit}
                              onValueChange={setEdit}
                              style={{ marginRight: 10 }}
                            />
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                marginTop: 10,
                                marginBottom: 10,
                              }}
                            >
                              Edit
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => setShowCalendar(!showCalendar)}
                            style={{
                              marginTop: 20,
                              width: "30%",
                              height: 40,
                              backgroundColor: "black",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30,
                            }}
                          >
                            <Text style={{ color: "white" }} >Share Till</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              marginTop: 20,
                              width: "30%",
                              height: 40,
                              backgroundColor: "red",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30,
                            }}
                          >
                            <Text style={{ color: "white" }} >Delete</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              marginTop: 20,
                              width: "30%",
                              height: 40,
                              backgroundColor: "green",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30,
                            }}
                          >
                            <Text style={{ color: "white" }} >Submit</Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: "90%",
                          }}
                        >
                          {showCalendar && (
                            <DatePickerFuture
                              testID="dateTimePicker"
                              value={date}
                              mode={"date"}
                              display="default"
                              onChange={(e, selectedDate) => {
                                const currentDate = selectedDate || date;
                                setShowCalendar(Platform.OS === "ios");
                                setDate(currentDate);
                              }}
                            />
                          )}
                        </View>
                      </>
                    )}
                    <TouchableOpacity
                      style={{
                        width: Dimensions.get("screen").width,
                        height: 50,
                        backgroundColor: "black",
                        marginTop: 20,
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                      onPress={() => setAccordion2(!accordion2)}
                    >
                      <Text style={{ color: "white", paddingLeft: 10 }}>
                        Publicity
                      </Text>
                    </TouchableOpacity>
                    {accordion2 && (
                      <View style={{ width: "100%" }}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "95%",
                            alignItems: "center",
                            marginTop: 20,
                          }}
                        >
                          <FontAwesome5
                            name="dot-circle"
                            size={24}
                            color="#D5DBE0"
                          />
                          <Text style={{ marginLeft: 10, color: "black" }}>
                            Only users linsted in Access Control List haave
                            access
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "95%",
                            alignItems: "center",
                            marginTop: 20,
                          }}
                        >
                          <FontAwesome5
                            name="dot-circle"
                            size={24}
                            color="#7FD5D5"
                          />
                          <Text style={{ marginLeft: 10, color: "#7FD5D5" }}>
                            Publish over the world
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "95%",
                            alignItems: "center",
                            marginTop: 20,
                          }}
                        >
                          <FontAwesome5
                            name="dot-circle"
                            size={24}
                            color="#FFADAB"
                          />
                          <Text style={{ marginLeft: 10, color: "#FFADAB" }}>
                            Access by having link for everyone
                          </Text>
                        </View>
                      </View>
                    )}
                    <TouchableOpacity
                      style={{
                        width: Dimensions.get("screen").width,
                        height: 50,
                        backgroundColor: "black",
                        marginTop: 20,
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                      onPress={() => setAccordion3(!accordion3)}
                    >
                      <Text style={{ color: "white", paddingLeft: 10 }}>
                        Settings
                      </Text>
                    </TouchableOpacity>
                    {accordion3 && (
                      <View
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "90%",
                          alignSelf: "center",
                          marginTop: 20,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "50%",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            value={check1}
                            onValueChange={setCheck1}
                            style={{ marginRight: 10 }}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            Allow viewers to download, save, copy
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "50%",
                            alignItems: "center",
                            marginTop: 20,
                          }}
                        >
                          <Checkbox
                            value={check2}
                            onValueChange={setCheck2}
                            style={{ marginRight: 10 }}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            Checkbox level 2
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </>
              )
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: "#1239",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  navPicker: {
    width: "60%",
    padding: 5,
  },
  navBarContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
    height: h("8%"),
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
    width: w('80%'),
    height: "110%",
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

  flatlistContainer: {
    backgroundColor: "white",
    width: w("94%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    elevation: 1,
  },
  flatlistContainer4: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("30%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
  },
  flatlistContainer2: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("30%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistContainer3: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("43%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    alignItems: "center",
  },

  Flatlist: {
    alignItems: "center",
  },
  FlatListTopView: {
    width: "100%",
    height: h("5%"),
    alignItems: "flex-end",
  },
  FlatListMiddleView: {
    width: "100%",
    height: h("14%"),
    paddingVertical: "2%",
    flexDirection: "row",
  },
  FlatListBottomView: {
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
    borderRadius: 10,
    margin: 10
  },
  ItemContainer2: {
    backgroundColor: "#3DC03A",
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  itemAppoinment: {
    color: "white",
    fontSize: h("2%"),
  },
  FlatlistMiddleLeft: {
    width: "24%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  FlatlistMiddleMiddle: {
    width: "75%",
    height: "100%",
  },
  ProfileImg: {
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
    flexDirection: "row",
    alignItems: "center",
  },
  Buttonicons: {
    height: "50%",
    width: "40%",
    resizeMode: "contain",
  },
  ButtonText: {
    fontSize: h("2%"),
    color: "#003C75",
  },
  DocDetails: {
    width: "100%",
    height: h("8%"),
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  DetailsContainer: {
    width: "100%",
    height: h("10%"),
    paddingLeft: h("1.5%"),
    justifyContent: "center",
  },
  DetailsContainer3: {
    width: "100%",
    height: h("16%"),
    justifyContent: "center",
  },
  DetailsContainer2: {
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
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  RightContainer: {
    width: "60%",
    height: "100%",
    paddingLeft: h("2%"),
    justifyContent: "center",
  },
  leftbContainer: {
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