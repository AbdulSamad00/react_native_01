import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { width } from 'styled-system';

export default function DialogPicker(props) {
    const Item = Picker.Item;
    const {selectedValue, onValueChange,items} = props;
    return (
    <Picker
        mode={'dialog'}
        style={[styles.headerPicker,props.style]}
        itemStyle={[styles.itemStyle,props.itemStyle]}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        >
         {items && items.map(element => {
             return <Item value={element.value} label={element.label} />
         })
         }
                      
    </Picker>
    )
}

const styles = StyleSheet.create({
    headerPicker:{
         height: 44,
         width: Dimensions.get('screen').width/4
    },
    itemStyle:{
        height: 44,
        fontSize: 12,
        padding: 0,
    },
})
