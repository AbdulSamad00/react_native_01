import React from "react";
import { Text, View } from "react-native";
import moment from "moment";
import dayjs from "dayjs";

function HorizontalTimeline({ height = 50, cellWidth = 60, week = false }) {

  const timelineItems = [];
  const date = new Date()
  const weekNo = Math.ceil(date.getDate() / 7)
  const n = week ? 7 : 0
  for (let index = 0; index < 24; index++) {
    timelineItems.push(
      <View
        key={index.toString()}
        style={{
          width: cellWidth,
          paddingHorizontal: 5,
          borderWidth: 1,
          borderColor: "#ddd",
          justifyContent: "center",
        }}
      >


        <Text
          style={{
            fontSize: 10,
            color: "#003C75",
          }}
        >
          {index === 0
            ? `12 AM`
            : index < 13
              ? `${index} AM`
              : `${index % 12 === 0 ? 12 : index % 12} PM`}
        </Text>

      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#eee", alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>

        {week ?
          [...Array(n)].map((index, item) => (

            <View style={{ width: cellWidth * 24, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>{dayjs(date).add(item, "day").format("dddd")}</Text>
            </View>
          ))
          :
          <></>
        }
      </View>
      <View
        style={{
          flexDirection: "row",
          height: height,
          borderBottomWidth: 1,
          borderBottomColor: "#555",

        }}
      >
        {week ?

          [...Array(n)].map((item) => (
            timelineItems
          ))
          :
          <>
            {timelineItems}
          </>
        }
      </View>
    </View>
  );
}

export default HorizontalTimeline;