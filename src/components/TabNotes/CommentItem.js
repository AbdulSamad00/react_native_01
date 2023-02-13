import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { colors } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import CommonStyles from '../../config/CommonStyles'
import moment from "moment";
import { deleteInternalPost, getInternalPost, getInternalPosts, getInternalPostTopic } from '../../api/internalPosts'
import { getCategories } from '../../api/categories'


export default function CommentItem({ reply , data , navigation ,callForComments }) {
    const iconSize=21
    const [nestedComments , setNestedComments] = useState([])
    const stateRef = useRef();
    stateRef.current = nestedComments;
    const deleteComments = async (id) => {
        await getNestedComments(id)

        stateRef.current.map(async(e)=>await deleteInternalPost(e._id))
        const { ok } = await deleteInternalPost(id);
        if (ok) {
          console.log("deleted");
          callForComments();
        }
        Alert.alert("Success!", "Comment deleted");
      }
    
    
    
      const getNestedComments = async (id) => {
    
        try {

          const comments = await getInternalPosts()

          for (let j = 0; j <comments.data.length ; j++) {
            await getAllReplies(comments.data[j],id)
          }
        }
        catch (err) {
          console.log(err)
        }
      }
    
      const getAllReplies = async (comment,id)=>{
        let reply = {}
        if (comment.parentId!=null) {
          reply = comment
          while (reply.parentId!=null) {
            reply = await getInternalPost(reply.parentId)
            reply = reply.data
            if (reply._id === id) {
             setNestedComments(prev=>[...prev,comment]);
            }
          }
        }
      }
  
    return (
        <View>
            <View style={[styles.row, { justifyContent: "flex-start" }]}>
                <View style={styles.infos}>

                <View style={[styles.circle, reply && { height: 40, width: 40, backgroundColor: colors.primary }]}>
                    <Image style={[styles.buttonText,]} source={{uri:data?.user?.imageSrc}}  />
                </View>
                <Text style={styles.textUserName}>{data?.user?.contactName?.first + ' ' + data?.user?.contactName?.last}</Text>
                </View>
                <View style={styles.textContainer}>

                    <Text style={styles.text}>{moment(data?.createdOn).format("LLLL").split(' ')[0] + ' ' + moment(data?.createdOn).format("LLLL").split(' ')[1] + ' ' + moment(data?.createdOn).format("LLLL").split(' ')[2] + ' ' + moment(data?.createdOn).format("LLLL").split(' ')[3]}
</Text>
                    <Text style={styles.text}>{data?.narrative} </Text>
                </View>
            </View>
            <View style={[styles.row, { justifyContent: "flex-end" }]}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name="favorite" type="ionicons" size={iconSize} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                navigation.navigate('CreateComment', {
                  comment : data
              }
                );
              }}  style={[styles.iconContainer,{backgroundColor:colors.warning}]}>
                    <Icon name="pencil" type="font-awesome" size={iconSize}  color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconContainer,{backgroundColor:colors.primary}]}>
                    <Icon name="link" type="feather" size={iconSize} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteComments(data._id)} style={styles.iconContainerDelete}>
                    <Image style={{width:"60%",height:'60%'}} resizeMode="cover"  source={require("../../assets/icons/delete.png")}  />
                    {/* <Icon name="reply" type="font-awesome" size={15} style={{marginRight:7}} color={colors.black}/> */}
                    {/* <Text style={[styles.text,{color:"black"}]}>Reply</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() =>
                {

              navigation.navigate('ReplyComment', {
                topicId : data.topicId._id,
                parent : data,
            
            }
              
              );
            }} >
                    <Image style={{width:"100%",height:'100%'}} resizeMode="cover" source={require("../../assets/icons/reply.png")}  />
                    {/* <Icon name="reply" type="font-awesome" size={15} style={{marginRight:7}} color={colors.black}/> */}
                    {/* <Text style={[styles.text,{color:"black"}]}>Reply</Text> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                {

              navigation.navigate('ReplyComment', {
                topicId : data.topicId._id,
                parent : data,
            
            }
              
              );
            }}>
                    <Image style={styles.img} source={require("../../assets/icons/quote.png")} />
                    {/* <Icon name="pencil" type="font-awesome" size={15} style={{marginRight:7}} color={colors.grey4}/> */}
                    {/* <Text style={[styles.text,{color:"black"}]}>Reply</Text> */}
                </TouchableOpacity>
            </View>


        </View>
    )
}
const styles = StyleSheet.create({

    infos: {
       
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },

      textContainer: {
       
        flexDirection: "column",
     marginLeft: 10
      },


    buttonText: {
        flex:1,
        height: 60,
        borderRadius: 100,
        borderWidth: 1,
        width: "100%",
        // fontFamily: "Poppins-Bold"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingHorizontal:7
    },
    circle: {
        height: 50, width: 50, borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15

    },
    text: {
        fontSize: 17,
        fontFamily: "Poppins-Regular",
        color: colors.grey2,
    },
    textUserName: {
        fontSize: 13,
        fontFamily: "Poppins-Regular",
        color: colors.grey2,
    },
    iconContainer: {
        marginHorizontal: 5,
        height:35,
        width:35,
        backgroundColor:colors.error,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    iconContainerDelete: {
        marginHorizontal: 5,
        height:35,
        width:35,
        backgroundColor:"rgba(220,220,220,0.5)",
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    button: {
        backgroundColor: colors.grey5,
        borderRadius: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10

    },
    img:{ height: 35, width: 35, marginLeft: 10 }
})