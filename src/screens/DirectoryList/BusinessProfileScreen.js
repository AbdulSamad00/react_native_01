import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { AirbnbRating } from "react-native-elements";
import QRCode from "react-native-qrcode-svg";
import Address from "./components/Address";
import Attachments from "./components/Attachments";
import BasicInfo from "./components/BasicInfo";
import Ratings from "./components/Ratings";
import TabComments from '../../components/TabComments'
import TabNotes from '../../components/TabNotes';
import WorkingTime from "./components/WorkingTime";

function PillNav({ name, onPress, selected }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 1,
        height: 46,
        paddingHorizontal: 12,
        borderRadius: 24,
        marginRight: 12,
        justifyContent: "center",
        backgroundColor: name == selected ? "#eee" : "#fff0",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "500" }}>{name}</Text>
    </TouchableOpacity>
  );
}

const tabs = {
  "About Us": BasicInfo,
  Address: Address,
  Reviews: Ratings,
  Comments: TabComments,
  Notes: TabNotes,
  Attachments: Attachments,
  "Working Hours": WorkingTime,
};

function RenderTab({ tab, clinic, navigation }) {
  return <View style={{ paddingBottom: "50%" }}>{tabs[tab]({clinic, navigation})}</View>;
}

export default function BusinessProfileScreen({ route, navigation }) {
  const isPortrait = () => {
    return Dimensions.get("window").height > Dimensions.get("window").width;
  };

  const [portrait, setPortait] = useState(isPortrait);

  Dimensions.addEventListener("change", () => setPortait(isPortrait));
  const clinic = route.params.item;
  const [selected, setSelected] = useState("About Us");
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 20 }}
        >
          <Ionicons name="arrow-back-circle-outline" size={42} color="white" />
        </TouchableOpacity>
        <Text style={styles.headText}>Business Profile</Text>
      </View>
      <View
        style={{ flexDirection: portrait ? "column" : "row", height: "100%" }}
      >
        <View style={[styles.main, { width: portrait ? "100%" : "40%" }]}>
          <View style={styles.image}>
            <Image
              source={{ uri: clinic.clinics.imageSrc }}
              style={{ width: "100%", height: "100%", borderRadius: 24 }}
            />
          </View>
          <View style={styles.desc}>
            <Text style={styles.title}>
              {clinic.companyInfo.businessName
                ? clinic.companyInfo.businessName
                : clinic.clinics.contactName.first +
                  " " +
                  clinic.clinics.contactName.last}
            </Text>
            <AirbnbRating
              count={5}
              reviews={[]}
              size={18}
              reviewSize={0}
              isDisabled={true}
              starContainerStyle={{ marginTop: -15 }}
            />
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                width: "80%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  clinic.clinics.phones?.mobile
                    ? Linking.openURL(`tel:${clinic.clinics.phones.mobile}`)
                    : alert("Not a valid number");
                }}
              >
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/icons/phone.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/icons/email.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  clinic.clinics.companyEmail
                    ? Linking.openURL(
                        `skype:${clinic.clinics.companyEmail}?chat`
                      )
                    : alert("Not a valid email");
                }}
              >
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/icons/skype.png")}
                />
              </TouchableOpacity>
              <Image
                style={{ width: 26, height: 26 }}
                source={require("../../assets/icons/address.png")}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <QRCode
                value={"21"}
                //logoSize={20}
                logoBackgroundColor="transparent"
                size={60}
              />
            </View>
          </View>
        </View>
        <KeyboardAvoidingView behavior="height">
          <View style={[styles.bottom, { width: portrait ? "100%" : "80%" }]}>
            <ScrollView style={styles.tags} horizontal={true}>
              {Object.keys(tabs).map((e) => (
                <PillNav
                  name={e}
                  onPress={() => setSelected(e)}
                  selected={selected}
                />
              ))}
            </ScrollView>

            <ScrollView>
              <RenderTab tab={selected} clinic={clinic} navigation={navigation} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00B7DD",
    flexDirection: "row",
  },
  headText: {
    color: "#ffffff",
    fontSize: 24,
  },
  tags: {
    height: 60,
    maxHeight: 60,
    flexDirection: "row",
  },
  bottom: {
    paddingTop: 12,
    paddingHorizontal: 12,
    height: "80%",
  },
  main: {
    backgroundColor: "#eee",
    flexDirection: "row",
    height: 250,
    padding: 20,
  },
  image: {
    width: "48%",
  },
  desc: {
    paddingTop: 18,
    marginLeft: "5%",
    width: "45%",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
});
