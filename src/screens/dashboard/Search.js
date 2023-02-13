import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Map from '../../components/Map';

export default class Search extends Component {
    render() {
        return (
            <View style={styles.container}>

                {/* ============================Header======================== */}
                <View style={styles.headerViewWrap}>
                    <View style={styles.headerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrowleft' size={35} color='white' />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerTitleView}>
                        <Text style={styles.headerTitle}>
                            Search Result
                        </Text>
                    </View>
                </View>

                {/* ============================Image Section======================== */}
                <View style={styles.imageSectionView}>
                    <View>
                        <Image source={require('../../assets/doctor.jpg')} style={styles.image} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.ImgSectionText}>Clinic</Text>
                        <Text style={styles.ImgSectionText1}>Ambias Clinic</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Entypo name='star' size={25} color='#FDB719' />
                            <Entypo name='star' size={25} color='#FDB719' />
                            <Entypo name='star' size={25} color='#FDB719' />
                            <Entypo name='star' size={25} color='gray' />
                            <Entypo name='star' size={25} color='gray' />
                            <Text style={{ fontSize: 20 }}> / </Text>
                            <FontAwesome name='hand-o-right' size={25} />
                            <Text style={styles.ImgSectionText1}> (1) </Text>
                        </View>
                    </View>
                </View>

                {/* ============================Button======================== */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Contact")} style={styles.button}>
                    <Text style={styles.buttonText}>Make Appointment</Text>
                </TouchableOpacity>

                {/* ============================Map Ccomponent======================== */}
                <Map />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },

    // Header
    headerViewWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#389CE8"
    },

    headerView: {
        position: 'absolute',
        left: 10,
        top: 10
    },

    headerTitleView: {
        padding: 15
    },

    headerTitle: {
        fontSize: 20,
        color: 'white'
    },

    // Image Section
    imageSectionView: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 10
    },

    image: {
        width: 80,
        height: 80,
        borderRadius:
            40
    },

    ImgSectionText: {
        color: "#389CE8"
    },

    ImgSectionText1: {
        fontSize: 16
    },

    // Button
    button: {
        borderRadius: 10,
        backgroundColor: '#389CE8',
        marginHorizontal: 40,
        marginVertical: 20
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 8,
    },

});



