import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
  ActionSheetIOS,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import QRCode from "react-native-qrcode-svg";
const deviceWidth = Dimensions.get("window").width;
import { h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
// react native hook
import { useDeviceOrientation } from "@react-native-community/hooks";
// @package
import * as Device from "expo-device";
import Checkbox from "expo-checkbox";
import DatePickerFuture from "../../components/DatePickerFuture";
import { AirbnbRating } from "react-native-ratings";
import  AppSingleDropdown  from "../../components/forms/AppSingleDropdown";
import { options, actions } from "../../config/pickerElements";
import NavigationDropdown from "../../components/NavigationDropdown";
import SharingInfo from "../../components/SharingInfo/index";
import TabComments from "../../components/TabComments";
import TabSharing from "../../components/TabSharing";
import DropdownActions from "../../components/DropdownActions";
import TabNotes from "../../components/TabNotes";
import {
  categoryOptions,
  priorityOptions,
  statusOptions,
} from "../../config/pickerElements";
import * as Yup from "yup";
import moment from "moment";
import Fishbone from "../../components/Fishbone.js";
import { Box } from "native-base";
import * as ImagePicker from 'expo-image-picker';

// import Header from './components/Header';

export default function TicketProfile(props) {
  //console.log("ticket id "+ props?.route?.params.ticket+" "+props?.route?.params.selectedTicket._id)
  const idTicket =
    props?.route?.params.selectedTicket._id || props?.route?.params.ticket;

  const activeTab = props?.route?.params?.activeTab;
  const selectedTicket = props.route.params.selectedTicket;
  //console.log(selectedTicket, "----");
  const { landscape } = useDeviceOrientation();
  const [deviceType, setDeviceType] = useState("");
  const [navPicker, setnavPicker] = useState(
    activeTab ? activeTab : "basic_information"
  );
  const [Actions, setActions] = useState("edit");
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
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: selectedTicket ? selectedTicket.user?.contactName.first : "",
    category: selectedTicket ? selectedTicket.category : "",
    subCategory: selectedTicket ? selectedTicket.subCategory : "",
    priority: selectedTicket ? selectedTicket.priority : "",
    department: selectedTicket ? selectedTicket.department : "",
    subDepartment: "",
    locations: "",
    createdOn: new Date(),
    deadline: new Date(),
    documentNo: "",
    field: "",
    tags: "",
    reference: "",
    note: "",
    status: "",
    narrative: "",
  });
  Basic_OPTIONS = [
    "Cancel",
    "Basic information",
    "Comments",
    "Reviews",
    "Sharing",
    "Attachments",
    "Notes",
    "Fishbone",
  ];
  Actions_OPTIONS = [
    "Cancel",
    "Edit",
    "Print",
    "Share",
    "Archive",
    "Save",
    "Save as PDF",
    "Save as XML",
    "Save as CSV",
  ];
  Category_OPTIONS = [
    "Cancel",
    "Category",
    "Disconect",
    "Bug-Error",
    "Feature-Request",
    "Sales",
    "Complaint",
    "Orders",
    "Other",
  ];
  Priority_OPTIONS = ["Cancel", "High", "Normal", "Low", "Urgent"];
  Status_OPTIONS = ["Cancel", "New", "Onhold", "Archived", "Reopen"];
  useEffect(() => {
    setForm({
      ...selectedTicket,
      createdOn: moment(selectedTicket.createdOn).format("YYYY-MM-DD"),
      deadline: moment(selectedTicket.deadline).format("YYYY-MM-DD"),
    });
  }, [selectedTicket]);
  const onChangeText = (type, value) => {
    setForm({
      ...form,
      [`${type}`]: value,
    });
  };

  function addComponent() {
    setCounter(counter + 1);
    components.push(counter);
  }

  function removeComponent() {
    components.pop();
    setCounter(counter - 1);
  }
  const getDeviceType = async () => {
    try {
      let device_type = await Device.getDeviceTypeAsync();
      if (device_type === 1) setDeviceType("Mobile");
      else if (device_type === 2) setDeviceType("Tablet");
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    getDeviceType();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.TopContainer}>
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
              <Text style={styles.nameText}>{selectedTicket.name}</Text>
            </View>
          </View>
        </View>
        {/* Header */}

        <ScrollView scrollEnabled={true} style={{ marginBottom: 130 }} key={2}>
          <View style={styles.navBarContainer}>
            {/* nav bar */}
            {deviceWidth < 800 ? (
              <View style={styles.navPicker}>
                {Platform.OS === "android" ? (
                  <NavigationDropdown
                    onChange={(val) => setnavPicker(val)}
                    value={navPicker}
                    options={options}
                    key={1}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => {
                      ActionSheetIOS.showActionSheetWithOptions(
                        {
                          options: Basic_OPTIONS,
                          cancelButtonIndex: 0,
                          userInterfaceStyle: "dark",
                        },
                        (buttonIndex) => {
                          if (buttonIndex === 0) {
                            // cancel action
                          } else {
                            setnavPicker(Basic_OPTIONS[buttonIndex]);
                          }
                        }
                      );
                    }}
                  >
                    <Text style={styles.textStyle}>{navPicker}</Text>
                  </TouchableOpacity>
                )}
                {/* <Picker
                  mode={'dropdown'}
                  style={[styles.headerPicker]}
                  selectedValue={navPicker}
                  onValueChange={(itemValue, itemIndex) =>
                    setnavPicker(itemValue)
                  }
                >
                  <Picker.Item
                    label="Select Options"
                    value=""
                    key={'unselectable'}
                  />
                  <Picker.Item color={'#E911DB'} label="Basic Information" value="basic_information"
                  />
                  <Picker.Item
                    color={'#8411E9'}
                    label=" Data Spreadsheet"
                    value="data_spreadsheet"
                  />
                  <Picker.Item color={'#1F11E9'} label="Comments" value="comments"
                  />
                  <Picker.Item color={'#11A8E9'} label="Reviews" value="reviews" />
                  <Picker.Item color={'#11E9BE'} label="Sharing" value="sharing" />
                  <Picker.Item color={'#11E93C'} label="Notes" value="notes" />
                  <Picker.Item color={'#d2e738'} label="Fishbone" value="fishbone" />
                  <Picker.Item color={'#e7387a'} label="Piechart" value="piechart" />
                </Picker> */}
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
                  style={[styles.navTab, { backgroundColor: "#FFFFC9" }]}
                >
                  <Text>Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: "#F4FF2B" }]}
                  onPress={() => setnavPicker("fishbone")}
                >
                  <Text>Fishbone</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navTab, { backgroundColor: "#B09EFF" }]}
                >
                  <Text>Piechart</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ width: "35%" }}>
              {Platform.OS === "android" ? (
                <DropdownActions
                  value={Actions}
                  onChange={(val) => setActions(val)}
                />
              ) : (
                <TouchableOpacity
                  style={styles.touchableStyle}
                  onPress={() => {
                    ActionSheetIOS.showActionSheetWithOptions(
                      {
                        options: Actions_OPTIONS,
                        cancelButtonIndex: 0,
                        userInterfaceStyle: "dark",
                      },
                      (buttonIndex) => {
                        if (buttonIndex === 0) {
                          // cancel action
                        } else {
                          setActions(Actions_OPTIONS[buttonIndex]);
                        }
                      }
                    );
                  }}
                >
                  <Text style={styles.textStyle}>{actions}</Text>
                </TouchableOpacity>
              )}

              {/* <AppSingleDropdown
              title=""
              placeholder="Actions"
              options={actions}
              onChange={val=> setActions(val)}
            /> */}
              {/* <Picker
                style={styles.headerPicker}
                selectedValue={Actions}
                onValueChange={(itemValue, itemIndex) => setActions(itemValue)}
              >
                <Picker.Item label="Actions" value="actions" key={'unselectable'} />
                <Picker.Item color={'#E911DB'} label="Save" value="Save" />
                <Picker.Item color={'#8411E9'} label="Edit" value="Edit" />
                <Picker.Item color={'#1F11E9'} label="Print" value="Print" />
                <Picker.Item color={'#11A8E9'} label="Share" value="Share" />
                <Picker.Item
                  color={'#11E9BE'}
                  label="Archive"
                  value="Archive"
                />
                <Picker.Item
                  color={'#11E93C'}
                  label="Save as PDF"
                  value="Save as PDF"
                />
                <Picker.Item
                  color={'#d2e738'}
                  label="Save as XML"
                  value="Save as XML"
                />
                <Picker.Item
                  color={'#e7387a'}
                  label="Save as CSV"
                  value="Save as CSV"
                />
              </Picker> */}
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 10,
              backgroundColor: "#fff",
              zIndex: -30,
            }}
          >
            {/* edit here */}
            {navPicker == "basic_information" ? (
              <>
                <View>
                  <View style={{ paddingVertical: 5 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      Basic Information
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        paddingVertical: 5,
                      }}
                    >
                      <Text style={styles.h2}>Requester </Text>
                      <View style={styles.assignedTOContainer}>
                        <Image
                          style={styles.img}
                          source={
                            selectedTicket.user
                              ? { uri: selectedTicket.user.imageSrc }
                              : require("../../assets/user.png")
                          }
                        />
                        <Text style={styles.assignedTO}>
                          {selectedTicket.user?.contactName.first}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.h2}>Assigned To </Text>
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {selectedTicket.participants ? (
                        selectedTicket.participants.map((participant) => (
                          <View style={styles.assignedTOContainer}>
                            <Image
                              style={styles.img}
                              source={{ uri: participant.imageSrc }}
                            />

                            <Text style={styles.assignedTO}>
                              {participant.contactName.first}
                            </Text>
                          </View>
                        ))
                      ) : (
                        <View style={styles.assignedTOContainer}>
                          <Image
                            style={styles.img}
                            source={require("../../assets/user.png")}
                          />

                          <Text style={styles.assignedTO}></Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                {/* <View style={styles.row}>
                  <Text style={styles.h2}>Sub-Category :</Text>
                  <Text style={styles.assignedTO}>
                    {" "}
                    {selectedTicket.subCategory}
                  </Text>
                </View> */}
                {deviceType === "Tablet" ? (
                  <>
                    {deviceWidth < 800 ? (
                      <View
                        style={
                          landscape
                            ? { flexDirection: "row" }
                            : { flexDirection: "column",alignItems:"center" }
                        }
                      >
                        <View
                          style={landscape? {width:"60%"}:{
                            flexDirection: "row",
                            
                          }}
                        >
                          <View
                            style={
                              landscape
                                ? {
                                    width: "30%",
                                    alignItems: "center",
                                    //marginVertical: "5%",
                                  }
                                : {
                                    flexDirection: "row",
                                    width: "45%",
                                    alignItems: "center",
                                    //marginVertical: "5%",
                                    marginRight:10
                                  } //styles.row
                            }
                          >
                            
                              {landscape ? null : (
                        <Text style={styles.h2}>Category</Text>
                      )}
                            <View
                              style={[
                                styles.fieldPicker,
                                {
                                  padding: 0,
                                  marginHorizontal: 10,
                                  width: "75%",
                                },
                              ]}
                            >
                              {Platform.OS === "android" ? (
                                <Picker
                                  mode={"dropdown"}
                                  style={[
                                    styles.headerPicker,
                                    { backgroundColor: "#FF5B57" },
                                  ]}
                                  selectedValue={form["category"]}
                                  onValueChange={(itemValue, itemIndex) =>
                                    onChangeText("category", itemValue)
                                  }
                                >
                                  {categoryOptions.map((item) => (
                                    <Picker.Item
                                      label={item.label}
                                      value={item.value}
                                    />
                                  ))}
                                </Picker>
                              ) : (
                                <TouchableOpacity
                                  style={styles.touchableStyle}
                                  onPress={() => {
                                    ActionSheetIOS.showActionSheetWithOptions(
                                      {
                                        options: Category_OPTIONS,
                                        cancelButtonIndex: 0,
                                        userInterfaceStyle: "dark",
                                      },
                                      (buttonIndex) => {
                                        if (buttonIndex === 0) {
                                          // cancel action
                                        } else {
                                          onChangeText(
                                            "category",
                                            Category_OPTIONS[buttonIndex]
                                          );
                                        }
                                      }
                                    );
                                  }}
                                >
                                  <Text style={styles.textStyle}>
                                    {form["category"]}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                          <View
                            style={
                              landscape
                                ? {
                                    width: "30%",
                                    alignItems: "center",
                                    marginVertical: "5%",
                                  }
                                : {
                                    flexDirection: "row",
                                    width: "45%",
                                    alignItems: "center",
                                    marginVertical: "5%",
                                  } //styles.row
                            }
                          >
                            <Text style={styles.h2}>Priority</Text>
                            {/* {landscape ? null : (
                              <Text style={styles.h2}>Priority</Text>
                                 )} */}
                            <View
                              style={[
                                styles.fieldPicker,
                                {
                                  padding: 0,
                                  marginHorizontal: 10,
                                  width: "75%",
                                },
                              ]}
                            >
                              {Platform.OS === "android" ? (
                                <Picker
                                  mode={"dropdown"}
                                  style={[
                                    styles.headerPicker,
                                    { backgroundColor: "#2ECC71" },
                                  ]}
                                  selectedValue={form["priority"]}
                                  onValueChange={(itemValue, itemIndex) =>
                                    onChangeText("priority", itemValue)
                                  }
                                >
                                  {priorityOptions.map((item) => (
                                    <Picker.Item
                                      label={item.label}
                                      value={item.value}
                                    />
                                  ))}
                                </Picker>
                              ) : (
                                <TouchableOpacity
                                  style={styles.touchableStyle}
                                  onPress={() => {
                                    ActionSheetIOS.showActionSheetWithOptions(
                                      {
                                        options: Priority_OPTIONS,
                                        cancelButtonIndex: 0,
                                        userInterfaceStyle: "dark",
                                      },
                                      (buttonIndex) => {
                                        if (buttonIndex === 0) {
                                          // cancel action
                                        } else {
                                          onChangeText(
                                            "priority",
                                            Priority_OPTIONS[buttonIndex]
                                          );
                                        }
                                      }
                                    );
                                  }}
                                >
                                  <Text style={styles.textStyle}>
                                    {form["priority"]}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        </View>

                        <View
                          style={
                            landscape
                              ? {
                                  width: "30%",
                                  alignItems: "center",
                                  marginVertical: "5%",
                                }
                              : {
                                  flexDirection: "row",
                                  width: "45%",
                                  alignItems: "center",
                                  marginVertical: "5%",
                                } //styles.row
                          }
                        >
                          <Text style={styles.h2}>Status</Text>
                          {/* {landscape ? null : <Text style={styles.h2}>Status</Text>} */}
                          <View
                            style={[
                              styles.fieldPicker,
                              {
                                padding: 0,
                                marginHorizontal: 10,
                                width: "75%",
                              },
                            ]}
                          >
                            {Platform.OS === "android" ? (
                              <Picker
                                mode={"dropdown"}
                                style={[
                                  styles.headerPicker,
                                  { backgroundColor: "#2ECC71" },
                                ]}
                                // dropdownIconColor='black'
                                selectedValue={form["status"]}
                                onValueChange={(itemValue, itemIndex) =>
                                  onChangeText("status", itemValue)
                                }
                              >
                                {statusOptions.map((item) => (
                                  <Picker.Item
                                    label={item.label}
                                    value={item.value}
                                  />
                                ))}
                              </Picker>
                            ) : (
                              <TouchableOpacity
                                style={styles.touchableStyle}
                                onPress={() => {
                                  ActionSheetIOS.showActionSheetWithOptions(
                                    {
                                      options: Status_OPTIONS,
                                      cancelButtonIndex: 0,
                                      userInterfaceStyle: "dark",
                                    },
                                    (buttonIndex) => {
                                      if (buttonIndex === 0) {
                                        // cancel action
                                      } else {
                                        onChangeText(
                                          "status",
                                          Status_OPTIONS[buttonIndex]
                                        );
                                      }
                                    }
                                  );
                                }}
                              >
                                <Text style={styles.textStyle}>
                                  {form["status"]}
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={
                            landscape
                              ? {
                                  width: "30%",
                                  alignItems: "center",
                                  marginVertical: "5%",
                                }
                              : {
                                  width: "30%",
                                  alignItems: "center",
                                  marginVertical: "5%",
                                } //styles.row
                          }
                        >
                          {/*  {landscape ? null : (
                        <Text style={styles.h2}>Category</Text>
                      )} */}
                          <View
                            style={[
                              styles.fieldPicker,
                              {
                                padding: 0,
                                marginHorizontal: 10,
                                width: "75%",
                              },
                            ]}
                          >
                            {Platform.OS === "android" ? (
                              <Picker
                                mode={"dropdown"}
                                style={[
                                  styles.headerPicker,
                                  { backgroundColor: "#FF5B57" },
                                ]}
                                selectedValue={form["category"]}
                                onValueChange={(itemValue, itemIndex) =>
                                  onChangeText("category", itemValue)
                                }
                              >
                                {categoryOptions.map((item) => (
                                  <Picker.Item
                                    label={item.label}
                                    value={item.value}
                                  />
                                ))}
                              </Picker>
                            ) : (
                              <TouchableOpacity
                                style={styles.touchableStyle}
                                onPress={() => {
                                  ActionSheetIOS.showActionSheetWithOptions(
                                    {
                                      options: Category_OPTIONS,
                                      cancelButtonIndex: 0,
                                      userInterfaceStyle: "dark",
                                    },
                                    (buttonIndex) => {
                                      if (buttonIndex === 0) {
                                        // cancel action
                                      } else {
                                        onChangeText(
                                          "category",
                                          Category_OPTIONS[buttonIndex]
                                        );
                                      }
                                    }
                                  );
                                }}
                              >
                                <Text style={styles.textStyle}>
                                  {form["category"]}
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                        <View
                          style={
                            landscape
                              ? {
                                  width: "30%",
                                  alignItems: "center",
                                  marginVertical: "5%",
                                }
                              : {
                                  width: "30%",
                                  alignItems: "center",
                                  marginVertical: "5%",
                                } //styles.row
                          }
                        >
                          {/* {landscape ? null : (
                        <Text style={styles.h2}>Priority</Text>
                      )} */}
                          <View
                            style={[
                              styles.fieldPicker,
                              {
                                padding: 0,
                                marginHorizontal: 10,
                                width: "75%",
                              },
                            ]}
                          >
                            {Platform.OS === "android" ? (
                              <Picker
                                mode={"dropdown"}
                                style={[
                                  styles.headerPicker,
                                  { backgroundColor: "#2ECC71" },
                                ]}
                                selectedValue={form["priority"]}
                                onValueChange={(itemValue, itemIndex) =>
                                  onChangeText("priority", itemValue)
                                }
                              >
                                {priorityOptions.map((item) => (
                                  <Picker.Item
                                    label={item.label}
                                    value={item.value}
                                  />
                                ))}
                              </Picker>
                            ) : (
                              <TouchableOpacity
                                style={styles.touchableStyle}
                                onPress={() => {
                                  ActionSheetIOS.showActionSheetWithOptions(
                                    {
                                      options: Priority_OPTIONS,
                                      cancelButtonIndex: 0,
                                      userInterfaceStyle: "dark",
                                    },
                                    (buttonIndex) => {
                                      if (buttonIndex === 0) {
                                        // cancel action
                                      } else {
                                        onChangeText(
                                          "priority",
                                          Priority_OPTIONS[buttonIndex]
                                        );
                                      }
                                    }
                                  );
                                }}
                              >
                                <Text style={styles.textStyle}>
                                  {form["priority"]}
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                        <View
                          style={
                            landscape
                              ? {
                                  width: "30%",
                                  alignItems: "center",
                                  marginVertical: "5%",
                                }
                              : {
                                  width: "30%",
                                  alignItems: "center",
                                  marginVertical: "5%",
                                } //styles.row
                          }
                        >
                          {/* {landscape ? null : <Text style={styles.h2}>Status</Text>} */}
                          <View
                            style={[
                              styles.fieldPicker,
                              {
                                padding: 0,
                                marginHorizontal: 10,
                                width: "75%",
                              },
                            ]}
                          >
                            {Platform.OS === "android" ? (
                              <Picker
                                mode={"dropdown"}
                                style={[
                                  styles.headerPicker,
                                  { backgroundColor: "#2ECC71" },
                                ]}
                                // dropdownIconColor='black'
                                selectedValue={form["status"]}
                                onValueChange={(itemValue, itemIndex) =>
                                  onChangeText("status", itemValue)
                                }
                              >
                                {statusOptions.map((item) => (
                                  <Picker.Item
                                    label={item.label}
                                    value={item.value}
                                  />
                                ))}
                              </Picker>
                            ) : (
                              <TouchableOpacity
                                style={styles.touchableStyle}
                                onPress={() => {
                                  ActionSheetIOS.showActionSheetWithOptions(
                                    {
                                      options: Status_OPTIONS,
                                      cancelButtonIndex: 0,
                                      userInterfaceStyle: "dark",
                                    },
                                    (buttonIndex) => {
                                      if (buttonIndex === 0) {
                                        // cancel action
                                      } else {
                                        onChangeText(
                                          "status",
                                          Status_OPTIONS[buttonIndex]
                                        );
                                      }
                                    }
                                  );
                                }}
                              >
                                <Text style={styles.textStyle}>
                                  {form["status"]}
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    )}
                  </>
                ) : (
                  // <View style={[styles.row,{justifyContent:"space-between",paddingRight:20}]}>
                  //   <View style={styles.row}>
                  //     <Text style={styles.h2}>Priority :</Text>
                  //     <Text style={styles.assignedTO}> {selectedTicket.priority}</Text>

                  //   </View>
                  //   <View style={styles.row}>
                  //     <Text style={styles.h2}>Status :</Text>
                  //     <Text style={styles.assignedTO}> {selectedTicket.status}</Text>

                  //   </View>
                  // </View>
                  <View style={styles.statusAndPriorityContainer}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={[
                          styles.CategoryFieldPicker,
                          styles.CategoryFieldPicker2,
                        ]}
                      >
                        {landscape ? null : (
                          <Text style={styles.h2}>Priority</Text>
                        )}
                        <View
                          style={[
                            styles.fieldPicker,
                            { padding: 0, marginRight: 10, width: "100%" },
                          ]}
                        >
                          <Picker
                            mode={"dropdown"}
                            style={[
                              styles.headerPicker,
                              { backgroundColor: "#2ECC71" },
                            ]}
                            selectedValue={Actions}
                            onValueChange={(itemValue, itemIndex) =>
                              onChangeText("priority", itemValue)
                            }
                          >
                            {priorityOptions.map((item) => (
                              <Picker.Item
                                label={item.label}
                                value={item.value}
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.CategoryFieldPicker,
                          styles.CategoryFieldPicker2,
                        ]}
                      >
                        <Text style={styles.h2}>Status</Text>
                        <View
                          style={[
                            styles.fieldPicker,
                            { padding: 0, marginLeft: 10, width: "100%" },
                          ]}
                        >
                          <Picker
                            mode={"dropdown"}
                            style={[
                              styles.headerPicker,
                              { backgroundColor: "#2ECC71" },
                            ]}
                            // dropdownIconColor='black'
                            selectedValue={form["status"]}
                            onValueChange={(itemValue, itemIndex) =>
                              onChangeText("status", itemValue)
                            }
                          >
                            {statusOptions.map((item) => (
                              <Picker.Item
                                label={item.label}
                                value={item.value}
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.CategoryFieldPicker,
                        styles.CategoryFieldPicker2,
                      ]}
                    >
                      <Text style={styles.h2}>Category</Text>
                      <View
                        style={[
                          styles.fieldPicker,
                          { padding: 0, marginLeft: 10, width: "100%" },
                        ]}
                      >
                        <Picker
                          mode={"dropdown"}
                          style={[
                            styles.headerPicker,
                            { backgroundColor: "#2ECC71" },
                          ]}
                          // dropdownIconColor='black'
                          selectedValue={form["category"]}
                          onValueChange={(itemValue, itemIndex) =>
                            onChangeText("category", itemValue)
                          }
                        >
                          {categoryOptions.map((item) => (
                            <Picker.Item
                              label={item.label}
                              value={item.value}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                )}
                <View>
                  <View style={styles.row}>
                    <Text style={styles.h2}>Department : </Text>
                    {/* <View style={styles.fieldPicker}>
                      <TextInput
                        editable={false}
                        style={{ paddingLeft: 10 }}
                        placeholder="I am read only"
                        placeholderTextColor="#CBCBCB"
                        autoCapitalize="none"
                        value={form["department"]}
                        onChangeText={(value) =>
                          onChangeText("department", value)
                        }
                      />
                    </View> */}
                    <Text style={styles.assignedTO}>
                      {" "}
                      {selectedTicket?.department}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.row}>
                    <Text style={styles.h2}>Sub-department : </Text>
                    {/* <View style={styles.fieldPicker}>
                      <TextInput
                        editable={false}
                        style={{ paddingLeft: 10 }}
                        placeholder="I am read only"
                        placeholderTextColor="#CBCBCB"
                        autoCapitalize="none"
                        value={form["subDepartment"]}
                        onChangeText={(value) =>
                          onChangeText("subDepartment", value)
                        }
                      />
                    </View> */}
                    <Text style={styles.assignedTO}>
                      {selectedTicket?.subDepartment}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.row}>
                    <Text style={styles.h2}>Fields : </Text>
                    {/* <View style={styles.fieldPicker}>
                      <TextInput
                        editable={false}
                        style={{ paddingLeft: 10 }}
                        placeholder="I am read only"
                        placeholderTextColor="#CBCBCB"
                        autoCapitalize="none"
                        value={form["field"]}
                        onChangeText={(value) => onChangeText("field", value)}
                      />
                    </View> */}
                    <Text style={styles.assignedTO}>
                      {" "}
                      {selectedTicket?.field}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.row}>
                    <Text style={styles.h2}>Tags : </Text>
                    {/* <View style={styles.fieldPicker}>
                      <TextInput
                        editable={false}
                        style={{ paddingLeft: 10 }}
                        placeholder="I am read only"
                        placeholderTextColor="#CBCBCB"
                        autoCapitalize="none"
                        value={form["tags"]}
                        onChangeText={(value) => onChangeText("tags", value)}
                      />
                    </View> */}
                    <Text style={styles.assignedTO}>
                      {" "}
                      {selectedTicket?.tags}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.row}>
                    <Text style={styles.h2}>Location : </Text>
                    {/* <View style={styles.fieldPicker}>
                      <TextInput
                        editable={false}
                        style={{ paddingLeft: 10 }}
                        placeholder="I am read only"
                        placeholderTextColor="#CBCBCB"
                        autoCapitalize="none"
                        value={form["locations"]}
                        onChangeText={(value) =>
                          onChangeText("locations", value)
                        }
                      />
                    </View> */}
                    <Text style={styles.assignedTO}>
                      {" "}
                      {selectedTicket?.locations}
                    </Text>
                  </View>
                </View>
                {deviceType === "Tablet" ? (
                  <>
                    <View>
                      <View style={styles.row}>
                        <Text style={styles.h2}>Created On</Text>
                        {/* <View style={styles.fieldPicker}>
                          <TextInput
                            editable={false}
                            style={{ paddingLeft: 10 }}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={form["createdOn"]}
                            onChangeText={(value) =>
                              onChangeText("createdOn", value)
                            }
                          />
                        </View> */}
                        <Text style={styles.assignedTO}>
                          {moment(selectedTicket?.createdOn).format(
                            "YYYY-DD-MM, h:mm:ss"
                          )}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.row}>
                        <Text style={styles.h2}>Dead Line</Text>
                        {/* <View style={styles.fieldPicker}>
                          <TextInput
                            editable={false}
                            style={{ paddingLeft: 10 }}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={form["deadline"]}
                            onChangeText={(value) =>
                              onChangeText("deadline", value)
                            }
                          />
                        </View> */}
                        <Text style={styles.assignedTO}>
                          {moment(selectedTicket?.deadline).format(
                            "YYYY-DD-MM, h:mm:ss"
                          )}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={styles.createdAndDeadlineContainer}>
                    <View
                      style={[
                        styles.row,
                        styles.CategoryFieldPicker2,
                        styles.CategoryFieldPicker3,
                      ]}
                    >
                      <Text style={styles.h2}>Created On : </Text>
                      {/* <View
                        style={[
                          styles.fieldPicker,
                          { padding: 0, width: landscape ? "80%" : "60%" },
                        ]}
                      >
                        <TextInput
                          editable={false}
                          style={{ paddingLeft: 10 }}
                          placeholder="I am read only"
                          placeholderTextColor="#CBCBCB"
                          autoCapitalize="none"
                          value={form["createdOn"]}
                          onChangeText={(value) =>
                            onChangeText("createdOn", value)
                          }
                        />
                      </View> */}
                      <Text style={styles.assignedTO}>
                        {" "}
                        {moment(selectedTicket?.createdOn).format(
                          "YYYY-DD-MM, h:mm:ss"
                        )}
                      </Text>
                    </View>
                    <View style={[styles.row, styles.CategoryFieldPicker3]}>
                      <Text style={styles.h2}>Dead Line : </Text>
                      {/* <View
                        style={[
                          styles.fieldPicker,
                          { padding: 0, width: landscape ? "80%" : "60%" },
                        ]}
                      >
                        <TextInput
                          editable={false}
                          style={{ paddingLeft: 10 }}
                          placeholder="I am read only"
                          placeholderTextColor="#CBCBCB"
                          autoCapitalize="none"
                          value={form["deadline"]}
                          onChangeText={(value) =>
                            onChangeText("deadline", value)
                          }
                        />
                      </View> */}
                      <Text style={styles.assignedTO}>
                        {moment(selectedTicket?.deadline).format(
                          "YYYY-MM-DD, h:mm:ss"
                        )}
                      </Text>
                    </View>
                  </View>
                )}
                <View>
                  <View style={styles.row}>
                    <Text style={styles.h2}>Reference : </Text>
                    {/* <View style={styles.fieldPicker}>
                      <TextInput
                        editable={false}
                        style={{ paddingLeft: 10 }}
                        placeholder="I am read only"
                        placeholderTextColor="#CBCBCB"
                        autoCapitalize="none"
                        value={form["reference"]}
                        onChangeText={(value) =>
                          onChangeText("reference", value)
                        }
                      />
                    </View> */}
                    <Text style={styles.assignedTO}>
                      {selectedTicket?.reference}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.row}>
                    <Text style={styles.h2}>Note : </Text>
                    {/* <View style={styles.fieldPicker}>
                      <TextInput
                        editable={false}
                        style={{ paddingLeft: 10 }}
                        placeholder="I am read only"
                        placeholderTextColor="#CBCBCB"
                        autoCapitalize="none"
                        value={form["note"]}
                        onChangeText={(value) =>
                          onChangeText("note", value)
                        }
                      />
                    </View> */}
                    <Text style={styles.assignedTO}>
                      {" "}
                      {selectedTicket?.note}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    paddingVertical: 20,
                  }}
                >
                  <View style={{ paddingVertical: 10, alignItems: "center" }}>
                    {
                      props?.route?.params?.selectedTicket?.share?.link && ( <QRCode
                        //value={`Qr code value here`}
                        value={props?.route?.params?.selectedTicket?.share?.link}
                        logoSize={50}
                        logoBackgroundColor="transparent"
                      />)
                    }
                    <View>
                      <Text>Scan Me</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.h2}>Narrative : </Text>
                  {/* <View style={styles.fieldPicker}>
                    <TextInput
                      editable={false}
                      style={{ paddingLeft: 10 }}
                      placeholder="I am read only"
                      placeholderTextColor="#CBCBCB"
                      autoCapitalize="none"
                      value={form["narrative"]}
                      multiline
                      numberOfLines={2}
                      textAlignVertical="top"
                      onChangeText={(value) => onChangeText("narrative", value)}
                    />
                  </View> */}
                  <Text style={styles.assignedTO}>
                    {" "}
                    {selectedTicket?.narrative}
                  </Text>
                </View>
                {/* attachment section */}
                <View
                  style={{ paddingHorizontal: 10, backgroundColor: "#fff" }}
                >
                  <View style={{ paddingVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      Attachments
                    </Text>
                    <TouchableOpacity style={{ width: deviceWidth / 3 }} onPress={pickImage}>
                      <Text
                        style={{
                          color: "#fff",
                          backgroundColor: "#00ACAC",
                          padding: 5,
                          borderRadius: 5,
                        }}
                      >
                        Add Attachments
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      flex: 1,
                      width: "100%",
                    }}
                  >
                    {Array.apply(null, { length: 6 }).map((item, index) => (
                      <View style={styles.attachmentContainer} key={index}>
                        <FontAwesome5
                          style={{ position: "absolute", top: 2, left: 3 }}
                          name="trash-alt"
                        ></FontAwesome5>
                        <FontAwesome5
                          style={{ position: "absolute", top: 2, right: 3 }}
                          name="camera"
                        ></FontAwesome5>
                        <Text style={{ textAlign: "center" }}>
                        {/* <Image source={{ uri: image }} style={[styles.attachmentContainer, { width: '100%' }]} /> */}
                      {/* TODO: display photo from api */}
                          Attachments here
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            ) : navPicker == "sharing" ? (
              <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 30, fontWeight: "bold", color: "green" }}
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
                      <Text style={{ color: "white" }}>Copy sharing link</Text>
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
                          <Text
                            style={{
                              color: "white",
                            }}
                          >
                            Share Till
                          </Text>
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
                          <Text
                            style={{
                              color: "white",
                            }}
                          >
                            Delete
                          </Text>
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
                          <Text
                            style={{
                              color: "white",
                            }}
                          >
                            Submit
                          </Text>
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
                          Only users linsted in Access Control List haave access
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
            ) : navPicker == "comments" ? (
              <TabComments navigation={props.navigation} id={idTicket} />
            ) : navPicker == "notes" ? (
              <TabNotes />
            ) : navPicker == "fishbone" ? (
              <></>
            ) : navPicker === "reviews" ? (
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
            ) : null}
          </View>
          <View style={{ height: 100 }}></View>
        </ScrollView>
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
  touchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
    alignItems: "center",
    justifyContent: "space-around",
  },
  createdAndDeadlineContainer: {
    width: "100%",
    //flexDirection: "row",
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
    padding: 5,
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
    padding: 5,
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
  },
  navBarContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  assignedTO: {
    // paddingLeft: 10,
    // borderColor: "#1239",
    // borderWidth: 0.8,
    // width: deviceWidth / 2 + 10,
    // paddingVertical: 5,
    // borderRadius: 5,
    fontSize: 16,
    fontWeight: "800",
    color: "black",
    textTransform: "capitalize",
  },
  assignedTOContainer: {
    // width: deviceWidth / 1.5,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    //marginTop: 10,
    // marginBottom:10
    // justifyContent: "space-between",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#1239",
    marginRight: 12,
    marginBottom: 5,
  },
  h2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
  },

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
  headingContainer: {
    marginVertical: 10,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "2%",
  },
});
