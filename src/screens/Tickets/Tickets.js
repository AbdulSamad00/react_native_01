import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,View,} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteTicket, getTickets } from "../../api/tickets";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

const Tickets = () => {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedTickets, setSearchedTickets] = useState([]);
  const [tickets, setTickets] = useState();
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedTickets, setCheckedTickets] = useState([]);
  const callForTickets = async () => {
    setCheckedTickets([]);
    setTickets([]);
    setLoading(true);
    const { ok, data } = await getTickets();

    if (ok) {
      setAllTickets(data);
      const filterTickets = data.map((ticket) => {
        let names = "";
        ticket.participants.map((obj) => {
          names = `${names} ${names.length ? ", " : ""}${
            obj.contactName.first
          }`;
        });
        return {
          id: ticket._id,
          avatar: ticket.user?.imageSrc,
          username: ticket.user?.username,
          Ticketname: ticket.name,
          TicketNo: ticket.ticketNo,
          Name: ticket.name,
          Narrative: ticket.narrative,
          BusinessName: ticket.businessName,
          Department: ticket.department,
          "Sub-department": ticket.subDepartment,
          Location: ticket.locations,
          Category: ticket.category,
          SubCategory: ticket.subCategory,
          Priority: ticket.priority,
          Participants: names,
          Deadline: moment(ticket.deadline).format("DD-MM-YYYY"),
          DocumentNo: ticket.documentNo,
          Field: ticket.field,
          Tags: ticket.tags,
          Review: ticket.review,
          Reference: ticket.reference,
          Note: ticket.note,
          CreatedOn: moment(ticket.createdOn).format("DD-MM-YYYY"),
          Status: ticket.status,
          // "Shared To": ticket.sharedTo.username,
        };
      });
      setTickets(filterTickets);
      setLoading(false);
    }
  };
  useEffect(() => {
    callForTickets();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = tickets.filter(
      (el) =>
        `${el.Ticketname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedTickets(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"#00B7DD"} />

        <ActivityIndicator visible={loading} />
        <Header back title={"Tickets"} rightComponent={() => {}} />
        <IconBar
          checkedTickets={checkedTickets}
          tickets={allTickets}
          callForTickets={callForTickets}
        />
        <Searchbar
          style={styles.search}
          underlineColorAndroid="white"
          placeholder="Search"
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(search) => {
            if (search.length < 1) {
              setSearchedTickets();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />
        {tickets && tickets.length > 0 && (
          <Table
            tableData={
              searchedTickets && searchedTickets.length > 0
                ? searchedTickets
                : tickets
            }
            showCheckbox
            checked={checkedTickets}
            setChecked={setCheckedTickets}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const IconBar = ({ checkedTickets, tickets, callForTickets }) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsTicket", { selectedTicket: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "pink" }}
          color="black"
          onPress={() => {
            if (checkedTickets.length < 1) {
              return;
            }
            const data = tickets.filter(
              (user) => user._id == checkedTickets[0]
            )[0];
            const cleanTicket = {
              _id: data._id,
              name: data.name,
              narrative: data.narrative,
              businessName: data.businessName,
              department: data.department,
              subDepartment: data.subDepartment,
              locations: data.locations,
              category: data.category,
              subCategory: data.subCategory,
              priority: data.priority,
              deadline: data.deadline,
              participants: data.participants,
              documentNo: data.documentNo,
              field: data.field,
              tags: data.tags,
              share:data.share,
              "Assigned To": data.assignedTo,
              "Shared To": data.sharedTo,
              review: data.review,
              reference: data.reference,
              note: data.note,
              createdOn: data.createdOn,
              status: data.status,
            };
            navigate("TicketProfile", { selectedTicket: cleanTicket });
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedTickets.length < 1) {
              navigate("OperationsTicket", { selectedTicket: {} });
            }

            const data = tickets.filter(
              (user) => user._id == checkedTickets[0]
            )[0];
            const cleanTicket = {
              _id: data._id,
              name: data.name,
              narrative: data.narrative,
              businessName: data.businessName,
              department: data.department,
              subDepartment: data.subDepartment,
              locations: data.locations,
              category: data.category,
              subCategory: data.subCategory,
              priority: data.priority,
              deadline: data.deadline,
              participants: data.participants,
              documentNo: data.documentNo,
              field: data.field,
              tags: data.tags,
              share:data.share,
              "Assigned To": data.assignedTo,
              "Shared To": data.sharedTo,
              review: data.review,
              reference: data.reference,
              note: data.note,
              createdOn: data.createdOn,
              status: data.status,
            };
            navigate("OperationsTicket", { selectedTicket: cleanTicket });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "black" }}
          color="white"
          onPress={() => {
            if (checkedTickets.length < 1) return null;
            checkedTickets.forEach(async (userId) => {
              const { ok } = await deleteTicket(userId);
              if (ok) {
                console.log("deleted");
                callForTickets();
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

export default Tickets;
