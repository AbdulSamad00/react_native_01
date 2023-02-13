import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";

import {
  FontAwesome,
  Ionicons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

import { Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DateRanger from "../../components/DateRange.js";
const deviceWidth = Dimensions.get("window").width;
import { h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import { borderColor } from "styled-system";

import tickets from "./../../api/tickets";
import useApi from "./../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function GridticketScreen(props) {
  const [_category, _setCategory] = useState("");
  const [_prority, _setprority] = useState("");
  const [_status, _setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [prority, setPrority] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setstartDate] = useState("Start");
  const [endDate, setendDate] = useState("End");
  const [isLandscape, setIsLandscape] = useState(false);
  const { landscape } = useDeviceOrientation();
  const getTicketsApi = useApi(tickets.getTickets);

  useEffect(() => {
    getTicketsApi.request();
  }, []);

  useEffect(() => {
    setIsLandscape(landscape);
  }, [landscape]);

  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <SafeAreaView>
        <ActivityIndicator visible={getTicketsApi.loading} />

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
                color={"#fff"}
                type="ionicon"
                size={35}
              />
            </TouchableOpacity>
            <View style={styles.TopMiddleContianer}>
              <Text style={styles.nameText}>Grid Tickets</Text>
            </View>
          </View>
        </View>
        {/* Header */}
        <ScrollView
          style={{
            maxHeight: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          }}
        >
          <View>
            <View style={{ padding: 10 }}>
              <View
                style={{ height: 120, backgroundColor: "white", padding: 10 }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "20%",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#F2F3F4",
                          width: "100%",
                          height: 40,
                          borderRadius: 5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: landscape ? 15 : 10 }}>
                          Add ticket
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* {getTicketsApi.data.map()} */}

                    <View
                      style={{
                        backgroundColor: "#90CA4B",
                        width: "25%",
                        borderWidth: 3,
                        borderColor: "#fff",
                      }}
                    >
                      <Picker
                        mode={"dropdown"}
                        style={styles.headerPicker}
                        selectedValue={_category}
                        onValueChange={(itemValue) => _setCategory(itemValue)}
                      >
                        <Picker.Item label="Category" value="Category" />
                        <Picker.Item label="Disconect" value="Disconect" />
                        <Picker.Item label="Bug-Error" value="Bug-Error" />
                        <Picker.Item label="Feature-Request" value="Feature-Request" />					  						
                        <Picker.Item label="Sales" value="Sales" />
                        <Picker.Item label="Complaint" value="Complaint" />
                        <Picker.Item label="Orders" value="Orders" />
                        <Picker.Item label="Other" value="Other" />
                      </Picker>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#FF5B57",
                        width: "25%",
                        borderWidth: 3,
                        borderColor: "#fff",
                      }}
                    >
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
                    </View>
                    <View
                      style={{
                        backgroundColor: "#49B6D6",
                        width: "25%",
                        borderWidth: 3,
                        borderColor: "#fff",
                      }}
                    >
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
                    </View>
                  </View>

                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View style={{ marginVertical: 20, width: "20%" }}>
                    <DateRanger start={startDate} setstartDate={setstartDate} />
                  </View>
                  <View style={{ marginVertical: 20, width: "20%" }}>
                    <DateRanger start={endDate} setstartDate={setendDate} />
                  </View>
                  <TextInput
                    placeholder="Search..."
                    style={{
                      width: "55%",
                      height: 35,
                      borderWidth: 1,
                      borderRadius: 5,
                      marginLeft: 8,
                      paddingLeft: 5
                    }}
                  />
                </View>
              </View>
            </View>
            {/* Task */}
            <View style={styles.taskContainer}>
              <Task
                category={category}
                setCategory={setCategory}
                prority={prority}
                setPrority={setPrority}
                status={status}
                setStatus={setStatus}
                isLandscape={isLandscape}
              />
              <Task
                category={category}
                setCategory={setCategory}
                prority={prority}
                setPrority={setPrority}
                status={status}
                setStatus={setStatus}
                isLandscape={isLandscape}
              />
              <Task
                category={category}
                setCategory={setCategory}
                prority={prority}
                setPrority={setPrority}
                status={status}
                setStatus={setStatus}
                isLandscape={isLandscape}
              />
              <Task
                category={category}
                setCategory={setCategory}
                prority={prority}
                setPrority={setPrority}
                status={status}
                setStatus={setStatus}
                isLandscape={isLandscape}
              />
              <Task
                category={category}
                setCategory={setCategory}
                prority={prority}
                setPrority={setPrority}
                status={status}
                setStatus={setStatus}
                isLandscape={isLandscape}
              />
              <Task
                category={category}
                setCategory={setCategory}
                prority={prority}
                setPrority={setPrority}
                status={status}
                setStatus={setStatus}
                isLandscape={isLandscape}
              />
              <Task
                category={category}
                setCategory={setCategory}
                prority={prority}
                setPrority={setPrority}
                status={status}
                setStatus={setStatus}
                isLandscape={isLandscape}
              />
              <Task
                category={category}
                setCategory={setCategory}
                prority={prority}
                setPrority={setPrority}
                status={status}
                setStatus={setStatus}
                isLandscape={isLandscape}
              />
              <Task
                category={category}
                setCategory={setCategory}
                prority={prority}
                setPrority={setPrority}
                status={status}
                setStatus={setStatus}
                isLandscape={isLandscape}
              />
            </View>
            {/* Task */}
          </View>
          {/* Bottom spacer */}
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const Task = ({
  category,
  setCategory,
  prority,
  setPrority,
  status,
  setStatus,
  isLandscape,
}) => {
  return (
    <View style={isLandscape ? styles.tasksLandscape : styles.tasks}>
      <Card style={{ width: "100%", height: 530 }}>
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
            First Task
          </Text>
        </View>
        <View>
          <Text style={{ marginTop: 10, paddingLeft: 7 }}>
            Tickets-todo card adding
          </Text>
          <Text style={{ marginTop: 5, paddingLeft: 7 }}>Owner</Text>
          <Image
            style={[styles.img, { marginLeft: 7, marginTop: 5 }]}
            source={require("../../assets/user.png")}
          />
          <Text style={{ marginTop: 5, paddingLeft: 7, width: "95%" }}>
            Some qucik example text to build on the card title and make up the
            bulk of the card's content
          </Text>
		  
          <Text style={{ marginTop: 10, paddingLeft: 7 }}>
            Created On:{" "}
            <Text style={{ fontWeight: "bold" }}> 000-00-00 00:00:00</Text>
          </Text>
          <Text style={{ marginTop: 10, paddingLeft: 7 }}>
            Deadline On:{" "}
            <Text style={{ fontWeight: "bold" }}> 000-00-00 00:00:00</Text>
          </Text>
          <Text style={{ marginTop: 5, paddingLeft: 7 }}>Assigned To:</Text>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={[styles.img, { marginLeft: 7, marginTop: 5 }]}
              source={require("../../assets/user.png")}
            />
            <Image
              style={[styles.img, { marginLeft: 7, marginTop: 5 }]}
              source={require("../../assets/user.png")}
            />
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
                fontSize: isLandscape ? 11 : 16,
                fontWeight: "bold",
                width: "25%",
              }}
            >
              Category:
            </Text>
            <View
              style={{
                backgroundColor: "#2B9FC1",
                width: "60%",
                marginVertical: 5,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            >
              <Picker
                mode={"dropdown"}
                style={styles.headerPicker}
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item label="Feature-Request" value="Feature-Request" />
                <Picker.Item label="Disconect" value="Disconect" />
                <Picker.Item label="Bug-Error" value="Bug-Error" />
                <Picker.Item label="Sales" value="Sales" />
                <Picker.Item label="Complaint" value="Complaint" />
                <Picker.Item label="Orders" value="Orders" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
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
                fontSize: isLandscape ? 11 : 16,
                fontWeight: "bold",
                width: "25%",
              }}
            >
              Priority:
            </Text>
            <View
              style={{
                backgroundColor: "#2B9FC1",
                width: "60%",
                marginVertical: 5,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            >
              <Picker
                mode={"dropdown"}
                style={styles.headerPicker}
                selectedValue={prority}
                onValueChange={(itemValue) => setPrority(itemValue)}
              >
                <Picker.Item label="High" value="High" />
                <Picker.Item label="Normal" value="Normal" />
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Urgent" value="Urgent" />
              </Picker>
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
                fontSize: isLandscape ? 11 : 16,
                fontWeight: "bold",
                width: "25%",
              }}
            >
              Status:
            </Text>
            <View
              style={{
                backgroundColor: "#808080",
                width: "60%",
                marginVertical: 5,
              }}
            >
              <Picker
                mode={"dropdown"}
                style={styles.headerPicker}
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
              >
                <Picker.Item label="New" value="New" />
                <Picker.Item label="Onhold" value="Onhold" />
                <Picker.Item label="Archived" value="Archived" />
                <Picker.Item label="Reopen" value="Reopen" />
              </Picker>
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
              paddingVertical: 10,
              paddingLeft: 5,
              alignContent: "center",
            },
            !isLandscape && { height: 90 },
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
          >
            <Ionicons name="eye" color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
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
          >
            <Ionicons name="share-social" color="#FFFFFF" size={20} />
          </TouchableOpacity>
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
};

const styles = StyleSheet.create({
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
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  // Tasks
  taskContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  tasks: {
    width: "100%",
    paddingBottom: 60,
  },
  tasksLandscape: {
    width: "31%",
    paddingBottom: 100,
  },
});
