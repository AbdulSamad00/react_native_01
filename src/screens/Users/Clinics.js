import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { delClinic, getClinics } from "../../api/clinics";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsClinic from "./OperationsClinic";
import { Avatar } from "react-native-elements";

const tableWrapper = {
  "Clinic": {
    cellWidth: 150,
    component: item => (
      <View style={{ 
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      }}>
        { item.img && <Avatar source={{ uri: item.img }} size={38} rounded={true} /> }
        <Text style={{ marginLeft: 5 }}>{ item.name }</Text>
      </View>
    )
  },
  "Avatar" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Avatar source={{ uri: item }} size={38} rounded={true} />
      </View>
    )
  },
  "Username" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "BirthDate" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Email" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Gender" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "FirstName" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Initials" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "LastName" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "businessName" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  
  "Address1" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Address2" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Address3" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "ZipCode" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "City" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "State" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Country" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Phone" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Mobile" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Skype" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Mood" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "About" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "IBAN" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },  
  "Bank" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "branchOfBank" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "HPIO" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "HPII" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "IDPaper ValidTill" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "IDPaper" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "IDPaperValidTill" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Status" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  }
  
}

export function Clinics({ navigation }) {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedClinics, setSearchedClinics] = useState([]);
  const [clinics, setClinics] = useState();
  const [selectedClinic, setSelectedClinic] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedClinics, setCheckedClinics] = useState([]);

  useEffect(() => {
    const callForClinics = async () => {
      setCheckedClinics([]);
      setClinics([]);
      setLoading(true);
      const { ok, data } = await getClinics();

      if (ok) {
        const filterClinics = data.map((clinic) => {
          return {
            id: clinic?._id,
            Clinic: {
              img: clinic?.clinics?.imageSrc,
              name: clinic?.clinics?.username
            },
            Username: clinic?.clinics?.username,
            BirthDate: dayjs(clinic?.clinics?.dateBirth).format("YYYY-MM-DD"),
            Clinicname: clinic?.clinics?.businessName,			
            Email: clinic?.clinics?.email,
            Gender: clinic?.clinics?.gender,
            FirstName: clinic?.clinics?.contactName?.first,
            Initials: clinic?.clinics?.contactName?.initials,
            LastName: clinic?.clinics?.contactName?.last,
            Address1: clinic?.clinics?.Address?.address1,
            Address2: clinic?.clinics?.Address?.address2,
            Address3: clinic?.clinics?.Address?.address3,
            ZipCode: clinic?.clinics?.Address?.zip,
            City: clinic?.clinics?.Address?.city,
            State: clinic?.clinics?.Address?.state,
            Country: clinic?.clinics?.Address?.country,
            Phone: clinic?.clinics?.phones?.phone,
            Mobile: clinic?.clinics?.phones?.mobile,
            Skype: clinic?.clinics?.phones?.skype,
            Mood: clinic?.clinics?.mood,
            About: clinic?.clinics?.about,
            IBAN: clinic?.clinics?.bankInfo?.IBAN,
            Bank: clinic?.clinics?.bankInfo?.bank,
            branchOfBank: clinic?.clinics?.bankInfo?.branchOfBank,
  		    "HPIO": clinic.clinics.healthcareProviderIdentifierOrganisation,
            "HPII": clinic.clinics.healthcareProviderIdentifierIndividual,		  			
            IDPaper: clinic?.clinics?.identification?.idPaper,
            IDPaperValidTill: clinic?.clinics?.identification?.idPaperValidTill,
            Status: clinic?.clinics?.status,
          };
        });
        setClinics(filterClinics);
        setLoading(false);
      }
    };
      callForClinics()
  }, [update]);

  const onChangeSearch = () => {
    const filtered = clinics.filter(
      (el) =>
        `${el.Clinicname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedClinics(filtered);
  };

  if (showModal) {
    return (
      <OperationsClinic
        selectedClinic={selectedClinic}
        setSelectedClinic={setSelectedClinic}
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
      <Header back title={"Clinics"} />
      <IconBar
        setShowModal={setShowModal}
        checkedClinics={checkedClinics}
        setCheckedClinics={setSelectedClinic}
        setSelectedClinic={setSelectedClinic}
        setUpdate={setUpdate}
        update={update}
        clinics={clinics}
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
            setSearchedClinics();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      <ScrollView>
        {clinics && clinics.length > 0 && (
          <Table
            data={
              searchedClinics && searchedClinics.length > 0
                ? searchedClinics
                : clinics
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={tableWrapper}
            onCheck={setCheckedClinics}
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
  checkedClinics,
  setCheckedClinics,
  setSelectedClinic,
  clinics,
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
            navigation.navigate("OperationsClinic", { selectedClinic: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedClinics.length < 1) {
              return;
            }
            const data = tickets.filter(
              (user) => user._id == checkedClinics[0]
            )[0];
            const cleanClinic = {
              id: data._id,
              Avatar: data.imageSrc,
              Username: data.username,
              BirthDate: dayjs(data.dateBirth).format("YYYY-MM-DD"),
              BusinessName: data.businessName,			  
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
              IBAN: data.bankInfo.IBAN,
              Bank: data.bankInfo.bank,
              "Branch of Bank": data.bankInfo.branchOfBank,
              IDPaper: data.identification.idPaper,
              "IDPaper ValidTill": data.identification.idPaperValidTill,
              Status: data.status,			  
            };
            navigate("ClinicProfile", { selectedClinic: cleanClinic });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedClinics.length < 1) {
              return;
            }
            const data = clinics.filter((user) => user.id == checkedClinics[0])[0];
            data.Username = data.Clinic.name;
            data.Avatar = data.Clinic.img;
            updatePress();
            navigation.navigate("OperationsClinic", { selectedClinic: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedClinics.length < 1) return null;
            checkedClinics.forEach((clinicId) => {
              delClinic(clinicId).then(({ok}) => console.log(ok?"Deleted":"Failed"))
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