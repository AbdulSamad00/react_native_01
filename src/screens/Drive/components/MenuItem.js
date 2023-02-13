import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors, Icon, Switch } from 'react-native-elements';

export default function MenuItem(props) {
    return (
        <TouchableOpacity disabled={props.disabled} style={[styles.itemContainer,]} onPress={props.onPress}>
                { props.iconName &&
                   <Icon
                     name  = {props.iconName}
                     color = {props.disabled?colors.grey2:colors.black}
                     type  = {props.iconType}
                     size  = {18}
                     style = {{marginRight:7,width:30,height:30,paddingTop:5}}
                   />
                }
                { props.switch &&
                    <Switch
                      style={{backgroundColor:props.value?colors.grey2:colors.grey0,padding:0}}
                      // color={colors}
                      ios_backgroundColor={props.value?colors.grey1:colors.grey0}
                      style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                      value={props.value}
                      onValueChange={(value) => props.setValue(value)} 
                    />
                }
                <Text style={[styles.label,
                     {color:props.disabled?colors.grey2:colors.black}
                    ]}>{props.label}</Text>
              </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    itemContainer:{
        paddingVertical:5,
        paddingHorizontal:5,
        flexDirection:"row",
        alignItems:"center"
    },
    label:{
        fontSize:16,
        fontWeight:"600",
        color:colors.black
    },

})