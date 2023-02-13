import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import colors from '../../../config/colors'

export default function SideItem({ item, onPress, selectedFile, list, files, expanded, setExpanded }) {


    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.listItem, selectedFile == item && { backgroundColor: colors.BLUE.light }]}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                        name={item.type == "folder" ? "folder" : "ios-document-sharp"}
                        color={colors.GREY.secondary}
                        type="ionicon"
                        size={25}
                        style={{ marginRight: 5 }}
                    />

                    <Text style={styles.text}>{item.name}</Text>
                </View>
                {(selectedFile == item && files) &&
                
                    <TouchableOpacity onPress={() => setExpanded(expanded == selectedFile ? false : selectedFile)}>
                        <Icon
                            name={expanded == selectedFile ? "chevron-up" : 'chevron-down'}
                            color={colors.GREY.btnPrimary}
                            type="ionicon"
                            size={21}
                            style={{ marginRight: 5, alignSelf: "flex-end", }}
                        />
                    </TouchableOpacity>

                }
            </TouchableOpacity>
            {(expanded == item && files) &&
                <View style={{ paddingLeft: 10 }}>
                    {files.map((file) => (
                        file.type == "folder" &&
                        <TouchableOpacity style={[styles.listItem, { justifyContent: "flex-start" }]}>
                            <Icon
                                name={"folder"}
                                color={colors.GREY.secondary}
                                type="ionicon"
                                size={25}
                                style={{ marginRight: 7 }}
                            />
                            <Text>{file.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>


            }
        </>
    )
}
const styles = StyleSheet.create({

    listItem: {

        flexDirection: "row",
        padding: 8,
        paddingVertical: 10,
        borderBottomColor: colors.GREY.border,
        borderBottomWidth: 1,
        alignItems: "center",
        //backgroundColor:"red",
        paddingLeft: 12,
        flex: 1,
        justifyContent: "space-between"



    },
    text: {
        fontWeight: "400",
        fontSize: 12,
        color: colors.black,
        textAlign: "center"
    }
})