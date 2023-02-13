import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text,Image  } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteArea, getAreas } from "../../api/areas";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsArea from "./OperationsArea";
import { Avatar } from "react-native-elements";
import { borderWidth } from "styled-system";
import { useNavigation } from "@react-navigation/native";

const tableWrapper = {
  // 'User':{
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
  'User':{
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
  'Username':{
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
  'Coordinates': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
}

export function Areas() {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedAreas, setSearchedAreas] = useState([]);
  const [Areas, setAreas] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedAreas, setCheckedAreas] = useState([]);
  const [dataWrapping, setDataWrapping] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
      const callForAreas = async () => {
      setCheckedAreas([]);
      setAreas([]);
      setLoading(true);
      const { ok, data } = await getAreas();
      if (ok) {
        const filterAreas = data.map((Area) => {
          return {
            id: User._id,
            User : {
              name: User?.Username,
              img: User?.imageSrc
            },
            Username: User?.username,
            Name: Area?.name,            
            Description: Area?.description,
            Coordinates: Area?.coordinates,
          };
        });
        setDataWrapping(tableWrapper);
        setAreas(filterAreas);
        setLoading(false);
      }
    };
      callForAreas();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = Areas.filter(
      (el) =>
        `${el.Areaname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedAreas(filtered);
  };

  if (showModal) {
    return (
      <OperationsArea
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
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
      <Header back title={"Areas"} />
      <IconBar
        setShowModal={setShowModal}
        checkedAreas={checkedAreas}
        setCheckedAreas={setSelectedArea}
        setSelectedArea={setSelectedArea}
        setUpdate={setUpdate}
        update={update}
        Areas={Areas}
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
            setSearchedAreas();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      <ScrollView>
        { Areas && Areas.length > 0 && (
          <Table
            data={
              searchedAreas && searchedAreas.length > 0
                ? searchedAreas 
                : Areas
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={dataWrapping}
            onCheck={setCheckedAreas}
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
  checkedAreas,
  setCheckedAreas,
  setSelectedArea,
  Areas,
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
            navigation.navigate("OperationsArea", { selectedArea: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedAreas.length < 1) {
              return;
            }
            const data = Areas.filter(
              (Area) => Area._id == checkedAreas[0]
            )[0];
            const cleanArea = {
              _id: data._id,
              Username: data.username,
              Name: data.name,
              Description: data.description,
              Coordinates: data.coordinates,
            };
            navigate("AreaProfile", { selectedArea: cleanArea });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedAreas.length < 1) {
              return;
            }
            const data = Areas.filter((Area) => Area.id == checkedAreas[0])[0];
            data.Areaname = data.Area.name;
            data.Avatar = data.Area.img;
            updatePress();
            navigation.navigate("OperationsArea", { selectedArea: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedAreas.length < 1) return null;
            checkedAreas.forEach((AreaId) => {
              deleteArea(AreaId).then((res) => console.log(res))
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