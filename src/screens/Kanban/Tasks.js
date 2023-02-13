import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,View,} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteTask, getTasks } from "../../api/tasks";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const Tasks = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedTasks, setSearchedTasks] = useState([]);
  const [tasks, setTasks] = useState();
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const callForTasks = async () => {
    setCheckedTasks([]);
    setTasks([]);
    setLoading(true);
    const { ok, data } = await getTasks();

    if (ok) {
      setAllTasks(data);
      const filterTasks = data.map((task) => {
        let names = "";
        task.participants.map((obj) => {
          names = `${names} ${names.length ? ", " : ""}${
            obj.contactName.first
          }`;
        });
        return {
            id: task._id,
            avatar:task.user.imageSrc,			
            Username: task.username,			
            TaskNo: task.taskNo,			
            Name: task.name,
            Narrative: task.narrative,
            BusinessName: task.businessName,			
            Department: task.department,
            "Sub-department": task.subDepartment,			
            Location: task.location,
            Category: task.category,
            Priority: task.priority,			
            Deadline: task.deadline,
		    DocumentNo: task.documentNo,			
            Field: task.field,
            Tags: task.tags,
            "Assigned To": task.assignedTo,			
            "Shared To": task.sharedTo,
            Review: task.review,				
			Reference:task.reference,
            Note:task.note,
            CreatedOn:task.createdOn,
            Status:task.status,			
        };
      });
      setTasks(filterTasks);
      setLoading(false);
    }
  };
  useEffect(() => {
    callForTasks();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = tasks.filter(
      (el) =>
        `${el.Taskname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedTasks(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"#00B7DD"} />

        <ActivityIndicator visible={loading} />
        <Header back title={"Tasks"} rightComponent={() => {}} />
        <IconBar
          checkedTasks={checkedTasks}
          tasks={allTasks}
          callForTasks={callForTasks}
        />
        <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedTasks();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />
        {tasks && tasks.length > 0 && (
          <Table
            tableData={
              searchedTasks && searchedTasks.length > 0
                ? searchedTasks
                : tasks
            }
            showCheckbox
            checked={checkedTasks}
            setChecked={setCheckedTasks}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedTasks, tasks, callForTasks }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsTask", { selectedTask: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "pink" }}
          color="black"
          onPress={() => {
            if (checkedTasks.length < 1) {
              return;
            }
            const data = tasks.filter(
              (user) => user._id == checkedTasks[0]
            )[0];
            const cleanTask = {
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
              share:data.share,
              review: data.review,
              reference: data.reference,
              note: data.note,
              createdOn: data.createdOn,
              status: data.status,
            };
            navigate("TaskProfile", { selectedTask: cleanTask });
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedTasks.length < 1) {
              navigate("OperationsTask", { selectedTask: {} });
            }

            const data = tasks.filter(
              (user) => user._id == checkedTasks[0]
            )[0];
            const cleanTask = {
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
            navigate("OperationsTask", { selectedTask: cleanTask });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedTasks.length < 1) return null;
            checkedTasks.forEach(async (userId) => {
              const { ok } = await deleteTask(userId);
              if (ok) {
                console.log("deleted");
                callForTasks();
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

export default Tasks;
