import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Navbar2 } from "../../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";

export class Notifications extends Component {
  state = {
    active: "Active",
    data: [
      {
        notifcation:
          "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore impsum asdl lorem ...      ",
        Time: "8 : 30 AM",
        id: 1,
      },
      {
        notifcation:
          "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore impsum asdl lorem ...      ",
        Time: "8 : 30 AM",
        id: 2,
      },
      {
        notifcation:
          "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore impsum asdl lorem ...      ",
        Time: "8 : 30 AM",
        id: 3,
      },
      {
        notifcation:
          "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore impsum asdl lorem ...      ",
        Time: "8 : 30 AM",
        id: 4,
      },
    ],
  };

  renderItem = (item) => (
    <View style={styles.FlatListContainer}>
      <View style={styles.leftFlatlist}>
        <Text style={styles.notifcation}>{item.notifcation}</Text>
        <Text style={styles.Time}>{item.Time}</Text>
      </View>
      <TouchableOpacity style={styles.RightFlatlist}>
        <Icon name={"close-outline"} type="ionicon" color="#E93030" size={35} />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.Container}>
        <SafeAreaView />
        <Navbar2
          arrow={() => {
            this.props.navigation.goBack();
          }}
          Text={"Notifications"}
          RightText={"Clear All"}
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",

    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },
  FlatListContainer: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("12%"),
    margin: h("1%"),
    flexDirection: "row",
  },
  leftFlatlist: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    // alignItems: 'center',
    paddingLeft: h("2%"),
  },
  RightFlatlist: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  notifcation: {
    color: "black",
    fontSize: h("2%"),
  },
  Time: {
    color: "#0005",
    fontSize: h("2%"),
  },
});
