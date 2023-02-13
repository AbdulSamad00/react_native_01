import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteLeave, getLeaves } from "../../api/leaves";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";
import moment from 'moment';
const Leaves = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedLeaves, setSearchedLeaves] = useState([]);
  const [Leaves, setLeaves] = useState();
  const [allLeaves, setAllLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedLeaves, setCheckedLeaves] = useState([]);

  const callForLeaves = async () => {
    setCheckedLeaves([]);
    setLeaves([]);
    setLoading(true);
    const { ok, data } = await getLeaves();
    if (ok) {
      setAllLeaves(data);
      const filterLeaves = data.map((leaves) => {
        return {
          id: leaves.requester._id,
          Avatar: leaves.requester.imageSrc,
          requester: leaves.requester.username,
          Clinic: leaves.requester.username,
          Reason: leaves.reason,
          startDate: moment(leaves.createdOn).format('l'),
          endDate: moment(leaves.endTime).format('l'),
          StartTime: moment(leaves.startTime).format('LT'),
          EndTime: moment(leaves.endTime).format('LT'),
          Payment: leaves.payment,
          Note: leaves.note,
          Status: leaves.status,
        };
      });
      setLeaves(filterLeaves);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForLeaves();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = Leaves.filter(
      (el) =>
        `${el.Leavename}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedLeaves(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <Header back title={"Leaves"} />
      <IconBar
        checkedLeaves={checkedLeaves}
        Leaves={allLeaves}
        callForLeaves={callForLeaves}
      />
      <Searchbar
        style={styles.search}
        underlineColorAndroid="white"
        placeholder="Search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={(search) => {
          if (search.length < 1) {
            setSearchedLeaves();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {Leaves && Leaves.length > 0 && (
        <Table
          tableData={
            searchedLeaves && searchedLeaves.length > 0 ? searchedLeaves : Leaves
          }
          showCheckbox
          checked={checkedLeaves}
          setChecked={setCheckedLeaves}
        />
      )}
    </View>
  );
};

const IconBar = ({ checkedLeaves, Leaves, callForLeaves }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsLeave");
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedLeaves.length < 1) {
              navigate("OperationsLeave");
            }

            const data = Leaves.filter((Leave) => Leave._id == checkedLeaves[0])[0];

            const cleanLeave = {
              _id: data._id,
              username: data.username,
              clinic: data.clinicsolo.username,
              reason: data.reason,
              dateStart: data.dateStart,
              dateEnd: data.dateEnd,
              startTime: data.startTime,
              endTime: data.endTime,
              payment: data.payment,
              note: data.note,
              status: data.status,
            };
            navigate("OperationsLeave", { selectedLeave: cleanLeave });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedLeaves.length < 1) return null;
            checkedLeaves.forEach(async (LeaveId) => {
              const { ok } = await deleteLeave(LeaveId);
              if (ok) {
                console.log("deleted");
                callForLeaves();
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
          icon="cloud-upload"
          style={{ marginLeft: 8, backgroundColor: "cyan" }}
          color="black"
        />
        <IconButton
          icon="cloud-download"
          style={{ marginLeft: 8, backgroundColor: "7AB356" }}
          color="black"
        />
        <IconButton
          icon="archive"
          style={{ marginLeft: 8, backgroundColor: "gray" }}
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

export default Leaves;
