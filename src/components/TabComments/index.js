import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { colors } from 'react-native-elements'
import { set } from 'react-native-reanimated'
import { deleteInternalPost, getInternalPost, getInternalPosts, getInternalPostTopic } from '../../api/internalPosts'
import CommonStyles from '../../config/CommonStyles'
import ActivityIndicator from '../ActivityIndicator'
import CommentItem from './CommentItem'
const windowHeight = Dimensions.get('window').height;

export default function index({ navigation, clinic  }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState()
    const [deleted, setDeleted] = useState(false)
    const focus = useIsFocused()
    const stateRef = useRef();
    stateRef.current = comments;
    const id = clinic._id;
    const callForComments = async ()=>{
        setLoading(true)
        const postsOfTask = await getInternalPostTopic(id)
        let filtered = postsOfTask.data.filter(post => !post.parentId);
        let p = {}
        let l = -1
        let count = 0

        filtered.map(e => {
            return e.comments = []
        })
        postsOfTask.data.forEach(async (element) => {
            p = {}
            if (element.parentId) {
                p = element

                while (p.parentId) {
                    p = await getInternalPost(p.parentId)
                    p = p.data
                }
                l = filtered.findIndex(e => e._id == p._id)
                filtered[l].comments.push(element)
            }
            count++
            if (count == (postsOfTask.data.length)) {
                setComments(filtered)
            }
        })
        setLoading(false)
    }

    useEffect(() => {
        callForComments()   
     }, [focus])
    return (
        <View style={styles.container}>
            <ActivityIndicator visible={loading} />
            <TouchableOpacity onPress={() => navigation.navigate("CreateComment", { ticket: id })} style={[styles.button]}>
                {/* <Text style={styles.buttonText}> Post Comment</Text> */}
                <Image source={require('../../assets/icons/comment.png')} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
            {stateRef.current.length > 0 ? stateRef.current?.map(com => (
                <View style={styles.containerComments}>
                    <CommentItem data={com} navigation={navigation} callForComments={callForComments} />
                    {com?.comments?.length > 0 &&

                        <View style={{ paddingLeft: 25 }}>
                            {com?.comments?.map(item => (


                                <CommentItem data={item} reply navigation={navigation} callForComments={callForComments}/>

                            ))}
                        </View>
                    }


                </View>
            )) :
                <View style={styles.noComments}></View>
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    containerComments: {
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