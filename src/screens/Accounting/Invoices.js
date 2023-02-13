import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteInvoice, getInvoice, getInvoices } from "../../api/invoices";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";
import moment from "moment";
import { getUser } from "../../api/users";

export default function Invoices(props) {
  const focus = useIsFocused();
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedInvoices, setSearchedInvoices] = useState([]);
  const [invoices, setInvoices] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedInvoices, setCheckedInvoices] = useState([]);
  const { navigation } = props;

  useEffect(() => {
    const callForInvoices = async () => {
      setCheckedInvoices([]);
      setInvoices([]);
      setLoading(true);
      const { ok, data } = await getInvoices();
      if (ok) {
        const filterInvoices = await Promise.all(
          data.map(async (invoice) => {
            const { data: patient } = await getUser(invoice.user);
            const fullname = `${patient?.contactName?.first} ${patient?.contactName?.last}`;
            return {
              id: invoice._id,
              avatar: patient.imageSrc,
              user: fullname,
              invoiceNo: invoice.invoiceNo,
              Currency: invoice.currency,
              Amount: invoice.amount,
              PaidDate: moment(invoice.paidDate).format("DD-MM-YYYY"),
              DueDate: moment(invoice.dueDate).format("DD-MM-YYYY"),
              PaidMethod: invoice.paidMethod,
              TreatmentDate: moment(invoice.treatmentDate).format("DD-MM-YYYY"),
              Reference: invoice.reference,
              Note: invoice.note,
              CreatedOn: moment(invoice.createdOn).format("DD-MM-YYYY"),
              Status: invoice.status,
            };
          })
        );
        setInvoices(filterInvoices);
        setLoading(false);
      }
    };
    callForInvoices();
  }, [focus ,update]);

  const onChangeSearch = () => {
    const filtered = invoices.filter(
      (el) =>
        `${el.Invoicename}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedInvoices(filtered);
  };

  // if (showModal) {
  //   return (
  //     <AddOrEditInvoice
  //       selectedInvoice={selectedInvoice}
  //       setSelectedInvoice={setSelectedInvoice}
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
      <Header back title={"Invoices"} />
      <IconBar
        //setShowModal={setShowModal}
        checkedInvoices={checkedInvoices}
        setCheckedInvoices={setSelectedInvoice}
        //setSelectedInvoice={setSelectedInvoice}
        setUpdate={setUpdate}
        update={update}
        navigation={navigation}
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
      {invoices && invoices.length > 0 && (
        <Table
          tableData={
            searchedInvoices && searchedInvoices.length > 0
              ? searchedInvoices
              : invoices
          }
          showCheckbox
          checked={checkedInvoices}
          setChecked={setCheckedInvoices}
        />
      )}
    </View>
  );
}

const IconBar = ({
  //setShowModal,
  checkedInvoices,
  setCheckedInvoices,
  //setSelectedInvoice,
  setUpdate,
  update,
  navigation,
}) => {
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => navigation.navigate("OperationsInvoice", {
            selectedInvoice: {},
          })}
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
            if (checkedInvoices.length.length === 0) {
              return;
            }

            const { ok, data } = await getInvoice(checkedInvoices[0]);
            if (ok) {
              const cleanInvoice = {
                _id: data._id,
                user: data.user,
                invoiceNo: data.invoiceNo,
                currency: data.currency,
                services: data.services,
                products: data.products,
                amount: data.amount,
                status: data.status,
              };
              navigation.navigate("OperationsInvoice", {
                selectedInvoice: cleanInvoice,
              });
            }
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedInvoices.length < 1) return null;
            checkedInvoices.forEach(async (invoiceId) => {
              const { ok } = await deleteInvoice(invoiceId);
              if (ok) {
                console.log("deleted");
                setUpdate(!update);
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
