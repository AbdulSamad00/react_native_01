import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, LogBox } from 'react-native'
import DatePicker from 'react-native-datepicker'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
import ModalDropdown from 'react-native-modal-dropdown';

LogBox.ignoreAllLogs();

export default class PersonalInfo extends Component {

    constructor() {
        super();
        this.state = {
            fname: '',
            initial: '',
            lname: '',
            prefix: '',
            date: "01-01-1950"

        };
    }
    render() {
        return (

            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <View>
                    <Text style={{ fontSize: 30, textAlign: "center" }}>Personal Information</Text>
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="First Name"
                        value={this.state.fname}
                        onChangeText={(text) => this.setState({ fname: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Initials"
                        value={this.state.initial}
                        onChangeText={(text) => this.setState({ initial: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Last Name"
                        value={this.state.lname}
                        onChangeText={(text) => this.setState({ lname: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <FontAwesome name="keyboard-o" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Prefix"
                        value={this.state.prefix}
                        onChangeText={(text) => this.setState({ prefix: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Ionicons name="person-outline" style={{ padding: 8 }} size={20} />

                    <ModalDropdown
                        style={{ padding: 8, marginLeft: 6 }}
                        textStyle={{ fontSize: 16 }}
                        dropdownStyle={{ color: "red", width: 100, fontWeight: 16, height: 105 }}
                        dropdownitemStyle={{ color: "black" }}
                        defaultValue={'Select Gender'}
                        options={['Male', 'Female', 'Transgender']} />
                </View>


                <View style={{ marginTop: 10, flexDirection: "row", borderWidth: 1 }}>
                    <View style={{ marginTop: 8, marginLeft: 10, flex: 1 }}>
                        <Text style={{ fontSize: 16, }}>D.O.B:</Text>
                    </View>
                    <View style={{ marginRight: 20 }}>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="Past Date"
                            format="DD-MM-YYYY"
                            minDate="01-01-1900"
                            maxDate="01-01-2050"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    left: 20,
                                    top: 0,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 0,
                                    borderWidth: 0,
                                    fontSize: 100,
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
