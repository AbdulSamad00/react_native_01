import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import CButton from './CButton'
const blue = "#00B7DD"
export default function CHeader({ setCreateFolder, createFolder, setUpload, layout, setLayout, setMenu, menu, setSelectedSubMenu, selectedSubMenu }) {
    const width = parseInt(Dimensions.get("window").width)
    const height = parseInt(Dimensions.get("window").height)
    return (
        <View style={styles.row}>
            <CButton text="Create Folder" onPress={() => setCreateFolder({ ...createFolder, visible: true })} />
            <CButton text="Upload file" onPress={setUpload} />
            <CButton onPress={() => setLayout("grid")} color={layout == "grid" && blue} name={"grid"} />
            <CButton onPress={() => setLayout("list")} color={layout == "list" && blue} name={"list-outline"} />
            {width <= 500 ?
                <CButton name={"ellipsis-vertical-outline"} onPress={() => setMenu({ ...menu, visible: true })} />
                :
                <>
                    <CButton text="Options" onPress={() => { setMenu({ ...menu, visible: true }); setSelectedSubMenu("options") }} />
                    <CButton text="Actions" onPress={() => { setMenu({ ...menu, visible: true }); setSelectedSubMenu("actions") }} />
                </>
            }

        </View>
    )
}
const styles = StyleSheet.create({
    row: {
        // flex:1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation:1,
        shadowColor: 'rgba(0, 0, 0, 0.201831)',
        shadowOffset: {
          width: 0,
          height: 1,
        },
    },
})