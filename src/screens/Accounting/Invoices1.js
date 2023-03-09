import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text,Image  } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteInvoice, getInvoice, getInvoices } from "../../api/invoices";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsInvoice from "./OperationsInvoice";
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
   
  'InvoiceNo':{
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
  'DueDate': {
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

export function Invoices() {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedInvoices, setSearchedInvoices] = useState([]);
  const [users, setInvoices] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedInvoices, setCheckedInvoices] = useState([]);
  const [dataWrapping, setDataWrapping] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
      const callForInvoices = async () => {
      setCheckedInvoices([]);
      setInvoices([]);
      setLoading(true);
      const { ok, data } = await getInvoices();
      if (ok) {
        const filterInvoices = data.map((invoice) => {
          return {
            id: invoice._id,
            Invoice : {
              name: user?.username,
              img: user?.imageSrc
            },
            Username: invoice?.username,
            InvoiceNo: invoice?.invoiceNo,
            Product: invoice?.product,
            Service: invoice?.service,
            Amount: invoice?.amount,			
            Currency: invoice?.currency,
            Status: invoice?.status,
            PaidDate: invoice?.paidDate,
            DueDate: invoice?.dueDate,			
            PaidMethod: invoice?.paidMethod,
            Reference: invoice?.reference,
            Note: invoice?.note,
            Clinic: invoice?.clinic,
            //Avatar: invoice?.imageSrc,
          };
        });
        setDataWrapping(tableWrapper);
        setInvoices(filterInvoices);
        setLoading(false);
      }
    };
      callForInvoices();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = users.filter(
      (el) =>
        `${el.Invoicename}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Amount}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedInvoices(filtered);
  };

  if (showModal) {
    return (
      <OperationsInvoice
        selectedInvoice={selectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
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
      <Header back title={"Invoices"} />
      <IconBar
        setShowModal={setShowModal}
        checkedInvoices={checkedInvoices}
        setCheckedInvoices={setSelectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
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
            setSearchedInvoices();
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
              searchedInvoices && searchedInvoices.length > 0
                ? searchedInvoices 
                : users
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={dataWrapping}
            onCheck={setCheckedInvoices}
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
  checkedInvoices,
  setCheckedInvoices,
  setSelectedInvoice,
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
            navigation.navigate("OperationsInvoice", { selectedInvoice: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedInvoices.length < 1) {
              return;
            }
            const data = users.filter(
              (user) => user._id == checkedInvoices[0]
            )[0];
            const cleanInvoice = {
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
            navigate("OperationsInvoice", { selectedInvoice: cleanInvoice });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedInvoices.length < 1) {
              return;
            }
            const data = users.filter((user) => user.id == checkedInvoices[0])[0];
            data.Invoicename = data.Invoice.name;
            data.Avatar = data.Invoice.img;
            updatePress();
            navigation.navigate("OperationsInvoice", { selectedInvoice: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedInvoices.length < 1) return null;
            checkedInvoices.forEach((userId) => {
              deleteInvoice(userId).then((res) => console.log(res))
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