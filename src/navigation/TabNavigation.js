import React, { useEffect,useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Components
import { Image, StyleSheet } from "react-native";
// Screens
import { Home } from "../screens/dashboard";
import { Consultant } from "../screens/dashboard";
import { MoreScreen } from "../screens/dashboard";
import { Slot } from "../screens/dashboard";
//import NearYou from "../screens/dashboard/NearYou";
import { Patients } from "../screens/Users";
import { getDeviceTypeAsync } from "expo-device";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  const [deviceType,SetDeviceType]=useState()
  const getDeviceType=async()=>{
    SetDeviceType(await getDeviceTypeAsync())
  }
  useEffect(()=>{
     getDeviceType()
    console.log(deviceType)
  },[])
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: "#00B7DD",
        inactiveTintColor: "#0005",
        labelStyle:{fontSize:19},
        showLabel: deviceType===1? false:true
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          
          tabBarLabel:"Home",
          tabBarIcon: ({}) => (
            <Image
              style={deviceType===1?styles.iconsPhone: styles.icons}
              source={require("../assets/home.png")}
            />
          ),
          
        }}
      />
    
      <Tab.Screen
        name="Patients"
        component={Patients}
        options={{
          tabBarLabel: "Patients",
          tabBarIcon: ({ color, size }) => (
            <Image
            style={deviceType===1?styles.iconsPhone: styles.icons}
              source={require("../assets/icons/patient.png")}
            />
          ),
        }}
      />
    
      {/* <Tab.Screen
        name="Near You"
        component={NearYou}
        options={{
          tabBarLabel: "Near You",
          tabBarIcon: ({ color, size }) => (
            <Image
              style={styles.icons}
              source={require("../assets/icons/address.png")}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          tabBarLabel: "More",
          tabBarIcon: ({ color, size }) => (
            <Image
              style={styles.icons}
              source={require("../assets/more.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  icons: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
  },
  iconsPhone:{
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  }
});
