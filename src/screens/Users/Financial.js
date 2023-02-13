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
import { Icon } from "react-native-elements";

export class Financial extends Component {
  state = {
    data: [
      {
        name: "Appt # 2345334",
        Specilist: "Dr. Abdul ",
        Appointments: "As Consultant",
        Time: "16 Aug 2020 | 9:30 am",
        key: 1,
        Payments: "- $ 120.00",
        Earning: "+ $ 120.00",
      },
      {
        name: "Appt # 2345334",
        Specilist: "Dr. Abdul ",
        Appointments: "As Doctor",
        Time: "16 Aug 2020 | 9:30 am",
        key: 2,
        Payments: "- $ 120.00",
        Earning: "+ $ 120.00",
      },
      {
        name: "Appt # 2345334",
        Specilist: "Dr. Abdul ",
        Appointments: "As Consultant",
        Time: "16 Aug 2020 | 9:30 am",
        key: 3,
        Payments: "- $ 120.00",
        Earning: "+ $ 120.00",
      },
      {
        name: "Appt # 2345334",
        Specilist: "Dr. Abdul ",
        Appointments: "As Consultant",
        Time: "16 Aug 2020 | 9:30 am",
        key: 4,
        Payments: "- $ 120.00",
        Earning: "+ $ 120.00",
      },
      {
        name: "Appt # 2345334",
        Specilist: "Dr. Abdul ",
        Appointments: "As Consultant",
        Time: "16 Aug 2020 | 9:30 am",
        key: 5,
        Payments: "- $ 120.00",
        Earning: "+ $ 120.00",
      },
    ],
    active: "Active",
  };

  RenderItem = (item) => (
    <View style={styles.flatlistContainer}>
      <View style={styles.FlatListMiddleView}>
        <View style={styles.FlatlistMiddleMiddle}>
          <Text style={styles.Itemname}>{item.name}</Text>
          <Text style={styles.ItemSpecilist}>{item.Specilist}</Text>
          <Text style={styles.ItemSpecilist}>{item.Time}</Text>
        </View>
      </View>
      <View style={styles.FlatListTopView}>
        <Text style={styles.Earning}>{item.Earning}</Text>
      </View>
    </View>
  );
  RenderItem2 = (item) => (
    <View style={styles.flatlistContainer}>
      <View style={styles.FlatListMiddleView}>
        <View style={styles.FlatlistMiddleMiddle}>
          <Text style={styles.Itemname}>{item.name}</Text>
          <Text style={styles.ItemSpecilist}>{item.Specilist}</Text>
          <Text style={styles.ItemSpecilist}>{item.Time}</Text>
        </View>
      </View>
      <View style={styles.FlatListTopView}>
        <Text style={styles.payments}>{item.Payments}</Text>
      </View>
    </View>
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
                name={"arrow-back-outline"}
                type="ionicon"
                color="#fff"
                size={35}
              />
            </TouchableOpacity>
            <View style={styles.TopMiddleContianer}>
              <Text style={styles.nameText}>Financial Report</Text>
            </View>
            <View style={styles.TopRightContianer}></View>
          </View>
          <View style={styles.FinaceBox}>
            <View style={styles.box1}>
              <Text style={styles.tenk}>10k</Text>
              <Text style={styles.earn}>Total Earned (As Consultant)</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.tenk}>120k</Text>
              <Text style={styles.earn}>Total Paid (As Doctor)</Text>
            </View>
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
                  <Text style={styles.ActiveText}>Earnings</Text>
                  <View style={styles.underline} />
                </>
              ) : (
                <Text style={styles.ActiveText2}>Earnings</Text>
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
                  <Text style={styles.ActiveText}>Payments</Text>
                  <View style={styles.underline} />
                </>
              ) : (
                <Text style={styles.ActiveText2}>Payments</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <AnimatedFlatList
          data={this.state.data}
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
    height: h("35%"),
    alignItems: "center",
  },
  ContainerForPic: {
    // backgroundColor: 'red',
    width: "90%",
    height: h("7%"),
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
    fontSize: h("2.4%"),
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
    height: h("20%"),
    marginTop: h("1%"),
    borderRadius: h("1.1%"),
    overflow: "hidden",
    // elevation: h('0.1%'),
    flexDirection: "row",
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
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  FlatListMiddleView: {
    // backgroundColor: 'orange',
    width: "60%",
    height: "100%",
  },

  itemAppoinment: {
    color: "white",
    fontSize: h("2%"),
  },
  FlatlistMiddleLeft: {
    // backgroundColor: 'red',
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  FlatlistMiddleMiddle: {
    // backgroundColor: 'gold',
    width: "75%",
    height: "100%",
    paddingLeft: h("2%"),

    justifyContent: "center",
  },
  ProfileImg: {
    // backgroundColor: 'white',
    width: 75,
    height: 75,
    borderRadius: 110 / 2,
  },
  imge: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  Itemname: {
    color: "black",
    fontSize: h("2.2%"),
  },
  ItemTime: {
    color: "#003C75",
    fontSize: h("1.5%"),
    fontWeight: "bold",
  },
  ItemTime3: {
    color: "#D0021B",
    fontSize: h("1.5%"),
    fontWeight: "bold",
  },
  ItemSpecilist: {
    color: "#0006",
    fontSize: h("1.5%"),
  },
  ItemTime2: {
    color: "#0006",
    fontSize: h("1.5%"),
  },
  Buttons: {
    width: "33%",
    height: h("5%"),
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: h("12%"),
    flexDirection: "row",
    alignItems: "center",
  },
  Buttonicons: {
    height: "70%",
    resizeMode: "contain",
  },
  ButtonText: {
    fontSize: h("2%"),
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
    fontSize: h("2.2%"),
    fontWeight: "bold",
    marginTop: h("4%"),
  },
  ActiveText2: {
    color: "white",
    fontSize: h("2.2%"),
    marginTop: h("3%"),
  },
  underline: {
    backgroundColor: "white",
    width: "100%",
    height: h("0.8%"),
    marginTop: h("1%"),
  },
  FinaceBox: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("18%"),
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  box1: {
    // backgroundColor: 'green',
    width: "45%",
    height: h("15%"),
    borderColor: "white",
    borderWidth: h("0.2%"),
    borderRadius: h("2%"),
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: h("4%"),
    paddingRight: h("4%"),
  },
  tenk: {
    color: "white",
    fontSize: h("2.5%"),
    fontWeight: "bold",
  },
  earn: {
    color: "#fff",
    fontSize: h("1.5%"),
  },
  Earning: {
    color: "#3DC03A",
    fontSize: h("2.3%"),
  },
  payments: {
    color: "#D0021B",
    fontSize: h("2.3%"),
  },
});
