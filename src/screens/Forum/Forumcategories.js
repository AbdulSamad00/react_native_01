import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteForumcategory, getForumcategories } from "../../api/forumcategories";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const Forumcategories = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedForumcategories, setSearchedForumcategories] = useState([]);
  const [forumcategories, setForumcategories] = useState();
  const [allForumcategories, setAllForumcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedForumcategories, setCheckedForumcategories] = useState([]);
  const callForForumcategories = async () => {
    setCheckedForumcategories([]);
    setForumcategories([]);
    setLoading(true);
    const { ok, data } = await getForumcategories();
   
    if (ok) {
      setAllForumcategories(data);
      const filterForumcategories = data.map((topic) => {
        
        let names='';
        topic.participants.map((obj)=>{
          names=`${names} ${names.length?', ':''}${obj.contactName.first}`
        })
     
        return {
                id: topic._id,
                avatar:topic.user?.imageSrc,		
                username:topic.user?.username,
                Name: topic.name,
                Description: topic.description,				
                catId: topic.catId,			
                LastPost: topic.lastPost,
                lastTopic: topic.lastTopic,
                Status:topic.status,			
                // "Shared To": topic.sharedTo.username,
        };
      });
      setForumcategories(filterForumcategories);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForForumcategories();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = topics.filter(
      (el) =>
        `${el.Forumcategoryname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedForumcategories(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#00B7DD"}  />

        <ActivityIndicator visible={loading} />
        <Header back name={"Forumcategories"}rightComponent={()=>{}} />
        <IconBar
          checkedForumcategories={checkedForumcategories}
          topics={allForumcategories}
          callForForumcategories={callForForumcategories}
        />
        <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedForumcategories();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />
        {topics && topics.length > 0 && (
          <Table
            tableData={
              searchedForumcategories && searchedForumcategories.length > 0 ? searchedForumcategories : topics
            }
            showCheckbox
            checked={checkedForumcategories}
            setChecked={setCheckedForumcategories}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedForumcategories, topics, callForForumcategories }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsForumcategory", { selectedForumcategory: {}});
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
            if (checkedForumcategories.length < 1) {
              navigate("OperationsForumcategory", {selectedForumcategory: {}});
            }

            const data = topics.filter((user) => user._id == checkedForumcategories[0])[0];
            const cleanForumcategory = {
              _id:  data._id,
              name: data.name,
              description: data.description,
              catId:   data.catId,
              lastPost: data.lastPost,
              lastTopic: data.lastTopic,
              status: data.status,
            };
            navigate("OperationsForumcatId", { selectedForumcatId: cleanForumcatId });
            }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8,backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedForumcategories.length < 1) return null;
            checkedForumcategories.forEach(async (userId) => {
              const { ok } = await deleteForumcatId(userId);
              if (ok) {
                console.log("deleted");
                callForForumcategories();
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

export default Forumcategories;
