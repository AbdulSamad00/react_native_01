import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,View,} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deletePost, getPosts } from "../../api/posts";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const Posts = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [posts, setPosts] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedPosts, setCheckedPosts] = useState([]);
  const callForPosts = async () => {
    setCheckedPosts([]);
    setPosts([]);
    setLoading(true);
    const { ok, data } = await getPosts();

    if (ok) {
      setAllPosts(data);
      const filterPosts = data.map((post) => {
        let names = "";
        post.participants.map((obj) => {
          names = `${names} ${names.length ? ", " : ""}${
            obj.contactName.first
          }`;
        });
        return {
                id: post._id,
                avatar:post.user?.imageSrc,		
                username:post.user?.username,
                PostNo: post.postNo,			
                Name: post.name,
                Narrative: post.narrative,				
                BusinessName: post.businessName,			
                Category: post.category,
                SubCategory: post.subCategory,			
                Tags: post.tags,
                view: post.view,
                Note:post.note,
                CreatedOn: moment(post.createdOn).format("DDD-MM-YYYY"),
                Status:post.status,			
        };
      });
      setPosts(filterPosts);
      setLoading(false);
    }
  };
  useEffect(() => {
    callForPosts();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = posts.filter(
      (el) =>
        `${el.Postname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedPosts(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"#00B7DD"} />

        <ActivityIndicator visible={loading} />
        <Header back title={"Posts"} rightComponent={() => {}} />
        <IconBar
          checkedPosts={checkedPosts}
          posts={allPosts}
          callForPosts={callForPosts}
        />
        <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedPosts();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />
        {posts && posts.length > 0 && (
          <Table
            tableData={
              searchedPosts && searchedPosts.length > 0
                ? searchedPosts
                : posts
            }
            showCheckbox
            checked={checkedPosts}
            setChecked={setCheckedPosts}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedPosts, posts, callForPosts }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsPost", { selectedPost: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "pink" }}
          color="black"
          onPress={() => {
            if (checkedPosts.length < 1) {
              return;
            }
            const data = posts.filter(
              (user) => user._id == checkedPosts[0]
            )[0];
            const cleanPost = {
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
            navigate("PostBody", { selectedPost: cleanPost });
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedPosts.length < 1) {
              navigate("OperationsPost", { selectedPost: {} });
            }

            const data = posts.filter(
              (user) => user._id == checkedPosts[0]
            )[0];
            const cleanPost = {
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
            navigate("OperationsPost", { selectedPost: cleanPost });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedPosts.length < 1) return null;
            checkedPosts.forEach(async (userId) => {
              const { ok } = await deletePost(userId);
              if (ok) {
                console.log("deleted");
                callForPosts();
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

export default Posts;
