import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { delERO, geteros } from "../../api/eros";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsERO from "./OperationsERO";
import { Avatar } from "react-native-elements";

export default function EROs({ navigation }) {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedEROs, setSearchedEROs] = useState([]);
  const [eros, setEROs] = useState();
  const [selectedERO, setSelectedERO] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedEROs, setCheckedEROs] = useState([]);
  const [dataWrapping, setDataWrapping] = useState({});

  useEffect(() => {
    const callForEROs = async () => {
      setCheckedEROs([]);
      setEROs([]);
      setLoading(true);
      const { ok, data } = await geteros();

      if (ok) {
        const filterEROs = data.map((ero) => {
          return {
            id: ero?._id,
            Avatar: ero?.user?.imageSrc,
            Username: ero?.user?.username,
            BirthDate: dayjs(ero?.user?.dateBirth).format("YYYY-MM-DD"),
            Email: ero?.user?.email,
            Gender: ero?.user?.gender,
            FirstName: ero?.user?.contactName?.first,
            Initials: ero?.user?.contactName?.initials,
            LastName: ero?.user?.contactName?.last,
            Address1: ero?.user?.Address?.address1,
            Address2: ero?.user?.Address?.address2,
            Address3: ero?.user?.Address?.address3,
            ZipCode: ero?.user?.Address?.zip,
            City: ero?.user?.Address?.city,
            State: ero?.user?.Address?.state,
            Country: ero?.user?.Address?.country,
            Phone: ero?.user?.phones?.phone,
            Mobile: ero?.user?.phones?.mobile,
            Skype: ero?.user?.phones?.skype,
            Mood: ero?.user?.mood,
            About: ero?.user?.about,
            IBAN: ero?.user?.bankInfo?.IBAN,
            Bank: ero?.user?.bankInfo?.bank,
            branchOfBank: ero?.user?.bankInfo?.branchOfBank,
            PrimInsuranceNo: ero?.user?.insurance?.primInsuranceNo,
            PrimInsurance: ero?.user?.insurance?.primInsurance,
            PrimInsuranceValidTill: ero?.user?.insurance?.primInsuranceValidTill,
            SecInsuranceNo: ero?.user?.insurance?.secInsuranceNo,
            SecInsurance: ero?.user?.insurance?.secInsurance,
            SecInsuranceValidTill: ero?.user?.insurance?.secInsuranceValidTill,
            Skill: ero?.user?.skills?.skill,
            Level: ero?.user?.skills?.level,
            Certificate: ero?.user?.certifications?.certificate,
            CertificateNo: ero?.user?.certifications?.certificateNo,
            CertificateValidFrom: ero?.user?.certifications?.certificateValidFrom,
            IDPaper: ero?.user?.identification?.idPaper,
            IDPaperValidTill: ero?.user?.identification?.idPaperValidTill,
          };
        });
        let wrap = {};
        const comp = (item) => <Text style={{ color: "black" }}>{item}</Text>;
        Object.keys(filterEROs[0]).forEach((key) => {
          wrap[key] = { cellWidth: "4%", component: comp };
        });
        wrap.Avatar.component = (data) => (
          <Avatar source={{ uri: data }} size={38} rounded={true} />
        );
        wrap.User = {
          cellWidth: 140,
          component: (data) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Avatar source={{ uri: data.img }} size={38} rounded={true} />
              <Text style={{ textTransform: "capitalize" }}>{data.name}</Text>
            </View>
          ),
        };
        wrap.Email.cellWidth = 150;
        setDataWrapping(wrap);
        setEROs(filterEROs);
        setLoading(false);
      }
    };
      callForEROs()
      .then(() => console.log(eros[0].id))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
      const res = navigation.addListener('focus', () => {
        callForEROs()
      .then(() => console.log(eros[0].id))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
      })
      return res;
  }, [update]);

  const getTableData = () => {
    let temp = eros;
    console.log(temp.length);
    for (let i = 0; i < temp.length; i++) {
      temp[i] = Object.assign(
        { User: { name: eros[i].EROname, img: eros[i].Avatar } },
        temp[i]
      );
      delete temp[i].Avatar;
      delete temp[i].EROname;
    }
    return temp;
  };

  const onChangeSearch = () => {
    const filtered = filter(
      (el) =>
        `${el.EROname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedEROs(filtered);
  };

  if (showModal) {
    return (
      <OperationsERO
        selectedERO={selectedERO}
        setSelectedERO={setSelectedERO}
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
      <Header back title={"EROs"} />
      <IconBar
        setShowModal={setShowModal}
        checkedEROs={checkedEROs}
        setCheckedEROs={setSelectedERO}
        setSelectedERO={setSelectedERO}
        setUpdate={setUpdate}
        update={update}
        eros={eros}
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
            setSearchedEROs();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {eros && eros.length > 0 && (
        <Table
          data={
            searchedEROs && searchedEROs.length > 0
              ? searchedEROs
              : getTableData()
          }
          fitWidth={false}
          uniqueKey={"id"}
          dataWrapper={dataWrapping}
          onCheck={setCheckedEROs}
        />
      )}
    </View>
  );
}

const IconBar = ({
  setShowModal,
  checkedEROs,
  setCheckedEROs,
  setSelectedERO,
  eros,
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
            navigation.navigate("OperationsERO", { selectedERO: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedEROs.length < 1) {
              return;
            }
            const data = tickets.filter(
              (user) => user._id == checkedEROs[0]
            )[0];
            const cleanERO = {
              id: data._id,
              Avatar: data.imageSrc,
              EROname: data.username,
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
            navigate("EROProfile", { selectedERO: cleanERO });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedEROs.length < 1) {
              return;
            }
            const data = eros.filter((user) => user.id == checkedEROs[0])[0];
            data.EROname = data.User.name;
            data.Avatar = data.User.img;
            updatePress();
            navigation.navigate("OperationsERO", { selectedERO: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedEROs.length < 1) return null;
            checkedEROs.forEach((eroId) => {
              delERO(eroId).then(({ok}) => console.log(ok?"Deleted":"Failed"))
            });
            updatePress();
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