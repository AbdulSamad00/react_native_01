import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteShift, getShifts } from "../../api/shifts";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const Shifts = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedShifts, setSearchedShifts] = useState([]);
  const [Shifts, setShifts] = useState();
  const [allShifts, setAllShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedShifts, setCheckedShifts] = useState([]);

  const callForShifts = async () => {
    setCheckedShifts([]);
    setShifts([]);
    setLoading(true);
    const { ok, data } = await getShifts();
    if (ok) {
      setAllShifts(data);
      const filterShifts = data.map((Shift) => {
        console.log(Shift.userNo);
        return {
          id: Shift._id,
          Avatar: Shift.userNo.imageSrc,
          // Username: Shift.userNo.username,  
          Clinic: Shift.userNo.username,		  
          Name: Shift.name,
          Department: Shift.department,		  
          Location: Shift.location,		  		  
          StartTime: Shift.startTime,
          EndTime: Shift.endTime,
          Status: Shift.status,		  
        };
      });
      // console.log(filterShifts[0])
      setShifts(filterShifts);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForShifts();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = Shifts.filter(
      (el) =>
        `${el.Shiftname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedShifts(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <Header back title={"Shifts"} />
      <IconBar
        checkedShifts={checkedShifts}
        Shifts={allShifts}
        callForShifts={callForShifts}
      />
      <Searchbar
        style={styles.search}
        underlineColorAndroid="white"
        placeholder="Search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={(search) => {
          if (search.length < 1) {
            setSearchedShifts();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {Shifts && Shifts.length > 0 && (
        <Table
          tableData={
            searchedShifts && searchedShifts.length > 0 ? searchedShifts : Shifts
          }
          showCheckbox
          checked={checkedShifts}
          setChecked={setCheckedShifts}
        />
      )}
    </View>
  );
};

const IconBar = ({ checkedShifts, Shifts, callForShifts }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsShift");
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedShifts.length < 1) {
              navigate("OperationsShift");
            }

            const data = Shifts.filter((Shift) => Shift._id == checkedShifts[0])[0];

            const cleanShift = {
              _id: data._id,
              name: data.name,
              department: data.department,
              startTime: data.startTime,
              endTime: data.endTime,			  
              status: data.status,
            };
            navigate("OperationsShift", { selectedShift: cleanShift });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedShifts.length < 1) return null;
            checkedShifts.forEach(async (ShiftId) => {
              const { ok } = await deleteShift(ShiftId);
              if (ok) {
                console.log("deleted");
                callForShifts();
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

export default Shifts;
