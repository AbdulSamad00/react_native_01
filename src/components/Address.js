import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, LogBox } from 'react-native'
import DatePicker from 'react-native-datepicker'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from 'react-native-vector-icons/Feather';

LogBox.ignoreAllLogs();

export default class Address extends Component {

    constructor() {
        super();
        this.state = {
            address1: '',
            address2: '',			
            address3: '',			
            zipcode: '',
            state: '',
            city: '',
            country: '',

        };
    }
    render() {
        return (

            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <View>
                    <Text style={{ fontSize: 30, textAlign: "center" }}>Address</Text>
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <FontAwesome name="address-card-o" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Address 1"
                        value={this.state.address1}
                        onChangeText={(text) => this.setState({ address: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <FontAwesome name="address-card-o" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Address 2"
                        value={this.state.address2}
                        onChangeText={(text) => this.setState({ address: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <FontAwesome name="address-card-o" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Address 3"
                        value={this.state.address3}
                        onChangeText={(text) => this.setState({ address: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
				
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <FontAwesome name="address-card-o" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Zip Code"
                        value={this.state.zipcode}
                        onChangeText={(text) => this.setState({ zipcode: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Feather name="globe" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="State"
                        value={this.state.state}
                        onChangeText={(text) => this.setState({ state: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Feather name="globe" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="City"
                        value={this.state.city}
                        onChangeText={(text) => this.setState({ city: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>

                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <Feather name="globe" style={{ padding: 9 }} size={20} />
                    <TextInput
                        placeholder="Country"
                        value={this.state.country}
                        onChangeText={(text) => this.setState({ country: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>

            </View>
        )
    }
}
