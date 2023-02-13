import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { colors } from 'react-native-elements'
import CommonStyles from '../../config/CommonStyles'
import Note from './Note'
// import CommentItem from './CommentItem'

export default function index({ navigation }) {
    const notes = [
        { note: "comment", reply: "This is reply" },
        { note: "comment", reply: "" },
        { note: "comment", reply: "This is reply" },
        { note: "comment", reply: "This is reply" }
    ]
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("CreateNote")} style={[styles.button]}>
                {/* <Text style={styles.buttonText}> Add Notes</Text> */}
                <Image style={{width:50,height:50}} source={require('../../assets/icons/note.png')} />
            </TouchableOpacity>
            {notes.map(note => (
                <>
                    <Note />
                    {note.reply ?

                        <View style={{ paddingLeft: 25 }}>
                            <Note reply={note.reply} />
                        </View>
                        :
                        <></>
                    }
                </>
            ))}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex:1,
        backgroundColor: colors.white
    },
    button: {
        borderRadius: 5,
        marginBottom: 10,
        // backgroundColor: "rgb(75,100,140)",
        paddingHorizontal: '6%',
        paddingVertical: '4%',
        alignSelf: "flex-start"
    },
    buttonText: {
        color: "white",
        fontSize: 17,
        fontFamily: "Poppins-SemiBold"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10
    },
    circle: {
        backgroundColor: colors.secondary,
        height: 50, width: 50, borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15

    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: colors.grey0
    }
    // h1:{
    //     fontFamily:
    // }
})