import { useFormikContext } from "formik";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

export default function Submit({ isLoading = false, txt }) {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      disabled={isLoading}
      style={{
        backgroundColor: "#00B7DD",
        width: "85%",
        height: 50,
        borderRadius: 42,
        flexDirection: "row",
        marginTop: "2%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={"small"} color={"white"} />
      ) : (
        <Text style={{ color: "white", fontSize: 18 }}>{txt}</Text>
      )}
    </TouchableOpacity>
  );
}
