import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Navbar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { AnimatedFlatList, AnimationType } from "flatlist-intro-animations";

export class Appoinment extends Component {
  state = {
    data: [
      {
        name: "Dr. John Doe",
        Specilist: "Cardiologist ",
        Appointments: "As Consultant",
        Time: "15 Aug 2020, 10:30 AM - 11:00 AM",
        key: 1,
        mode: "Video Call",
        Action: "Completed",
      },
      {
        name: "Dr. John Doe",
        Specilist: "Cardiologist ",
        Appointments: "As Doctor",
        Time: "15 Aug 2020, 10:30 AM - 11:00 AM",
        key: 2,
        mode: "Video Call",
        Action: "Completed",
      },
      {
        name: "Dr. John Doe",
        Specilist: "Cardiologist ",
        Appointments: "As Consultant",
        Time: "15 Aug 2020, 10:30 AM - 11:00 AM",
        key: 3,
        mode: "Video Call",
        Action: "Canceled",
      },
      {
        name: "Dr. John Doe",
        Specilist: "Cardiologist ",
        Appointments: "As Consultant",
        Time: "15 Aug 2020, 10:30 AM - 11:00 AM",
        key: 4,
        mode: "Call",
        Action: "Completed",
      },
      {
        name: "Dr. John Doe",
        Specilist: "Cardiologist ",
        Appointments: "As Consultant",
        Time: "15 Aug 2020, 10:30 AM - 11:00 AM",
        key: 5,
        mode: "Video Call",
        Action: "Completed",
      },
    ],
    active: "Active",
  };

  RenderItem = (item) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("AppoinmentsDetail");
      }}
      style={styles.flatlistContainer}
    >
      <View style={styles.FlatListTopView}>
        <View style={styles.ItemContainer}>
          <Text style={styles.itemAppoinment}>{item.Appointments}</Text>
        </View>
      </View>
      <View style={styles.FlatListMiddleView}>
        <View style={styles.FlatlistMiddleLeft}>
          <View style={styles.ProfileImg}>
            <Image
              style={styles.imge}
              source={require("../../assets/man.png")}
            />
          </View>
        </View>
        <View style={styles.FlatlistMiddleMiddle}>
          <Text style={styles.Itemname}>{item.name}</Text>
          <Text style={styles.ItemSpecilist}>{item.Specilist}</Text>
          <Text style={styles.ItemTime}>{item.Time}</Text>
        </View>
      </View>
      <View style={styles.FlatListBottomView}>
        <TouchableOpacity style={styles.Buttons}>
          <Image
            style={styles.Buttonicons}
            source={require("../../assets/call.png")}
          />
          <Text style={styles.ButtonText}>Phone Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.Buttons, { marginLeft: h("2%"), width: "40%" }]}
        >
          <Image
            style={styles.Buttonicons}
            source={require("../../assets/vid.png")}
          />
          <Text style={styles.ButtonText}>Video Call</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  RenderItem2 = (item) => (
    <View style={styles.flatlistContainer2}>
      <View style={styles.FlatListTopView}>
        <View style={styles.ItemContainer}>
          <Text style={styles.itemAppoinment}>{item.Appointments}</Text>
        </View>
      </View>
      <View style={styles.FlatListMiddleView}>
        <View style={styles.FlatlistMiddleLeft}>
          <View style={styles.ProfileImg}>
            <Image
              style={styles.imge}
              source={require("../../assets/man.png")}
            />
          </View>
        </View>
        <View style={styles.FlatlistMiddleMiddle}>
          <Text style={styles.Itemname}>{item.name}</Text>
          <Text style={styles.ItemSpecilist}>{item.Specilist}</Text>
          <Text style={styles.ItemTime2}>{item.Time}</Text>
          <Text style={styles.ItemTime2}>Mode: {item.mode}</Text>
          {item.Action === "Completed" ? (
            <Text style={styles.ItemTime}>{item.Action}</Text>
          ) : (
            <Text style={styles.ItemTime3}>{item.Action}</Text>
          )}
        </View>
      </View>
    </View>
  );
  render() {
    return (
      <View style={styles.Container}>
        <SafeAreaView />
        <View style={styles.TopContainer}>
          <View style={styles.ContainerForPic}>
            <View style={styles.TopLeftContianer}></View>
            <View style={styles.TopMiddleContianer}>
              <Text style={styles.nameText}>Appointments</Text>
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
          <View style={styles.TopActiveContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ active: "Active" });
              }}
              style={styles.TopLeftActiveContainer}
            >
              {this.state.active === "Active" ? (
                <>
                  <Text style={styles.ActiveText}>Active</Text>
                  <View style={styles.underline} />
                </>
              ) : (
                <Text style={styles.ActiveText2}>Active</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ active: "Past" });
              }}
              style={styles.TopRightActiveContainer}
            >
              {this.state.active === "Past" ? (
                <>
                  <Text style={styles.ActiveText}>Past</Text>
                  <View style={styles.underline} />
                </>
              ) : (
                <Text style={styles.ActiveText2}>Past</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <AnimatedFlatList
          data={this.state.data}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              {this.state.active === "Active"
                ? this.RenderItem(item)
                : this.RenderItem2(item)}
            </>
          )}
          animationType={AnimationType.Dive}
          keyExtractor={(item) => item.key}
          animationDuration={2500}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F6F6",
    alignItems: "center",
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
    height: h("15%"),
    flexDirection: "row",
    marginTop: h("2.5%"),
  },
  TopLeftContianer: {
    // backgroundColor: 'green',
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopMiddleContianer: {
    // backgroundColor: 'gold',
    width: "75%",
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
  imgRenderDesgin: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 110 / 2,
  },
  nameText: {
    fontSize: h("2.5%"),
    fontWeight: "bold",
    color: "white",
  },

  icons: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
  },
  faceImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  TopBottomContainer: {
    // backgroundColor: 'red',
    width: "95%",
    height: h("15%"),
    marginTop: h("1%"),
    flexDirection: "row",
    alignItems: "center",
  },
  TopContain: {
    // backgroundColor: 'green',
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("2.5%"),
    paddingRight: h("2%"),
    borderRightColor: "#0003",
    borderRightWidth: h("0.1%"),
  },
  MiddleContain: {
    // backgroundColor: 'gold',
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("3%"),
    paddingRight: h("2%"),
    borderRightColor: "#0003",
    borderRightWidth: h("0.1%"),
  },
  BottomContain: {
    // backgroundColor: 'tomato',
    width: "33.33%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("3%"),
    paddingRight: h("2%"),
  },
  Apponimtnnumber: {
    fontSize: h("3%"),
    fontWeight: "bold",
    color: "white",
  },
  AppoinmntText: {
    fontSize: h("2%"),
    color: "white",
  },

  lowerContaierFlatlist: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: h("120%"),
    alignItems: "center",
  },
  flatlistContainer: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("22%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    // elevation: h('0.1%'),
  },
  flatlistContainer2: {
    backgroundColor: "white",
    width: w("90%"),
    height: h("18%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    // elevation: h('0.1%'),
  },
  TodayText: {
    color: "black",
    fontSize: h("3%"),
  },
  Flatlist: {
    // backgroundColor: '#f2f2',
    alignItems: "center",
  },
  FlatListTopView: {
    // backgroundColor: 'purple',
    width: "100%",
    height: h("5%"),
    alignItems: "flex-end",
  },
  FlatListMiddleView: {
    // backgroundColor: 'orange',
    width: "100%",
    height: h("11%"),
    flexDirection: "row",
  },
  FlatListBottomView: {
    // backgroundColor: 'green',
    width: "100%",
    height: h("6%"),
    alignItems: "center",
    flexDirection: "row",
  },
  ItemContainer: {
    backgroundColor: "#003C75",
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemAppoinment: {
    color: "white",
    fontSize: h("1.5%"),
  },
  FlatlistMiddleLeft: {
    // backgroundColor: 'red',
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: h("2%"),
  },
  FlatlistMiddleMiddle: {
    // backgroundColor: 'gold',
    width: "75%",
    height: "100%",
  },
  ProfileImg: {
    // backgroundColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 110 / 2,
  },
  imge: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  Itemname: {
    color: "black",
    fontSize: h("2.5%"),
  },
  ItemTime: {
    color: "#003C75",
    fontSize: h("1.5%"),
    fontWeight: "bold",
    marginTop: h("0.5%"),
  },
  ItemTime3: {
    color: "#D0021B",
    fontSize: h("1.5%"),
    fontWeight: "bold",
  },
  ItemSpecilist: {
    color: "#0006",
    fontSize: h("2%"),
  },
  ItemTime2: {
    color: "#0006",
    fontSize: h("1.5%"),
  },
  Buttons: {
    width: "35%",
    height: h("5%"),
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: h("12%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Buttonicons: {
    height: "50%",
    width: "20%",
    resizeMode: "contain",
    marginRight: h("0.5%"),
  },
  ButtonText: {
    fontSize: h("1.5%"),
    color: "#003C75",
  },
  TopActiveContainer: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("7%"),
    flexDirection: "row",
  },
  TopLeftActiveContainer: {
    // backgroundColor: 'green',
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopRightActiveContainer: {
    // backgroundColor: 'gold',
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ActiveText: {
    color: "white",
    fontSize: h("2.8%"),
    fontWeight: "bold",
    marginTop: h("3%"),
  },
  ActiveText2: {
    color: "white",
    fontSize: h("2.8%"),
  },
  underline: {
    backgroundColor: "white",
    width: "100%",
    height: h("0.8%"),
    marginTop: h("1%"),
  },
});
