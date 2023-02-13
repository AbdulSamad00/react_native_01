import { useIsFocused, useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { deleteCompany, getCompany, getCompanies } from "../../api/companies";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

export  function Companies({ navigation }) {
  const focus = useIsFocused();
  const [search, setSearch] = useState("");
  const [searchedCompanies, setSearchedCompanies] = useState([]);
  const [companies, setCompanies] = useState();
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedCompanies, setCheckedCompanies] = useState([]);

  const callForCompanies = async () => {
    setCheckedCompanies([]);
    setCompanies([]);
    setLoading(true);
    const { ok, data } = await getCompanies();
    if (ok) {
      setAllCompanies(data);
      const filterCompanies = data.map((company) => {
        return {
          id: company._id,
          Avatar: company.companies.imageSrc,
          Companyname: company.companies.username,
          "Birth Date": dayjs(company.dateBirth).format("DD-MM-YYYY"),
          Email: company.email,
          Gender: company.gender,
          "First Name": company.companies.contactName.first,
          Initials: company.companies.contactName.initials,
          "Last Name": company.companies.contactName.last,
          Address1: company.companies.Address.address1,
          Address2: company.companies.Address.address2,
          Address3: company.companies.Address.address3,
          "Zip Code": company.companies.Address.zip,
          City: company.companies.Address.city,
          State: company.companies.Address.state,
          Country: company.companies.Address.country,
          Phone: company.companies.phones.phone,
          Mobile: company.companies.phones.mobile,
          Skype: company.companies.phones.skype,
          Mood: company.mood,
          About: company.about,
          IBAN: company.bankInfo.IBAN,
          Bank: company.bankInfo.bank,
          "Branch of Bank": company.bankInfo.branchOfBank,
          IDPaper: company.identification.idPaper,
          "IDPaper ValidTill": company.identification.idPaperValidTill,
        };
      });
      setCompanies(filterCompanies);
      setLoading(false);
    }
  };

  useEffect(() => {
    callForCompanies();
  }, [focus]);

  const onChangeSearch = () => {
    const filtered = companies.filter(
      (el) =>
        `${el.Companyname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedCompanies(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <Header back title={"Companies"} />
      <IconBar
        checkedCompanies={checkedCompanies}
        companies={allCompanies}
        callForCompanies={callForCompanies}
      />
      <Searchbar
        style={styles.search}
        underlineColorAndroid="white"
        placeholder="Search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={(search) => {
          if (search.length < 1) {
            setSearchedCompanies();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {companies && companies.length > 0 && (
        <Table
          tableData={
            searchedCompanies && searchedCompanies.length > 0
              ? searchedCompanies
              : companies
          }
          showCheckbox
          checked={checkedCompanies}
          setChecked={setCheckedCompanies}
        />
      )}
    </View>
  );
}

const IconBar = ({ checkedCompanies, companies, callForCompanies }) => {
  const { navigate } = useNavigation();

  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {
            navigate("OperationsCompany");
          }}
        />
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedCompanies.length < 1) {
              navigate("OperationsCompany");
            }

            const data = companies.filter(
              (company) => company._id == checkedCompanies[0]
            )[0];
            const filter = {
              _id: data._id,
              username: data.companies.username,
              profile: data.profile,
              email: data.companies.email,
              password: data.companies.password,
              dateBirth: data.companies.dateBirth,
              gender: data.companies.gender,
              imageSrc: data.companies.imageSrc,
              prefix: data.companies.prefix,
              firstName: data.companies.contactName.first,
              initials: data.companies.contactName.initials,
              lastName: data.companies.contactName.last,
              address1: data.companies.Address.address1,
              address2: data.companies.Address.address2,
              address3: data.companies.Address.address3,
              city: data.companies.Address.city,
              zip: data.companies.Address.zip,
              state: data.companies.Address.state,
              country: data.companies.Address.country,
              phone: data.companies.phones.phone,
              mobile: data.companies.phones.mobile,
              skype: data.companies.phones.skype,
              IBAN: data.bankInfo.IBAN,
              bank: data.bankInfo.bank,
              branchOfBank: data.bankInfo.branchOfBank,
              idPaper: data.identification.idPaper,
              idPaperValidTill: data.identification.idPaperValidTill,
            };
            navigate("OperationsCompany", {
              selectedCompany: filter,
            });
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            console.log(checkedCompanies);
            if (checkedCompanies.length < 1) return null;
            checkedCompanies.forEach(async (companyId) => {
              const { ok } = await deleteCompany(companyId);
              console.log(ok);
              if (ok) {
                callForCompanies();
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
