import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import {Alert, Image,SafeAreaView,StatusBar,StyleSheet,Text,View,} from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Yup from "yup";
import areasApi from "../../api/areas";
import { Navbar } from "../../components";
import ActivityIndicator from "../../components/ActivityIndicator";
import {ErrorMessage,Form,FormDatePicker,FormField,FormPicker,FormSingleImagePicker,SubmitButton,} from "../../components/forms";
import useApi from "../../hooks/useApi";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  description: Yup.string().optional().label("Description"),
  coordinates: Yup.string().required().label("Coordinates"),
  floor: Yup.string().required().label("Floor"),  
});

export function OperationsArea ({ route, navigation }) {
  
  const saveAreaApi = useApi(usersApi.saveArea);
  const [error, setError] = useState();
  const [selectedArea, setSelectedArea] = useState({});

  useEffect(() => {
    if (route.params) {
      setSelectedArea(route.params.selectedArea);
    }
    getProfilesApi.request();
  }, []);

  const {
    id,
    Name,
    Description,	
    Floor,		
    Coordinates,
  } = selectedArea;

  const handleSubmit = async (AreaInfo) => {
    const submitData = { ...AreaInfo };
    try {
      if (id) {   
        submitData["_id"] = id;
      }
      const result = await saveAreaApi.request(submitData);
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred! ");
          // console.log(result);
        }
        return;
      }
      // //if registration is success
      Alert.alert(`Area ${ id ? "updated" : "added" } successfully`);
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
            Text={`${id ? "Update" : "Add"} Area`}
          />
          <ActivityIndicator
            visible={
              saveAreaApi.loading ||
              getProfilesApi.loading
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
              id ? "Update" : "New"
            } Area`}</Text>
            <Text style={styles.headingText2}>
              {`Please fill the form to ${
                id ? "update" : "create"
              } your account.`}
            </Text>

            <View style={styles.TextinputFields}>
              <Form
                initialValues={{
                  name: name ? name : "",
                  description: description ? description : "",				  
                  floor: floor ? floor : "",				  				  
                  coordinates: coordinates ? coordinates : "",
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
                      <Icon name="Map" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                      </Title>
                    </View>
//                    <Text>Avatar:</Text>
  //                  <FormSingleImagePicker name="imageSrc" />
					
                    <FormPicker
                     style={{width: 250, marginVertical: 18}}
                      textInputPlaceholder={Name ? Name.toUpperCase() : "Name"}
                      data={["Kantine", "Alcatel-Inbound", "Alcatel-Outbound","RLC","Japan","LTB","Mezanine","Office","Receptie", "WC Warehouse", "WC Receptie", "GDC-inbound","GDC-Outbound",
					  "Export","HysterYale", "Pomp-ruimte","Expeditie Alu", "Podium-Alu","Podium-GDC", "Lean-Ruimte","Laadstation"."EHBO-ruimte"].map((name) => ({
                        label: name, value: name,
                      }))}
                      mode="flat"
                      name="name"
                    />
                    <FormField
                      Header={"description"}
                      placeholder="description"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="description"
                    />
                    <FormField
                      Header={"coordinates"}
                      img={require("../../assets/icons/coordinates.png")}
                      placeholder="coordinates"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="coordinates"
                    />
                  </View>
                    <FormField
                      Header={"floor"}
                      placeholder="description"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      name="floor"
                    />
				  
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                >
                  {/* <FormDatePicker
        onPick={(date) => onDataChange({ ...data, dateOfBirth: date })}
      /> */}

                  {/* <AppText
                  Header={"CONFIRM PASSWORD"}
                  img={require("../../assets/lock.png")}
                  placeholder={"• • • • • • • •"}
                  password={true}
                  name="password"
                /> */}

                  {/* <DatePickerFuture />
                  <DatePickerPast />
                  <DatePickerCurrent /> */}

                  {/* <ImageInput 
             imageUri={imageUri}
             onChangeImage={(uri) => setImageUri(uri)} 
             /> */}

                  <SubmitButton txt={id ? "Update" : "Register"} />
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
