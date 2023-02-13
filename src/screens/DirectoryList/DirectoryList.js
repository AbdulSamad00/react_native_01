import { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import SelectDropdown from "react-native-select-dropdown";
import { w, h } from "react-native-responsiveness";
import countriesApi from "../../api/countries";
import { getClinics } from "../../api/clinics";
import {
  FormPicker,
  Form,
  FormField,
  SubmitButton,
} from "../../components/forms";
import { data } from "../Drive/constants";
import { Card } from "./BusinessProfile-phoneview";
import { ActivityIndicator } from "react-native-paper";
import SvgImage from "react-native-remote-svg";
import { Dimensions } from "react-native";

export default function DirectoryList({ navigation }) {
  
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Netherlands");
  const [city, setCity] = useState("oss");
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);

  const isPortrait = () => {
    return Dimensions.get("window").height > Dimensions.get("window").width;
  };

  const [portrait, setPortait] = useState(isPortrait);

  Dimensions.addEventListener("change", () => setPortait(isPortrait));

  const submitCountry = async (country) => {
    const { data } = await getClinics();
    return data.filter((c) => country === c.clinics.Address.country);
  };

  const getCities = (country) => {
    submitCountry(country.name).then((clinics) => {
      const selected = new Set(clinics.map((c) => c.clinics.Address.city));
      setCities([...selected]);
    });
  };

  const handleSubmit = (search) => {
    setLoading(true);
    submitCountry(selectedCountry).then((c) => {
      setResults(c.filter((a) => a.clinics.Address.city === city));
      setLoading(false);
    });
  };

  const getCategories = () => {
    const cat = [
      "Doctor",
      "Hospital",
      "Clinic",
      "Pharmacy",
      "Blood Bank",
      "Chiropractice",
    ];
    return cat;
  };

  const getSubcategories = () => {
    const sub = [
      "Cardiologist",
      "Colorectal surgeon",
      "Dentist",
      "Dermatologist",
      "Dietician",
      "Chiropractice",
    ];
    return sub;
  };

  useEffect(() => {
    if (countries.length === 0)
      countriesApi
        .getCountries()
        .then(({ data, ok, status, problem }) => {
          if (ok) {
            setCountries(
              data.map((country) => ({
                name: country.name,
                avatarSource: {
                  uri: country.flag,
                },
              }))
            );
          } else console.error(status, problem);
        })
        .catch((E) => console.error(E));
  }, []);

  const docs = (rowData) => {
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <SvgImage
          source={rowData.avatarSource}
          resizeMode="contain"
          style={{ width: 50, height: 30, marginLeft: 4, marginRight: 8 }}
        />
        <Text>{rowData.name}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.Container}>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          country: "",
          keyword: "",
          category: "",
          subCategory: "",
        }}
      >
        {/* ============================Header======================== */}
        <View style={styles.TopContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: 20 }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={42}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>Directory List</Text>
        </View>

        {/* ============================TopView======================== */}
        <Text style={styles.TodayText}>Search</Text>

        {/* ============================Inputs======================== */}
        <View>
          <View style={styles.inputView}>
            <FontAwesome name="keyboard-o" style={styles.inputIcon} size={20} />
            <FormField name="keyword" placeholder="Type Keyword" />
          </View>
          <View
            style={{
              height: 64,
              width: "100%",
            }}
          >
            {countries.length != 0 ? (
              <SelectDropdown
                data={countries}
                renderCustomizedRowChild={docs}
                buttonStyle={{
                  width: "100%",
                  height: "100%",
                }}
                onSelect={(c) => {
                  getCities(c);
                  setSelectedCountry(c.name);
                }}
                renderCustomizedButtonChild={(selected) => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {!selected ? (
                        <Text>Select your country</Text>
                      ) : (
                        <>
                          <SvgImage
                            source={selected.avatarSource}
                            style={{ width: 50, height: 30, marginRight: 8 }}
                          />
                          <Text style={{ fontSize: 16 }}>{selected.name}</Text>
                        </>
                      )}
                    </View>
                  );
                }}
              />
            ) : (
              <ActivityIndicator animating={true} style={{ marginTop: 15 }} />
            )}
          </View>
          {cities.length != 0 ? (
            <SelectDropdown
              buttonStyle={{ width: "100%", height: 50 }}
              data={cities}
              renderCustomizedButtonChild={(selected) => (
                <View style={{ width: "100%" }}>
                  <Text>{selected ? selected : "Select City"}</Text>
                </View>
              )}
              onSelect={setCity}
            />
          ) : null}

          <View style={styles.inputView}>
            {/* <ModalDropdown
              style={{ padding: 8, marginLeft: 2, flex: 1 }}
              textStyle={{ fontSize: 16 }}
              dropdownStyle={{ width: 120, fontWeight: 16, height: 130 }}
              dropdownTextStyle={{ fontSize: 16, color: "black" }}
              defaultValue={"Select Category"}
              options={[
                "Doctor",
                "Hospital",
                "Clinic",
                "Pharmacy",
                "Blood Bank",
                "Chiropractice",
              ]}
            /> */}

            <SelectDropdown
              data={getCategories()}
              buttonStyle={{ width: "100%", height: 50 }}
              rowStyle={{ justifyContent: "flex-start" }}
              onSelect={setCategory}
              renderCustomizedButtonChild={(selected) => (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="briefcase-outline"
                    style={styles.inputIcon}
                    size={20}
                  />
                  <Text>{selected ? selected : "Select Category"}</Text>
                </View>
              )}
            />
          </View>

          <View style={styles.inputView}>
            {/* <ModalDropdown
              style={{ padding: 8, marginLeft: 2, flex: 1 }}
              textStyle={{ fontSize: 16 }}
              dropdownStyle={{ width: 150, fontWeight: 16, height: 130 }}
              dropdownTextStyle={{ fontSize: 16, color: "black" }}
              defaultValue={"Select Sub Category"}
              options={[
                "Cardiologist",
                "Colorectal surgeon",
                "Dentist",
                "Dermatologist",
                "Dietician",
                "Chiropractice",
              ]}
            /> */}
            <SelectDropdown
              data={getSubcategories()}
              buttonStyle={{ width: "100%", height: 50 }}
              onSelect={setSubcategory}
              renderCustomizedButtonChild={(selected) => (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="briefcase-outline"
                    style={styles.inputIcon}
                    size={20}
                  />
                  <Text>{selected ? selected : "Select Subcategory"}</Text>
                </View>
              )}
            />
          </View>
          {/* LOCATION VIEW */}
          {/* <View style={styles.inputView}>
            <FontAwesome
              name="location-arrow"
              style={styles.inputIcon}
              size={20}
            />
            <TextInput
              placeholder="Set Location"
              value={location}
              onChangeText={setLocation}
              style={styles.textInput}
            />
            <MaterialIcons
              name="my-location"
              style={styles.inputIcon}
              size={20}
            />
          </View> */}
        </View>

        {/* ============================Button======================== */}
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Search")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Search Now</Text>
        </TouchableOpacity> */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <SubmitButton
            txt={!loading ? "Search Now" : "Loading..."}
            disabled={loading}
          />
        </View>
      </Form>
      <View
        style={{
          marginTop: 15,
          width: "100%",
          paddingHorizontal: 10,
          flexWrap: "wrap",
          flexDirection: portrait ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        {results.length > 0 &&
          results.map((val) => (
            <TouchableOpacity
              style={{ width: portrait ? "100%" : "49%" }}
              onPress={() =>
                navigation.navigate("BusinessProfileScreen", { item: val })
              }
            >
              <Card item={val} />
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  type: {
    marginTop: 14,
    fontWeight: "bold",
    color: "#434",
    fontSize: 16,
    marginBottom: -4,
  },
  name: {
    fontSize: h("3%"),
    marginBottom: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  searchItem: {
    flexDirection: "row",
    width: "100%",
    height: 220,
    borderRadius: 12,
    elevation: 2.5,
    backgroundColor: "#fff",
  },
  searchLeft: {
    width: "35%",
    borderTopStartRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#eef",
  },
  searchRight: {
    width: "65%",
    padding: 20,
  },

  Container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  // Header
  headerView: {
    flexDirection: "row",
    backgroundColor: "#389CE8",
  },

  headerIcon: {
    padding: 10,
    color: "white",
  },

  headerText: {
    color: "white",
    fontSize: 20,
    padding: 10,
    marginTop: 5,
  },

  // Top
  topView: {
    backgroundColor: "lightgrey",
    borderBottomWidth: 1,
  },

  topText: {
    fontSize: 16,
    padding: 10,
  },

  // Inputs
  inputView: {
    borderBottomWidth: 1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
  },

  inputIcon: {
    padding: 8,
  },

  texts: {
    padding: 8,
  },

  textInput: {
    marginStart: 10,
    flex: 1,
  },

  // Button
  button: {
    borderRadius: 10,
    backgroundColor: "#00B7DD",
    marginHorizontal: 40,
    marginVertical: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 8,
  },

  TopContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
    height: h("8%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    flexDirection: "row",
  },
  ContainerForPic: {
    // backgroundColor: 'red',
    width: "90%",
    height: h("15%"),
    flexDirection: "row",
    marginTop: h("2.5%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "75%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  TopRightContianer: {
    // backgroundColor: 'tomato',
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgRenderDesgin: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 110 / 2,
  },
  nameText: {
    fontSize: h("2.5%"),
    fontWeight: "bold",
    color: "white",
  },

  icons: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
  },
  faceImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  TopBottomContainer: {
    // backgroundColor: 'red',
    width: "95%",
    height: h("15%"),
    marginTop: h("1%"),
    flexDirection: "row",
    alignItems: "center",
  },
  TopContain: {
    // backgroundColor: 'green',
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("2.5%"),
    paddingRight: h("2%"),
    borderRightColor: "#0003",
    borderRightWidth: h("0.1%"),
  },
  MiddleContain: {
    // backgroundColor: 'gold',
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("3%"),
    paddingRight: h("2%"),
    borderRightColor: "#0003",
    borderRightWidth: h("0.1%"),
  },
  BottomContain: {
    // backgroundColor: 'tomato',
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("3%"),
    paddingRight: h("2%"),
  },
  Apponimtnnumber: {
    fontSize: h("3%"),
    fontWeight: "bold",
    color: "white",
  },
  AppoinmntText: {
    fontSize: h("2%"),
    color: "white",
  },

  lowerContaierFlatlist: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: h("120%"),
    alignItems: "center",
  },
  flatlistContainer: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("22%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    // elevation: h('0.1%'),
  },
  flatlistContainer2: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("18%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    // elevation: h('0.1%'),
  },

  Flatlist: {
    // backgroundColor: '#f2f2',
    alignItems: "center",
  },
  FlatListTopView: {
    // backgroundColor: 'purple',
    width: "100%",
    height: h("5%"),
    alignItems: "flex-end",
  },
  FlatListMiddleView: {
    // backgroundColor: 'orange',
    width: "100%",
    height: h("11%"),
    flexDirection: "row",
  },
  FlatListBottomView: {
    // backgroundColor: 'green',
    width: "100%",
    height: h("6%"),
    alignItems: "center",
    flexDirection: "row",
  },
  ItemContainer: {
    backgroundColor: "#003C75",
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemAppoinment: {
    color: "white",
    fontSize: h("1.5%"),
  },
  FlatlistMiddleLeft: {
    // backgroundColor: 'red',
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: h("2%"),
  },
  FlatlistMiddleMiddle: {
    // backgroundColor: 'gold',
    width: "75%",
    height: "100%",
  },
  ProfileImg: {
    // backgroundColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 110 / 2,
  },
  imge: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  Itemname: {
    color: "black",
    fontSize: h("2.5%"),
  },
  ItemTime: {
    color: "#003C75",
    fontSize: h("1.5%"),
    fontWeight: "bold",
    marginTop: h("0.5%"),
  },
  ItemTime3: {
    color: "#D0021B",
    fontSize: h("1.5%"),
    fontWeight: "bold",
  },
  ItemSpecilist: {
    color: "#0006",
    fontSize: h("2%"),
  },
  ItemTime2: {
    color: "#0006",
    fontSize: h("1.5%"),
  },
  Buttons: {
    width: "35%",
    height: h("5%"),
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: h("12%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Buttonicons: {
    height: "50%",
    width: "20%",
    resizeMode: "contain",
    marginRight: h("0.5%"),
  },
  ButtonText: {
    fontSize: h("1.5%"),
    color: "#003C75",
  },
  TopActiveContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("7%"),
    flexDirection: "row",
  },
  TopLeftActiveContainer: {
    // backgroundColor: 'green',
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopRightActiveContainer: {
    // backgroundColor: 'gold',
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ActiveText: {
    color: "white",
    fontSize: h("2.8%"),
    fontWeight: "bold",
    marginTop: h("3%"),
  },
  ActiveText2: {
    color: "white",
    fontSize: h("2.8%"),
  },
  underline: {
    backgroundColor: "white",
    width: "100%",
    height: h("0.8%"),
    marginTop: h("1%"),
  },

  TodayText: {
    color: "black",
    fontSize: h("3%"),
    textAlign: "center",
  },
});
