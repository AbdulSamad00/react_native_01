import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text,Image  } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteCOA, getCOA, getCOAs } from "../../api/coas";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsCOA from "./OperationsCOA";
import { Avatar } from "react-native-elements";
import { borderWidth } from "styled-system";
import { useNavigation } from "@react-navigation/native";

const tableWrapper = {
  // 'COA':{
  //   cellWidth: 150,
  //   component: item => (
  //     <View style={{ 
  //       flexDirection: "row",
  //       justifyContent: "flex-start",
  //       alignItems: "center",
  //       width: "100%",
  //     }}>
  //       {
  //         item.img && <Avatar source={{ uri: item.img }} size={38} rounded={true} />
  //       }
  //       <Text style={{ marginLeft: 5 }}>{ item.name }</Text>
  //     </View>
  //   )
  // },
  'COA':{
    cellWidth: 150,
    component: item => (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        {item.img ? (
          <Image
            source={{ uri: item.img }}
            style={{
              marginRight: 10,
              width: 25,
              height: 25,
              borderRadius: 25 / 2
            }}
          />
        ) : null}

        <Text>{item.name}</Text>
      </View>
    )
  },
  'COANo':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Code':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Name':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item?.name }</Text>
      </View>
    )
  },
  'Category': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'SubCategory': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Description': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'NatureContra': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'BalanceType': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Note': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Status':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  
  // 'Avatar': {
  //   cellWidth: 150,
  //   component: item => (
  //     <View>
  //       <Avatar source={{ uri: item }} size={38} rounded={true} />
  //     </View>
  //   )
  // }
}

export function COAs() {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedCOAs, setSearchedCOAs] = useState([]);
  const [users, setCOAs] = useState();
  const [selectedCOA, setSelectedCOA] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedCOAs, setCheckedCOAs] = useState([]);
  const [dataWrapping, setDataWrapping] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
      const callForCOAs = async () => {
      setCheckedCOAs([]);
      setCOAs([]);
      setLoading(true);
      const { ok, data } = await getCOAs();
      if (ok) {
        const filterCOAs = data.map((user) => {
          return {
            id:COA._id,
            COANo:COA.COANo,
            Code:COA.code,
            Name:COA.name,
            Category:COA.category,
            SubCategory:COA.subCategory,
            Description:COA.description,
            NatureContra:COA.natureContra,
            BalanceType:COA.balanceType,
            Note:COA.note,
            CreatedOn:COA.createdOn,
            Status:COA.status,
          };
        });
        setDataWrapping(tableWrapper);
        setCOAs(filterCOAs);
        setLoading(false);
      }
    };
      callForCOAs();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = users.filter(
      (el) =>
        `${el.COANo}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedCOAs(filtered);
  };

  if (showModal) {
    return (
      <OperationsCOA
        selectedCOA={selectedCOA}
        setSelectedCOA={setSelectedCOA}
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
      <Header back title={"COAs"} />
      <IconBar
        setShowModal={setShowModal}
        checkedCOAs={checkedCOAs}
        setCheckedCOAs={setSelectedCOA}
        setSelectedCOA={setSelectedCOA}
        setUpdate={setUpdate}
        update={update}
        users={users}
        navigation={navigation}
        updatePress={() => {
          setUpdate(!update);
        }}
      />
      <Searchbar
        style={styles.search}
        underlineColorAndroid="white"
        placeholder="Search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={(search) => {
          if (search.length < 1) {
            setSearchedCOAs();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      <ScrollView>
        { users && users.length > 0 && (
          <Table
            data={
              searchedCOAs && searchedCOAs.length > 0
                ? searchedCOAs 
                : users
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={dataWrapping}
            onCheck={setCheckedCOAs}
            headerStyle={{
              backgroundColor: 'fff0bc',
              borderBottomWidth: 1,
              borderBottomColor: 'dcdcdc',
            }}
            oddRowStyle={{
              backgroundColor: 'white'
            }}
            evenRowStyle={{
              backgroundColor: 'efefef'
            }}
            containerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: 'dcdcdc'
            }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const IconBar = ({
  setShowModal,
  checkedCOAs,
  setCheckedCOAs,
  setSelectedCOA,
  users,
  setUpdate,
  update,
  navigation,
  updatePress
}) => {
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            setUpdate(!update);
            updatePress();
            navigation.navigate("OperationsCOA", { selectedCOA: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedCOAs.length < 1) {
              return;
            }
            const data = users.filter(
              (user) => user._id == checkedCOAs[0]
            )[0];
            const cleanCOA = {
				id:COA._id,
				COANo:COA.COANo,
				Code:COA.code,
				Name:COA.name,
				Category:COA.category,
				SubCategory:COA.subCategory,
				Description:COA.description,
				NatureContra:COA.natureContra,
				BalanceType:COA.balanceType,
				Note:COA.note,
				CreatedOn:COA.createdOn,
				Status:COA.status,			  			  
            };
            navigate("COAProfile", { selectedCOA: cleanCOA });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedCOAs.length < 1) {
              return;
            }
            const data = users.filter((user) => user.id == checkedCOAs[0])[0];
            data.COANo = data.COA.name;
            data.Avatar = data.COA.img;
            updatePress();
            navigation.navigate("OperationsCOA", { selectedCOA: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedCOAs.length < 1) return null;
            checkedCOAs.forEach((userId) => {
              deleteCOA(userId).then((res) => console.log(res))
            });
            updatePress();
            setUpdate(!update);
          }}
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