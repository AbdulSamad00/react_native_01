import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigation } from "./StackNavigation";

import { Login } from "../screens/welcome";
import { RestPassowrd } from "../screens/welcome";
import { ResetPassworded } from "../screens/welcome";
import { Otp } from "../screens/welcome";
import { Register } from "../screens/welcome";
import { RegisterDoctor } from "../screens/welcome";
import { ProfileSetup } from "../screens/welcome";
//import { SplashScreen } from "../screens/welcome";
import PinScreen from '../screens/subsitutional/PinScreen'


const Stack = createStackNavigator();
export class AuthNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          //initialRouteName="CalendarScreen"
          screenOptions={{ headerShown: false }}
        >
          {/* <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          /> */}



          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="PinScreen"
            component={PinScreen}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="RestPassowrd"
            component={RestPassowrd}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProfileSetup"
            component={ProfileSetup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassworded"
            component={ResetPassworded}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterDoctor"
            component={RegisterDoctor}
            options={{ headerShown: false }}
          />



          <Stack.Screen name="StackNavigation" component={StackNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}