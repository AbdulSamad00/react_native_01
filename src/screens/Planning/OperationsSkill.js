import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import skillsApi from "../../api/skills";
import { Navbar } from "../../components";
import ActivityIndicator from "../../components/ActivityIndicator";
import {
  ErrorMessage,
  Form,
  FormDatePicker,
  FormField,
  FormPicker,
  SubmitButton,
} from "../../components/forms";
import useApi from "../../hooks/useApi";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    department: Yup.string().optional().label("Department"),
    level: Yup.string().required().label("Level"),
    reference: Yup.string().label("Reference"),
    status: Yup.string().required().label("Status"),
  });

export default function OperationsSkill ({ route, navigation }) {
  const saveSkillApi = useApi(skillsApi.saveSkill);
  const [error, setError] = useState();
  const [selectedskill, setSelectedskill] = useState({});

  useEffect(() => {
    if (route.params) {
        setSelectedskill(route.params.selectedskill);
        console.log(route);
      }
  }, []);

  const {
    _id,
    name,
    department,	
    level,
    reference,
    status,
  } = selectedskill;

  const handleSubmit = async (skillInfo) => {
    console.log(skillInfo);
    const submitData = { ...skillInfo };
    try {
      if (_id) {
        submitData["_id"] = _id;
      }
      const result = await saveSkillApi.request(submitData);
      console.log("result: ", result.ok);
      console.log("result: ", result.data);
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred! ");
          console.log(result);
        }
        return;
      }
      // //if registration is success
      navigation.goBack();
    } catch (error) {
      console.log("error exception:   ", error);
    }
  };

  return (
    <>
      <View style={styles.Container}>
        {/* <ActivityIndicator visible={true} />  */}
        <KeyboardAwareScrollView>
          <SafeAreaView />

          <StatusBar />
          <Navbar
            onPress={() => {
              navigation.goBack();
            }}
            Text={`${_id ? "Update" : "Add"} skill`}
          />
    
          <ActivityIndicator
            visible={
              saveSkillApi.loading 
            }
          /> 

          <View style={styles.sideImge}>
            <Image
              style={styles.imgeContainer}
              source={require("../../assets/icons/logo.png")}
            />
          </View>
          <View style={styles.loginScreen}>
          <Text style={styles.headingText}>{`${
              _id ? "Update" : "New"
            } skill`}</Text>
            <Text style={styles.headingText2}>
              {`Please fill the form to ${
                _id ? "update" : "create"
              } your account.`}
            </Text>

            <View style={styles.TextinputFields}>
              <Form
                initialValues={{
                  name: name ? name : "",
                  department: department ? department : "",				  
                  level: level ? level : "",
                  reference: reference ? reference : "",
                  status: status ? status : "active",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
              >
                <ErrorMessage error={error} visible={error} />
                <View>
                  <View
                    style={{
                      alignItems: "center",
                      margin: 8,
                      borderWidth: 1,
                      borderColor: "#888",
                      borderRadius: 16,
                      paddingVertical: 16,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: "#f6f6f6",
                        paddingHorizontal: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        top: -18,
                        left: 24,
                      }}
                    >
                      {/* <Icon name="skill" size={24} /> */}
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      Skill
                      </Title>
                    </View>
                 
					<FormField
                      Header={"Name"}
                      img={require("../../assets/icons/skills.png")}
                      placeholder="Name"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="Name"
                    />
                    <FormField
                      Header={"Department"}
                      img={require("../../assets/icons/skills.png")}
                      placeholder="Department"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="department"
                    />
                    <FormField
                      Header={"Level"}
                      img={require("../../assets/icons/skills.png")}
                      placeholder="Level"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="level"
                    />
                    <FormField
                      Header={"Reference"}
                      img={require("../../assets/icons/skills.png")}
                      placeholder="Reference"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="reference"
                    />
                  <FormField
                    Header={"Status"}
                    img={require("../../assets/icons/skills.png")}
                    placeholder="Status"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    name="status"
                  />
                

                
                  </View>
                </View>

            
	
                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                >
            

                  <SubmitButton txt={_id ? "Update" : "Submit"} />
                </View>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};



const styles = StyleSheet.create({
    Container: {
      width: "100%",
      backgroundColor: "#F6F6F6",
      flex: 1,
    },
    // container: {
    //   paddingTop: 30,
    //   marginLeft: 20,
    //   marginRight: 20,
    //   flex: 1,
    // },
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
      // alignItems: "center",
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
      alignItems: "center",
      // backgroundColor: 'green',
    },
    Register: {
      width: "42%",
      marginVertical: 16,
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