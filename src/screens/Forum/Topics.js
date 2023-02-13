import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,View,} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteTopic, getTopics } from "../../api/topics";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const Topics = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedTopics, setSearchedTopics] = useState([]);
  const [topics, setTopics] = useState();
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedTopics, setCheckedTopics] = useState([]);
  const callForTopics = async () => {
    setCheckedTopics([]);
    setTopics([]);
    setLoading(true);
    const { ok, data } = await getTopics();

    if (ok) {
      setAllTopics(data);
      const filterTopics = data.map((topic) => {
        let names = "";
        topic.participants.map((obj) => {
          names = `${names} ${names.length ? ", " : ""}${
            obj.contactName.first
          }`;
        });
        return {
                id: topic._id,
                avatar:topic.user?.imageSrc,		
                username:topic.user?.username,
                TopicNo: topic.topicNo,			
                Name: topic.name,
                Narrative: topic.narrative,				
                BusinessName: topic.businessName,			
                Category: topic.category,
                SubCategory: topic.subCategory,			
                Tags: topic.tags,
                view: topic.view,
                Note:topic.note,
                CreatedOn: moment(topic.createdOn).format("DDD-MM-YYYY"),
                Status:topic.status,			
        };
      });
      setTopics(filterTopics);
      setLoading(false);
    }
  };
  useEffect(() => {
    callForTopics();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = topics.filter(
      (el) =>
        `${el.Topicname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedTopics(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"#00B7DD"} />

        <ActivityIndicator visible={loading} />
        <Header back title={"Topics"} rightComponent={() => {}} />
        <IconBar
          checkedTopics={checkedTopics}
          topics={allTopics}
          callForTopics={callForTopics}
        />
        <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedTopics();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />
        {topics && topics.length > 0 && (
          <Table
            tableData={
              searchedTopics && searchedTopics.length > 0
                ? searchedTopics
                : topics
            }
            showCheckbox
            checked={checkedTopics}
            setChecked={setCheckedTopics}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedTopics, topics, callForTopics }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsTopic", { selectedTopic: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "pink" }}
          color="black"
          onPress={() => {
            if (checkedTopics.length < 1) {
              return;
            }
            const data = topics.filter(
              (user) => user._id == checkedTopics[0]
            )[0];
            const cleanTopic = {
              _id:  data._id,
              name: data.name,
              narrative: data.narrative,
              category:   data.category,
              subCategory: data.subCategory,
              tags: data.tags,
              view: data.view,
              createdOn: data.createdOn,
              status: data.status,
            };
            navigate("TopicBody", { selectedTopic: cleanTopic });
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedTopics.length < 1) {
              navigate("OperationsTopic", { selectedTopic: {} });
            }

            const data = topics.filter(
              (user) => user._id == checkedTopics[0]
            )[0];
            const cleanTopic = {
              _id:  data._id,
              name: data.name,
              narrative: data.narrative,
              category:   data.category,
              subCategory: data.subCategory,
              tags: data.tags,
              view: data.view,
              createdOn: data.createdOn,
              status: data.status,
            };
            navigate("OperationsTopic", { selectedTopic: cleanTopic });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedTopics.length < 1) return null;
            checkedTopics.forEach(async (userId) => {
              const { ok } = await deleteTopic(userId);
              if (ok) {
                console.log("deleted");
                callForTopics();
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

export default Topics;
