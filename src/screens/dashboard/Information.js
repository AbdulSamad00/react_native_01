import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import { w, h } from "react-native-responsiveness";
import Address from '../../components/Address';
import DatePickerCurrent from '../../components/DatePickerCurrent'
import DatePickerFuture from '../../components/DatePickerFuture'
import DatePickerPast from '../../components/DatePickerPast'
import PersonalInfo from '../../components/PersonalInfo'


export default class Information extends Component {
    render() {
        return (
            <ScrollView>

                <View style={styles.Container}>
                    <View style={styles.TopContainer}>

                        <View style={styles.ContainerForPic}>
                            <View style={styles.TopLeftContianer}></View>
                            <View style={styles.TopMiddleContianer}>
                                <Text style={styles.nameText}>Information</Text>
                            </View>
                        </View>

                    </View>
                    <DatePickerFuture />
                    <DatePickerPast />
                    <DatePickerCurrent />
                    <PersonalInfo />
                    <Address />

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("User_Records")} style={styles.button}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    Container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",

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
        width: "10%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    TopMiddleContianer: {
        width: "75%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    nameText: {

        fontSize: h("2.5%"),
        fontWeight: "bold",
        color: "white",
    },

    button: {
        borderRadius: 10,
        backgroundColor: '#00B7DD',
        marginHorizontal: 40,
        marginVertical: 20
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 8,
    },

});
