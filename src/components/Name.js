import React, { Component } from 'react'
import { Text, View, TextInput, ScrollView, LogBox } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from 'react-native-vector-icons/Feather';

LogBox.ignoreAllLogs();

export default class Name extends Component {

    constructor() {
        super();
        this.state = {
            prefix: '',
            firstName: '',			
            initials: '',			
            lastName: '',
            title: '',

        };
    }
    render() {
        return (

            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <View>
                    <Text style={{ fontSize: 30, textAlign: "center" }}>Name</Text>
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <TextInput
                        placeholder="Prefix"
                        value={this.state.prefix}
                        onChangeText={(text) => this.setState({ prefix: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <TextInput
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChangeText={(text) => this.setState({ FirstName: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <TextInput
                        placeholder="Initials"
                        value={this.state.initials}
                        onChangeText={(text) => this.setState({ initials: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
				
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <TextInput
                        placeholder="Last Name"
                        value={this.state.lirstName}
                        onChangeText={(text) => this.setState({ LastName: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>
                <View style={{ marginTop: 10, borderWidth: 1, flexDirection: "row", backgroundColor: "white" }}>
                    <TextInput
                        placeholder="Title"
                        value={this.state.title}
                        onChangeText={(text) => this.setState({ titlte: text })}
                        style={{ marginStart: 10, flex: 1 }}
                    />
                </View>

            </View>
        )
    }
}
