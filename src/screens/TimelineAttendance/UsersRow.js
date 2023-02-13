import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const UsersRow = ({ ero, department, eroImg,clinic }) => {
  // const usersRef = React.useRef(0);
  // console.log("user render => ", patients);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", }}>
      <View style={styles.appointmentLeftDoctor}>
        <View
          style={{
            height: ero == 'Ero' ? 50 : 70,
            width: "100%",
            borderWidth: 1,
            borderColor: "#ddd",
            alignItems: "center",
            justifyContent: ero == 'Ero' ? 'center' : "flex-end",
            // flexDirection: "row"
          }}>
          {ero != 'Ero' ?
            <Image source={{ uri: eroImg }} style={{ width: 30, height: 30, borderRadius: 15, marginRight: 3 }} />
            :
            <></>
          }

          <Text style={{fontSize: 12, fontWeight: "500", textTransform: "capitalize", textAlign: "center" }}>{ero}</Text>
        </View>
      </View>


      <View style={styles.appointmentLeftPatient}>
        <View
          style={{
            height: ero == 'Ero' ? 50 : 70,
            width: "100%",
            borderWidth: 1,
            borderRightWidth: 5,
            borderColor: "#ddd",
            alignItems: "center",
            justifyContent: 'center'
          }}
        >
          {clinic != 'Clinic' ?
            <View style={{flexDirection:"row",alignItems:"center"}}>
            
                  <Text  style={{fontSize: 12, marginRight: 1 }} >{clinic} </Text>
             
            </View>
          :
          <></>
          }
          {clinic == 'Clinic' ?
            <Text style={{ fontSize: 12, fontWeight: "500", textTransform: 'capitalize', textAlign: "center" }}>{clinic}</Text>
            :
            <></>
          }
        </View>
      </View>



      <View style={styles.appointmentLeftPatient}>
        <View
          style={{
            height: ero == 'Ero' ? 50 : 70,
            width: "100%",
            borderWidth: 1,
            borderRightWidth: 5,
            borderColor: "#ddd",
            alignItems: "center",
            justifyContent: 'center'
          }}
        >
          {department != 'Department' ?
            <View style={{flexDirection:"row",alignItems:"center"}}>
            
                  <Text  style={{ marginRight: 1 }} >{department} </Text>
             
            </View>
          :
          <></>
          }
          {department == 'Department' ?
            <Text style={{fontSize: 10, fontWeight: "500", textTransform: 'capitalize', textAlign: "center" }}>{department}</Text>
            :
            <></>
          }
        </View>
      </View>

    </View>
  );
};

export default React.memo(UsersRow);

const styles = StyleSheet.create({
  appointmentLeftDoctor: {
    width: "33.33%",
    height: "100%",

  },
  appointmentLeftPatient: {
    width: "33.33%",
    height: "100%",
  },
});