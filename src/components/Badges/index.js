import React from "react";
import { View, Text } from "react-native";

export const genderBadge = (gender) => {
  const color =
    gender?.toLowerCase() === "male"
      ? "#07f"
      : gender?.toLowerCase() === "female"
        ? "#e47"
        : "#888";
  return (
    <View style={{ backgroundColor: color + "2", borderRadius: 4, padding: 4 }}>
      <Text style={{ fontWeight: "bold", color }}>{gender || "N/A"}</Text>
    </View>
  );
};

export const statusBadge = (status) => {
  const color =
    status?.toLowerCase() === "active"
      ? "#2f2"
      : status?.toLowerCase() === "approved"
        ? "#2f2"
        : status?.toLowerCase() === "archived"
          ? "#000"
          : status?.toLowerCase() === "banned"
            ? "#f22"
            : status?.toLowerCase() === "deleted"
              ? "#222"
              : status?.toLowerCase() === "all"
                ? "#07f"
                : "#888";
  return (
    <View style={{ backgroundColor: color + "2", borderRadius: 4, padding: 4 }}>
      <Text style={{ fontWeight: "bold", color: color }}>{status || "N/A"}</Text>
    </View>
  );
};
