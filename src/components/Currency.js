import React, { Component, ignoredYellowBox, useState } from 'react'
import { View, Text, LogBox, StyleSheet, Image } from 'react-native'
import { w, h } from 'react-native-responsiveness';
import Ionicons from "react-native-vector-icons/Ionicons"
import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';
LogBox.ignoreAllLogs();

const option = ['Male', 'Female', 'Transgender'];
const Gender = () => {
    const [gender, setGender] = useState('');

    return (
        <View style={styles.Topmargin}>
            <View style={styles.HeaderText}>
                <Text style={styles.HeaderTextf}>Currency</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.icon}>
                    <Image style={styles.img}
                        source={require("../assets/icons/user.png")}
                    />
                </View>

                <View style={{}}>
                    <Picker
                        style={{ width: 250, backgroundColor: gender, marginLeft: 50, marginTop: -35 }}
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) =>
                            setGender(itemValue)
                        }
                    >
                        <Picker.Item color="grey" label="Select Gender" value="" />
                        <Picker.Item color="black" label="Male" value="blue" />
                        <Picker.Item color="black" label="Female" value="pink" />
                        <Picker.Item color="black" label="Transgender" value="grey" />
                    </Picker>
                </View>
            </View>
        </View >
    )

}
export default Gender
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
