import "react-native-gesture-handler";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import * as Yup from "yup";
import jwtDecode from 'jwt-decode';
import AuthContext from './../../auth/context';
import authStorage from './../../auth/storage';
import auth from './../../api/auth';
import { Navbar } from "../../components";
import { w, h } from "react-native-responsiveness";
import { Form, FormField, SubmitButton, ErrorMessage } from "./../../components/forms";

import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("sername"),
  password: Yup.string().required().min(4).label("Password"),
});

export const Login = (props) => {

  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async ({ username, password }) => {
    //navigation.navigate('StartNameScreen');
    setLoading(true);
    const result = await auth.login(username.trim(), password);
    if (!result.ok) {
      setLoading(false);
      return setLoginFailed(true);
    }
    setLoginFailed(false);
    const user = jwtDecode(result.data);
    authContext.setUser(user);
    authStorage.saveToken(result.data);
    setLoading(false);

    //console.log(result.data);
  }


  return (
    <View style={styles.Container}>
      <SafeAreaView />
      <ActivityIndicator visible={loading} />
      <StatusBar />
      <Navbar
        onPress={() => {
          this.props.navigation.goBack();
        }}
        Text={"Login"}
      />
      <View style={styles.sideImge}>
        <Image
          style={styles.imgeContainer}
          source={require("../../assets/icons/logo.png")}
        />
      </View>
      <View style={styles.loginScreen}>

        <Text style={styles.headingText}>Let's log you in</Text>
        <Text style={styles.headingText2}>
          Welcome back, you’ve been missed!
        </Text>

        <View style={styles.TextinputFields}>
          <Form
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage error="Invalid Username/Password" visible={loginFailed} />
            {/* <AppText
              Header={"Username"}
              img={require("../../assets/mail.png")}
              placeholder={"johndoe@gmail.com"}
            />
            <AppText
              Header={"PASSWORD"}
              img={require("../../assets/lock.png")}
              placeholder={"• • • • • • • •"}
              password={true}
            /> */}

            <FormField
              Header={"Username"}
              img={require("../../assets/icons/username.png")}
              placeholder='Username'
              autoCapitalize="none"
              secureTextEntry={false}
              isMultiline={false}
              returnKeyType="next"
              name="username"
            />
            <FormField
              Header={"Password"}
              img={require("../../assets/icons/password.png")}
              placeholder='Password'
              autoCapitalize="none"
              secureTextEntry={true}
              password={true}
              isMultiline={false}
              returnKeyType="next"
              name="password"
            />
            {/* <Appbtn
              // onPress={() => {
              //   this.props.navigation.navigate("Otp");
              // }}
              onPress={handleSubmit}
              txt={"Signin"}
            /> */}
            <SubmitButton txt={"Signin"} />
          </Form>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => {
              props.navigation.navigate("RestPassword");
            }}
            style={styles.Forgotbutton}
          >
            <Text style={styles.ForgotbuttonText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.RegisterScreen}>
        <View style={styles.Register}>
          <Text style={styles.DoctorText}>New User?</Text>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => {
              props.navigation.navigate("Register");
            }}
          >
            <Text style={styles.RegisterText}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  sideImge: {
    backgroundColor: "#003C75",
    width: "50%",
    height: h("15%"),
    marginTop: h("2%"),
    borderBottomRightRadius: h("10%"),
    borderTopRightRadius: h("10%"),
    justifyContent: "center",
    alignItems: "flex-end",
  },
  imgeContainer: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  loginScreen: {
    // backgroundColor: 'red',
    width: "100%",
    height: h("60%"),
    marginTop: h("2%"),
  },
  headingText: {
    fontSize: h("3.8%"),
    color: "black",
    marginLeft: h("2.2%"),
    marginTop: h("2%"),
  },
  headingText2: {
    color: "#0007",
    fontSize: h("2%"),
    marginLeft: h("2.2%"),
  },
  TextinputFields: {
    width: "100%",
    height: "80%",

    alignItems: "center",
    marginTop: h("3%"),
  },
  Forgotbutton: {
    marginTop: h("2%"),
  },
  ForgotbuttonText: {
    color: "#0007",
    fontSize: h("2.2%"),
    marginLeft: h("2%"),
  },
  RegisterScreen: {
    width: "100%",
    height: h("11%"),
    alignItems: "center",
  },
  Register: {
    width: "42%",
    height: h("6%"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  RegisterText: {
    color: "black",
    fontSize: h("2%"),
    fontWeight: "bold",
  },
  DoctorText: {
    color: "black",
    fontSize: h("2%"),
  },
});