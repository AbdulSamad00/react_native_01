import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {  Icon } from 'react-native-elements'
import colors from '../../../config/colors'

export default function Folder({item, index, onPress, selectedFile ,selectedList ,list}) {
    return (
       
        <TouchableOpacity 
         onPress={onPress}
         style={[list?styles.listItem:styles.container,selectedList.includes(index) && {backgroundColor:colors.BLUE.light}]}
         >
            {
             !list &&
             <>
               <Icon
               name={item.type=="folder"? "folder":"ios-document-sharp"}
               color={item.type=="folder"?colors.YELLOW.primary:colors.GREY.secondary}
               type="ionicon"
               size={45}
               />
            </>
            }
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    container:{
        width:90,
        //paddingHorizontal:20,
        paddingVertical:3,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:10,
        marginHorizontal:3,
       // backgroundColor:"red",
        
    },
    listItem:{
        padding:18,
        borderBottomColor:colors.GREY.border,
        borderBottomWidth:1,
        alignItems:"flex-start"
     
        
    },
    text:{
        fontWeight:"400",
        fontSize:12,
        color:colors.black,
        textAlign:"center"
    }
})