import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  //Picker,
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import { FontAwesome } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { sharingTicket } from "../../api/tickets";

const { width } = Dimensions.get("screen");

export default function TabShareNonRegistered(props) {
  const [isSent, setIsSent] = useState(false);
  const [view, setView] = useState(true);
  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);
  async function addUser() {
    const share = {
      _id: props.task._id,
      sharingLink: `/ticket/ticketprofile/${props.task._id}`,
      sharedToNonReg: [
        ...props.task.shareNoregistredUsers.sharedTo,
        props.element.email,
      ],
      sharedTillNonReg: [...props.task.shareNoregistredUsers.sharedTill, date],
      permissionsNonReg: [
        ...props.task.shareNoregistredUsers.permissions,
        { view, comment, edit },
      ],
    };
    await sharingTicket(share)
      .then((res) => {
        props.task.shareNoregistredUsers.sharedTo = share.sharedToNonReg;
        props.task.shareNoregistredUsers.sharedTill = share.sharedTillNonReg;
        props.task.shareNoregistredUsers.permissions = share.permissionsNonReg;
        setIsSent(true);
        console.log("done" + res.status);
      })
      .catch((err) => console.log("error is " + err));
  }
  function check() {
    props.task.shareNoregistredUsers.sharedTo.forEach((element) => {
      if (element == props.element.email) {
        setIsSent(true);
      }
    });
  }
  useEffect(() => {
    check();
  }, []);

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  //useEffect(() => console.log(show), [show]);
  return (
    <View
      key={props.element.id}
      style={{
        flexDirection: "row",
        marginBottom: 5,
        width: 2.1 * width,
      }}
    >
      <View
        style={{
          marginRight: 10,
          width: "22%",
        }}
      >
        <Text>Email:</Text>

        <View style={styles.emailBox}>
          {isSent && (
            <Ionicons name="checkmark-circle-outline" size={20} color="green" />
          )}

          <Picker
            style={{
              width: "80%",
              height: 40,
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 30,
              backgroundColor: "#d1d1d1",
            }}
          >
            <Picker.Item
              label={props.element.email}
              value={props.element.email}
            />
          </Picker>
        </View>
      </View>
      <View
        style={{
          marginRight: 10,
          width: "21%",
        }}
      >
        <Text>User Name:</Text>
        <View style={styles.userBox}>
         
          <Text>{props.element.user}</Text>
        </View>
      </View>
      <View
        style={{
          marginRight: 10,
        }}
      >
        <Text>{`Right & Permission:`}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            borderBottomWidth: 0.3,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              //width: "25%",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Checkbox
              value={view}
              onValueChange={setView}
              color={"blue"}
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
              //width: "25%",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Checkbox
              value={comment}
              onValueChange={setComment}
              color={"blue"}
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
              //width: "25%",
              alignItems: "center",
            }}
          >
            <Checkbox
              color={"blue"}
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
      </View>

      <View
        style={{
          marginRight: 10,
          marginLeft: 10,
          width: "12%",
        }}
      >
        <Text>Share Till:</Text>
        <TouchableOpacity
          style={[styles.emailBox, { padding: 5 }]}
          onPress={() => setShow(true)}
        >
          <Text>{moment(date).format("DD/MM/YYYY")}</Text>
          {show === true ? (
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              mode="date"
              format="DD-MM-YYYY"
              minDate={new Date()}
              maxDate="01-01-2050"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              testID="dateTimePicker"
              value={date}
              onTouchCancel={() => {
                setShow(false);
              }}
              onChange={(e, d) => {
                console.log("ok");
                if (d) {
                  console.log(d);

                  setDate(d);
                }
                setShow(false);
              }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          marginRight: 15,
          height: width / 7,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {isSent?<Text>Invitation Sent</Text>:<Text>Send Invitation</Text>}
        {isSent ? (
          <Ionicons name="checkmark-circle-outline" size={20} color="green" />
        ) : (
          <TouchableOpacity
            style={{ marginTop: 2 }}
            onPress={() => {
              addUser();
              console.log("im clicked");
            }}
          >
            <Ionicons name="send" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#d1d1d1",
    borderRadius: 5,
  },
  emailBox: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    //padding: 5,
    backgroundColor: "#d1d1d1",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },

  radiobutton: {
    height: 50,
    width: 200,
  },
  radio: {
    alignItems: "center",
    flexDirection: "row",
  },
  img: {
    height: 20,
    width: 20,
    marginLeft: 20,
    backgroundColor: "red",
  },
  radiobuttonsRow: {
    width: "100%",

    marginTop: 10,
    justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10,
  },
  checkboxRow: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  checkboxRowContainer: {
    width: "22%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },

  down: {
    flexDirection: "column",
    flex: 1,
    width: "100%",

    justifyContent: "space-evenly",
  },
  containerNav: {
    backgroundColor: "#00bfff",
    width: "100%",
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  containerNavCenter: {
    width: "60%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },

  shareTillContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  shareTill: {
    width: "40%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#333300",
    borderColor: "transparent",
    padding: 8,
  },
  sendInvitationContainer: {
    width: "70%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00bfff",
    borderRadius: 20,
    padding: 8,
  },
  sendInvitation: {
    width: "70%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#00bfff",
    borderColor: "transparent",
  },
  options: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00bfff",
  },
  option: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: "transparent",
    backgroundColor: "#333300",
  },
  inputscontainer: {
    width: "100%",
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "transparent",
    backgroundColor: "#BDC3C7",
    color: "white",
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#333300",
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#ff4d4d",
  },
  button3: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#53c68c",
  },
});