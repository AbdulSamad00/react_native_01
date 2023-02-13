import React, { Component, ignoredYellowBox, useState } from 'react'
import { View, Text, LogBox, StyleSheet, Image } from 'react-native'
import { w, h } from 'react-native-responsiveness';
import Ionicons from "react-native-vector-icons/Ionicons"
import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';
LogBox.ignoreAllLogs();

const option = ['Active', 'Re-open', 'Pending','Archived'];
const StatusTicket = () => {
    const [StatusTicket, setStatusTicket] = useState('');

    return (
        <View style={styles.Topmargin}>
            <View style={styles.HeaderText}>
                <Text style={styles.HeaderTextf}>StatusTicket</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.icon}>
                    <Image style={styles.img}
                        source={require("../assets/icons/user.png")}
                    />
                </View>


                {/* <ModalDropdown
                    dropdownTextHighlightStyle={{ backgroundColor: "blue", color: "white" }}

                    style={{ padding: 8, marginLeft: 2, flex: 1, marginTop: 5 }}
                    textStyle={{ fontSize: 16 }}
                    dropdownStyle={{ color: "red", width: 120, fontWeight: 16, height: 130 }}
                    dropdownTextStyle={{ fontSize: 16, color: "white", backgroundColor: "grey" }}
                    defaultValue={'Select StatusTicket'}
                    options={option} /> */}
                <View style={{}}>
                    <Picker
                        style={{ width: 250, backgroundColor: StatusTicket, marginLeft: 50, marginTop: -35 }}
                        selectedValue={StatusTicket}
                        onValueChange={(itemValue, itemIndex) =>
                            setStatusTicket(itemValue)
                        }
                    >
                        <Picker.Item color="grey" label="Select Status" value="" />
                        <Picker.Item color="black" label="Active" value="green" />
                        <Picker.Item color="black" label="Re-open" value="red" />
                        <Picker.Item color="black" label="Pending" value="blue" />
                        <Picker.Item color="black" label="Archived" value="gray" />						
                    </Picker>
                </View>
            </View>
        </View >
    )

}
export default StatusTicket
const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#fff',
        width: '86%',
        height: h('7%'),
        borderRadius: h('1.5%'),

        borderBottomColor: '#0005',
        borderBottomWidth: h('0.2%'),
    },

    Topmargin: {
        marginTop: h('1.5%'),
    },

    HeaderText: {
        // backgroundColor: 'red',
        width: '83%',
        height: h('2.8%'),
        justifyContent: 'center',
        marginLeft: h('1%'),
    },
    HeaderTextf: {
        color: '#0006',
        fontSize: h('2.2%'),
    },
    icon: {
        // backgroundColor: 'red',
        width: '15%',
        height: h('7%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
    },
    txtinput: {
        // backgroundColor: 'tomato',
        width: '85%',
        height: h('7%'),
        paddingLeft: h('1.5%'),
        color: 'black',
    },

});
