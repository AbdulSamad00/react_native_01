import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteFreelancer, getFreelancers } from "../../api/freelancers";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

export  function Freelancers({ navigation }) {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedFreelancers, setSearchedFreelancers] = useState([]);
  const [freelancers, setFreelancers] = useState();
  const [allFreelancers, setAllFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedFreelancers, setCheckedFreelancers] = useState([]);

  const callForFreelancers = async () => {
    setCheckedFreelancers([]);
    setFreelancers([]);
    setLoading(true);
    const { ok, data } = await getFreelancers();
    if (ok) {
      setAllFreelancers(data);
      const filterFreelancers = data.map((freelancer) => {
        return {
          id: freelancer._id,
          Avatar: freelancer.freelancers.imageSrc,
          Freelancername: freelancer.freelancers.username,
          "Birth Date": dayjs(freelancer.dateBirth).format("DD-MM-YYYY"),
          Email: freelancer.email,
          Gender: freelancer.gender,
          "First Name": freelancer.freelancers.contactName.first,
          Initials: freelancer.freelancers.contactName.initials,
          "Last Name": freelancer.freelancers.contactName.last,
          Address1: freelancer.freelancers.Address.address1,
          Address2: freelancer.freelancers.Address.address2,
          Address3: freelancer.freelancers.Address.address3,
          "Zip Code": freelancer.freelancers.Address.zip,
          City: freelancer.freelancers.Address.city,
          State: freelancer.freelancers.Address.state,
          Country: freelancer.freelancers.Address.country,
          Phone: freelancer.freelancers.phones.phone,
          Mobile: freelancer.freelancers.phones.mobile,
          Skype: freelancer.freelancers.phones.skype,
          LinkedIn: freelancer.membership.linkedIn,
          Fiverr: freelancer.membership.fiverr,		  
          Upwork: freelancer.membership.upwork,		  
          Github: freelancer.membership.github,
          Mood: freelancer.mood,
          About: freelancer.about,
          IBAN: freelancer.bankInfo.IBAN,
          Bank: freelancer.bankInfo.bank,
          "Branch of Bank": freelancer.bankInfo.branchOfBank,
          "Prim InsuranceNo": freelancer.insurance.primInsuranceNo,
          "Prim Insurance": freelancer.insurance.primInsurance,
          "Prim Insurance ValidTill": freelancer.insurance.primInsuranceValidTill,
          "Sec. InsuranceNo": freelancer.insurance.secInsuranceNo,
          "Sec. Insurance": freelancer.insurance.secInsurance,
          "Sec. Insurance ValidTill": freelancer.insurance.secInsuranceValidTill,
          Skill: freelancer.skills.skill,
          Level: freelancer.skills.level,		  
          Certificate: freelancer.certifications.certificate,
          CertificateNo: freelancer.certifications.certificateNo,		  
          CertificateValidFrom: freelancer.certifications.certificateValidFrom,
          IDPaper: freelancer.identification.idPaper,
          "IDPaper ValidTill": freelancer.identification.idPaperValidTill,
        };
      });
      setFreelancers(filterFreelancers);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForFreelancers();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = freelancers.filter(
      (el) =>
        `${el.Freelancername}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedFreelancers(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <Header back title={"Freelancers"} />
      <IconBar
        checkedFreelancers={checkedFreelancers}
        freelancers={allFreelancers}
        callForFreelancers={callForFreelancers}
      />
      <Searchbar
        style={styles.search}
        underlineColorAndroid="white"
        placeholder="Search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={(search) => {
          if (search.length < 1) {
            setSearchedFreelancers();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {freelancers && freelancers.length > 0 && (
        <Table
          tableData={
            searchedFreelancers && searchedFreelancers.length > 0
              ? searchedFreelancers
              : freelancers
          }
          showCheckbox
          checked={checkedFreelancers}
          setChecked={setCheckedFreelancers}
        />
      )}
    </View>
  );
}

const IconBar = ({ checkedFreelancers, freelancers, callForFreelancers }) => {
  const { navigate } = useNavigation();

  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsFreelancer");
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedFreelancers.length < 1) {
              navigate("OperationsFreelancer");
            }

            const data = freelancers.filter(
              (freelancer) => freelancer._id == checkedFreelancers[0]
            )[0];
            const filter = {
              _id: data._id,
              username: data.freelancers.username,
              profile: data.profile,
              email: data.freelancers.email,
              password: data.freelancers.password,
              dateBirth: data.freelancers.dateBirth,
              gender: data.freelancers.gender,
              imageSrc: data.freelancers.imageSrc,
              prefix: data.freelancers.prefix,
              firstName: data.freelancers.contactName.first,
              initials: data.freelancers.contactName.initials,
              lastName: data.freelancers.contactName.last,
              address1: data.freelancers.Address.address1,
              address2: data.freelancers.Address.address2,
              address3: data.freelancers.Address.address3,
              city: data.freelancers.Address.city,
              zip: data.freelancers.Address.zip,
              state: data.freelancers.Address.state,
              country: data.freelancers.Address.country,
              phone: data.freelancers.phones.phone,
              mobile: data.freelancers.phones.mobile,
              skype: data.freelancers.phones.skype,
              IBAN: data.bankInfo.IBAN,
              bank: data.bankInfo.bank,
              branchOfBank: data.bankInfo.branchOfBank,
              primInsuranceNo: data.insurance.primInsuranceNo,
              primInsurance: data.insurance.primInsurance,
              primInsuranceValidTill: data.insurance.primInsuranceValidTill,
              secInsuranceNo: data.insurance.secInsuranceNo,
              secInsurance: data.insurance.secInsurance,
              secInsuranceValidTill: data.insurance.secInsuranceValidTill,			  
              certificate: data.certifications.certificate,
              certificateNo: data.certifications.certificateNo,			  
              certificateValidFrom: data.certifications.certificateValidFrom,			  
              skill: data.skills.skill,
              level: data.skills.level,
              idPaper: data.identification.idPaper,
              idPaperValidTill: data.identification.idPaperValidTill,
            };
            navigate("OperationsFreelancer", {
              selectedFreelancer: filter,
            });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            console.log(checkedFreelancers);
            if (checkedFreelancers.length < 1) return null;
            checkedFreelancers.forEach(async (freelancerId) => {
              const { ok } = await deleteFreelancer(freelancerId);
              console.log(ok);
              if (ok) {
                callForFreelancers();
                console.log("deleted");
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
