import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Map from '../../components/Map';

export default class Contact extends Component {
    render() {
        return (
            <View style={styles.container}>

                {/* ============================Header======================== */}
                <View style={styles.headerViewWrap}>
                    <View style={styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrowleft' size={35} color='white' />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>
                            Contact
                        </Text>
                    </View>
                </View>



                <Map />

                {/* ============================Button======================== */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Information")} style={styles.button}>
                    <Text style={styles.text}>Request For Appointment</Text>
                </TouchableOpacity>


                {/* ============================Find Us======================== */}
                <View style={styles.findView}>
                    <Text style={styles.findHeading}>Find Us</Text>
                    <Text style={styles.findText}><Text style={styles.findText1}>Phone:</Text> (84) 345345456 45</Text>
                    <Text style={styles.findText}><Text style={styles.findText1}>Email:</Text> hi@gmail.com</Text>
                    <Text style={styles.findText}><Text style={styles.findText1}>Address:</Text> SBI building, software park</Text>
                    <Text style={styles.findText}><Text style={styles.findText1}>Hours:</Text> MON-FRI 8AM - 9PM</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },

    // Header
    headerViewWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#389CE8"
    },

    headerView: {
        position: 'absolute',
        left: 10,
        top: 10
    },

    headerTitleView: {
        padding: 15
    },

    headerTitle: {
        fontSize: 20,
        color: 'white'
    },

    // Button
    button: {
        borderRadius: 10,
        backgroundColor: '#389CE8',
        marginHorizontal: 40,
        marginVertical: 20
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 8,
    },

    findView: {
        marginHorizontal: 30,
        marginBottom: 20
    },

    findHeading: {
        fontSize: 30,
        fontWeight: "bold"
    },

    findText: {
        fontSize: 16
    },

    findText1: {
        fontWeight: "bold"
    }
});



