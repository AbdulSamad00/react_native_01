import { View, ScrollView, Text } from "react-native";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, useFormik, Field } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    ErrorMessage,
    Form,
    FormDatePicker,
    FormField,
    FormPicker,
    FormSingleImagePicker,
    SubmitButton,
} from "../../../components/forms";

const handleSubmit = (a) => console.log("Sub", a)

export default function WorkingHours({ clinic }) {


    const [error, setError] = useState();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required().min(3).label("name"),
        email: Yup.string().email().required().label("email"),
        phone: Yup.number().required().label("phone"),
        requestDate: Yup.date()
            .label("requestDate")
            .default(function () {
                return new Date();
            }),
        startHour: Yup.date()
            .label("startHour")
            .default(function () {
                return new Date().getTime();
            }),
        endHour: Yup.date()
            .label("endHour")
            .default(function () {
                return new Date().getTime();
            }),
    });
    const [initialState, setInitialState] = useState({
        name: "",
        email: "",
        phone: "",
        requestDate: new Date(),
        startHour: new Date(),
        endHour: new Date(new Date().getTime() + 15 * 60000),
    });
    const {
        handleChange,
        setFieldValue,
        resetForm,
        values,
        errors,
        touched,
    } = useFormik({
        //validationSchema: validationSchema,
        initialValues: initialState,
    });

    return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}>
        <View
            style={{ width: "80%", alignSelf: "center", alignItems: "flex-start" }}
        >
            {clinic?.workingHours?.map((i) => {
                return (
                    <View
                        key={i._id}
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            alignSelf: "center",
                            justifyContent: "space-between",
                            borderBottomWidth: 0.4,
                            margin: 5,
                            padding: 5,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>{i.day}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 16 }}>{i.startTime} - </Text>
                            <Text style={{ fontSize: 16 }}>{i.endTime}</Text>
                        </View>
                    </View>
                );
            })}
        </View>

        <View
            style={{
                width: "90%",
                alignSelf: "center",
                marginBottom: 5,
                padding: 5,
            }}
        >
            <View
                style={{
                    width: "90%",
                    flexDirection: "row",
                    marginBottom: 5,
                    marginTop: 5,
                }}
            >
                <MaterialCommunityIcons
                    name="file-document-edit-outline"
                    size={24}
                    color="red"
                    style={{ marginRight: 5 }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Request for an Appointment
                </Text>
            </View>

            <Form
                initialValues={initialState}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={error} visible={error} />
                <View
                    style={{
                        width: "90%",
                        marginBottom: 5,
                        marginTop: 5,
                    }}
                >
                    <FormField
                        //img={require("../../assets/icons/username.png")}
                        placeholder="Your Name"
                        autoCapitalize="none"
                        secureTextEntry={false}
                        isMultiline={false}
                        name="name"
                    />
                    <FormField
                        //img={require("../../assets/icons/password.png")}
                        placeholder={"Your Email"}
                        name="email"
                        secureTextEntry={false}
                        isMultiline={false}
                        keyboardType={"email-address"}
                    />
                    <FormField
                        //img={require("../../assets/icons/email.png")}
                        placeholder={"Your Phone"}
                        name="phone"
                        secureTextEntry={false}
                        isMultiline={false}
                        autoCapitalize="none"
                        keyboardType={"phone-pad"}
                    />
                    <View
                        style={{
                            width: "84%",
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            borderBottomWidth: 0.3,
                            marginBottom: 10,
                            marginLeft: 5,
                            padding: 2,
                        }}
                    >
                        <FormDatePicker
                            name="requestDate"
                            defaultDate={new Date()}
                            //maxYears="0"
                            //minYears={new Date()}
                            //onDateChange={(value) => setFieldValue("requestDate", value)}
                            textStyle={{
                                flexDirection: "row",
                                alignSelf: "flex-start",

                                backgroundColor: "#ffff",
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: "84%",
                            flexDirection: "row",
                            alignItems: "center",
                            borderBottomWidth: 0.3,
                            marginBottom: 10,
                            marginLeft: 5,
                            padding: 2,
                        }}
                    >
                        <FormDatePicker
                            minuteInterval={15}
                            name="startHour"
                            defaultDate={values.startHour}
                            mode="time"
                            //maxYears="0"
                            //minYears="130"
                            onDateChange={(value) => {
                                setFieldValue("startHour", value);
                            }}
                            textStyle={{
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                backgroundColor: "#ffff",
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: "84%",
                            flexDirection: "row",
                            alignItems: "center",
                            borderBottomWidth: 0.3,
                            marginBottom: 10,
                            marginLeft: 5,
                            padding: 2,
                        }}
                    >
                        <FormDatePicker
                            minuteInterval={15}
                            mode="time"
                            name="endHour"
                            defaultDate={new Date(values.startHour.getTime() + 15 * 60000)}
                            maxYears="0"
                            minYears="130"
                            onDateChange={(value) =>
                                value < values.startHour
                                    ? setFieldValue(
                                        "endHour",
                                        new Date(values.startHour.getTime() + 15 * 60000)
                                    )
                                    : setFieldValue("startHour", value)
                            }
                            textStyle={{
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                backgroundColor: "#ffff",
                            }}
                        />
                    </View>
                </View>

                <View style={{ alignItems: "center" }}>
                    <SubmitButton txt={"Send your Request"} />
                </View>
            </Form>
        </View>
    </ScrollView>
    );
}