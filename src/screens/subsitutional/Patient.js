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
import { SearchBar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";

export class Patient extends Component {
  state = {
    data: [
      { name: "Sam Alex", specility: "Male, 45", location: "New Delhi" },
      { name: "Sam Alex", specility: "Male, 45", location: "New Delhi" },
      { name: "Sam Alex", specility: "Male, 45", location: "New Delhi" },
      { name: "Sam Alex", specility: "Male, 45", location: "New Delhi" },
      { name: "Sam Alex", specility: "Male, 45", location: "New Delhi" },
      { name: "Sam Alex", specility: "Male, 45", location: "New Delhi" },
      { name: "Sam Alex", specility: "Male, 45", location: "New Delhi" },
      { name: "Sam Alex", specility: "Male, 45", location: "New Delhi" },
    ],
  };
  renderItem2 = (item) => (
    <TouchableOpacity style={styles.Flatlist2Container}>
      <View style={styles.RightContaner}>
        <Text style={styles.DocnameText}>{item.name}</Text>
        <Text style={styles.SpeciltyTexts}>{item.specility}</Text>
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      <View style={styles.EndContaner}>
        <Image style={styles.icons} source={require("../../assets/next.png")} />
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <View style={styles.Container}>
        <SafeAreaView />
        <View style={styles.TopContainer}>
          <View style={styles.ContainerForPic}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={styles.TopLeftContianer}
            >
              <Icon
                name="arrow-back-outline"
                type="ionicon"
                color="#ffff"
                size={25}
              />
            </TouchableOpacity>
            <View style={styles.TopMiddleContianer}>
              <Text style={styles.ConsultantText}>Patients</Text>
            </View>
          </View>
          <SearchBar />
        </View>

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderItem2(item)}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  TopContainer: {
    backgroundColor: "#00B7DD",

    width: "100%",
    height: h("25%"),
    alignItems: "center",
  },
  ContainerForPic: {
    // backgroundColor: 'red',
    width: "90%",
    height: h("8%"),
    flexDirection: "row",
    marginTop: h("2.5%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "70%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  TopRightContianer: {
    // backgroundColor: 'tomato',
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  ConsultantText: {
    color: "white",
    fontSize: h("2.5%"),
    fontWeight: "bold",
  },
  SpecilityContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("18%"),
    marginTop: h("2%"),

    alignItems: "center",
    paddingTop: h("1%"),
  },
  Flatlist1Container: {
    backgroundColor: "white",
    width: w("20%"),
    height: h("15%"),
    justifyContent: "center",
    alignItems: "center",
    margin: h("1%"),
    elevation: h("1%"),
  },
  icons2: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  icons3: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  TextContainer: {
    // backgroundColor: 'green',
    width: "100%",
    height: "34%",
    // marginTop: -h('2%'),
  },
  ImgContainer: {
    // backgroundColor: 'gold',
    width: "100%",
    height: "60%",
    // marginTop: -h('2%'),
  },
  ViewAllContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: h("3%"),
    paddingLeft: h("3%"),

    alignItems: "center",
  },
  SpecilityText: {
    color: "black",
    fontSize: h("3%"),
  },
  ViewText: {
    color: "#0005",
    fontSize: h("2%"),
  },
  JhonConainter: {
    backgroundColor: "red",
    alignItems: "center",
    marginTop: h("2%"),
  },
  Flatlist2Container: {
    backgroundColor: "white",
    width: w("95%"),
    height: h("15%"),
    margin: h("1%"),
    flexDirection: "row",
    elevation: h("0.5%"),
  },

  RightContaner: {
    // backgroundColor: 'green',
    width: "90%",
    height: h("15%"),
    // alignItems: 'center',
    justifyContent: "center",
    paddingLeft: h("2%"),
  },
  EndContaner: {
    // backgroundColor: 'orange',
    width: "10%",
    height: h("15%"),
    alignItems: "center",
    justifyContent: "center",
  },
  DocnameText: {
    color: "black",
    fontSize: h("2.2%"),
  },
  SpeciltyTexts: {
    color: "#0007",
    fontSize: h("1.5%"),
  },
  locationText: {
    color: "#0007",
    fontSize: h("1.5%"),
  },
});
