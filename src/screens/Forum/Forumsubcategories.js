import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteForumSubcategory, getForumSubcategories } from "../../api/forumsubcategories";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const ForumSubcategories = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedForumSubcategories, setSearchedForumSubcategories] = useState([]);
  const [forumsubcategories, setForumSubcategories] = useState();
  const [allForumSubcategories, setAllForumSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedForumSubcategories, setCheckedForumSubcategories] = useState([]);
  const callForForumSubcategories = async () => {
    setCheckedForumSubcategories([]);
    setForumSubcategories([]);
    setLoading(true);
    const { ok, data } = await getForumSubcategories();
   
    if (ok) {
      setAllForumSubcategories(data);
      const filterForumSubcategories = data.map((topic) => {
        
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
      setForumSubcategories(filterForumSubcategories);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForForumSubcategories();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = topics.filter(
      (el) =>
        `${el.ForumSubcategoryname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedForumSubcategories(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#00B7DD"}  />

        <ActivityIndicator visible={loading} />
        <Header back name={"ForumSubcategories"}rightComponent={()=>{}} />
        <IconBar
          checkedForumSubcategories={checkedForumSubcategories}
          topics={allForumSubcategories}
          callForForumSubcategories={callForForumSubcategories}
        />
        <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedForumSubcategories();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />
        {topics && topics.length > 0 && (
          <Table
            tableData={
              searchedForumSubcategories && searchedForumSubcategories.length > 0 ? searchedForumSubcategories : topics
            }
            showCheckbox
            checked={checkedForumSubcategories}
            setChecked={setCheckedForumSubcategories}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedForumSubcategories, topics, callForForumSubcategories }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsForumSubcategory", { selectedForumSubcategory: {}});
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
            if (checkedForumSubcategories.length < 1) {
              navigate("OperationsForumSubcategory", {selectedForumSubcategory: {}});
            }

            const data = topics.filter((user) => user._id == checkedForumSubcategories[0])[0];
            const cleanForumSubcategory = {
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
            if (checkedForumSubcategories.length < 1) return null;
            checkedForumSubcategories.forEach(async (userId) => {
              const { ok } = await deleteForumcatId(userId);
              if (ok) {
                console.log("deleted");
                callForForumSubcategories();
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

export default ForumSubcategories;
