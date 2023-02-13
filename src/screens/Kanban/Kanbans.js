import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteKanban, getKanban, getKanbans } from "../../api/kanbans";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";
import OperationsKanban from "./OperationsKanban";

export default function Kanbans() {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedKanbans, setSearchedKanbans] = useState([]);
  const [kanbans, setKanbans] = useState();
  const [selectedKanban, setSelectedKanban] = useState();
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
      <IconBar
        setShowModal={setShowModal}
        checkedKanbans={checkedKanbans}
        setCheckedKanbans={setSelectedKanban}
        setSelectedKanban={setSelectedKanban}
        setUpdate={setUpdate}
        update={update}
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
}

const IconBar = ({
  setShowModal,
  checkedKanbans,
  setCheckedKanbans,
  setSelectedKanban,
  setUpdate,
  update,
}) => {
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsKanban", { selectedKanban: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={async () => {  if (checkedKanbans.length < 1) {
              return;
            }
            const data = kanbans.filter(
              (user) => user._id == checkedKanbans[0]
            )[0];
				const cleanKanban = {
				id: data._id,
				avatar:data.user.imageSrc,			
				Username: data.username,			
				KanbanNo: data.kanbanNo,			
				Name: data.name,
				Narrative: data.narrative,
				BusinessName: data.businessName,			
				Department: data.department,
				"Sub-department": data.subDepartment,			
				Location: data.location,
				Category: data.category,
				Priority: data.priority,			
				Deadline: data.deadline,
				DocumentNo: data.documentNo,			
				Field: data.field,
				Tags: data.tags,
				"Assigned To": data.assignedTo,			
				"Shared To": data.sharedTo,
				Review: data.review,				
				Reference:data.reference,
				Note:data.note,
				CreatedOn:data.createdOn,
				Status:data.status,			
            };
            navigate("KanbanProfile", { selectedKanban: cleanKanban });
          }}
        />
		
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedKanbans.length < 1) {
              navigate("OperationsKanban", { selectedKanban: {} });
            }

            const data = kanbans.filter(
              (user) => user._id == checkedKanbans[0]
            )[0];
            const cleanKanban = {
              _id: data._id,
              name: data.name,
              narrative: data.narrative,
              businessName: data.businessName,
              department: data.department,
              subDepartment: data.subDepartment,
              locations: data.locations,
              category: data.category,
              subCategory: data.subCategory,
              priority: data.priority,
              deadline: data.deadline,
              participants: data.participants,
              documentNo: data.documentNo,
              field: data.field,
              tags: data.tags,
              "Assigned To": data.assignedTo,
              "Shared To": data.sharedTo,
              review: data.review,
              reference: data.reference,
              note: data.note,
              createdOn: data.createdOn,
              status: data.status,
            };
            navigate("OperationsKanban", { selectedKanban: cleanKanban });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedKanbans.length < 1) return null;
            checkedKanbans.forEach(async (userId) => {
              const { ok } = await deleteKanban(userId);
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
          style={{ marginLeft: 8, backgroundColor: "#0af" }}
          color="white"
        />
        <IconButton
          icon="chat"
          style={{ marginLeft: 8, backgroundColor: "#0af" }}
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
