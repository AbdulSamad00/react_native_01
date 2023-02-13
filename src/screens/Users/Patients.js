import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {ScrollView,StyleSheet,View,Text,TouchableOpacity,Button,} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deletePatient, getPatients } from "../../api/patients";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsPatient from "./OperationsPatient";
import { Avatar } from "react-native-elements";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { heightPercentageToDP as hp,widthPercentageToDP as wp,} from "react-native-responsive-screen";
import moment from "moment";
import { getDeviceTypeAsync } from "expo-device";
import { Picker } from "@react-native-picker/picker";

const tableWrapper = {
  Patient: {
    cellWidth: 100,
    component: (item) => (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        {item.img && (
          <Avatar source={{ uri: item.img }} size={38} rounded={true} />
        )}
        <Text style={{ marginLeft: 5 }}>{item.name}</Text>
      </View>
    ),
  },
  Username: {
    cellWidth: 100,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Email: {
    cellWidth: 160,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Gender: {
    cellWidth: 100,
    component: (item) => (
      <View>
        <View
          style={{
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 35,
            backgroundColor:
              item.toLowerCase() === "male"
                ? "#03A9F4"
                : item.toLowerCase() === "female"
                ? "pink"
                : "grey",
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>{item}</Text>
        </View>
      </View>
    ),
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
  Address1: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Address2: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Address3: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  ZipCode: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  City: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  State: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Country: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Phone: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Mobile: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Skype: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Mood: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  About: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  IBAN: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Bank: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  branchOfBank: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  PrimInsuranceNo: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  PrimInsurance: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  PrimInsuranceValidTill: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  SecInsuranceNo: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  SecInsurance: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  SecInsuranceValidTill: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  IDPaper: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  IDPaperValidTill: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  dateBirth: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{moment(item).format("DD/MM/YYYY")}</Text>
      </View>
    ),
  },
};

export function Patients({ navigation }) {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedPatients, setSearchedPatients] = useState([]);
  const [patients, setPatients] = useState();
  const [selectedPatient, setSelectedPatient] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedPatients, setCheckedPatients] = useState([]);
  const { landscape } = useDeviceOrientation();
  const [deviceType, setDeviceType] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const callForPatients = async () => {
      setCheckedPatients([]);
      setPatients([]);
      setLoading(true);
      const { ok, data } = await getPatients();

      if (ok) {
        const filterPatients = data.map((patient) => {
          return {
            id: patient?._id,
            Patient: {
              name: patient?.patients?.username,
              img: patient?.patients?.imageSrc,
            },
            Username: patient?.patients?.username,
            dateBirth: patient?.patients?.dateBirth,
            Email: patient?.patients?.email,
            Gender: patient?.patients?.gender,
            FirstName: patient?.patients?.contactName?.first,
            Initials: patient?.patients?.contactName?.initials,
            LastName: patient?.patients?.contactName?.last,
            Address1: patient?.patients?.Address?.address1,
            Address2: patient?.patients?.Address?.address2,
            Address3: patient?.patients?.Address?.address3,
            ZipCode: patient?.patients?.Address?.zip,
            City: patient?.patients?.Address?.city,
            State: patient?.patients?.Address?.state,
            Country: patient?.patients?.Address?.country,
            Phone: patient?.patients?.phones?.phone,
            Mobile: patient?.patients?.phones?.mobile,
            Skype: patient?.patients?.phones?.skype,
            Mood: patient?.patients?.mood,
            About: patient?.patients?.about,
            IBAN: patient?.bankInfo?.IBAN,
            Bank: patient?.bankInfo?.bank,
            branchOfBank: patient?.bankInfo?.branchOfBank,
            PrimInsuranceNo: patient?.insurance?.primInsuranceNo,
            PrimInsurance: patient?.insurance?.primInsurance,
            PrimInsuranceValidTill: patient?.insurance?.primInsuranceValidTill,
            SecInsuranceNo: patient?.insurance?.secInsuranceNo,
            SecInsurance: patient?.insurance?.secInsurance,
            SecInsuranceValidTill: patient?.insurance?.secInsuranceValidTill,
            IDPaper: patient?.patients?.identification?.idPaper,
            IDPaperValidTill: patient?.patients?.identification?.idPaperValidTill,
            //Avatar: patient?.patients?.imageSrc,
          };
        });
        setPatients(filterPatients);
        setLoading(false);
      }
    };
    callForPatients();
    getDeviceType();
    console.log("landscap: ", landscape);
  }, [update]);

  const onChangeSearch = () => {
    const filtered = patients.filter(
      (el) =>
        `${el.Patientname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedPatients(filtered);
  };

  if (showModal) {
    return (
      <OperationsPatient
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
        visible={showModal}
        setVisible={setShowModal}
        setUpdate={setUpdate}
        update={update}
      />
    );
  }
  const getDeviceType = async () => {
    const device = await getDeviceTypeAsync();
    setDeviceType(device);
  };

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <Header back title={"Patients"} />
      {deviceType === 1 ? (
        <>
          <View
            style={{
              alignSelf: "center",
              marginTop: 3,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ backgroundColor: "#0af4d5", width: "50%", borderRadius:5 }}>
              <Picker
                mode={"dropdown"}
                style={styles.headerPicker}
                selectedValue={filter}
                onValueChange={(itemValue) => setFilter(itemValue)}
              >
                <Picker.Item label="Active" value="Active" />
                <Picker.Item label="Archived" value="Archived" />
                <Picker.Item label="Banned" value="Banned" />
                <Picker.Item label="Deleted" value="Deleted" />
                <Picker.Item label="All" value="All" />
              </Picker>
            </View>
            {/* <View style={{ flexDirection: "row", marginRight: 50 }}>
          <TouchableOpacity
            style={[styles.touchableStyle, { backgroundColor: "lime" }]}
          >
            <Text style={styles.textStyle}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchableStyle, { backgroundColor: "grey" }]}
          >
            <Text style={styles.textStyle}>Archived</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchableStyle, { backgroundColor: "red" }]}
          >
            <Text style={styles.textStyle}>Banned</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchableStyle, { backgroundColor: "black" }]}
          >
            <Text style={styles.textStyle}>Deleted</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchableStyle, { backgroundColor: "blue" }]}
          >
            <Text style={styles.textStyle}>All</Text>
          </TouchableOpacity>
        </View> */}
            <View>
              <TouchableOpacity
                style={[
                  styles.touchableStyle,
                  { width: 100, backgroundColor: "#dfdfdf", marginLeft: 20 },
                ]}
              >
                <Text>Filter Options</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Searchbar
            style={[styles.search]}
            underlineColorAndroid="white"
            placeholder="Search"
            clearButtonMode="while-editing"
            value={search}
            onChangeText={(search) => {
              if (search.length < 1) {
                setSearchedPatients();
              } else {
                setSearch(search);
                onChangeSearch();
              }
            }}
          />
          <IconBar
            setShowModal={setShowModal}
            checkedPatients={checkedPatients}
            setCheckedPatients={setSelectedPatient}
            setSelectedPatient={setSelectedPatient}
            setUpdate={setUpdate}
            update={update}
            patients={patients}
            navigation={navigation}
            updatePress={() => {
              setUpdate(!update);
            }}
          />
        </>
      ) : (
        <>
          <View
            style={{
              alignSelf: "center",
              marginTop: 3,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", marginRight: 50 }}>
              <TouchableOpacity
                style={[styles.touchableStyle, { backgroundColor: "lime" }]}
              >
                <Text style={styles.textStyle}>Active</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchableStyle, { backgroundColor: "grey" }]}
              >
                <Text style={styles.textStyle}>Archived</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchableStyle, { backgroundColor: "red" }]}
              >
                <Text style={styles.textStyle}>Banned</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchableStyle, { backgroundColor: "black" }]}
              >
                <Text style={styles.textStyle}>Deleted</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchableStyle, { backgroundColor: "blue" }]}
              >
                <Text style={styles.textStyle}>All</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={[
                  styles.touchableStyle,
                  { width: 100, backgroundColor: "#dfdfdf", marginRight: 20 },
                ]}
              >
                <Text>Filter Options</Text>
              </TouchableOpacity>
            </View>
            <Searchbar
              style={[
                styles.search,
                { width: landscape ? wp("45%") : hp("30%") },
              ]}
              underlineColorAndroid="white"
              placeholder="Search"
              clearButtonMode="while-editing"
              value={search}
              onChangeText={(search) => {
                if (search.length < 1) {
                  setSearchedPatients();
                } else {
                  setSearch(search);
                  onChangeSearch();
                }
              }}
            />
          </View>
          <IconBar
            setShowModal={setShowModal}
            checkedPatients={checkedPatients}
            setCheckedPatients={setSelectedPatient}
            setSelectedPatient={setSelectedPatient}
            setUpdate={setUpdate}
            update={update}
            patients={patients}
            navigation={navigation}
            updatePress={() => {
              setUpdate(!update);
            }}
          />
        </>
      )}

      <ScrollView>
        {patients && patients.length > 0 && (
          <Table
            data={
              searchedPatients && searchedPatients.length > 0
                ? searchedPatients
                : patients
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={tableWrapper}
            onCheck={setCheckedPatients}
            headerStyle={{
              backgroundColor: "fff0bc",
              borderBottomWidth: 1,
              borderBottomColor: "dcdcdc",
            }}
            oddRowStyle={{
              backgroundColor: "white",
            }}
            evenRowStyle={{
              backgroundColor: "efefef",
            }}
            containerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "dcdcdc",
            }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const IconBar = ({
  setShowModal,
  checkedPatients,
  setCheckedPatients,
  setSelectedPatient,
  patients,
  setUpdate,
  update,
  navigation,
  updatePress,
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
            navigation.navigate("OperationsPatient", { selectedPatient: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedPatients.length < 1) {
              return;
            }
            const data = tickets.filter(
              (user) => user._id == checkedPatients[0]
            )[0];
            const cleanPatient = {
              id: data.id,
              //Avatar: data.imageSrc,
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
              IBAN: data.bankInfo.IBAN,
              Bank: data.bankInfo.bank,
              "Branch of Bank": data.bankInfo.branchOfBank,
              "Prim InsuranceNo": data.insurance.primInsuranceNo,
              "Prim Insurance": data.insurance.primInsurance,
              "Prim Insurance ValidTill": data.insurance.primInsuranceValidTill,
              "Sec. InsuranceNo": data.insurance.secInsuranceNo,
              "Sec. Insurance": data.insurance.secInsurance,
              "Sec. Insurance ValidTill": data.insurance.secInsuranceValidTill,
              IDPaper: data.identification.idPaper,
              "IDPaper ValidTill": data.identification.idPaperValidTill,
            };
            navigate("PatientProfile", { selectedPatient: cleanPatient });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedPatients.length < 1) {
              return;
            }
            const data = patients.filter(
              (user) => user.id == checkedPatients[0]
            )[0];
            data.Username = data.Patient.name;
            data.Avatar = data.Patient.img;
            updatePress();
            navigation.navigate("OperationsPatient", { selectedPatient: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedPatients.length < 1) return null;
            checkedPatients.forEach((patientId) => {
              deletePatient(patientId).then(({ ok }) =>
                console.log(ok ? "Deleted" : "Failed")
              );
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
  touchableStyle: {
    felx: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 2,
  },
  textStyle: { color: "white", fontWeight: "900", fontSize: 11 },
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
  headerPicker: {
    padding: 10,
    width: "100%",
    height: 35,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 10,
  },
});
