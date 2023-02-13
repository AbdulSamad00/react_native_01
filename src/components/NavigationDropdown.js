import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppSingleDropdown from './forms/AppSingleDropdown';
import { options } from '../config/pickerElements';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { useSnapshot } from 'valtio';
import { state } from '../../App';
import Modal from 'react-native-modal'
import { colors, Icon } from 'react-native-elements';
import Colors from '../config/colors'
export default function NavigationDropdown({ onChange, value,options,style }) {


    const { isTablet } = useSnapshot(state);
    const [isVisible, setIsVisible] = useState(false);
    const [newValue, setNewValue] = useState(value);

    

    const findLabel = (o) => {
        let object = options.filter(e => e.value == o)[0]
        let label = object?.label

        return label
    }
    const findColor = (o) => {
        let object = options.filter(e => e.value == o)[0]
        let label = object?.bgColor

        return label
    }
    return (

        <View
            style={{
                marginBottom: 10,
                marginTop: 15,
                // height: 45,
                width: isTablet ? 350 : "100%",
                marginLeft: isTablet ? 50 : 0,
                // backgroundColor:"orange"

            }}
        >
            {Platform.OS == 'ios' ?
                <Dropdown
                    textInputPlaceholder={"Select Options"}
                    data={options}
                    value={newValue}
                    onChange={onChange}
                    mode="flat"
                />
                :
                <>
                    <TouchableOpacity style={[styles.header,{backgroundColor:newValue?findColor(newValue):options[0]['bgColor']}]} onPress={() => setIsVisible(!isVisible)}>
                        <Text>{!newValue ? "Basic Information" : findLabel(newValue) }</Text>
                        <Icon name="caret-down-outline" color={isVisible ? '#2196f3' : colors.grey3} type={"ionicon"} size={18} />
                    </TouchableOpacity>

                    <Modal onBackdropPress={() => setIsVisible(false)} 
                    backdropOpacity={.1} backdropColor={"transparent"} animationIn={"fadeIn"} animationOut={"fadeOut"} isVisible={isVisible}>
                        <View style={[{ position: "absolute", height: 200, backgroundColor: "#fff", top: 128, width: '64%', left: -10, elevation: 1 },style]}>
                            <ScrollView>
                                {options.map((item) => (
                                    <TouchableOpacity onPress={() => { onChange(item.value); setIsVisible(false); setNewValue(item.value) }}
                                     style={[styles.row,{backgroundColor:item.bgColor}]}>
                                        {/* <Image style={{ width: 20, height: 20, marginRight: 7 }} source={item.avatarSource} /> */}
                                        <Text style={{ color:'#ffffff' }}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </Modal>
                </>
            }

        </View>

    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey5
    },
    container: {
        // flex:1,
        position: "absolute",
        borderWidth: 1,
        borderColor: colors.grey5,
        backgroundColor: 'red',
        // overflow:"hidden",
        top: '20%',
        width: "36%",
        // height: 300,
        // zIndex:900,
        right: -10,
        alignSelf: "flex-end"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey3,
        paddingHorizontal: 13,
        height: 63,
        backgroundColor: Colors.GREY.whiteish,
        width: "100%"
    }
})
/**
 *
 *  <View
                style={{
                    marginBottom: 10,
                    marginTop: 15,
                    height:45,
                    width: isTablet ? 350 : "100%",
                    marginLeft: isTablet ? 50 : 0,
                    backgroundColor:"orange"
                }}
            >
                <Dropdown
                    textInputPlaceholder={"Select Options"}
                    data={options}
                    newValue={newValue}
                    onChange={onChange}
                    mode="flat"
                />
            </View>
 */