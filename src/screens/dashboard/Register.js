import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import DatePickerCurrent from '../../components/DatePickerCurrent'
import DatePickerFuture from '../../components/DatePickerFuture'
import DatePickerPast from '../../components/DatePickerPast'
import { w, h } from "react-native-responsiveness";
import Gender from '../../components/Gender';

export default class Register extends Component {
    render() {
        return (


            <View style={styles.Container}>
                <ScrollView>
                    <View style={styles.TopContainer}>

                        <View style={styles.ContainerForPic}>
                            <View style={styles.TopLeftContianer}></View>
                            <View style={styles.TopMiddleContianer}>
                                <Text style={styles.nameText}>Register</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ alignItems: "center", }}>
                        <DatePickerFuture />
                        <DatePickerPast />
                        <DatePickerCurrent />
                        <Gender />
                    </View>


                    <TouchableOpacity onPress={() => this.props.navigation.navigate("User_Records")} style={styles.button}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

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
