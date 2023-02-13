import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteSkill, getSkills } from "../../api/skills";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";
import moment from 'moment';
const Skills = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedSkills, setSearchedSkills] = useState([]);
  const [Skills, setSkills] = useState();
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedSkills, setCheckedSkills] = useState([]);

  const callForSkills = async () => {
    setCheckedSkills([]);
    setSkills([]);
    setLoading(true);
    const { ok, data } = await getSkills();
    if (ok) {
      setAllSkills(data);
      const filterSkills = data.map((skill) => {
        console.log(skill);
        return {
          id: skill._id,
          Name: skill.name,
          Department: skill.department,
          Level: skill.level,
          Reference: skill.reference,
          Status: skill.status,
          CreatedOn: moment(skill.createdOn).format('LLL'),
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
    const filtered = Skills.filter(
      (el) =>
        `${el.Skillname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedSkills(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <Header back title={"Skills"} />
      <IconBar
        checkedSkills={checkedSkills}
        Skills={allSkills}
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
      {Skills && Skills.length > 0 && (
        <Table
          tableData={
            searchedSkills && searchedSkills.length > 0 ? searchedSkills : Skills
          }
          showCheckbox
          checked={checkedSkills}
          setChecked={setCheckedSkills}
        />
      )}
    </View>
  );
};

const IconBar = ({ checkedSkills, Skills, callForSkills }) => {
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
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedSkills.length < 1) {
              navigate("OperationsSkill");
            }

            const data = Skills.filter((Skill) => Skill._id == checkedSkills[0])[0];

            const cleanSkill = {
              _id: data._id,
              username: data.username,
              clinic: data.clinicsolo.username,
              reason: data.reason,
              dateStart: data.dateStart,
              dateEnd: data.dateEnd,
              startTime: data.startTime,
              endTime: data.endTime,
              payment: data.payment,
              note: data.note,
              status: data.status,
            };
            navigate("OperationsSkill", { selectedSkill: cleanSkill });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedSkills.length < 1) return null;
            checkedSkills.forEach(async (SkillId) => {
              const { ok } = await deleteSkill(SkillId);
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

export default Skills;
