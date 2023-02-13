import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { colors } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import CommonStyles from '../../config/CommonStyles'
const width= Dimensions.get("window").width
export default function Note({ reply }) {
    const iconSize=21
    return (
        <View>
            <View style={[styles.row, { justifyContent: "flex-start" }]}>
                <View>

                <View style={[styles.circle, reply && { height: 40, width: 40, backgroundColor: colors.primary }]}>
                    <Text style={[styles.buttonText,]}>T</Text>
                </View>
                <Text style={styles.text}>@toto</Text>
                </View>
                <View>
                    <Text style={styles.text}>Oct 27, 2020</Text>
                    <Text style={styles.text}>{reply ? reply : "This is My note"} 
                   
                      {/* <Text style={[styles.text,{fontSize:15,color:colors.grey3}]}>{"  Jan 20,2022 2:15"} </Text> */}
                    </Text>
                </View>
            </View>
            <View style={[styles.row, { justifyContent: "flex-end" }]}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name="favorite" type="ionicons" size={iconSize} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconContainer,{backgroundColor:colors.warning}]}>
                    <Icon name="pencil" type="font-awesome" size={iconSize} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconContainer,{backgroundColor:colors.primary}]}>
                    <Icon name="link" type="feather" size={iconSize} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image style={{height:'100%',width:'100%'}}  resizeMode="cover" source={require("../../assets/icons/reply.png")} />
                   
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image style={styles.img} source={require("../../assets/icons/quote.png")} />
                   
                </TouchableOpacity>
            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    buttonText: {
        color: "white",
        fontSize: 27,
        fontWeight: "600",
        // fontFamily: "Poppins-Bold"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingHorizontal:7
    },
    circle: {
        backgroundColor: colors.secondary,
        height: 50, width: 50, borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15

    },
    text: {
        fontSize: 17,
        fontFamily: "Poppins-Regular",
        color: colors.grey2
    },
    iconContainer: {
        marginHorizontal: 5,
        height:35,
        width:35,
        backgroundColor:colors.error,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    button: {
        backgroundColor: colors.grey5,
        borderRadius: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10

    },
    img:{ 
        height: 35, 
        width: 35,
        borderRadius:20,
         marginHorizontal: 5,
    }
})