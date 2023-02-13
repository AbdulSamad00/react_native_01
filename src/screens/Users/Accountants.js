import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { delAccountant, getAccountants } from "../../api/accountants";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Table } from "@florinchristian.dev/rn-table";
import Header from "../../components/Header";
import OperationsAccountant from "./OperationsAccountant";
import { Avatar } from "react-native-elements";

const tableWrapper = {
  "Accountant": {
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
  "Username" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
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
  "PrimInsuranceNo" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "PrimInsurance" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "PrimInsuranceValidTill" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },  
  "SecInsuranceNo" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "SecInsurance" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },  
  "SecInsuranceValidTill" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Skill" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Level" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "Certificate" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },  
  "CertificateNo" : {
    cellWidth: 150,
    component: item => (
      <View>
        <Text>{ item }</Text>
      </View>
    )
  },
  "CertificateValidFrom" : {
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
  }
}

export function Accountants({ navigation }) {

  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedAccountants, setSearchedAccountants] = useState([]);
  const [accountants, setAccountants] = useState();
  const [selectedAccountant, setSelectedAccountant] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedAccountants, setCheckedAccountants] = useState([]);

  useEffect(() => {
    const callForAccountants = async () => {
      setCheckedAccountants([]);
      setAccountants([]);
      setLoading(true);
      const { ok, data } = await getAccountants();

      if (ok) {
        const filterAccountants = data.map((accountant) => {
          return {
            id: accountant?._id,
            Accountant:{ 
              img: accountant?.accountants?.imageSrc,
              name: accountant?.accountants?.username
            },
            Username: accountant?.accountants?.username,
            BirthDate: dayjs(accountant?.accountants?.dateBirth).format("YYYY-MM-DD"),
            Email: accountant?.accountants?.email,
            Gender: accountant?.accountants?.gender,
            FirstName: accountant?.accountants?.contactName?.first,
            Initials: accountant?.accountants?.contactName?.initials,
            LastName: accountant?.accountants?.contactName?.last,
            Address1: accountant?.accountants?.Address?.address1,
            Address2: accountant?.accountants?.Address?.address2,
            Address3: accountant?.accountants?.Address?.address3,
            ZipCode: accountant?.accountants?.Address?.zip,
            City: accountant?.accountants?.Address?.city,
            State: accountant?.accountants?.Address?.state,
            Country: accountant?.accountants?.Address?.country,
            Phone: accountant?.accountants?.phones?.phone,
            Mobile: accountant?.accountants?.phones?.mobile,
            Skype: accountant?.accountants?.phones?.skype,
            Mood: accountant?.accountants?.mood,
            About: accountant?.accountants?.about,
            IBAN: accountant?.accountants?.bankInfo?.IBAN,
            Bank: accountant?.accountants?.bankInfo?.bank,
            branchOfBank: accountant?.bankInfo?.branchOfBank,
            PrimInsuranceNo: accountant?.insurance?.primInsuranceNo,
            PrimInsurance: accountant?.insurance?.primInsurance,
            PrimInsuranceValidTill: accountant?.insurance?.primInsuranceValidTill,
            SecInsuranceNo: accountant?.insurance?.secInsuranceNo,
            SecInsurance: accountant?.insurance?.secInsurance,
            SecInsuranceValidTill: accountant?.insurance?.secInsuranceValidTill,
            Skill: accountant?.accountants?.skills?.skill,
            Level: accountant?.accountants?.skills?.level,
            Certificate: accountant?.accountants?.certifications?.certificate,
            CertificateNo: accountant?.accountants?.certifications?.certificateNo,
            CertificateValidFrom: accountant?.accountants?.certifications?.certificateValidFrom,
            IDPaper: accountant?.accountants?.identification?.idPaper,
            IDPaperValidTill: accountant?.accountants?.identification?.idPaperValidTill,
            Avatar: accountant?.accountants?.imageSrc,
          };
        });
        setAccountants(filterAccountants);
        setLoading(false);
      }
    };
      callForAccountants()
  }, [update]);

  const onChangeSearch = () => {
    const filtered = accountants.filter(
      (el) =>
        `${el.Accountantname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedAccountants(filtered);
  };

  if (showModal) {
    return (
      <OperationsAccountant
        selectedAccountant={selectedAccountant}
        setSelectedAccountant={setSelectedAccountant}
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
      <Header back title={"Accountants"} />
      <IconBar
        setShowModal={setShowModal}
        checkedAccountants={checkedAccountants}
        setCheckedAccountants={setSelectedAccountant}
        setSelectedAccountant={setSelectedAccountant}
        setUpdate={setUpdate}
        update={update}
        accountants={accountants}
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
            setSearchedAccountants();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      <ScrollView>
        {accountants && accountants.length > 0 && (
          <Table
            data={
              searchedAccountants && searchedAccountants.length > 0
                ? searchedAccountants
                : accountants
            }
            fitWidth={false}
            uniqueKey={"id"}
            dataWrapper={tableWrapper}
            onCheck={setCheckedAccountants}
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
  checkedAccountants,
  setCheckedAccountants,
  setSelectedAccountant,
  accountants,
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
            navigation.navigate("OperationsAccountant", { selectedAccountant: {} });
          }}
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
          onPress={() => {
            if (checkedAccountants.length < 1) {
              return;
            }
            const data = tickets.filter(
              (user) => user._id == checkedAccountants[0]
            )[0];
            const cleanAccountant = {
              id: data._id,
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
            navigate("AccountantProfile", { selectedAccountant: cleanAccountant });
          }}
        />

        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={() => {
            if (checkedAccountants.length < 1) {
              return;
            }
            const data = accountants.filter((user) => user.id == checkedAccountants[0])[0];
            data.Username = data.Accountant.name;
            data.Avatar = data.Accountant.img;
            updatePress();
            navigation.navigate("OperationsAccountant", { selectedAccountant: data });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedAccountants.length < 1) return null;
            checkedAccountants.forEach((accountantId) => {
              delAccountant(accountantId).then(({ok}) => console.log(ok?"Deleted":"Failed"))
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