import React, { Component, ignoredYellowBox } from 'react'
import { View, Text, LogBox, StyleSheet, Image } from 'react-native'
import { w, h } from 'react-native-responsiveness';
import DatePicker from 'react-native-datepicker'
LogBox.ignoreAllLogs();

export default class DatePickerPast extends Component {
    constructor(props) {
        super(props)
        this.state = { date: false }
    }

    render() {
        return (
            <View style={styles.Topmargin}>
                <View style={styles.HeaderText}>
                    <Text style={styles.HeaderTextf}>PAST DATE</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Image style={styles.img}
                            source={require("../assets/calendar.png")}
                        />
                    </View>
                    <DatePicker
                        placeholder="Past Date"

                        style={{ flex: 1 }}
                        date={this.state.date}
                        mode="date"

                        format="DD-MM-YYYY"
                        minDate="01-01-1900"
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            placeholderText: { color: "black", fontSize: 16 },
                            dateText: { fontSize: 16 },
                            dateInput: {
                                borderWidth: 0,
                                fontSize: 100,
                                marginRight: 170,
                                marginTop: 6
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#fff',
        width: '86%',
        height: h('7%'),
        borderRadius: h('1.5%'),
        flexDirection: 'row',

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
