import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

const EventInfo = ({ margin, cellHeight, appointment }) => {

  const navigation = useNavigation()

  const { height, top, title, username, dateBirth, from, to, image, color } =
    appointment;
  const [isFull, setIsFull] = useState(height === cellHeight);
  const ref = useRef();
  return (
    <TouchableOpacity
      ref={ref}
      //TODO: I need to know why it does expand onPress
      // onPress={
      //   !isFull && cellHeight !== height
      //     ? () => {
      //         ref.current.focus();
      //         // console.log(ref.current.focus());
      //         setIsFull(true);
      //       }
      //     : () => {
      //         // ref.current.blur();
      //         setIsFull(false);
      //       }
      // }
      onPress={
        () => navigation.navigate("AppointmentProfile", { item: appointment })
      }

      // onBlur={ref.current.blur()}
      onLongPress={() => {
        alert("modal open");
      }}
      style={{
        height: isFull ? cellHeight : height,
        marginTop: top,
        paddingLeft: 5,
        marginLeft: 20,
        width: "90%",
        borderRadius: height >= 50 ? 10 : 5,
        backgroundColor: color ? color : "skyblue",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "900", marginHorizontal: 5, marginTop: 5, color: "#fff" }}>
          {`${from} - ${to}`}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            marginLeft: 5,
          }}
        >
          <Image
            source={
              `${image.length}`.length > 0
                ? { uri: image }
                : require("../assets/user.png")
            }

            style={{ height: 30, width: 30, borderRadius: 15 }}
          />
          <View style={{ fontSize: 14, flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={{ marginHorizontal: 5 }}>
              {username}
            </Text>
            <Text style={{ marginLeft: 10 }}>
              {dayjs(dateBirth).format("DD MMM YYYY")}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 17, marginLeft: 4, marginTop: 4, fontWeight: '700', color: '#0D1117', textTransform: 'capitalize' }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default EventInfo;
