import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { colors } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFiles } from '../../api/drive'
import { Navbar } from '../../components'
import Folder from './components/Folder'

export default function FolderDetail({ route, navigation }) {
    const folder = route?.params.folder
    const [files, setFiles] = useState(false)
   
    const filesHandler = async () => {
        const { ok, data } = await getFiles(`/uploads/${folder.name}`);
        if (ok) {
            // console.log(data.children[0])
            setFiles(data.children)
        }
    }
    useEffect(() => {
        filesHandler()
    }, [])
    return (
        <View>
            <SafeAreaView>
                <Navbar
                    color={colors.white}
                    onPress={() => { navigation.goBack() }}
                    Text={folder.name}
                />
                {/* <CHeader
                    createFolder={createFolder}
                    setCreateFolder={setCreateFolder}
                    menu={menu}
                    setMenu={setMenu}
                    layout={layout}
                    setLayout={setLayout}
                    upload={upload}
                    setUpload={setUpload}
                /> */}
                {
                    files ?
                        <FlatList
                            data={files}
                            contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", }}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Folder item={item} />
                            )}
                        />
                        :
                        <ActivityIndicator color={'blue'} style={{ paddingTop: 40 }} />
                }
            </SafeAreaView>
        </View>
    )
}
