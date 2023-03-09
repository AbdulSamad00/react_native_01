import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text,Image  } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteExpense, getExpense, getExpenses } from "../../api/expenses";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsExpense from "./OperationsExpense";
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
  FirstName: {
    cellWidth: 100,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Initials: {
    cellWidth: 100,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  LastName: {
    cellWidth: 100,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
   
  'ExpenseNo':{
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Amount': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  
  'Currency':{
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
  'TreatmentDate': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ dayjs(item).format("DD-MM-YYYY") }</Text>
      </View>
    )
  },
  
  'PaidDate': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ dayjs(item).format("DD-MM-YYYY") }</Text>
      </View>
    )
  },
  
  'PaidMethod': {
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
  'Reference': {
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
  'Clinic': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Product': {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  'Service': {
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

export function Expenses() {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedExpenses, setSearchedExpenses] = useState([]);
  const [users, setExpenses] = useState();
  const [selectedExpense, setSelectedExpense] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedExpenses, setCheckedExpenses] = useState([]);
  const [dataWrapping, setDataWrapping] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
      const callForExpenses = async () => {
      setCheckedExpenses([]);
      setExpenses([]);
      setLoading(true);
      const { ok, data } = await getExpenses();
      if (ok) {
        const filterExpenses = data.map((expense) => {
          return {
            id: expense._id,
            Expense : {
              name: user?.username,
              img: user?.imageSrc
            },
            Username: expense?.username,
            ExpenseNo: expense?.expenseNo,
            Product: expense?.product,
            Service: expense?.service,
            Amount: expense?.amount,			
            Currency: expense?.currency,
            Status: expense?.status,
            PaidDate: expense?.paidDate,
            DueDate: expense?.dueDate,			
            PaidMethod: expense?.paidMethod,
            Reference: expense?.reference,
            Note: expense?.note,
            Clinic: expense?.clinic,
            //Avatar: expense?.imageSrc,
          };
        });
        setDataWrapping(tableWrapper);
        setExpenses(filterExpenses);
        setLoading(false);
      }
    };
      callForExpenses();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = users.filter(
      (el) =>
        `${el.Expensename}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Amount}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedExpenses(filtered);
  };

  if (showModal) {
    return (
      <OperationsExpense
        selectedExpense={selectedExpense}
        setSelectedExpense={setSelectedExpense}
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
      <Header back title={"Expenses"} />
      <IconBar
        setShowModal={setShowModal}
        checkedExpenses={checkedExpenses}
        setCheckedExpenses={setSelectedExpense}
        setSelectedExpense={setSelectedExpense}
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
            setSearchedExpenses();
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
              searchedExpenses && searchedExpenses.length > 0
                ? searchedExpenses 
                : users
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={dataWrapping}
            onCheck={setCheckedExpenses}
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
  checkedExpenses,
  setCheckedExpenses,
  setSelectedExpense,
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
            navigation.navigate("OperationsExpense", { selectedExpense: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedExpenses.length < 1) {
              return;
            }
            const data = users.filter(
              (user) => user._id == checkedExpenses[0]
            )[0];
            const cleanExpense = {
              _id: data._id,
              username: data.username,
              status:data.status,			  
              role: data.role,
              Avatar: data.imageSrc,
              Username: data.username,
              PaidDate: dayjs(data.paidDate).format("YYYY-MM-DD"),
			  DueDate: dayjs(data.dueDate).format("YYYY-MM-DD"),			  
              Amount: data.amount,
              Product: data.product,
              Service: data.service,			  
              Note: data.note,
              Clinic: data.clinic,
              Reference: data.reference,
            };
            navigate("OperationsExpense", { selectedExpense: cleanExpense });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedExpenses.length < 1) {
              return;
            }
            const data = users.filter((user) => user.id == checkedExpenses[0])[0];
            data.Expensename = data.Expense.name;
            data.Avatar = data.Expense.img;
            updatePress();
            navigation.navigate("OperationsExpense1", { selectedExpense: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedExpenses.length < 1) return null;
            checkedExpenses.forEach((userId) => {
              deleteExpense(userId).then((res) => console.log(res))
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