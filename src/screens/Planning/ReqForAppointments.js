import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deletereqForAppointment, getreqForAppointments } from "../../api/reqForAppointments";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const reqForAppointments = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedreqForAppointments, setSearchedreqForAppointments] = useState([]);
  const [reqForAppointments, setreqForAppointments] = useState();
  const [allreqForAppointments, setAllreqForAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedreqForAppointments, setCheckedreqForAppointments] = useState([]);

  const callForreqForAppointments = async () => {
    setCheckedreqForAppointments([]);
    setreqForAppointments([]);
    setLoading(true);
    const { ok, data } = await getreqForAppointments();
    if (ok) {
      setAllreqForAppointments(data);
      const filterreqForAppointments = data.map((reqForreqForAppointment) => {
        return {
          id: user._id,
          Avatar: user.imageSrc,
          username: user.username,
          Avatar: user.imageSrc,		  
          Clinic: clinicsolo.username,		  
          "Date": dayjs(user.date).format("DD-MM-YYYY"),
          preferStartTime: reqForAppointments.preferStartTime,
          preferEndTime: reqForAppointments.preferEndTime,
          reqForAppointmentType: reqForAppointments.appointmentType,
          title: reqForAppointments.title,		  
          noteClient: reqForAppointments.noteClient,		  		  
          note: reqForAppointments.note,		  
          status: reqForAppointments.status,		  
        };
      });
      setreqForAppointments(filterreqForAppointments);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForreqForAppointments();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = reqForAppointments.filter(
      (el) =>
        `${el.reqForAppointmentname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedreqForAppointments(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <Header back title={"reqForAppointments"} />
      <IconBar
        checkedreqForAppointments={checkedreqForAppointments}
        reqForAppointments={allreqForAppointments}
        callForreqForAppointments={callForreqForAppointments}
      />
      <Searchbar
        style={styles.search}
        underlineColorAndroid="white"
        placeholder="Search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={(search) => {
          if (search.length < 1) {
            setSearchedreqForAppointments();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {reqForAppointments && reqForAppointments.length > 0 && (
        <Table
          tableData={
            searchedreqForAppointments && searchedreqForAppointments.length > 0 ? searchedreqForAppointments : reqForAppointments
          }
          showCheckbox
          checked={checkedreqForAppointments}
          setChecked={setCheckedreqForAppointments}
        />
      )}
    </View>
  );
};

const IconBar = ({ checkedreqForAppointments, reqForAppointments, callForreqForAppointments }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsreqForAppointment");
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedreqForAppointments.length < 1) {
              navigate("OperationsreqForAppointment");
            }

            const data = reqForAppointments.filter((reqForreqForAppointment) => reqForreqForAppointment._id == checkedreqForAppointments[0])[0];

            const cleanreqForAppointment = {
              _id: data._id,
			  Avatar: data.imageSrc,		  
			  Patient: data.username,		  			  
			  Avatar: data.imageSrc,		  
			  Clinic: data.username,		  
              title: data.title,
              date: data.date,			  
              preferStartTime: data.preferStartTime,
              preferStartTime: data.preferStartTime,			  
              noteClient: data.noteClient,			  
              note: data.note,
              status: data.status,			  
            };
            navigate("OperationsreqForAppointment", { selectedreqForAppointment: cleanreqForAppointment });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedreqForAppointments.length < 1) return null;
            checkedreqForAppointments.forEach(async (reqForAppointmentId) => {
              const { ok } = await deletereqForAppointment(reqForAppointmentId);
              if (ok) {
                console.log("deleted");
                callForreqForAppointments();
              }
            });
          }}
        />
        <IconButton
          icon="file-delimited"
          style={{ marginLeft: 8, backgroundColor: "lime" }}
          color="white"
        />
        <IconButton
          icon="file-pdf-box"
          style={{ marginLeft: 8, backgroundColor: "red" }}
          color="white"
        />
        <IconButton
          icon="microsoft-excel"
          style={{ marginLeft: 8, backgroundColor: "green" }}
          color="white"
        />
        <IconButton
          icon="printer"
          style={{ marginLeft: 8, backgroundColor: "brown" }}
          color="white"
        />
        <IconButton
          icon="at"
          style={{ marginLeft: 8, backgroundColor: "orange" }}
          color="white"
        />
        <IconButton
          icon="chat"
          style={{ marginLeft: 8, backgroundColor: "#47fed3" }}
          color="white"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 5,
    width: "100%",
  },
  search: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default reqForAppointments;
