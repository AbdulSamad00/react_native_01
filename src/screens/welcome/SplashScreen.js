/* eslint-disable react-native/no-inline-styles */
import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import { Navbar, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: 1,
    title: "Welcome to TCMFiles !",
    text: "The apps in service for TCM."
  },
  {
    key: 2,
    title: "Welcome to telemed !",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada arcu quis ipsum dictum, ac vehicula turpis condimentum. Proin rutrum orci sed magna maximus, nec vestibulum purus convallis. Pellentesque ultricies lacinia consequat. Aenean blandit quis eros et volutpat. Aenean eu nisi sodales,",
  },
  {
    key: 3,
    title: "Welcome to telemed !",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada arcu quis ipsum dictum, ac vehicula turpis condimentum. Proin rutrum orci sed magna maximus, nec vestibulum purus convallis. Pellentesque ultricies lacinia consequat. Aenean blandit quis eros et volutpat. Aenean eu nisi sodales,",
  },
  {
    key: 4,
    title: "Welcome to telemed !",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada arcu quis ipsum dictum, ac vehicula turpis condimentum. Proin rutrum orci sed magna maximus, nec vestibulum purus convallis. Pellentesque ultricies lacinia consequat. Aenean blandit quis eros et volutpat. Aenean eu nisi sodales,",
  },
];

export class SplashScreen extends Component {
  state = {
    logoAnimation: new Animated.Value(0),
    btnsOpactiy: new Animated.Value(0),
    btnsScale: new Animated.Value(0),
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.startAnimation();
    }, 3300);
  };
  startAnimation = () => {
    Animated.timing(this.state.logoAnimation, {
      toValue: -220,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.parallel([
      Animated.timing(this.state.btnsScale, {
        toValue: Platform.OS === "android" ? -750 : -850,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.delay(1500),
      Animated.timing(this.state.btnsOpactiy, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: false,
      }),
    ]).start();
  };
  renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <StatusBar />
        <SafeAreaView />
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.TextCotnainer}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };
  onDone = () => {};
  render() {
    const AnimatedStyle = {
      transform: [
        {
          translateY: this.state.logoAnimation,
        },
      ],
    };
    const btnScaleStyle = {
      transform: [
        {
          translateY: this.state.btnsScale,
        },
      ],
    };

    return (
      <View style={styles.Container}>
        <Animated.View style={[styles.logo, AnimatedStyle]}>
          <Image
            style={styles.logoimg}
            source={require("../../assets/logo.png")}
          />
        </Animated.View>

        {/* CONTAINER 2 */}
        {/* buttons */}
        <Animated.View style={[styles.BtnCotnainer, btnScaleStyle]}>
          <ImageBackground
            source={require("../../assets/bg.png")}
            style={styles.ContainerColor}
          >
            <AppIntroSlider
              renderItem={this.renderItem}
              data={slides}
              onDone={this.onDone}
              activeDotStyle={{
                backgroundColor: "white",
                width: 20,
                marginTop: -h("140%"),
                height: 5,
              }}
              dotStyle={{
                backgroundColor: "#0003",
                marginTop: -h("140%"),
                height: 5,
                width: 5,
              }}
            />

            <TouchableOpacity
              delayPressIn={0}
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
              style={styles.Btncontainer}
            >
              <Text style={styles.Btntxt}>GET STARTED</Text>
            </TouchableOpacity>
          </ImageBackground>
        </Animated.View>
        {/* CONTAINER 2 END */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  logo: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("25%"),
    alignItems: "center",
    justifyContent: "center",
    marginTop: h("35%"),
  },
  logoimg: {
    width: "80%",
    height: h("20%"),
    resizeMode: "contain",
  },
  ContainerColor: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("90%"),
    marginTop: h("70%"),
  },

  slide: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("30%"),
    marginTop: h("20%"),
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: h("1%"),
    paddingRight: h("1%"),
  },
  title: {
    color: "white",
    fontSize: h("3%"),
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: h("2%"),
    fontWeight: "200",
    marginTop: h("3%"),
  },
  TextCotnainer: {
    width: "90%",
    // backgroundColor: "red",
    paddingLeft: h("2%"),
    paddingRight: h("2%"),
  },
  Btncontainer: {
    backgroundColor: "#fff",
    width: "85%",
    height: h("7%"),
    borderRadius: h("10%"),
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
    position: "absolute",

    marginTop: h("55%"),
    marginLeft: h("4.5%"),
  },
  Btntxt: {
    color: "#000",
    fontSize: h("2.4%"),
  },
});
