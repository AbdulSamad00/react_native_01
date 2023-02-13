import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, LogBox } from 'react-native'
import DatePicker from 'react-native-datepicker'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
import ModalDropdown from 'react-native-modal-dropdown';

LogBox.ignoreAllLogs();

export default class Membership extends Component {

    constructor() {
        super();
        this.state = {
            organizationAName: '',			
            organizationAMemberNo: '',
            organizationBName: '',
            organizationBMemberNo: '',
        };
    }
    render() {
        return (

            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <View>
                    <Text style={{ fontSize: 30, textAlign: "center" }}>Membership</Text>
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="organizationAName"
                        value={this.state.organizationAName}
                        onChangeText={(text) => this.setState({ organizationAName: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="OrganizationA MemberNo"
                        value={this.state.organizationAMemberNo}
                        onChangeText={(text) => this.setState({ organizationAMemberNo: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="organizationBName"
                        value={this.state.organizationBName}
                        onChangeText={(text) => this.setState({ organizationBName: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
            </View>
        )
    }
}
