import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, LogBox } from 'react-native'
import DatePicker from 'react-native-datepicker'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
import ModalDropdown from 'react-native-modal-dropdown';

LogBox.ignoreAllLogs();

export default class BankInfo extends Component {

    constructor() {
        super();
        this.state = {
            bank: '',
            IBAN: '',
            branchOfBank: '',
        };
    }
    render() {
        return (

            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <View>
                    <Text style={{ fontSize: 30, textAlign: "center" }}>Bank Information</Text>
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="bank"
                        value={this.state.bank}
                        onChangeText={(text) => this.setState({ bank: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="IBAN"
                        value={this.state.IBAN}
                        onChangeText={(text) => this.setState({ IBAN: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="branchOfBank"
                        value={this.state.branchOfBank}
                        onChangeText={(text) => this.setState({ branchOfBank: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
            </View>
        )
    }
}
