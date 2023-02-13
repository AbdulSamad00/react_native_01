import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
  Image,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Address({clinic}) {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "10%",
            //borderWidth: 1,
          }}
        >
          <Entypo name="location-pin" size={24} color="red" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16 }}>
            {clinic?.clinics.Address.address1}
          </Text>
          <Text style={{ fontSize: 16 }}>{clinic?.clinics?.Address?.zip}</Text>
          <Text style={{ fontSize: 16 }}>{clinic?.clinics?.Address?.state}</Text>
          <Text style={{ fontSize: 16 }}>{clinic?.clinics?.Address?.country}</Text>
        </View>
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#e23",
            borderRadius: 24,
            paddingHorizontal: 8,
            paddingVertical: 6,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
          onPress={ () => {
              const coords = {
                longitude: clinic.companyInfo.location.coordinates[0],
                latitude: clinic.companyInfo.location.coordinates[1],
              };
              navigation.navigate("MapRoute", { 
                coordinates: coords,
                name: clinic?.companyInfo?.businessName
              });
            } 
          }
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            {" "}
            Route me to this adress{" "}
          </Text>
          <AntDesign name="arrowright" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            companyPhones.phone
              ? Linking.openURL(`tel:${companyPhones.phone}`)
              : alert("Not a valid number");
          }}
        >
          <Image
            style={{ width: 18, height: 18, marginRight: 5 }}
            source={require("../../../assets/icons/phone.png")}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 16 }}>
          {clinic.clinics.phones.phone
            ? clinic.clinics.phones.phone
            : "Not Available"}
        </Text>
      </View>

      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            clinic.clinics?.phones.mobile
              ? Linking.openURL(`tel:${clinic.clinics.phones.mobile}`)
              : alert("Not a valid number");
          }}
        >
          <FontAwesome
            name="mobile-phone"
            size={26}
            color="red"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>
          {clinic.clinics?.phones.mobile
            ? clinic.clinics.phones.mobile
            : "Not available"}
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          //flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            marginTop: 12,
            borderWidth: 2,
            borderRadius: 24,
            borderColor: "#000",
          }}
        >
          <View
            style={{
              marginTop: -20,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
              padding: 5,
              marginLeft: 16,
              width: 220,
              backgroundColor: "white",
            }}
          >
            <Image
              style={{ width: 15, height: 15, marginRight: 5 }}
              source={require("../../../assets/icons/email.png")}
            />
            {/* <MaterialCommunityIcons
                        name="file-document-edit-outline"
                        size={24}
                        color="red"
                      /> */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Send an email to clinic
            </Text>
          </View>

          <View style={{ width: "80%", marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Name</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 0.3,
                marginBottom: 10,
              }}
            >
              <FontAwesome
                name="user-circle-o"
                size={16}
                color="red"
                style={{ marginRight: 10 }}
              />
              <TextInput style={{ width: "100%" }} placeholder="Your Name" />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Email</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 0.3,
                marginBottom: 10,
              }}
            >
              <FontAwesome
                name="envelope-o"
                size={16}
                color="red"
                style={{ marginRight: 10 }}
              />
              <TextInput style={{ width: "100%" }} placeholder="Your Email" />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Message</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 0.3,
                marginBottom: 20,
              }}
            >
              <MaterialCommunityIcons
                name="file-document-edit-outline"
                size={16}
                color="red"
                style={{ marginRight: 10 }}
              />

              <TextInput
                multiline={true}
                numberOfLines={3}
                style={{ width: "80%" }}
                placeholder="Message"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: "40%",
            padding: 10,
            backgroundColor: "#e23",
            borderRadius: 50,
            marginRight: 10,
            marginTop: 12,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Send your mail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
