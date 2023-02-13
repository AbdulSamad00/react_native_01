import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const UsersRow = ({ doctor, patient, doctorImg, patientImg, patients }) => {
  // const usersRef = React.useRef(0);
  // console.log("user render => ", patients);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", }}>
      <View style={styles.appointmentLeftDoctor}>
        <View
          style={{
            height: doctor == 'Doctor' ? 50 : 70,
            width: "100%",
            borderWidth: 1,
            borderColor: "#ddd",
            alignItems: "center",
            justifyContent: doctor == 'Doctor' ? 'center' : "flex-end",
            // flexDirection: "row"
          }}>
          {doctor != 'Doctor' ?
            <Image source={{ uri: doctorImg }} style={{ width: 30, height: 30, borderRadius: 15, marginRight: 3 }} />
            :
            <></>
          }

          <Text style={{ fontWeight: "500", textTransform: "capitalize", textAlign: "center" }}>{doctor}</Text>
        </View>
      </View>
      <View style={styles.appointmentLeftPatient}>
        <View
          style={{
            height: doctor == 'Doctor' ? 50 : 70,
            width: "100%",
            borderWidth: 1,
            borderRightWidth: 5,
            borderColor: "#ddd",
            alignItems: "center",
            justifyContent: 'center'
          }}
        >
          {patient != 'Patient' && patients?.length ?
            <View style={{flexDirection:"row",alignItems:"center"}}>
              {
                patients.map((item =>
                  <Image source={{ uri: item.image }} style={{ width: 25, height: 25, borderRadius: 15, marginRight: 1 }} />
                ))
              }
            </View>
          :
          <></>
          }
          {patient == 'Patient' ?
            <Text style={{ fontWeight: "500", textTransform: 'capitalize', textAlign: "center" }}>{patient}</Text>
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
    width: "50%",
    height: "100%",

  },
  appointmentLeftPatient: {
    width: "50%",
    height: "100%",
  },
});
