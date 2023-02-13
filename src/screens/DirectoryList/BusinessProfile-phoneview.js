import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useFonts,
  MerriweatherSans_400Regular,
  MerriweatherSans_700Bold,
} from "@expo-google-fonts/merriweather-sans";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import clinics, { getClinics } from "../../api/clinics";
import { AirbnbRating, Rating } from "react-native-elements";
import QRCode from "react-native-qrcode-svg";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import email from "../../assets/icons/email.png";
import phone from "../../assets/icons/phone.png";
import location from "../../assets/icons/address.png";
import skype from "../../assets/icons/skype.png";

export const Card = ({ item }) => {
  console.log(item);
  const callClinic = (phoneNo) => {
    const phoneCallNo = phoneNo.mobile || phoneNo.phone;
    if (phoneCallNo === "" || phoneCallNo === null) {
      alert("No Number Found!");
      return;
    }
    Linking.openURL(`tel:${phoneCallNo}`);
  };

  const sendMail = (email) => {
    if (email === "" || email === null) {
      alert("No Email Found");
      return;
    }
    return Linking.openURL(`mailto:${email}`);
  };

  const skypeCall = (userid) => {
    if (userid === "" || userid === null) {
      alert("No Skype ID found");
    }
    return Linking.openURL(`https://skype.com/${userid}`);
  };

  return (
    <View style={styles.cardContainer}>
      <Image
        style={[styles.cardImg, styles.shadowProp]}
        source={{
          uri: item.clinics.imageSrc,
        }}
      />
      <View style={styles.clinicTextContainer}>
        <MaterialIcons name="done" size={22} color="#92BA92" />
        <Text
          style={{
            color: "#123fde",
            fontWeight: "bold",
            fontSize: hp("2.2%"),
            flexWrap: "wrap",
            width: wp("50%"),
          }}
        >
          {item?.clinics ? "clinic" : ""}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: hp("3%"),
            letterSpacing: 2,
            fontFamily: "MerriweatherSans_700Bold",
            flexWrap: "wrap",
            width: wp("35%"),
          }}
        >
          {item.companyInfo.businessName
            ? item.companyInfo.businessName
            : item.clinics.contactName.first +
              " " +
              item.clinics.contactName.last}
        </Text>
        <View
          style={{
            marginTop: hp("-2.0%"),
            marginLeft: wp("-30%"),
            marginBottom: hp("1.5%"),
          }}
        >
          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={item?.rating}
            size={14}
            reviewSize={0}
            isDisabled={true}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: -6,
          }}
        >
          {/* PhoneNo */}
          <TouchableOpacity
            onPress={() => {
              callClinic(item.clinics.phones);
            }}
          >
            <Image source={phone} style={styles.icons} />
          </TouchableOpacity>
          {/* Email */}
          <TouchableOpacity
            onPress={() => {
              sendMail(item.clinics?.email);
            }}
          >
            <Image source={email} style={styles.icons} />
          </TouchableOpacity>
          {/* Skype */}
          <TouchableOpacity
            onPress={() => {
              skypeCall(item.clinics.phones.skype);
            }}
          >
            <Image source={skype} style={styles.icons} />
          </TouchableOpacity>
          {/* Location */}
          <TouchableOpacity>
            <Image source={location} style={styles.icons} />
          </TouchableOpacity>
        </View>
        {/* Qr Code */}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingVertical: 8,
          }}
        >
          <QRCode
            value={
              item.companyInfo?.website
                ? `${item.companyInfo.website}`
                : "Website Does Not Exists"
            }
            logoBackgroundColor="transparent"
            size={60}
          />
        </View>
      </View>
    </View>
  );
};

const DirectoryList = () => {
  const [clinicData, setClinicData] = useState([]);

  useEffect(() => {
    getClinics().then((data) => {
      setClinicData(data.data);
      console.log(clinicData);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={clinicData}
        renderItem={Card}
        keyExtractor={(item, index) => item}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icons: { margin: 4, height: 30, width: 30 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  cardImg: {
    width: "50%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  clinicTextContainer: {
    paddingVertical: 18,
    marginLeft: 25,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
