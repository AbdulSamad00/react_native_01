import React from 'react'
import { View, Text, StyleSheet , TouchableOpacity} from 'react-native'
import { colors, Icon } from 'react-native-elements'

export default function CButton({text,onPress,style={},name,color}) {
    return (
        <TouchableOpacity onPress={onPress} style={[text? styles.btnContainer:styles.iconContainer,style]}>
        {text?
            <Text style={styles.text}>{text}</Text>
            :
            <Icon
               name={name}
               color={color?color:"#000"}
               type="ionicon"
               size={20}
             //  style={style}
            />
        }
      </TouchableOpacity>
    )
}
const styles= StyleSheet.create({
    btnContainer:{
        backgroundColor:colors.white,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:30,
        margin:10,
        borderWidth:1,borderColor:colors.grey0
    },
    iconContainer:{
        paddingHorizontal:5
    },
    text:{
        color:colors.grey0,
    }
    })