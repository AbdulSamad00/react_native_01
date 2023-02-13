import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deviceWidth } from "../config/CommonStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

//const Header = ({ children, back, title, rightComponent,navigation }) => {
const Header = ({ children, back, title, rightComponent }) => {
  const { goBack } = useNavigation();
  useEffect(()=>console.log(back),[])
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.left}>
          {back && (
            <TouchableOpacity style={styles.leftIcon} onPress={()=>goBack()}>
              <MaterialIcons
                style={{
                  padding: 5,
                  width: "100%",
                }}
                name="arrow-back-ios"
                color="white"
                size={20}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[styles.center, { width: rightComponent ? "60%" : "90%" }]}
        >
          {title && (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight:"bold",
                fontSize:17,
              }}
            >
              {title}
            </Text>
          )}
        </View>
        {rightComponent && <View style={styles.right}>{rightComponent}</View>}
      </View>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: hp("5%"),
    backgroundColor: "#00B7DD",
    flexDirection: "row",
    alignItems: "center",
  },
  childrenContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
  },
  left: {
    height: "100%",
    flex: 2,
    justifyContent: "center",
  },
  leftIcon: {
    marginHorizontal: 5,
  },
  center: {
    height: "100%",
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    height: "100%",
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
