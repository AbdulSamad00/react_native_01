import { useNavigation } from "@react-navigation/core";
import dayjs from "dayjs";
import moment from "moment";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function Attendance({ oldWidth, cellWidth, appointment ,week }) {

  // const render = React.useRef(0);

  // console.log("appt render => ", render.current++);
  // console.log("oldWidth render => ", oldWidth.current++);
  const colors = ['rgb(83,244,83)', 'rgb(245,174,141)', 'rgb(207,185,250)', 'rgb(122,182,241)', 'rgb(217,153,54)', 'rgb(198,246,33)', 'rgb(33,246,88)', 'rgb(170,241,182)'
    , 'rgb(244,171,58)']
  const navigation = useNavigation()
  const renderAppointments = ({ item }) => {

    console.log(item.name+" "+item.startTime+" "+item.endTime+" "+dayjs(item.createdOn).format("d"));
    const start =
      (Number(moment(item.startTime, "HH:mm").format("HH")) + Number(moment(item.startTime, "H:mm").format("mm")) / 60) *cellWidth;
    let end = end = (Number(moment(item.endTime, "HH:mm").format("HH")) + Number(moment(item.endTime, "HH:mm").format("mm")) / 60)*cellWidth+160
   

    const width = (end - start);
    const left = start - oldWidth.current;
    oldWidth.current = end;
    const index=Math.floor(Math.random() * 8) 

    return (
     
       
          <TouchableOpacity onPress={() => navigation.navigate('AppointmentInfo', { item: item })}
            style={{
              width: width,
              height: 70,
              marginLeft: left,
              paddingVertical: 5,
              backgroundColor: colors[index],
              paddingHorizontal: 10,
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: "center"
            }}>
              <Text ellipsizeMode="tail" color="white" numberOfLines={1}>
                {item.name}{' '}
              </Text>

            </View>

          </TouchableOpacity>
  
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={appointment}
        keyExtractor={(_, i) => `${i}`}
        renderItem={renderAppointments}
      />
    </View>
  );
}

export default Attendance;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
});