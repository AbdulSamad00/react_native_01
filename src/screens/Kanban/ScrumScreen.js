import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Board, { Repository } from "react-native-dnd-board";
import { Button, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { fetchListkanbans } from "../../store/listkanbans";
import AddOrUpdateCard from "./AddOrUpdateCard";
import AddOrUpdateListKanban from "./AddOrUpdateListKanban";

const COLUMN_WIDTH = Dimensions.get("window").width * 0.6;

const ScrumScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedKanban } = useSelector((state) => state.kanbans);
  const { listkanbans, loading } = useSelector((state) => state.listkanbans);
  const { users } = useSelector((state) => state.users);
  const [cardVisible, setCardVisible] = useState(false);
  const [listkanbanVisible, setListkanbanVisible] = useState(false);
  const [throughAddCard, setThroughAddCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedListkanban, setSelectedListkanban] = useState({});

  const [repository, setRepository] = useState(null);

  useEffect(() => {
    dispatch(fetchListkanbans(selectedKanban._id));
    return () => {
      setRepository(null);
    };
  }, []);

  useEffect(() => {
    if (listkanbans) {
      setRepository(new Repository(listkanbans));
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", alignContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
  const getAssignedTo = (userIds) =>
    users
      .filter((user) => userIds.includes(user._id))
      .map((user) => user.username);

  const onCardPress = (card) => {
    const { data } = card;
    setSelectedCard(data);
    setThroughAddCard(true);
    setCardVisible(true);
  };

  const onDragEnd = (fromColumnId, toColumnId, card) => {
    //
  };

  const renderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={{ backgroundColor: "#ddd", padding: 5 }}>{item.name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ color: "#03b1fc" }}>Created on: </Text>
          <Text style={{ color: "#03b1fc", fontWeight: "bold" }}>
            {dayjs(item.createdOn).format("DD-MM-YYYY:HH:mm")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "#03b1fc" }}>Deadline: </Text>
          <Text style={{ color: "#03b1fc", fontWeight: "bold" }}>
            {dayjs(item.deadline).format("DD-MM-YYYY:HH:mm")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "#123abd" }}>Assigned To: </Text>
          <Text style={{ color: "#03b1fc", fontWeight: "bold" }}>
            {getAssignedTo(item.assignedTo)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "#03b1fc" }}>Category:</Text>
          <Text
            style={{
              color: "black",
              backgroundColor: "yellow",
              padding: 5,
              fontWeight: "bold",
            }}
          >
            {item.category}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "black" }}>Narrative:</Text>
          <Text style={{ color: "#123abd", fontWeight: "bold" }}>
            {item.narrative}
          </Text>
        </View>
      </View>
    );
  };

  const renderColumn = ({ item, columnComponent, layoutProps, index }) => {
    return (
      <View
        style={[styles.column, { backgroundColor: item.color }]}
        {...layoutProps}
      >
        <View style={styles.columnHeader}>
          <Text style={styles.columnName}>{item.name}</Text>
          <IconButton
            icon="pencil"
            size={20}
            color="white"
            onPress={() => {
              setSelectedListkanban(item);
              setListkanbanVisible(true);
            }}
          />
        </View>
        {columnComponent}
        <Button
          theme={{
            colors: {
              primary: "blue",
            },
          }}
          onPress={() => {
            setSelectedCard({
              kanbanNo: selectedKanban._id,
              listKanbanNo: item.id,
            });
            setThroughAddCard(true);
            setCardVisible(true);
          }}
        >
          + Add Card
        </Button>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#014A81" />
      <Header back title={selectedKanban.name} />
      {repository && (
        <Board
          style={styles.board}
          repository={repository}
          renderRow={renderCard}
          renderColumnWrapper={renderColumn}
          onRowPress={onCardPress}
          onDragEnd={onDragEnd}
          columnWidth={COLUMN_WIDTH}
          accessoryRight={
            <View style={[styles.column, styles.addColumn]}>
              <Button
                theme={{
                  colors: {
                    primary: "blue",
                  },
                }}
                onPress={() => {
                  setListkanbanVisible(true);
                }}
              >
                + Add Column
              </Button>
            </View>
          }
        />
      )}
      {cardVisible && (
        <AddOrUpdateCard
          selectedCard={selectedCard}
          throughAddCard={throughAddCard}
          visible={cardVisible}
          setVisible={setCardVisible}
        />
      )}
      {listkanbanVisible && (
        <AddOrUpdateListKanban
          selectedListkanban={selectedListkanban}
          visible={listkanbanVisible}
          setVisible={setListkanbanVisible}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  hederName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  board: {
    paddingVertical: 16,
    backgroundColor: "#E0E8EF",
  },
  column: {
    backgroundColor: "#F8FAFB",
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  columnHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  columnName: {
    fontWeight: "bold",
    color: "white",
  },
  addColumn: {
    marginRight: 12,
    padding: 12,
  },
  card: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#F6F7FB",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    justifyContent: "space-between",
    maxWidth: COLUMN_WIDTH,
  },
  addCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(233, 233, 233)",
    borderRadius: 4,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#F5F6F8",
    maxWidth: COLUMN_WIDTH,
  },
});

export default ScrumScreen;
