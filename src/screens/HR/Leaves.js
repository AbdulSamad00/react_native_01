import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteLeave, getLeaves } from "../../api/leaves";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const Leaves = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedLeaves, setSearchedLeaves] = useState([]);
  const [leaves, setLeaves] = useState();
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
      const filterLeaves = data.map((leave) => {
        
        let names='';
        leave.participants.map((obj)=>{
          names=`${names} ${names.length?', ':''}${obj.contactName.first}`
        })
     
        return {
                id: leave._id,
                avatar:leave.user?.imageSrc,		
                username:leave.user?.username,
                LeaveNo: leave.leaveNo,			
                Name: leave.name,
                StartDate: leave.startDate,				
                EndDate: leave.endDate,								
                StartTime: leave.startTime,				
                EndTime: leave.endTime,												
                BusinessName: leave.businessName,			
                Department: leave.department,
                Reason: leave.reason,				
                Description: leave.description,
                Reference:leave.reference,
                Note:leave.note,
                CreatedOn: moment(leave.createdOn).format("DDD-MM-YYYY"),
                Status:leave.status,		
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
    const filtered = leaves.filter(
      (el) =>
        `${el.Leavename}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedLeaves(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#00B7DD"}  />

        <ActivityIndicator visible={loading} />
        <Header back title={"Leaves"}rightComponent={()=>{}} />
        <IconBar
          checkedLeaves={checkedLeaves}
          leaves={allLeaves}
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
        {leaves && leaves.length > 0 && (
          <Table
            tableData={
              searchedLeaves && searchedLeaves.length > 0 ? searchedLeaves : leaves
            }
            showCheckbox
            checked={checkedLeaves}
            setChecked={setCheckedLeaves}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedLeaves, leaves, callForLeaves }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsLeave", { selectedLeave: {}});
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
            if (checkedLeaves.length < 1) {
              navigate("OperationsLeave", {selectedLeave: {}});
            }

            const data = leaves.filter((user) => user._id == checkedLeaves[0])[0];
            const cleanLeave = {
                _id: data._id,
              avatar: data.avatar,			  
              username: data.username,			  
              name: data.name,
              narrative: data.narrative,
              businessName: data.businessName,
              department:   data.department,
              description: data.description,
              leaveNo: data.leaveNo,
              startDate: data.startDate,
              startTime: data.startTime,			  
              endDate: data.endDate,
              endTime: data.endTime,			  			  
              reason: data.reason,			  
              reference: data.reference,
              note: data.note,
              createdOn: data.createdOn,
              status: data.status,
            };
            navigate("OperationsLeave", { selectedLeave: cleanLeave });
            }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8,backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedLeaves.length < 1) return null;
            checkedLeaves.forEach(async (userId) => {
              const { ok } = await deleteLeave(userId);
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
