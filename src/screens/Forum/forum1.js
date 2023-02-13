/**
 * Forums Screen
 */

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";

// react native hook
import { useDeviceOrientation } from "@react-native-community/hooks";
// expo vector icons
import { AntDesign } from "@expo/vector-icons";
// Bear all forum date
import { categoryDate, Tags } from "./categorydata";

const Forum = () => {
  const { landscape } = useDeviceOrientation();
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [tagDropdown, setTagDropdown] = useState(false);
  const [searching, setSearching] = useState("");

  const handleCategoryDropdown = () => {
    setCategoryDropdown(!categoryDropdown);
    setTagDropdown(false);
  };
  const handleTagsDropdown = () => {
    setTagDropdown(!tagDropdown);
    setCategoryDropdown(false);
  };

  return (
    <View style={styles.container}>
      <Options
        handleCategory={handleCategoryDropdown}
        handleTag={handleTagsDropdown}
        ctgMode={categoryDropdown}
        tagMode={tagDropdown}
      />
      {categoryDropdown && !tagDropdown && (
        <Category_Dropdown
          arr={categoryDate}
          landscape={landscape}
          val={searching}
          doSearch={setSearching}
        />
      )}
      {tagDropdown && !categoryDropdown && (
        <Tags_Dropdown
          arr={Tags}
          landscape={landscape}
          val={searching}
          doSearch={setSearching}
        />
      )}
      <ScrollView>
        <View
          style={[
            styles.forumContainer,
            {
              flexDirection: landscape ? "row" : "column",
            },
          ]}
        >
          <View
            style={[styles.category, { width: landscape ? "50%" : "100%" }]}
          >
            <View style={styles.naming}>
              <Text style={styles.namingText}>Category</Text>
              <Text style={styles.namingText}>Topics</Text>
            </View>
            {categoryDate.map((item, index) => {
              return (
                <View key={index}>
                  <Category arr={item} />
                  {!landscape && <Latest />}
                </View>
              );
            })}
          </View>
          {landscape && (
            <View
              style={[styles.latest, { width: landscape ? "50%" : "100%" }]}
            >
              <View style={styles.naming}>
                <Text style={styles.namingText}>Latest</Text>
              </View>

              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
              <Latest />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

/**
 * *OPTIONS:
 * All Category
 * All tags
 * Latest
 * Top
 * Category
 * Docs
 * */

const Options = ({ handleCategory, handleTag, ctgMode, tagMode }) => {
  return (
    <View style={styles.btnContainer}>
      <Pressable
        style={[styles.btn, { borderWidth: 1 }]}
        onPress={handleCategory}
      >
        <Text style={styles.btnText}>all category</Text>
        {ctgMode ? (
          <AntDesign name="caretdown" color={"#222"} size={12} />
        ) : (
          <AntDesign name="caretright" color={"#222"} size={12} />
        )}
      </Pressable>
      <Pressable style={[styles.btn, { borderWidth: 1 }]} onPress={handleTag}>
        <Text style={styles.btnText}>all tags</Text>
        {tagMode ? (
          <AntDesign name="caretdown" color={"#222"} size={12} />
        ) : (
          <AntDesign name="caretright" color={"#222"} size={12} />
        )}
      </Pressable>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Latest</Text>
      </View>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Top</Text>
      </View>
      <View
        style={[styles.btn, { borderWidth: 0, backgroundColor: "#e45735" }]}
      >
        <Text style={[styles.btnText, { color: "#fff" }]}>Category</Text>
      </View>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Docs</Text>
      </View>
    </View>
  );
};

/**
 * Category_Dropdown
 * All category
 * All tags
 * */

const Category_Dropdown = ({ arr, landscape, val, doSearch }) => {
  const dropdownFiler = arr.filter((item) => {
    return item.title.toLowerCase().indexOf(val.toLowerCase()) !== -1;
  });

  return (
    <ScrollView
      style={[[styles.dropdownContainer], [landscape && { width: "50%" }]]}
    >
      <View style={styles.searchbar}>
        <TextInput
          style={styles.search}
          value={val}
          onChangeText={doSearch}
          placeholder="Search..."
        />
        <AntDesign name="search1" color={"#222"} size={18} />
      </View>
      {dropdownFiler.map((item, index) => {
        return (
          <View key={index} style={styles.dropdown}>
            <View style={styles.itemContainer}>
              <View
                style={[styles.box, { borderColor: item.borderColor }]}
              ></View>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.multiplier}>{item.times}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

/**
 * Category_Dropdown
 * All category
 * All tags
 * */
const Tags_Dropdown = ({ arr, landscape, val, doSearch }) => {
  const dropdownFiler = arr.filter((item) => {
    return item.tag.toLowerCase().indexOf(val.toLowerCase()) !== -1;
  });

  return (
    <ScrollView
      style={[[styles.dropdownContainer], [landscape && { width: "50%" }]]}
    >
      <View style={styles.searchbar}>
        <TextInput
          style={styles.search}
          value={val}
          onChangeText={doSearch}
          placeholder="Search..."
        />
        <AntDesign name="search1" color={"#222"} size={18} />
      </View>
      {dropdownFiler.map((item, index) => {
        return (
          <View key={index} style={styles.dropdown}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.tag}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

/**
 ** Category needs:  //? fullfill through parameter
 * Title
 * Description
 * Buttons Array
 * Right Border color
 */

const Category = ({ arr }) => {
  const { title, description, options, week, borderColor } = arr;
  return (
    <View style={[styles.categoryContainer, { borderLeftColor: borderColor }]}>
      <View style={styles.catgInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.list}>
          {options.length !== 0 &&
            options.map((item, index) => {
              const { name, color } = item;
              return (
                <View key={index} style={styles.buttonContainer}>
                  <View style={[styles.box, { backgroundColor: color }]}></View>
                  <Text style={styles.tagName}>{name || ""}</Text>
                </View>
              );
            })}
        </View>
      </View>
      <View style={styles.catgWeek}>
        <Text style={styles.week}>{week}</Text>
      </View>
    </View>
  );
};

const Latest = () => {
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.person_info}>
        <Image source={require("../../assets/avatar.png")} style={styles.avatar} />
        <View style={styles.person_name}>
          <Text style={[styles.title, { fontWeight: "400" }]}>
            Welcome to meta.discourse.org
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.box}></View>
            <Text style={styles.tagName}>support data-explorer</Text>
          </View>
        </View>
        <View style={styles.time}>
          <Text style={styles.week}>0</Text>
          <Text style={styles.week}>Jun 17</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 50,
    marginBottom: 100,
  },
  Text: {
    color: "#222",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    marginVertical: 5,
    flexWrap: "wrap",
  },
  btn: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  forumContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 50,
  },
  category: {
    paddingHorizontal: 10,
  },
  naming: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#cccccc",
  },
  namingText: {
    color: "#919191",
  },
  categoryContainer: {
    width: "100%",
    borderLeftWidth: 3,
    padding: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#919191",
  },
  catgInfo: {
    width: "80%",
    paddingRight: 5,
  },
  catgWeek: {
    width: "20%",
  },
  title: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 18,
  },
  list: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 8,
    height: 8,
    backgroundColor: "red",
  },
  tagName: {
    marginHorizontal: 5,
  },
  buttonText: {},
  week: {
    color: "#919191",
    fontSize: 15,
    textAlign: "right",
  },
  searchbar: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#919191",
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    width: "90%",
    padding: 5,
  },
  dropdownContainer: {
    height: 200,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  dropdown: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 5,
  },
  multiplier: {
    color: "#919191",
    fontSize: 15,
  },
  /**
   * Latest
   * */

  latest: {
    paddingHorizontal: 10,
  },
  person_info: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#919191",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    width: "15%",
  },
  person_name: {
    flexGrow: 2,
    width: "60%",
    padding: 10,
  },
  time: {
    flexGrow: 1,
    width: "20%",
  },
});

export default Forum;
