import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import { w, h } from "react-native-responsiveness";

export default class DirectoryList extends Component {
    constructor() {
        super();
        this.state = {
            keyword: '',
            location: ''
        };
    }
    render() {
        return (
            <View style={styles.Container}>

                {/* ============================Header======================== */}
                <View style={styles.TopContainer}>
                    <View style={styles.ContainerForPic}>
                        <View style={styles.TopLeftContianer}></View>
                        <View style={styles.TopMiddleContianer}>
                            <Text style={styles.nameText}>Directory List</Text>
                        </View>
                    </View>

                </View>

                {/* ============================TopView======================== */}
                <Text style={styles.TodayText}>
                    Start Your Search
                </Text>


                {/* ============================Inputs======================== */}
                <View>
                    <View style={styles.inputView}>
                        <FontAwesome name="keyboard-o" style={styles.inputIcon} size={20} />
                        <TextInput
                            placeholder="Type Keyword"
                            value={this.state.keyword}
                            onChangeText={(text) => this.setState({ keyword: text })}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Ionicons name="briefcase-outline" style={styles.inputIcon} size={20} />
                        <Text style={styles.texts}>Category:</Text>

                        <ModalDropdown

                            style={{ padding: 8, marginLeft: 2, flex: 1 }}
                            textStyle={{ fontSize: 16 }}
                            dropdownStyle={{ width: 120, fontWeight: 16, height: 130 }}
                            dropdownTextStyle={{ fontSize: 16, color: "black" }}
                            defaultValue={'Select Category'}
                            options={['Doctor', 'Hospital', 'Clinic', 'Pharmacy', 'Blood Bank', 'Fitness Center']} />
                    </View>

                    <View style={styles.inputView}>
                        <Ionicons name="briefcase-outline" style={styles.inputIcon} size={20} />
                        <Text style={styles.texts}>Sub Category:</Text>

                        <ModalDropdown
                            style={{ padding: 8, marginLeft: 2, flex: 1 }}
                            textStyle={{ fontSize: 16 }}
                            dropdownStyle={{ width: 150, fontWeight: 16, height: 130 }}
                            dropdownTextStyle={{ fontSize: 16, color: "black" }}
                            defaultValue={'Select Sub Category'}
                            options={['Cardiologist', 'Colorectal surgeon', 'Dentist', 'Dermatologist', 'Dietician', 'Eye Doctor']} />
                    </View>


                    <View style={styles.inputView}>
                        <FontAwesome name="location-arrow" style={styles.inputIcon} size={20} />
                        <TextInput
                            placeholder="Set Location"
                            value={this.state.location}
                            onChangeText={(text) => this.setState({ location: text })}
                            style={styles.textInput}
                        />
                        <MaterialIcons name="my-location" style={styles.inputIcon} size={20} />
                    </View>
                </View>

                {/* ============================Button======================== */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Search")} style={styles.button}>
                    <Text style={styles.buttonText}>Search Now</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    // Header
    headerView: {
        flexDirection: "row",
        backgroundColor: "#389CE8"
    },

    headerIcon: {
        padding: 10,
        color: "white"
    },

    headerText: {
        color: "white",
        fontSize: 20,
        padding: 10,
        marginTop: 5
    },

    // Top
    topView: {
        backgroundColor: "lightgrey",
        borderBottomWidth: 1
    },

    topText: {
        fontSize: 16,
        padding: 10
    },

    // Inputs
    inputView: {
        borderBottomWidth: 1,
        flexDirection: "row",
        backgroundColor: "white"
    },

    inputIcon: {
        padding: 8
    },

    texts: {
        padding: 8
    },

    textInput: {
        marginStart: 10,
        flex: 1
    },

    // Button
    button: {
        borderRadius: 10,
        backgroundColor: '#00B7DD',
        marginHorizontal: 40,
        marginVertical: 20
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 8,
    },

    TopContainer: {
        backgroundColor: "#00B7DD",
        width: "100%",
        height: h("25%"),
        alignItems: "center",
    },
    ContainerForPic: {
        // backgroundColor: 'red',
        width: "90%",
        height: h("15%"),
        flexDirection: "row",
        marginTop: h("2.5%"),
    },
    TopLeftContianer: {
        // backgroundColor: 'green',
        width: "10%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    TopMiddleContianer: {
        // backgroundColor: 'gold',
        width: "75%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    TopRightContianer: {
        // backgroundColor: 'tomato',
        width: "15%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    imgRenderDesgin: {
        backgroundColor: "white",
        width: 100,
        height: 100,
        borderRadius: 110 / 2,
    },
    nameText: {
        fontSize: h("2.5%"),
        fontWeight: "bold",
        color: "white",
    },

    icons: {
        width: "40%",
        height: "40%",
        resizeMode: "contain",
    },
    faceImg: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    TopBottomContainer: {
        // backgroundColor: 'red',
        width: "95%",
        height: h("15%"),
        marginTop: h("1%"),
        flexDirection: "row",
        alignItems: "center",
    },
    TopContain: {
        // backgroundColor: 'green',
        width: "33.33%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: h("2.5%"),
        paddingRight: h("2%"),
        borderRightColor: "#0003",
        borderRightWidth: h("0.1%"),
    },
    MiddleContain: {
        // backgroundColor: 'gold',
        width: "33.33%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: h("3%"),
        paddingRight: h("2%"),
        borderRightColor: "#0003",
        borderRightWidth: h("0.1%"),
    },
    BottomContain: {
        // backgroundColor: 'tomato',
        width: "33.33%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: h("3%"),
        paddingRight: h("2%"),
    },
    Apponimtnnumber: {
        fontSize: h("3%"),
        fontWeight: "bold",
        color: "white",
    },
    AppoinmntText: {
        fontSize: h("2%"),
        color: "white",
    },

    lowerContaierFlatlist: {
        backgroundColor: "#F6F6F6",
        width: "100%",
        height: h("120%"),
        alignItems: "center",
    },
    flatlistContainer: {
        backgroundColor: "white",
        width: w("90%"),
        height: h("22%"),
        marginTop: h("1%"),
        borderRadius: h("1.1%"),
        overflow: "hidden",
        // elevation: h('0.1%'),
    },
    flatlistContainer2: {
        backgroundColor: "white",
        width: w("90%"),
        height: h("18%"),
        marginTop: h("1%"),
        borderRadius: h("1.1%"),
        overflow: "hidden",
        // elevation: h('0.1%'),
    },

    Flatlist: {
        // backgroundColor: '#f2f2',
        alignItems: "center",
    },
    FlatListTopView: {
        // backgroundColor: 'purple',
        width: "100%",
        height: h("5%"),
        alignItems: "flex-end",
    },
    FlatListMiddleView: {
        // backgroundColor: 'orange',
        width: "100%",
        height: h("11%"),
        flexDirection: "row",
    },
    FlatListBottomView: {
        // backgroundColor: 'green',
        width: "100%",
        height: h("6%"),
        alignItems: "center",
        flexDirection: "row",
    },
    ItemContainer: {
        backgroundColor: "#003C75",
        width: "30%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    itemAppoinment: {
        color: "white",
        fontSize: h("1.5%"),
    },
    FlatlistMiddleLeft: {
        // backgroundColor: 'red',
        width: "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: h("2%"),
    },
    FlatlistMiddleMiddle: {
        // backgroundColor: 'gold',
        width: "75%",
        height: "100%",
    },
    ProfileImg: {
        // backgroundColor: 'white',
        width: 55,
        height: 55,
        borderRadius: 110 / 2,
    },
    imge: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    Itemname: {
        color: "black",
        fontSize: h("2.5%"),
    },
    ItemTime: {
        color: "#003C75",
        fontSize: h("1.5%"),
        fontWeight: "bold",
        marginTop: h("0.5%"),
    },
    ItemTime3: {
        color: "#D0021B",
        fontSize: h("1.5%"),
        fontWeight: "bold",
    },
    ItemSpecilist: {
        color: "#0006",
        fontSize: h("2%"),
    },
    ItemTime2: {
        color: "#0006",
        fontSize: h("1.5%"),
    },
    Buttons: {
        width: "35%",
        height: h("5%"),
        borderColor: "blue",
        borderWidth: 1,
        borderRadius: h("12%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    Buttonicons: {
        height: "50%",
        width: "20%",
        resizeMode: "contain",
        marginRight: h("0.5%"),
    },
    ButtonText: {
        fontSize: h("1.5%"),
        color: "#003C75",
    },
    TopActiveContainer: {
        // backgroundColor: 'red',
        width: "100%",
        height: h("7%"),
        flexDirection: "row",
    },
    TopLeftActiveContainer: {
        // backgroundColor: 'green',
        width: "50%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    TopRightActiveContainer: {
        // backgroundColor: 'gold',
        width: "50%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    ActiveText: {
        color: "white",
        fontSize: h("2.8%"),
        fontWeight: "bold",
        marginTop: h("3%"),
    },
    ActiveText2: {
        color: "white",
        fontSize: h("2.8%"),
    },
    underline: {
        backgroundColor: "white",
        width: "100%",
        height: h("0.8%"),
        marginTop: h("1%"),
    },

    TodayText: {
        color: "black",
        fontSize: h("3%"),
        textAlign: "center"
    },
});