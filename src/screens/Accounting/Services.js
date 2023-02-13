import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteService, getService, getServices } from "../../api/services";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";


export default function Services() {
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedServices, setSearchedServices] = useState([]);
  const [services, setServices] = useState();
  const [selectedService, setSelectedService] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedServices, setCheckedServices] = useState([]);

  useEffect(() => {
    const callForServices = async () => {
      setCheckedServices([]);
      setServices([]);
      setLoading(true);
      const { ok, data } = await getServices();
      if (ok) {
        const filterServices = data.map((service) => {
          console.log(service,'----')
          return {
            id: service._id,
            // avatar: `${API_URL}/${service.serviceImage[0]?.filePath}`,
            ServiceNo: service.serviceNo?service.serviceNo:"",
            Code: service.code,
            Price: service.price,
            Description: service.description,
            ValidTill: moment(service.validTill).format("DD MM YYYY"),
            Note: service.note,
            CreatedOn: moment(service.createdOn).format("DD MM YYYY"),
            Status: service.status,
          };
        });
        setServices(filterServices);
        setLoading(false);
      }
    };
    callForServices();
  }, [update]);

  const onChangeSearch = () => {
    const filtered = services.filter(
      (el) =>
        `${el.Servicename}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedServices(filtered);
  };

  // if (showModal) {
  //   return (
  //     <AddOrEditService
  //       selectedService={selectedService}
  //       setSelectedService={setSelectedService}
  //       visible={showModal}
  //       setVisible={setShowModal}
  //       setUpdate={setUpdate}
  //       update={update}
  //     />
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator visible={loading} />
        <Header back title={"Services"} rightComponent={()=>{}} />
        <IconBar
          //setShowModal={setShowModal}
          checkedServices={checkedServices}
          setCheckedServices={setSelectedService}
          //setSelectedService={setSelectedService}
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
              setSearchedServices();
            } else {
              setSearch(search);
              onChangeSearch();
            }
          }}
        />
        {services && services.length > 0 && (
          <Table
            tableData={
              searchedServices && searchedServices.length > 0 ? searchedServices : services
            }
            showCheckbox
            checked={checkedServices}
            setChecked={setCheckedServices}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const IconBar = ({
  //setShowModal,
  checkedServices,
  setCheckedServices,
  //setSelectedService,
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
          onPress={() => { }
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
            if (checkedServices.length.length === 0) {
              return;
            }

            const { ok, data } = await getService(checkedServices[0]);
            if (ok) {
              const cleanService = {
			//     _id: data._id,
            // avatar: `${API_URL}/${service.serviceImage[0]?.filePath}`,
            ServiceNo: service.serviceNo?service.serviceNo:"",
            Code: service.code,
            Price: service.price,
            Description: service.description,
            ValidTill: moment(service.validTill).format("DD MM YYYY"),
            Note: service.note,
            Status: service.status,
              };
              navigation.navigate("OperationsService", {
                selectedService: cleanService,
              });
            }
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedServices.length < 1) return null;
            checkedServices.forEach(async (serviceId) => {
              const { ok } = await deleteService(serviceId);
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
