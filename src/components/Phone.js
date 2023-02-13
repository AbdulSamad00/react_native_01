import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, LogBox } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
import ModalDropdown from 'react-native-modal-dropdown';

LogBox.ignoreAllLogs();

export default class Phones extends Component {

    constructor() {
        super();
        this.state = {
            phone: '',
            mobile: '',
            skype: '',
        };
    }
    render() {
        return (

            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <View>
                    <Text style={{ fontSize: 30, textAlign: "center" }}>Phones</Text>
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Phone"
                        value={this.state.phone}
                        onChangeText={(text) => this.setState({ phone: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Mobile"
                        value={this.state.mobile}
                        onChangeText={(text) => this.setState({ mobile: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Skype"
                        value={this.state.skkype}
                        onChangeText={(text) => this.setState({ skype: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
            </View>
        )
    }
}
