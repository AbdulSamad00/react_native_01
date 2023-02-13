import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FAB, TouchableRipple } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteKanban } from "../../api/kanbans";
import Header from "../../components/Header";
import { fetchKanbans, setSelectedKanbanToState } from "../../store/kanbans";
import { fetchUsers } from "../../store/users";
import AddOrUpdateKanban from "./AddOrUpdateKanban";

const KanbansScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { kanbans, loading } = useSelector((state) => state.kanbans);
  const [kanbanVisible, setKanbanVisible] = useState(false);
  const [selectedKanban, setSelectedKanban] = useState({});

  useEffect(() => {
    dispatch(fetchKanbans());
    dispatch(fetchUsers());
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", alignContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header back title={"Kanbans"} />
      <FlatList
        data={kanbans}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableRipple
              onPress={() => {
                dispatch(setSelectedKanbanToState(item));
                navigation.navigate("ScrumBoard");
              }}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
            </TouchableRipple>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedKanban(item);
                  setKanbanVisible(true);
                }}
                style={{ marginRight: 20 }}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  size={20}
                  color="darkblue"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const { ok } = await deleteKanban(item._id);
                  if (ok) dispatch(fetchKanbans());
                }}
              >
                <MaterialCommunityIcons name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <FAB
        onPress={() => {
          setKanbanVisible(true);
        }}
        style={styles.fab}
        icon={"plus"}
        color="white"
      />
      {kanbanVisible && (
        <AddOrUpdateKanban
          selectedKanban={selectedKanban}
          visible={kanbanVisible}
          setVisible={setKanbanVisible}
        />
      )}
    </View>
  );
};

export default KanbansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#00B7DD",
  },
  card: {
    backgroundColor: "lightblue",
    marginHorizontal: 20,
    padding: 20,
    marginTop: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
