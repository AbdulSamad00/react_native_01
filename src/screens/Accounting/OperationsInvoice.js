import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState, useRef } from "react";
import {Image, SafeAreaView, StatusBar, StyleSheet, Text, View, } from "react-native";
import "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { h } from "react-native-responsiveness";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import invoiceApi from "../../api/invoices";
import countries from "../../api/countries";
import { Navbar } from "../../components";
import ActivityIndicator from "../../components/ActivityIndicator";
import {ErrorMessage, Form, FormDatePicker, FormField, FormPicker, FormSingleImagePicker, SubmitButton, } from "../../components/forms";
import useApi from "../../hooks/useApi";
import { useFormikContext, useFormik } from "formik";
import { getPatients } from "../../api/patients";
import { getUser } from "../../api/users";
import { getServices } from "../../api/services";
import { getProducts } from "../../api/products";
import { currencyOptions, statusOptions } from "../../config/pickerElements";
import 'react-native-get-random-values';
import { nanoid } from "nanoid";
import colors from "../../config/colors";
import _ from "lodash";

const validationSchema = Yup.object().shape({
  user: Yup.string().required().label("Select Register Patient"),
  currency: Yup.string().required().label("Currency"),
  status: Yup.string().required().label("Status"),
});

const OperationInvoice = ({ route, navigation }) => {
  const [selected, setSelected] = useState({});
  const { selectedInvoice } = route.params;
  const [listPatients, setListPatients] = useState([]);
  const [listServices, setListServices] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [rawServices, setRawServices] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [userId, setUserId] = useState(null);
  const invoice = useApi(invoiceApi.addInvoice);
  const getCountriesApi = useApi(countries.getCountries);
  const [error, setError] = useState();
  const [initialform, setInitialForm] = useState({
    user: "",
    services: [{ serviceNo: "", name: "", quantity: "", amount: "" }],
    products: [{ productNo: "", name: "", quantity: "", amount: "" }],
    currency: "",
    invoiceNo: nanoid(8),
    amount: "",
    status: "",
  });

  useEffect(() => {
    getListPatient();
    getListService();
    getListProduct();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(selectedInvoice)) {
      setInitialForm({
        ...initialform,
        ...selectedInvoice,
        amount: String(selectedInvoice.amount),
      });
      setUserId(selectedInvoice.user);
    }
  }, [selectedInvoice]);
  useEffect(() => {
    const getPatient = async () => {
      const { data: patient } = await getUser(userId);
      setSelectedPatient(patient);
    };
    getPatient();
  }, [userId]);
  const getListPatient = async () => {
    const { ok, data } = await getPatients();
    if (ok) {
      const filter = data.map((item) => ({
        value: item.user,
        label: `${item.patients.contactName.first} ${item.patients.contactName.last}`,
      }));
      setListPatients(filter);
    }
  };

  const getListService = async () => {
    const { ok, data } = await getServices();
    if (ok) {
      setRawServices(data);
      const filter = data.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      setListServices(filter);
    }
  };

  const getListProduct = async () => {
    const { ok, data } = await getProducts();
    if (ok) {
      setRawProducts(data);
      const filter = data.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      setListProducts(filter);
    }
  };

  const { _id } = selectedInvoice;

  const sumvalues = (values) => {
    let sum = 0;
    values.map((value, index) => {
      sum += Number(value.amount);
    });
    return sum;
  };

  const totalProductService = (form) => {
    const servicesamounttotal = sumvalues(form.services);
    const productsamounttotal = sumvalues(form.products);
    const total_amount = servicesamounttotal + productsamounttotal;
    return String(total_amount);
  };

  const handleSubmit = async (userInfo) => {
    const submitData = { ...userInfo };
    console.log("submitData", submitData);
    try {
      const result = await invoice.request(submitData);
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
      //if registration is success
      navigation.goBack();
    } catch (error) {
      console.log("error exception:   ", error);
    }
  };

  const onAddService = () => {
    setInitialForm({
      ...initialform,
      services: [
        ...initialform.services,
        { serviceNo: "", name: "", quantity: "", amount: "" },
      ],
    });
  };

  const onAddProduct = () => {
    setInitialForm({
      ...initialform,
      products: [
        ...initialform.products,
        { productNo: "", name: "", quantity: "", amount: "" },
      ],
    });
  };

  const onRemoveService = (index) => {
    const data = {
      ...initialform,
      products: initialform.services.filter((item, idx) => idx !== index),
    };
    setInitialForm({
      ...data,
      amount: totalProductService(data),
    });
  };

  const onRemoveProduct = (index) => {
    const data = {
      ...initialform,
      products: initialform.products.filter((item, idx) => idx !== index),
    };
    setInitialForm({
      ...data,
      amount: totalProductService(data),
    });
  };

  const onGetServicePicker = (value, serviceIndex) => {
    const data = { ...initialform };
    let id, price;
    rawServices.map((service) => {
      if (service.name === value) {
        id = service._id;
        price = service.price;
      }
    });
    data["services"] = initialform.services.map((item, index) =>
      index === serviceIndex
        ? {
            ...item,
            ["serviceNo"]: id,
            ["name"]: value,
            ["amount"]: String(Number(item.quantity) * price),
          }
        : item
    );
    setInitialForm({
      ...initialform,
      ...data,
      amount: totalProductService(data),
    });
  };

  const onGetProductPicker = (value, productIndex) => {
    const data = { ...initialform };
    let id, price;
    rawProducts.map((product) => {
      if (product.name === value) {
        id = product._id;
        price = product.price;
      }
    });
    data["products"] = initialform.products.map((item, index) =>
      index === productIndex
        ? {
            ...item,
            ["productNo"]: id,
            ["name"]: value,
            ["amount"]: String(Number(item.quantity) * price),
          }
        : item
    );
    setInitialForm({
      ...initialform,
      ...data,
      amount: totalProductService(data),
    });
  };

  const onChangeAmountService = (name, value, serviceIndex, servicename) => {
    const data = { ...initialform };
    let a = "";
    rawServices.map((service) => {
      if (service.name === servicename) {
        a = Number(value) * service.price;
      }
    });
    data["services"] = initialform.services.map((item, index) =>
      index === serviceIndex
        ? { ...item, [name]: String(value), ["amount"]: String(a) }
        : item
    );
    setInitialForm({
      ...initialform,
      ...data,
      amount: totalProductService(data),
    });
  };

  const onChangeAmountProduct = (name, value, productIndex, productname) => {
    const data = { ...initialform };
    let a = "";
    rawProducts.map((product) => {
      if (product.name === productname) {
        a = Number(value) * product.price;
      }
    });
    data["products"] = initialform.products.map((item, index) =>
      index === productIndex
        ? { ...item, [name]: String(value), ["amount"]: String(a) }
        : item
    );
    setInitialForm({
      ...initialform,
      ...data,
      amount: totalProductService(data),
    });
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
            Text={`${_id ? "Update" : "Add"} Invoice`}
          />

          <ActivityIndicator
            visible={invoice.loading || getCountriesApi.loading}
          />

          <View style={styles.loginScreen}>
            <View style={styles.TextinputFields}>
              <Form
                initialValues={initialform}
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
                      <Icon name="account" size={24} />
                      <Title style={{ fontWeight: "bold", marginLeft: 8 }}>
                        Personalia
                      </Title>
                    </View>
                    <View style={styles.patientPickerContainer}>
                      <Text style={styles.patientTitle}>
                        Select registered patient
                      </Text>
                      <FormPicker
                        textInputPlaceholder="Select Patient"
                        mode="flat"
                        data={listPatients}
                        name="user"
                        enableAvatar={false}
                        onGeTValue={(value) => {
                          setUserId(value);
                          setInitialForm({
                            ...initialform,
                            user: value,
                          });
                        }}
                      />
                    </View>
                    <Text>Avatar:</Text>
                    <FormSingleImagePicker
                      name="imageSrc"
                      readOnly={true}
                      value={selectedPatient && selectedPatient?.imageSrc}
                    />
                    <FormField
                      auto={true}
                      Header={"Prefix"}
                      placeholder="Prefix"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      editable={false}
                      value={selectedPatient && selectedPatient?.prefix}
                      name="prefix"
                    />
                    <FormField
                      auto={true}
                      Header={"First Name"}
                      placeholder="First Name"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      editable={false}
                      value={
                        selectedPatient && selectedPatient?.contactName?.first
                      }
                      name="firstName"
                    />
                    <FormField
                      auto={true}
                      Header={"Last Name"}
                      placeholder="Last Name"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      editable={false}
                      value={
                        selectedPatient && selectedPatient?.contactName?.last
                      }
                      name="lastName"
                    />
                    <FormField
                      auto={true}
                      Header={"Gender"}
                      placeholder="Gender"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      editable={false}
                      value={selectedPatient && selectedPatient?.gender}
                      name="gender"
                    />
                    <FormField
                      auto={true}
                      Header={"Mobile Phone"}
                      placeholder="Mobile Phone"
                      //autoCapitalize="none"
                      secureTextEntry={false}
                      isMultiline={false}
                      editable={false}
                      value={selectedPatient && selectedPatient?.phones?.mobile}
                      name="mobile"
                    />

                    <Text style={{ marginBottom: 5 }}>Date of Birth:</Text>

                    <FormDatePicker
                      left={
                        <Icon
                          name="calendar"
                          size={18}
                          style={{ alignSelf: "center" }}
                        />
                      }
                      name="dateBirth"
                      textStyle={{
                        paddingVertical: 4,
                        paddingHorizontal: 24,
                        borderColor: "grey",
                        borderRadius: 8,
                        borderWidth: 1,
                      }}
                      defaultDate={
                        selectedPatient
                          ? new Date(selectedPatient.dateBirth)
                          : "1992-10-01"
                      }
                      maxYears="0"
                      minYears="130"
                      disabled
                      //onDateChange={(value) => console.log("Date:", value)}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      margin: 8,
                      marginTop: 16,
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
                      <Icon name="plus-circle" size={24} />
                      <TouchableOpacity
                        style={styles.btnTitle}
                        onPress={onAddService}
                      >
                        <Title style={{ fontSize: 16, color: "#ffff" }}>
                          Add Services
                        </Title>
                      </TouchableOpacity>
                    </View>
                    {initialform.services.map((service, index) => {
                      return (
                        <>
                          <View style={styles.patientPickerContainer}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text style={styles.patientTitle}>
                                Service Name
                              </Text>
                              {index !== 0 && (
                                <TouchableOpacity
                                  onPress={() => onRemoveService(index)}
                                >
                                  <Icon
                                    name="close-circle"
                                    size={20}
                                    color={colors.red}
                                  />
                                </TouchableOpacity>
                              )}
                            </View>

                            <FormPicker
                              textInputPlaceholder="Service Name"
                              mode="flat"
                              data={listServices}
                              name="name"
                              enableAvatar={false}
                              onGeTValue={(value) =>
                                onGetServicePicker(value, index)
                              }
                              auto={true}
                              value={service.name}
                            />
                          </View>
                          <FormField
                            auto={true}
                            Header={"Quantity"}
                            placeholder={"Quantity"}
                            name={"quantity"}
                            value={String(service.quantity)}
                            secureTextEntry={false}
                            isMultiline={false}
                            autoCapitalize="none"
                            inputType="numeric"
                            keyboardType={"numeric"}
                            onPressUp={(value) =>
                              onChangeAmountService(
                                "quantity",
                                Number(value) + 1,
                                index,
                                service.name
                              )
                            }
                            onPressDown={(value) =>
                              onChangeAmountService(
                                "quantity",
                                value == 0 ? value : value - 1,
                                index,
                                service.name
                              )
                            }
                            onGetValue={(value) =>
                              onChangeAmountService(
                                "quantity",
                                value,
                                index,
                                service.name
                              )
                            }
                          />
                          <FormField
                            auto={true}
                            Header={"Amount"}
                            placeholder={"Amount"}
                            name="amount"
                            value={String(service.amount)}
                            secureTextEntry={false}
                            isMultiline={false}
                            autoCapitalize="none"
                            editable={false}
                            keyboardType={"numeric"}
                          />
                        </>
                      );
                    })}
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      margin: 8,
                      marginTop: 16,
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
                      <Icon name="plus-circle" size={24} />
                      <TouchableOpacity
                        style={styles.btnTitle}
                        onPress={onAddProduct}
                      >
                        <Title style={{ fontSize: 16, color: "#ffff" }}>
                          Add Products
                        </Title>
                      </TouchableOpacity>
                    </View>
                    {initialform.products.map((product, index) => {
                      return (
                        <>
                          <View style={styles.patientPickerContainer}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text style={styles.patientTitle}>
                                Product Name
                              </Text>
                              {index !== 0 && (
                                <TouchableOpacity
                                  onPress={() => onRemoveProduct(index)}
                                >
                                  <Icon
                                    name="close-circle"
                                    size={20}
                                    color={colors.red}
                                  />
                                </TouchableOpacity>
                              )}
                            </View>

                            <FormPicker
                              auto={true}
                              textInputPlaceholder="Product Name"
                              mode="flat"
                              data={listProducts}
                              name="name"
                              enableAvatar={false}
                              value={product.name}
                              onGeTValue={(value) =>
                                onGetProductPicker(value, index)
                              }
                            />
                          </View>
                          <FormField
                            auto={true}
                            Header={"Quantity"}
                            placeholder={"Quantity"}
                            name={"quantity"}
                            value={String(product.quantity)}
                            secureTextEntry={false}
                            isMultiline={false}
                            autoCapitalize="none"
                            keyboardType={"numeric"}
                            inputType="numeric"
                            onPressUp={(value) =>
                              onChangeAmountProduct(
                                "quantity",
                                Number(value) + 1,
                                index,
                                product.name
                              )
                            }
                            onPressDown={(value) =>
                              onChangeAmountProduct(
                                "quantity",
                                value == 0 ? value : value - 1,
                                index,
                                product.name
                              )
                            }
                            onGetValue={(value) =>
                              onChangeAmountProduct(
                                "quantity",
                                value,
                                index,
                                product.name
                              )
                            }
                          />
                          <FormField
                            auto={true}
                            Header={"Amount"}
                            placeholder={"Amount"}
                            name="amount"
                            value={String(product.amount)}
                            secureTextEntry={false}
                            isMultiline={false}
                            autoCapitalize="none"
                            editable={false}
                            keyboardType={"numeric"}
                          />
                        </>
                      );
                    })}
                  </View>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    margin: 8,
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: "#888",
                    borderRadius: 16,
                    paddingVertical: 16,
                  }}
                >
                  <FormField
                    Header={"Total"}
                    placeholder="Total"
                    //autoCapitalize="none"
                    secureTextEntry={false}
                    isMultiline={false}
                    editable={false}
                    name="amount"
                  />
                  <View style={styles.patientPickerContainer}>
                    <Text style={styles.patientTitle}>Select Currency</Text>
                    <FormPicker
                      textInputPlaceholder="Select Currency"
                      mode="flat"
                      data={currencyOptions}
                      name="currency"
                      enableAvatar={false}
                    />
                  </View>
                  <View style={styles.patientPickerContainer}>
                    <Text style={styles.patientTitle}>Select Status</Text>
                    <FormPicker
                      textInputPlaceholder="Select Status"
                      mode="flat"
                      data={statusOptions}
                      name="status"
                      enableAvatar={false}
                    />
                  </View>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                >
                  <SubmitButton txt={_id ? "Update" : "Register"} />
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
  patientPickerContainer: {
    width: "70%",
    height: 120,
    maxHeight: 150,
  },
  patientTitle: {
    color: "black",
    fontSize: h("2.2%"),
    fontWeight: "bold",
    marginVertical: 10,
  },
  btnTitle: {
    backgroundColor: colors.BLUE.secondary,
    borderRadius: 8,
    padding: 2,
    paddingHorizontal: 8,
  },
});

export default OperationInvoice;
