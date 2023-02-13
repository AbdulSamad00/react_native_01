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

export class Consultant extends Component {
  state = {
    Specility: [
      { name: "Allergy & Immunology" },
      { name: "Anaesthesia" },
      { name: "Cardioloogy" },
      { name: "Dermatology" },
      { name: "Anaesthesia" },
      { name: "Cardioloogy" },
    ],
    data: [
      {
        name: "Dr. John Doe",
        specility: "Cardiologist",
        location: "New Delhi",
      },
      {
        name: "Dr. John Doe",
        specility: "Cardiologist",
        location: "New Delhi",
      },
      {
        name: "Dr. John Doe",
        specility: "Cardiologist",
        location: "New Delhi",
      },
      {
        name: "Dr. John Doe",
        specility: "Cardiologist",
        location: "New Delhi",
      },
    ],
  };
  renderItem1 = (item) => (
    <View style={styles.Flatlist1Container}>
      <View style={styles.ImgContainer}>
        <Image
          style={styles.icons2}
          source={require("../../assets/Image.png")}
        />
      </View>

      <View style={styles.TextContainer}>
        <Text style={styles.itemTextName}>{item.name}</Text>
      </View>
    </View>
  );
  renderItem2 = (item) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("ConsultantDetails");
      }}
      style={styles.Flatlist2Container}
    >
      <View style={styles.leftContaner}>
        <Image style={styles.icons3} source={require("../../assets/man.png")} />
      </View>
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
            <View style={styles.TopLeftContianer}></View>
            <View style={styles.TopMiddleContianer}>
              <Text style={styles.ConsultantText}>Consultants</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Notifications");
              }}
              style={styles.TopRightContianer}
            >
              <Image
                style={styles.icons}
                source={require("../../assets/bell.png")}
              />
            </TouchableOpacity>
          </View>
          <SearchBar />
        </View>
        <View style={styles.ViewAllContainer}>
          <Text style={styles.SpecilityText}>Specialties</Text>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => {
              this.props.navigation.navigate("Speacility");
            }}
          >
            <Text style={styles.ViewText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.SpecilityContainer}>
          <FlatList
            horizontal
            data={this.state.Specility}
            renderItem={({ item }) => this.renderItem1(item)}
            keyExtractor={(item) => item.id}
          />
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
    // backgroundColor: "gold",
    width: "100%",
    height: h("15%"),
    marginTop: h("2%"),

    alignItems: "center",
    paddingTop: h("1%"),
  },
  Flatlist1Container: {
    backgroundColor: "white",
    width: w("22%"),
    height: h("10%"),
    justifyContent: "center",
    alignItems: "center",
    margin: h("1%"),
    elevation: h("1%"),
    // backgroundColor: "red",
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
    // backgroundColor: "green",
    width: "100%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",

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
    fontSize: h("2.4%"),
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
  leftContaner: {
    // backgroundColor: 'gold',
    width: "30%",
    height: h("15%"),
    alignItems: "center",
    justifyContent: "center",
  },
  RightContaner: {
    // backgroundColor: 'green',
    width: "60%",
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
    fontSize: h("2.4%"),
  },
  SpeciltyTexts: {
    color: "#0007",
    fontSize: h("2%"),
  },
  locationText: {
    color: "#0007",
    fontSize: h("2%"),
  },
  itemTextName: {
    color: "black",
    fontSize: h("1.5%"),
  },
});
