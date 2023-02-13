import React, { Component, ignoredYellowBox, useState } from 'react'
import { View, Text, LogBox, StyleSheet, Image } from 'react-native'
import { w, h } from 'react-native-responsiveness';
import Ionicons from "react-native-vector-icons/Ionicons"
import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';
LogBox.ignoreAllLogs();

const option = ['Urgent','High','Normal','Low'];
const Priority = () => {
    const [priority, setPriority] = useState('');

    return (
        <View style={styles.Topmargin}>
            <View style={styles.HeaderText}>
                <Text style={styles.HeaderTextf}>Priority</Text>
            </View>

            <View style={styles.container}>

                <View style={{}}>
                    <Picker
                        style={{ width: 250, backgroundColor: priority, marginLeft: 50, marginTop: -35 }}
                        selectedValue={priority}
                        onValueChange={(itemValue, itemIndex) =>
                            setPriority(itemValue)
                        }
                    >
                        <Picker.Item color="gray" label="Select Priority" value="" />
                        <Picker.Item color="black" label="Urgent" value="red" />
                        <Picker.Item color="black" label="High" value="orange" />
                        <Picker.Item color="black" label="Normal" value="cyan" />
                        <Picker.Item color="white" label="Low" value="blue" />				
                    </Picker>
                </View>
            </View>
        </View >
    )

}
export default Priority
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
