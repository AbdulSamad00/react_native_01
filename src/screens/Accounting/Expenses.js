import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteExpense, getExpense, getExpenses } from "../../api/expenses";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";


export default function Expenses({navigation}) {
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedExpenses, setSearchedExpenses] = useState([]);
  const [expenses, setExpenses] = useState();
  const [selectedExpense, setSelectedExpense] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedExpenses, setCheckedExpenses] = useState([]);
 
  useEffect(() => {
    const callForExpenses = async () => {
      setCheckedExpenses([]);
      setExpenses([]);
      setLoading(true);
      const { ok, data } = await getExpenses();
      if (ok) {
        const filterExpenses = data.map((expense) => {
          return {
            id:expense._id,
            avatar:expense.user.imageSrc,
            expenseNo:expense.expenseNo,
            Currency:expense.currency,
            Amount:expense.amount,
            PaidDate:expense.paidDate,
            DueDate:expense.dueDate,
            PaidMethod:expense.paidMethod,
            TreatmentDate:expense.treatmentDate,
            Reference:expense.reference,
            Note:expense.note,
            CreatedOn:expense.createdOn,
            Status:expense.status,
          };
        });
        setExpenses(filterExpenses);
        setLoading(false);
      }
    };
    callForExpenses();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = expenses.filter(
      (el) =>
        `${el.Expensename}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedExpenses(filtered);
  };

  // if (showModal) {
  //   return (
  //     <AddOrEditExpense
  //       selectedExpense={selectedExpense}
  //       setSelectedExpense={setSelectedExpense}
  //       visible={showModal}
  //       setVisible={setShowModal}
  //       setUpdate={setUpdate}
  //       update={update}
  //     />
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <SafeAreaView/>
      <Header back rightComponent={()=>null} title={"Expenses"} />
      <IconBar
        //setShowModal={setShowModal}
        onAdd={()=>navigation.navigate('OperationsExpense')}
        checkedExpenses={checkedExpenses}
        setCheckedExpenses={setSelectedExpense}
        //setSelectedExpense={setSelectedExpense}
        setUpdate={setUpdate}
        update={update}
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
      {expenses && expenses.length > 0 && (
        <Table
          tableData={
            searchedExpenses && searchedExpenses.length > 0 ? searchedExpenses : expenses
          }
          showCheckbox
          checked={checkedExpenses}
          setChecked={setCheckedExpenses}
        />
      )}
    </View>
  );
}

const IconBar = ({
  //setShowModal,
  checkedExpenses,
  setCheckedExpenses,
  //setSelectedExpense,
  setUpdate,
  update,
  onAdd
}) => {
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => onAdd()}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
        />
		
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedExpenses.length.length === 0) {
              return;
            }

            const { ok, data } = await getExpense(checkedExpenses[0]);
            if (ok) {
              const cleanExpense = {
                _id: data._id,
				avatar:expense.user.imageSrc,
				expenseNo:expense.expenseNo,
				Currency:expense.currency,
				Amount:expense.amount,
				PaidDate:expense.paidDate,
				DueDate:expense.dueDate,
				PaidMethod:expense.paidMethod,
				TreatmentDate:expense.treatmentDate,
				Reference:expense.reference,
				Note:expense.note,
				Status:expense.status,
              };
              navigation.navigate("OperationsExpense", {
                selectedExpense: cleanExpense,
              });
            }
          }}
        />

        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedExpenses.length < 1) return null;
            checkedExpenses.forEach(async (expenseId) => {
              const { ok } = await deleteExpense(expenseId);
              if (ok) {
                console.log("deleted");
              }
            });

            setUpdate(!update);
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
