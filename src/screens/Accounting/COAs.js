import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteCOA, getCOA, getCOAs } from "../../api/coas";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";


export default function COAs() {
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedCOAs, setSearchedCOAs] = useState([]);
  const [COAs, setCOAs] = useState();
  const [selectedCOA, setSelectedCOA] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedCOAs, setCheckedCOAs] = useState([]);

  useEffect(() => {
    const callForCOAs = async () => {
      setCheckedCOAs([]);
      setCOAs([]);
      setLoading(true);
      const { ok, data } = await getCOAs();
      if (ok) {
        const filterCOAs = data.map((COA) => {
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
        setCOAs(filterCOAs);
        setLoading(false);
      }
    };
    callForCOAs();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = coas.filter(
      (el) =>
        `${el.COAname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedCOAs(filtered);
  };

  // if (showModal) {
  //   return (
  //     <AddOrEditCOA
  //       selectedCOA={selectedCOA}
  //       setSelectedCOA={setSelectedCOA}
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
      <Header back title={"COAs"} />
      <IconBar
        //setShowModal={setShowModal}
        checkedCOAs={checkedCOAs}
        setCheckedCOAs={setSelectedCOA}
        //setSelectedCOA={setSelectedCOA}
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
            setSearchedCOAs();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {coas && coas.length > 0 && (
        <Table
          tableData={
            searchedCOAs && searchedCOAs.length > 0 ? searchedCOAs : COAs
          }
          showCheckbox
          checked={checkedCOAs}
          setChecked={setCheckedCOAs}
        />
      )}
    </View>
  );
}

const IconBar = ({
  //setShowModal,
  checkedCOAs,
  setCheckedCOAs,
  //setSelectedCOA,
  setUpdate,
  update,
}) => {
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {}
           //redirect
          }
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
            if (checkedCOAs.length < 1) {
             //redirect to new
            }

            // const { ok, data } = await getCOA(checkedCOAs[0]);
            // if (ok) {
            //   const cleanCOA = {
            //     _id: data._id,
            //     COANo: data.COANo,
            //     code: data.code,				
            //     Name: data.Name,
            //     Category: data.Category,
            //     dueDate: data.dueDate,
            //     description: data.description,
            //     balanceType: data.balanceType,
            //     natureContra: data.natureContra,
            //     createdOn: data.createdOn,
            //     note: data.note,
            //     status: data.status,				
            //   };
            //   setSelectedCOA(cleanCOA);
            //   setShowModal(true);
            // }
            
            // redirect  id= checkedCOAs[0]


          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedCOAs.length < 1) return null;
            checkedCOAs.forEach(async (COAId) => {
              const { ok } = await deleteCOA(COAId);
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
