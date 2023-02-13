import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteIncident, getIncidents } from "../../api/incidents";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";
import OperationsIncident from "./OperationsIncident";

export default function Incidents() {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedIncidents, setSearchedIncidents] = useState([]);
  const [incidents, setIncidents] = useState();
  const [selectedIncident, setSelectedIncident] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedIncidents, setCheckedIncidents] = useState([]);

  useEffect(() => {
    const callForIncidents = async () => {
      setCheckedIncidents([]);
      setIncidents([]);
      setLoading(true);
      const { ok, data } = await getIncidents();
      if (ok) {
        const filterIncidents = data.map((incident) => {
			  return {
			  id: user._id,
			  Avatar: user.imageSrc,
			  Username: user.username,	  
			  Company: company.businessName,		  
			  Name: incident.name,		  
			  Department: incidents.department,		  
			  Location: incident.location,		  		  
			  Category: incident.category,
			  Note: incident.note,		  
			  createdOn: incident.createdOn,
			  Status: incident.status,		  
          };
        });
        setIncidents(filterIncidents);
        setLoading(false);
      }
    };
    callForIncidents();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = incidents.filter(
      (el) =>
        `${el.Incidentname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedIncidents(filtered);
  };

  if (showModal) {
    return (
      <OperationsIncident
        selectedIncident={selectedIncident}
        setSelectedIncident={setSelectedIncident}
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
      <Header back title={"Incidents"} />
      <IconBar
        setShowModal={setShowModal}
        checkedIncidents={checkedIncidents}
        setCheckedIncidents={setSelectedIncident}
        setSelectedIncident={setSelectedIncident}
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
            setSearchedIncidents();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {incidents && incidents.length > 0 && (
        <Table
          tableData={
            searchedIncidents && searchedIncidents.length > 0 ? searchedIncidents : incidents
          }
          showCheckbox
          checked={checkedIncidents}
          setChecked={setCheckedIncidents}
        />
      )}
    </View>
  );
}

const IconBar = ({
  setShowModal,
  checkedIncidents,
  setCheckedIncidents,
  setSelectedIncident,
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
          onPress={() => setShowModal(true)}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => setShowModal(true)}
        />
		
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedIncidents.length < 1) {
           //   setShowModal(true);
            }

          
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedIncidents.length < 1) return null;
            checkedIncidents.forEach(async (incidentId) => {
              const { ok } = await deleteIncident(incidentId);
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
