import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteShift, getShifts } from "../../api/shifts";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const Shifts = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedShifts, setSearchedShifts] = useState([]);
  const [shifts, setShifts] = useState();
  const [allShifts, setAllShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedShifts, setCheckedShifts] = useState([]);

  const callForShifts = async () => {
    setCheckedShifts([]);
    setShifts([]);
    setLoading(true);
    const { ok, data } = await getShifts();
    console.log(data[0].sharedTo, "-- Shifts--")
    if (ok) {
      setAllShifts(data);
      const filterShifts = data.map((shift) => {
        console.log(shift.participants)
        return {
                id: shift._id,
                avatar:shift.user?.imageSrc,		
                username:shift.user?.username,
                ShiftNo: shift.shiftNo,			
                Name: shift.name,
                StartTime: shift.startTime,				
                EndTime: shift.endTime,		
                Department: shift.department,
                CreatedOn: moment(shift.createdOn).format("DDD-MM-YYYY"),
        };
      });
      setShifts(filterShifts);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForShifts();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = shifts.filter(
      (el) =>
        `${el.Shiftname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedShifts(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#00B7DD"}  />

        <ActivityIndicator visible={loading} />
        <Header back title={"Shifts"}rightComponent={()=>{}} />
        <IconBar
          checkedShifts={checkedShifts}
          shifts={allShifts}
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
        {shifts && shifts.length > 0 && (
          <Table
            tableData={
              searchedShifts && searchedShifts.length > 0 ? searchedShifts : shifts
            }
            showCheckbox
            checked={checkedShifts}
            setChecked={setCheckedShifts}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedShifts, shifts, callForShifts }) => {
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
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "pink" }}
          color="black"
        />
		
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedShifts.length < 1) {
              navigate("OperationsShift");
            }

            const data = shifts.filter((user) => user._id == checkedShifts[0])[0];

            const cleanShift = {
              _id:  data._id,
              Name: data.name,
              StartTime: data.startTime,
              EndTime: data.endTime,			  
              BusinessName: data.businessName,
              Department:   data.department,
              Location: data.location,
              createdOn: data.createdOn,
            };
            navigate("OperationsShift", { selectedShift: cleanShift });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8,backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedShifts.length < 1) return null;
            checkedShifts.forEach(async (userId) => {
              const { ok } = await deleteShift(userId);
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
