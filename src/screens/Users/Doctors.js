import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Button,} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteDoctor, getDoctors } from "../../api/doctors";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsDoctor from "./OperationsDoctor";
import { Avatar } from "react-native-elements";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { heightPercentageToDP as hp, widthPercentageToDP as wp,} from "react-native-responsive-screen";
import moment from "moment";
import { getDeviceTypeAsync } from "expo-device";
import { Picker } from "@react-native-picker/picker";

const tableWrapper = {
  Doctor: {
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
  Prefix: {
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
  Skill: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Level: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  Certificate: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  CertificateNo: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
  },
  CertificateValidFrom: {
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
  // Avatar: {
  //   cellWidth: 150,
  //   component: (item) => (
  //     <View>
  //       <Avatar source={{ uri: item }} size={38} rounded={true} />
  //     </View>
  //   ),
  // },
  dateBirth: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{moment(item).format("DD/MM/YYYY")}</Text>
      </View>
    ),
  },
};

export function Doctors({ navigation }) {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedDoctors, setSearchedDoctors] = useState([]);
  const [doctors, setDoctors] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedDoctors, setCheckedDoctors] = useState([]);
  const { landscape } = useDeviceOrientation();
  const [deviceType, setDeviceType] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const callForDoctors = async () => {
      setCheckedDoctors([]);
      setDoctors([]);
      setLoading(true);
      const { ok, data } = await getDoctors();

      if (ok) {
        const filterDoctors = data.map((doctor) => {
          return {
            id: doctor?._id,
            Doctor: {
              name: doctor?.doctors?.username,
              img: doctor?.doctors?.imageSrc,
            },
            Username: doctor?.doctors?.username,
            dateBirth: doctor?.doctors?.dateBirth,
            Email: doctor?.doctors?.email,
            Gender: doctor?.doctors?.gender,
            Prefix: doctor?.doctors?.prefix,
            FirstName: doctor?.doctors?.contactName?.first,
            Initials: doctor?.doctors?.contactName?.initials,
            LastName: doctor?.doctors?.contactName?.last,
            Address1: doctor?.doctors?.Address?.address1,
            Address2: doctor?.doctors?.Address?.address2,
            Address3: doctor?.doctors?.Address?.address3,
            ZipCode: doctor?.doctors?.Address?.zip,
            City: doctor?.doctors?.Address?.city,
            State: doctor?.doctors?.Address?.state,
            Country: doctor?.doctors?.Address?.country,
            Phone: doctor?.doctors?.phones?.phone,
            Mobile: doctor?.doctors?.phones?.mobile,
            Skype: doctor?.doctors?.phones?.skype,
            Mood: doctor?.doctors?.mood,
            About: doctor?.doctors?.about,
            IBAN: doctor?.bankInfo?.IBAN,
            Bank: doctor?.bankInfo?.bank,
            branchOfBank: doctor?.bankInfo?.branchOfBank,
            PrimInsuranceNo: doctor?.insurance?.primInsuranceNo,
            PrimInsurance: doctor?.insurance?.primInsurance,
            PrimInsuranceValidTill: doctor?.insurance?.primInsuranceValidTill,
            SecInsuranceNo: doctor?.insurance?.secInsuranceNo,
            SecInsurance: doctor?.insurance?.secInsurance,
            SecInsuranceValidTill: doctor?.insurance?.secInsuranceValidTill,
            Skill: doctor?.doctors?.skills?.skill,
            Level: doctor?.doctors?.skills?.level,
            Certificate: doctor?.doctors?.certifications?.certificate,
            CertificateNo: doctor?.doctors?.certifications?.certificateNo,
            CertificateValidFrom:
              doctor?.doctors?.certifications?.certificateValidFrom,
            IDPaper: doctor?.doctors?.identification?.idPaper,
            IDPaperValidTill: doctor?.doctors?.identification?.idPaperValidTill,
            //Avatar: doctor?.doctors?.imageSrc,
          };
        });
        setDoctors(filterDoctors);
        setLoading(false);
      }
    };
    callForDoctors();
    getDeviceType();
    console.log("landscap: ", landscape);
  }, [update]);

  const onChangeSearch = () => {
    const filtered = doctors.filter(
      (el) =>
        `${el.Doctorname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedDoctors(filtered);
  };

  if (showModal) {
    return (
      <OperationsDoctor
        selectedDoctor={selectedDoctor}
        setSelectedDoctor={setSelectedDoctor}
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
      <Header back title={"Doctors"} />
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
                setSearchedDoctors();
              } else {
                setSearch(search);
                onChangeSearch();
              }
            }}
          />
          <IconBar
            setShowModal={setShowModal}
            checkedDoctors={checkedDoctors}
            setCheckedDoctors={setSelectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            setUpdate={setUpdate}
            update={update}
            doctors={doctors}
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
                  setSearchedDoctors();
                } else {
                  setSearch(search);
                  onChangeSearch();
                }
              }}
            />
          </View>
          <IconBar
            setShowModal={setShowModal}
            checkedDoctors={checkedDoctors}
            setCheckedDoctors={setSelectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            setUpdate={setUpdate}
            update={update}
            doctors={doctors}
            navigation={navigation}
            updatePress={() => {
              setUpdate(!update);
            }}
          />
        </>
      )}

      <ScrollView>
        {doctors && doctors.length > 0 && (
          <Table
            data={
              searchedDoctors && searchedDoctors.length > 0
                ? searchedDoctors
                : doctors
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={tableWrapper}
            onCheck={setCheckedDoctors}
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
  checkedDoctors,
  setCheckedDoctors,
  setSelectedDoctor,
  doctors,
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
            navigation.navigate("OperationsDoctor", { selectedDoctor: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedDoctors.length < 1) {
              return;
            }
            const data = tickets.filter(
              (user) => user._id == checkedDoctors[0]
            )[0];
            const cleanDoctor = {
              id: data.id,
              Avatar: data.imageSrc,
              Doctorname: data.username,
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
              Skill: data.skills.skill,
              Level: data.skills.level,
              Certificate: data.certifications.certificate,
              CertificateNo: data.certifications.certificateNo,
              CertificateValidFrom: data.certifications.certificateValidFrom,
              IDPaper: data.identification.idPaper,
              "IDPaper ValidTill": data.identification.idPaperValidTill,
            };
            navigate("DoctorProfile", { selectedDoctor: cleanDoctor });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedDoctors.length < 1) {
              return;
            }
            const data = doctors.filter(
              (user) => user.id == checkedDoctors[0]
            )[0];
            data.Username = data.Doctor.name;
            data.Avatar = data.Doctor.img;
            updatePress();
            navigation.navigate("OperationsDoctor", { selectedDoctor: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedDoctors.length < 1) return null;
            checkedDoctors.forEach((doctorId) => {
              deleteDoctor(doctorId).then(({ ok }) =>
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
