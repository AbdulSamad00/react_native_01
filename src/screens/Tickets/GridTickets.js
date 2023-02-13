import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Button,
  ActionSheetIOS,
  Platform,
} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
} from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";
import * as Contacts from "expo-contacts";

import {
  FontAwesome,
  Ionicons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import dayjs from "dayjs";
import { useSnapshot } from "valtio";
import { state } from "../../../App";
import { Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DateRange from "../../components/DateRange";
import Header from "../../components/Header";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import { h } from "react-native-responsiveness";

import { borderColor, width } from "styled-system";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import tickets, { deleteTicket, getTickets } from "./../../api/tickets";
import useApi from "./../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import colors from "../../config/colors.js";
import { Toast } from "native-base";

import Checkbox from "expo-checkbox";
import TabShareNonRegistered from "../dashboard/TabShareNonRegistered.js";
import { DeviceType, getDeviceTypeAsync } from "expo-device";

const NUMBER_ITEMS = 3;

import { Dropdown } from "sharingan-rn-modal-dropdown";
import { Icon } from "react-native-elements";

const GridTickets = (props) => {
  const [_category, _setCategory] = useState("");
  const [_prority, _setprority] = useState("");
  const [_status, _setStatus] = useState("");

  const [startDate, setstartDate] = useState("Start");
  const [endDate, setendDate] = useState("End");
  const [isLandscape, setIsLandscape] = useState(false);
  const { landscape } = useDeviceOrientation();
  const [tickets, setTickets] = useState(false);
  const [filtredTickets, setFiltredTickets] = useState();
  const [showMore, setShowMore] = useState(false);
  const [numCol, setNumCol] = useState(1);
  const [page, setPage] = useState(0);
  const [deviceType, setDeviceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [numItems, setnumItems] = useState(10);
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
  // const getTicketsApi = useApi(tickets.getTickets);

  const navigation = useNavigation();

  const ticketsHandler = async () => {
    const { ok, data } = await getTickets();
    //console.log(data[1].user, "Tickets--");
    if (ok) {
      setTickets(data);
      setFiltredTickets(data.slice(0, page + numItems));
      setLoading(true);
      //console.log(data)
    } else {
      setTickets([]);
    }
  };

  const getDeviceType = async () => {
    const device = await getDeviceTypeAsync();
    setDeviceType(device); // if device = 1 => phone
    if (device === 1) {
      console.log("Phone");
    } else {
      setnumItems(4);
      landscape
        ? setNumCol(3) //console.log("Tablet | Landscap")
        : setNumCol(2); //console.log("Tablet | Portrait");
    }
  };

  useEffect(() => {
    getDeviceType();
    ticketsHandler();
    return () => {
      setShowMore(false);
      setLoading(false);
      setFiltredTickets();
      setPage(0);
    };
  }, [page]);

  useEffect(() => {
    setIsLandscape(landscape);
    console.log("Oriontation changed");
    console.log("height=> ", hp("100"));
    console.log("width=> ", wp("100"));
    return () => {
      setIsLandscape(false);
    };
  }, [landscape]);

  return (
    <View>
      {/* Header */}
      {/* <Header back navigation={props.navigation} title={"Grid Tickets"} />   */}

      {/* Header */}
      {/* <ScrollView
          style={{
            maxHeight: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          }}
        > */}
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
              size={28}
            />
          </TouchableOpacity>
          <View style={styles.TopMiddleContianer}>
            <Text style={styles.nameText}>Grid Tickets</Text>
          </View>
        </View>
      </View> 

      <View>
        <View
          style={
            deviceType === 1
              ? {
                  padding: 10,
                  width: wp("100%"),
                  height: hp("40%"),
                  alignItems: "center",
                }
              : landscape
              ? {
                  padding: 10,
                  width: hp("100%"),
                  height: wp("20%"),
                  alignItems: "center",
                }
              : {
                  padding: 10,
                  width: wp("100%"),
                  height: hp("16%"),
                  alignItems: "center",
                }
          }
        >
          <View
            style={
              deviceType === 1
                ? {
                    flex: 1,
                    //display: "flex",
                    width: wp("100%"),
                    alignItems: "center",
                    justifyContent: "center",
                    height: "60%",
                  }
                : {
                    flex: 1,
                    //display: "flex",
                    width: wp("100%"),
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    height: "55%",
                  }
            }
          >
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                icon="plus"
                size={30}
                style={{ marginLeft: 15, backgroundColor: "#07f" }}
                color="white"
                onPress={() => {}}
              />
              <Searchbar
                style={
                  deviceType === 1 ? styles.searchInput : styles.searchInputTab
                }
                underlineColorAndroid="white"
                placeholder="Search"
                clearButtonMode="while-editing"
                value={"search"}
                onChangeText={() => {}}
              />
              {deviceType !== 1 && (
                <View style={{ marginVertical: 5, width: "20%" }}>
                  <DateRange start={startDate} setstartDate={setstartDate} />
                </View>
              )}
            </View>
            {deviceType === 1 && (
              <View style={{ marginVertical: 5, width: "45%" }}>
                <DateRange start={startDate} setstartDate={setstartDate} />
              </View>
            )}
            <View
              style={
                deviceType === 1
                  ? [styles.button, { backgroundColor: "#90CA4B" }]
                  : [styles.buttonTab, { backgroundColor: "#90CA4B" }]
              }
            >
              {Platform.OS === "android" ? (
                <Picker
                  mode={"dropdown"}
                  style={styles.headerPicker}
                  selectedValue={_category}
                  onValueChange={(itemValue) => _setCategory(itemValue)}
                >
                  <Picker.Item label="Category" value="Category" />
                  <Picker.Item label="Disconect" value="Disconect" />
                  <Picker.Item label="Bug-Error" value="Bug-Error" />
                  <Picker.Item
                    label="Feature-Request"
                    value="Feature-Request"
                  />
                  <Picker.Item label="Sales" value="Sales" />
                  <Picker.Item label="Complaint" value="Complaint" />
                  <Picker.Item label="Orders" value="Orders" />
                  <Picker.Item label="Other" value="Other" />
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
                          _setCategory(Category_OPTIONS[buttonIndex]);
                        }
                      }
                    );
                  }}
                >
                  <Text style={styles.textStyle}>
                    {_category === "" ? "Category" : _category}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={
                deviceType === 1
                  ? [styles.button, { backgroundColor: "#FF5B57" }]
                  : [styles.buttonTab, { backgroundColor: "#FF5B57" }]
              }
            >
              {Platform.OS === "android" ? (
                <Picker
                  mode={"dropdown"}
                  style={styles.headerPicker}
                  selectedValue={_prority}
                  onValueChange={(itemValue) => _setprority(itemValue)}
                >
                  <Picker.Item label="Priority" value="Priority" />
                  <Picker.Item label="High" value="High" />
                  <Picker.Item label="Normal" value="Normal" />
                  <Picker.Item label="Low" value="Low" />
                  <Picker.Item label="Urgent" value="Urgent" />
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
                          _setprority(Priority_OPTIONS[buttonIndex]);
                        }
                      }
                    );
                  }}
                >
                  <Text style={styles.textStyle}>
                    {_prority === "" ? "Priority" : _prority}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={
                deviceType === 1
                  ? [styles.button, { backgroundColor: "#49B6D6" }]
                  : [styles.buttonTab, { backgroundColor: "#49B6D6" }]
              }
            >
              {Platform.OS === "android" ? (
                <Picker
                  mode={"dropdown"}
                  style={styles.headerPicker}
                  // dropdownIconColor='black'
                  selectedValue={_status}
                  onValueChange={(itemValue) => _setStatus(itemValue)}
                >
                  <Picker.Item label="Status" value="Status" />
                  <Picker.Item label="New" value="New" />
                  <Picker.Item label="Onhold" value="Onhold" />
                  <Picker.Item label="Archived" value="Archived" />
                  <Picker.Item label="Reopen" value="Reopen" />
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
                          _setStatus(Status_OPTIONS[buttonIndex]);
                        }
                      }
                    );
                  }}
                >
                  <Text style={styles.textStyle}>
                    {_status === "" ? "Status" : _status}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View
          style={
            deviceType === 1
              ? { height: hp("55%") }
              : landscape
              ? { height: wp("65%") }
              : { height: hp("76%") }
            //isLandscape ? styles.taskContainerLand : styles.taskContainer
          }
        >
          {tickets && loading ? (
            <>
              <FlatList
                //style={deviceType===1? null:{ alignItems:"center"}}
                data={filtredTickets}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={() => (
                  <View>
                    <Text>No Tickets to show</Text>
                  </View>
                )}
                key={landscape}
                numColumns={deviceType === 1 ? 1 : landscape ? 3 : 2}
                columnWrapperStyle={
                  deviceType === 1
                    ? null
                    : { padding: 5, justifyContent: "space-between" }
                }
                renderItem={({ item, index }) => (
                  <Task
                    // category={category}
                    // setCategory={setCategory}
                    // prority={prority}
                    // setPrority={setPrority}
                    // status={status}
                    // setStatus={setStatus}
                    deviceType={deviceType}
                    isLandscape={isLandscape}
                    navigation={navigation}
                    item={item}
                    key={index}
                  />
                )}
                onEndReached={() => setShowMore(true)}
              />
              {showMore ? (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    height: landscape ? 40 : 25,
                  }}
                >
                  <TouchableOpacity onPress={() => setPage(page + numItems)}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      Load More
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          ) : (
            <ActivityIndicator color={colors.BLUE.primary} size={"small"} />
          )}
        </View>
      </View>
    </View>
  );
};

const Task = React.memo(({ isLandscape, item, deviceType }) => {
  const navigation = useNavigation();
  const deleteHandler = (id) => {
    const toDel = id;
    console.log(id, "Delete");
    Alert.alert("Delete", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        onPress: () => console.log("canceled"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const { ok, data } = await deleteTicket(id);
          console.log(ok);
          if (ok) {
            Toast.show("Deleted Successfully");
          }
        },
      },
    ]);
  };

  const [show, setShow] = useState(false);

  const [category, setCategory] = useState(item.category);
  const [prority, setPrority] = useState(item.prority);
  const [status, setStatus] = useState(item.status);
  const [data, setData] = useState([]);
  Category_OPTIONS = [
    "Cancel",
    "feature-Request",
    "Disconection",
    "Bug-Error",
    "Sales",
    "Complaint",
    "Orders",
    "Other",
  ];
  Priority_OPTIONS = ["Cancel", "High", "Normal", "Low", "Urgent"];
  Status_OPTIONS = [
    "Cancel",
    "open",
    "Closed",
    "Onhold",
    "Pending",
    "In Progress",
    "Archived",
    "Reopen",
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        let arr = data
          .map((el) => {
            if (el.emails)
              return {
                id: el.id,
                user: el.name,
                email: el.emails[0].email,
                image: "https://gcdnb.pbrd.co/images/DQWocpKZdbNw.png",
              };
          })
          .filter(Boolean);

        setData(arr);
      }
    })();
  }, []);

  const [view, setView] = useState(true);
  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <View
      style={
        //isLandscape ? styles.tasksLandscape : styles.tasks
        deviceType === 1
          ? { width: "100%" }
          : isLandscape
          ? { width: "32%" }
          : { width: "49%", marginBottom: 2 }
      }
      key={item._id}
    >
      <Card style={{ width: "100%" }} key={item._id}>
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#C7C7C7",
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              paddingLeft: 5,
            }}
          >
            {item?.name}
          </Text>
        </View>
        <View>
          <Text style={{ marginTop: 10, paddingLeft: 7 }}>
            {item ? item.narrative : ""}
          </Text>
          <Text style={{ marginTop: 5, paddingLeft: 7 }}>
            {item.user?.contactName.first}
          </Text>
          <Image
            style={[styles.img, { marginLeft: 7, marginTop: 5 }]}
            source={
              item.user
                ? { uri: item.user.imageSrc }
                : require("../../assets/user.png")
            }
          />

          <Text style={{ marginTop: 10, paddingLeft: 7 }}>
            Created On:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              {item.createdAt
                ? moment(item.createdAt).format("DD-MM-YYYY HH:mm")
                : ""}
            </Text>
          </Text>
          <Text style={{ marginTop: 10, paddingLeft: 7 }}>
            Deadline On:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              {item.deadline
                ? moment(item.deadline).format("DD-MM-YYYY HH:mm")
                : ""}
            </Text>
          </Text>
          <Text style={{ marginTop: 5, paddingLeft: 7 }}>Assigned To:</Text>
          <View style={{ flexDirection: "row" }}>
            {item.participants ? (
              item.participants.map((participant) => (
                <Image
                  style={[styles.img, { marginLeft: 7, marginTop: 5 }]}
                  source={{ uri: participant.imageSrc }}
                />
              ))
            ) : (
              <Image
                style={[styles.img, { marginLeft: 7, marginTop: 5 }]}
                source={require("../../assets/user.png")}
              />
            )}
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
              paddingLeft: 7,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: isLandscape ? 14 : 11,
                fontWeight: "bold",
                width: "30%",
              }}
            >
              Category:
            </Text>
            <View
              style={{
                backgroundColor: "#2B9FC1",
                width: "60%",
                height: 50,
                marginVertical: 5,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            >
              {Platform.OS === "android" ? (
                <Picker
                  mode={"dropdown"}
                  style={styles.headerPicker}
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  <Picker.Item
                    label="Feature-Request"
                    value="feature-Request"
                  />
                  <Picker.Item label="Disconection" value="disconection" />
                  <Picker.Item label="Bug-Error" value="Bug-Error" />
                  <Picker.Item label="Sales" value="sales" />
                  <Picker.Item label="Complaint" value="complaint" />
                  <Picker.Item label="Orders" value="orders" />
                  <Picker.Item label="Other" value="other" />
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
                          setCategory(Category_OPTIONS[buttonIndex]);
                        }
                      }
                    );
                  }}
                >
                  <Text style={styles.textStyle}>{category}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
              paddingLeft: 7,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: isLandscape ? 14 : 11,
                fontWeight: "bold",
                width: "30%",
              }}
            >
              Priority:
            </Text>
            <View
              style={{
                backgroundColor: "#2B9FC1",
                width: "60%",
                height: 50,
                marginVertical: 5,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            >
              {Platform.OS === "android" ? (
                <Picker
                  mode={"dropdown"}
                  style={styles.headerPicker}
                  selectedValue={prority}
                  onValueChange={(itemValue) => setPrority(itemValue)}
                >
                  <Picker.Item label="High" value="high" />
                  <Picker.Item label="Normal" value="normal" />
                  <Picker.Item label="Low" value="low" />
                  <Picker.Item label="Urgent" value="urgent" />
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
                          setPrority(Priority_OPTIONS[buttonIndex]);
                        }
                      }
                    );
                  }}
                >
                  <Text style={styles.textStyle}>{prority}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
              paddingLeft: 7,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: isLandscape ? 14 : 11,
                fontWeight: "bold",
                width: "30%",
              }}
            >
              Status:
            </Text>
            <View
              style={{
                backgroundColor: "#808080",
                width: "60%",
                height: 50,
                marginVertical: 5,
              }}
            >
              {Platform.OS === "android" ? (
                <Picker
                  mode={"dropdown"}
                  style={styles.headerPicker}
                  selectedValue={status}
                  onValueChange={(itemValue) => setStatus(itemValue)}
                >
                  <Picker.Item label="New" value="New" />
                  <Picker.Item label="Open" value="open" />
                  <Picker.Item label="Closed" value="closed" />
                  <Picker.Item label="Onhold" value="Onhold" />
                  <Picker.Item label="Pending" value="pending" />
                  <Picker.Item label="In Progress" value="in progress" />
                  <Picker.Item label="Archived" value="Archived" />
                  <Picker.Item label="Reopen" value="Reopen" />
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
                          setStatus(Status_OPTIONS[buttonIndex]);
                        }
                      }
                    );
                  }}
                >
                  <Text style={styles.textStyle}>{status}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View
          style={[
            {
              marginTop: 8,
              backgroundColor: "#C7C7C7",
              flexDirection: "row",
              flexWrap: "wrap",
              paddingLeft: 5,
              alignContent: "center",
              padding: 5,
            },
          ]}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#32A932",
              width: 30,
              height: 30,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
            onPress={() =>
              navigation.navigate("TicketProfile", { selectedTicket: item })
            }
          >
            <Ionicons name="eye" color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteHandler(item._id)}
            style={{
              backgroundColor: "#FF5B57",
              width: 30,
              height: 30,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <AntDesign name="delete" color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#90CA4B",
              width: 30,
              height: 30,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
            onPress={() =>
              navigation.navigate("TicketProfile", { activeTab: "comments" })
            }
          >
            <AntDesign name="message1" color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#727CB6",
              width: 30,
              height: 30,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
            onPress={() =>
              navigation.navigate("TicketProfile", {
                activeTab: "sharing",
                selectedTicket: item,
              })
            }
          >
            <Ionicons name="share-social" color="#FFFFFF" size={20} />
          </TouchableOpacity>
          {/***** Pop Up for Sharing ********/}

          <Modal
            animationType="fade"
            transparent={true}
            visible={show}
            onRequestClose={() => {
              setShow(false);
            }}
          >
            <View
              style={{
                flex: 1,
                alignSelf: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ScrollView
                style={{
                  margin: 20,
                  borderRadius: 10,
                  backgroundColor: "white",
                  height: "95%",
                  width: "85%",
                  borderColor: "dark",
                  borderWidth: 0.3,
                  padding: 10,
                }}
              >
                <Text style={{ alignSelf: "center", fontSize: 18 }}>
                  Contact List
                </Text>
                <View
                  style={{ alignItems: "center", width: "100%", marginTop: 15 }}
                >
                  <Text style={{ alignSelf: "flex-start", marginLeft: 35 }}>
                    Email for unknown User
                  </Text>
                  <TextInput
                    placeholder="User Email"
                    style={{
                      width: "80%",
                      height: 35,
                      borderWidth: 0.3,
                      borderRadius: 5,

                      paddingLeft: 5,
                    }}
                  />
                </View>
                <ScrollView
                  //contentContainerStyle={styles.container}
                  horizontal
                >
                  <View
                    style={{ display: "flex", flexDirection: "column" }}
                    key={1}
                  >
                    {data.map((i) => {
                      if (
                        !item.shareNoregistredUsers.sharedTo.includes(i.email)
                      ) {
                        return (
                          <TabShareNonRegistered
                            task={item}
                            element={i}
                            key={i._id}
                          />
                        );
                      }
                    })}
                  </View>
                </ScrollView>

                <>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#1523",
                      width: "50%",

                      alignSelf: "center",
                      alignItems: "center",
                      borderRadius: 7,
                      padding: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                </>
              </ScrollView>
            </View>
          </Modal>

          <TouchableOpacity
            style={{
              backgroundColor: "#F59C1A",
              width: 30,
              height: 30,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <FontAwesome name="file-pdf-o" color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                backgroundColor: "#727CB6",
                width: 30,
                height: 30,
                borderRadius: 5,
                justifyContent: "center",

                // marginLeft: smallDevice ? 0 : 10,
                alignItems: "center",
                margin: 5,
              },
            ]}
          >
            <Ionicons name="md-file-tray-sharp" color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                backgroundColor: "#F59C1A",
                width: 30,
                height: 30,
                borderRadius: 5,
                justifyContent: "center",

                alignItems: "center",
                margin: 5,
              },
            ]}
          >
            <FontAwesome5 name="file-invoice" color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
});

const styles = StyleSheet.create({
  touchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  textStyle: { fontSize: 17 },
  headerRight: { flexDirection: "row", alignItems: "center" },
  searchInput: {
    width: "80%",
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  searchInputTab: {
    width: "65%",
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    marginRight: 20,
  },
  button: {
    width: "45%",
    height: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },
  buttonTab: {
    width: "30%",
    height: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },
  calendarPicker: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  headerCenter: { flexDirection: "row", alignItems: "center" },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#fff",
    height: hp("13%"),
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  CategoryFieldPicker: {
    paddingLeft: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerPicker: {
    padding: 10,
    width: "100%",
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
  },
  fieldPicker: {
    width: deviceWidth / 1.5,
    borderColor: "#1239",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#1239",
  },

  //
  TopContainer: {
    flexDirection: "row",
    backgroundColor: "#00B7DD",
    height: hp("5%"),
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
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 19,
  },
  // Tasks
  taskContainer: {
    flexDirection: "column",

    height: hp("65%"),
    paddingHorizontal: 10,
  },
  taskContainerLand: {
    flexDirection: "column",
    height: hp("65%"),

    paddingHorizontal: 10,
  },
  tasks: {
    width: "100%",

    paddingBottom: 10,
  },
  tasksLandscape: {
    width: "100%",
    paddingBottom: 10,
  },
});

export default GridTickets;
