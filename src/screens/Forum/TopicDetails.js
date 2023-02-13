import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import { colors } from 'react-native-elements'
import { set } from 'react-native-reanimated'
import { deleteInternalPost, getInternalPost, getInternalPosts, getInternalPostTopic } from '../../api/internalPosts'
import { getPosts } from '../../api/posts'
import { getTopic } from '../../api/topics'
import ActivityIndicator from '../../components/ActivityIndicator'
import { NavForum } from '../../components/NavForum'
import CommonStyles from '../../config/CommonStyles'
import TopicItem from './TopicItems'
const windowHeight = Dimensions.get('window').height;

export default function TopicDetails({ navigation, route  }) {
    const [replies, setReplies] = useState([])
    const [loading, setLoading] = useState()
    const [topic,setTopic] = useState({})
    const focus = useIsFocused()
    const stateRef = useRef();
    stateRef.current = replies;
    const callForComments = async ()=>{
        setLoading(true)
        const  {ok, data} = await getPosts()
        setTopic(route.params.topicData)
       if(ok){
        console.log(data[0])
        let filteredPosts = data.filter(e=>e.topicId?._id===route.params.topicData?._id)


        setReplies(filteredPosts)
       }
        setLoading(false)
    }

    useEffect(() => {
       callForComments();   
     }, [focus,route.params.topicData?._id]);
    return (
        <View style={styles.container}>
            <NavForum 
              onPress={() => {
               navigation.goBack();
             }}
             Text={route.params.topicData?.title}
            />
            <ActivityIndicator visible={loading} />
            <ScrollView scrollEnabled={true} >

            {route.params.topicData ? (
                <View style={styles.containerComments}>
                    <TopicItem data={route.params.topicData} navigation={navigation} callForComments={callForComments} />
                    {replies?.length > 0 &&

                        <View style={{ paddingLeft: 25 }}>
                            {replies?.map(item => (


                                <TopicItem data={item} reply navigation={navigation} callForComments={callForComments} post/>

                            ))}
                        </View>
                    }


                </View>
            ) :
                <View style={styles.noComments}></View>
            }
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    containerComments: {
        marginTop:20,
        flex: 0.2,
        backgroundColor: "white"
    },
    noComments: {
        flex: 1,
        backgroundColor: "white"
    },
    button: {
        marginBottom: 10,
        // borderRadius: 5,
        // backgroundColor: "rgb(75,100,140)",
        paddingHorizontal: '5%',
        // paddingVertical: '4%',
        // alignSelf: "flex-start"
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