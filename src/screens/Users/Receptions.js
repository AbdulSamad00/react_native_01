import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {ScrollView,StyleSheet,View,Text,TouchableOpacity,Button,} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteReception, getReceptions } from "../../api/receptions";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsReception from "./OperationsReception";
import { Avatar } from "react-native-elements";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { heightPercentageToDP as hp,widthPercentageToDP as wp,} from "react-native-responsive-screen";
import moment from "moment";
import { getDeviceTypeAsync } from "expo-device";
import { Picker } from "@react-native-picker/picker";

const tableWrapper = {
  Reception: {
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
  dateBirth: {
    cellWidth: 150,
    component: (item) => (
      <View>
        <Text>{moment(item).format("DD/MM/YYYY")}</Text>
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
};

export function Receptions({ navigation }) {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedReceptions, setSearchedReceptions] = useState([]);
  const [receptions, setReceptions] = useState();
  const [selectedReception, setSelectedReception] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedReceptions, setCheckedReceptions] = useState([]);
  const { landscape } = useDeviceOrientation();
  const [deviceType, setDeviceType] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const callForReceptions = async () => {
      setCheckedReceptions([]);
      setReceptions([]);
      setLoading(true);
      const { ok, data } = await getReceptions();

      if (ok) {
        const filterReceptions = data.map((reception) => {
          return {
            id: reception?._id,
            Reception: {
              name: reception?.receptions?.username,
              img: reception?.receptions?.imageSrc,
            },
            Username: reception?.receptions?.username,
            dateBirth: reception?.receptions?.dateBirth,
            Email: reception?.receptions?.email,
            Gender: reception?.receptions?.gender,
            FirstName: reception?.receptions?.contactName?.first,
            Initials: reception?.receptions?.contactName?.initials,
            LastName: reception?.receptions?.contactName?.last,
            Address1: reception?.receptions?.Address?.address1,
            Address2: reception?.receptions?.Address?.address2,
            Address3: reception?.receptions?.Address?.address3,
            ZipCode: reception?.receptions?.Address?.zip,
            City: reception?.receptions?.Address?.city,
            State: reception?.receptions?.Address?.state,
            Country: reception?.receptions?.Address?.country,
            Phone: reception?.receptions?.phones?.phone,
            Mobile: reception?.receptions?.phones?.mobile,
            Skype: reception?.receptions?.phones?.skype,
            Mood: reception?.receptions?.mood,
            About: reception?.receptions?.about,
            IBAN: reception?.bankInfo?.IBAN,
            Bank: reception?.bankInfo?.bank,
            branchOfBank: reception?.bankInfo?.branchOfBank,
            Skill: reception?.receptions?.skills?.skill,
            Level: reception?.receptions?.skills?.level,
            Certificate: reception?.receptions?.certifications?.certificate,
            CertificateNo: reception?.receptions?.certifications?.certificateNo,
            CertificateValidFrom:
              reception?.receptions?.certifications?.certificateValidFrom,
            IDPaper: reception?.receptions?.identification?.idPaper,
            IDPaperValidTill: reception?.receptions?.identification?.idPaperValidTill,
            //Avatar: reception?.receptions?.imageSrc,
          };
        });
        setReceptions(filterReceptions);
        setLoading(false);
      }
    };
    callForReceptions();
    getDeviceType();
    console.log("landscap: ", landscape);
  }, [update]);

  const onChangeSearch = () => {
    const filtered = receptions.filter(
      (el) =>
        `${el.Receptionname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedReceptions(filtered);
  };

  if (showModal) {
    return (
      <OperationsReception
        selectedReception={selectedReception}
        setSelectedReception={setSelectedReception}
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
      <Header back title={"Receptions"} />
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
                setSearchedReceptions();
              } else {
                setSearch(search);
                onChangeSearch();
              }
            }}
          />
          <IconBar
            setShowModal={setShowModal}
            checkedReceptions={checkedReceptions}
            setCheckedReceptions={setSelectedReception}
            setSelectedReception={setSelectedReception}
            setUpdate={setUpdate}
            update={update}
            receptions={receptions}
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
                  setSearchedReceptions();
                } else {
                  setSearch(search);
                  onChangeSearch();
                }
              }}
            />
          </View>
          <IconBar
            setShowModal={setShowModal}
            checkedReceptions={checkedReceptions}
            setCheckedReceptions={setSelectedReception}
            setSelectedReception={setSelectedReception}
            setUpdate={setUpdate}
            update={update}
            receptions={receptions}
            navigation={navigation}
            updatePress={() => {
              setUpdate(!update);
            }}
          />
        </>
      )}

      <ScrollView>
        {receptions && receptions.length > 0 && (
          <Table
            data={
              searchedReceptions && searchedReceptions.length > 0
                ? searchedReceptions
                : receptions
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={tableWrapper}
            onCheck={setCheckedReceptions}
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
  checkedReceptions,
  setCheckedReceptions,
  setSelectedReception,
  receptions,
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
            navigation.navigate("OperationsReception", { selectedReception: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedReceptions.length < 1) {
              return;
            }
            const data = tickets.filter(
              (user) => user._id == checkedReceptions[0]
            )[0];
            const cleanReception = {
              id: data.id,
              Avatar: data.imageSrc,
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
              Skill: data.skills.skill,
              Level: data.skills.level,
              Certificate: data.certifications.certificate,
              CertificateNo: data.certifications.certificateNo,
              CertificateValidFrom: data.certifications.certificateValidFrom,
              IDPaper: data.identification.idPaper,
              "IDPaper ValidTill": data.identification.idPaperValidTill,
            };
            navigate("ReceptionProfile", { selectedReception: cleanReception });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedReceptions.length < 1) {
              return;
            }
            const data = receptions.filter(
              (user) => user.id == checkedReceptions[0]
            )[0];
            data.Username = data.Reception.name;
            data.Avatar = data.Reception.img;
            updatePress();
            navigation.navigate("OperationsReception", { selectedReception: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedReceptions.length < 1) return null;
            checkedReceptions.forEach((receptionId) => {
              deleteReception(receptionId).then(({ ok }) =>
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
