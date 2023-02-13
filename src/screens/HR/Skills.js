import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteSkill, getSkills } from "../../api/skills";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const Skills = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedSkills, setSearchedSkills] = useState([]);
  const [skills, setSkills] = useState();
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedSkills, setCheckedSkills] = useState([]);

  const callForSkills = async () => {
    setCheckedSkills([]);
    setSkills([]);
    setLoading(true);
    const { ok, data } = await getSkills();
    console.log(data[0].sharedTo, "-- Skills--")
    if (ok) {
      setAllSkills(data);
      const filterSkills = data.map((skill) => {
        console.log(skill.participants)
        return {
                id: skill._id,
                avatar:skill.user?.imageSrc,		
                username:skill.user?.username,
                SkillNo: skill.skillNo,			
                Name: skill.name,
                Level: skill.level,				
                BusinessName: skill.businessName,			
                Department: skill.department,
                Description: skill.description,
                Reference:skill.reference,
                Note:skill.note,
                CreatedOn: moment(skill.createdOn).format("DDD-MM-YYYY"),
        };
      });
      setSkills(filterSkills);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForSkills();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = skills.filter(
      (el) =>
        `${el.Skillname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedSkills(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#00B7DD"}  />

        <ActivityIndicator visible={loading} />
        <Header back title={"Skills"}rightComponent={()=>{}} />
        <IconBar
          checkedSkills={checkedSkills}
          skills={allSkills}
          callForSkills={callForSkills}
        />
        <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedSkills();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />
        {skills && skills.length > 0 && (
          <Table
            tableData={
              searchedSkills && searchedSkills.length > 0 ? searchedSkills : skills
            }
            showCheckbox
            checked={checkedSkills}
            setChecked={setCheckedSkills}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedSkills, skills, callForSkills }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsSkill");
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
            if (checkedSkills.length < 1) {
              navigate("OperationsSkill");
            }

            const data = skills.filter((user) => user._id == checkedSkills[0])[0];

            const cleanSkill = {
              _id:  data._id,
              Name: data.name,
              Level: data.level,
              BusinessName: data.businessName,
              Department:   data.department,
              Description: data.description,
              reference: data.reference,
              notes: data.notes,
              createdOn: data.createdOn,
            };
            navigate("OperationsSkill", { selectedSkill: cleanSkill });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8,backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedSkills.length < 1) return null;
            checkedSkills.forEach(async (userId) => {
              const { ok } = await deleteSkill(userId);
              if (ok) {
                console.log("deleted");
                callForSkills();
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

export default Skills;
