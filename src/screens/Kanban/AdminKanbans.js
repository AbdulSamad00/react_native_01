import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteKanban, getKanban, getKanbans } from "../../api/kanbans";
import ActivityIndicator from "./../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";
import OperationsKanban from "./OperationsKanban";
import NavBar from "../../components/NavBar6";
export default function AdminKanbans() {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedKanbans, setSearchedKanbans] = useState([]);
  const [kanbans, setKanbans] = useState();
  const [allKanbans, setAllKanbans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedKanbans, setCheckedKanbans] = useState([]);

  useEffect(() => {
    const callForKanbans = async () => {
      setCheckedKanbans([]);
      setKanbans([]);
      setLoading(true);
      const { ok, data } = await getKanbans();
      if (ok) {
        const filterKanbans = data.map((kanban) => {
          return {
            id: kanban._id,
            avatar:kanban.user.imageSrc,			
            Username: kanban.username,			
            KanbanNo: kanban.kanbanNo,			
            Name: kanban.name,
            Narrative: kanban.narrative,
            BusinessName: kanban.businessName,			
            Department: kanban.department,
            "Sub-department": kanban.subDepartment,			
            Location: kanban.location,
            Category: kanban.category,
            Priority: kanban.priority,			
            Deadline: kanban.deadline,
		    DocumentNo: kanban.documentNo,			
            Field: kanban.field,
            Tags: kanban.tags,
            "Assigned To": kanban.assignedTo,			
           "Shared To": kanban.sharedTo,
            Review: kanban.review,				
			Reference:kanban.reference,
            Note:kanban.note,
            CreatedOn:kanban.createdOn,
            Status:kanban.status,			
          };
        });
        setKanbans(filterKanbans);
        setLoading(false);
      }
    };
    callForKanbans();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = kanbans.filter(
      (el) =>
        `${el.Kanbanname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedKanbans(filtered);
  };

  if (showModal) {
    return (
      <OperationsKanban
        selectedKanban={selectedKanban}
        setSelectedKanban={setSelectedKanban}
        visible={showModal}
        setVisible={setShowModal}
        setUpdate={setUpdate}
        update={update}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
       <Header back title={"Kanbans"} /> 
      <NavBar />
      <IconBar
        checkedKanbans={checkedKanbans}
        kanbans={allKanbans}
        callForKanbans={callForKanbans}
      />
      <Searchbar
        style={styles.search}
        underlineColorAndroid="white"
        placeholder="Search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={(search) => {
          if (search.length < 1) {
            setSearchedKanbans();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {kanbans && kanbans.length > 0 && (
        <Table
          tableData={
            searchedKanbans && searchedKanbans.length > 0 ? searchedKanbans : kanbans
          }
          showCheckbox
          checked={checkedKanbans}
          setChecked={setCheckedKanbans}
        />
      )}
    </View>
  );
};

const IconBar = ({ checkedKanbans, kanbans, callForKanbans }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsKanban");
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedKanbans.length < 1) {
              navigate("OperationsKanban");
            }

            const data = kanbans.filter((kanban) => kanban._id == checkedKanbans[0])[0];

            const cleanKanban = {
            id: kanban._id,
            avatar:kanban.user.imageSrc,			
            Username: kanban.username,			
            KanbanNo: kanban.kanbanNo,			
            Name: kanban.name,
            Narrative: kanban.narrative,
            BusinessName: kanban.businessName,			
            Department: kanban.department,
            "Sub-department": kanban.subDepartment,			
            Location: kanban.location,
            Category: kanban.category,
            Priority: kanban.priority,			
            Deadline: kanban.deadline,
		    DocumentNo: kanban.documentNo,			
            Field: kanban.field,
            Tags: kanban.tags,
            "Assigned To": kanban.assignedTo,			
            "Shared To": kanban.sharedTo,
            Review: kanban.review,				
			Reference:kanban.reference,
            Note:kanban.note,
            CreatedOn:kanban.createdOn,
            Status:kanban.status,			
            };
            navigate("OperationsKanban", { selectedKanban: cleanKanban });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedKanbans.length < 1) return null;
            checkedKanbans.forEach(async (kanbanId) => {
              const { ok } = await deleteKanban(kanbanId);
              if (ok) {
                console.log("deleted");
                callForKanbans();
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
          icon="lock"
          style={{ marginLeft: 8, backgroundColor: "red" }}
          color="white"
        />
        <IconButton
          icon="lock-open"
          style={{ marginLeft: 8, backgroundColor: "green" }}
          color="white"
        />
        <IconButton
          icon="hand-right"
          style={{ marginLeft: 8, backgroundColor: "red" }}
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


