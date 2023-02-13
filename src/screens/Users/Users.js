import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text,Image  } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteUser, getUsers } from "../../api/users";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsUser from "./OperationsUser";
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
  'Prefix':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Profile':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item?.name }</Text>
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
  'dateBirth': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ dayjs(item).format("DD-MM-YYYY") }</Text>
      </View>
    )
  },
  'Email': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Gender': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'FirstName': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Initials': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'LastName': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Address1': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Address2': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Address3': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Zip': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'City': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'State': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Country': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Phone': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Mobile': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Skype': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Mode': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'About': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
   }
  // 'Avatar': {
  //   cellWidth: 150,
  //   component: item => (
  //     <View>
  //       <Avatar source={{ uri: item }} size={38} rounded={true} />
  //     </View>
  //   )
  // }
}

export function Users() {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [dataWrapping, setDataWrapping] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
      const callForUsers = async () => {
      setCheckedUsers([]);
      setUsers([]);
      setLoading(true);
      const { ok, data } = await getUsers();
      if (ok) {
        const filterUsers = data.map((user) => {
          return {
            id: user._id,
            User : {
              name: user?.username,
              img: user?.imageSrc
            },
            Username: user?.username,
            Prefix: user?.prefix,
            Profile: user?.role,
            Status: user?.status,
            dateBirth: user?.dateBirth,
            Email: user?.email,
            Gender: user?.gender,
            FirstName: user?.contactName?.first,
            Initials: user?.contactName?.initials,
            LastName: user?.contactName?.last,
            Address1: user?.Address?.address1,
            Address2: user?.Address?.address2,
            Address3: user?.Address?.address3,
            Zip: user?.Address?.zip,
            City: user?.Address?.city,
            State: user?.Address?.state,
            Country: user?.Address?.country,
            Phone: user?.phones?.phone,
            Mobile: user?.phones?.mobile,
            Skype: user?.phones?.skype,
            Mode: user?.mood,
            About: user?.about,
            //Avatar: user?.imageSrc,
          };
        });
        setDataWrapping(tableWrapper);
        setUsers(filterUsers);
        setLoading(false);
      }
    };
      callForUsers();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = users.filter(
      (el) =>
        `${el.Username}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedUsers(filtered);
  };

  if (showModal) {
    return (
      <OperationsUser
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
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
      <Header back title={"Users"} />
      <IconBar
        setShowModal={setShowModal}
        checkedUsers={checkedUsers}
        setCheckedUsers={setSelectedUser}
        setSelectedUser={setSelectedUser}
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
            setSearchedUsers();
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
              searchedUsers && searchedUsers.length > 0
                ? searchedUsers 
                : users
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={dataWrapping}
            onCheck={setCheckedUsers}
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
  checkedUsers,
  setCheckedUsers,
  setSelectedUser,
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
            navigation.navigate("OperationsUser", { selectedUser: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedUsers.length < 1) {
              return;
            }
            const data = users.filter(
              (user) => user._id == checkedUsers[0]
            )[0];
            const cleanUser = {
              _id: data._id,
              prefix: data.prefix,
              username: data.username,
              status:data.status,			  
              role: data.role,
              Avatar: data.imageSrc,
              Username: data.username,
              BirthDate: dayjs(data.dateBirth).format("YYYY-MM-DD"),
              Email: data.email,
              Gender: data.gender,
              FirstName: data.contactName.first,
              Initials: data.contactName.initials,
              LastName: data.contactName.last,
              Address1: data.Address.address1,
              Address2: data.Address.address2,
              Address3: data.Address.address3,
              "Zip Code": data.Address.zip,
              City: data.Address.city,
              State: data.Address.state,
              Country: data.Address.country,
              Phone: data.phones.phone,
              Mobile: data.phones.mobile,
              Skype: data.phones.skype,
              Mood: data.mood,
              About: data.about,
            };
            navigate("UserProfile", { selectedUser: cleanUser });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedUsers.length < 1) {
              return;
            }
            const data = users.filter((user) => user.id == checkedUsers[0])[0];
            data.Username = data.User.name;
            data.Avatar = data.User.img;
            updatePress();
            navigation.navigate("OperationsUser", { selectedUser: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedUsers.length < 1) return null;
            checkedUsers.forEach((userId) => {
              deleteUser(userId).then((res) => console.log(res))
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
          style={{ marginLeft: 8, backgroundColor: "#0af" }}
          color="white"
        />
        <IconButton
          icon="chat"
          style={{ marginLeft: 8, backgroundColor: "#0af" }}
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