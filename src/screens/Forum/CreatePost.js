import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Alert,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Form, FormPicker } from "../../components/forms";
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

import { Ionicons } from "@expo/vector-icons";
import { h } from "react-native-responsiveness";
// Images
import strikethrough from "../../assets/rich_text_editor_images/strikethrough.png";
import image from "../../assets/rich_text_editor_images/image.png";

import * as ImagePicker from "expo-image-picker";
import authStorage from "../../auth/storage";
import {addPost} from "../../api/posts";
const Createpost = ({ navigation, route }) => {
  const RichText = useRef(); // reference to the RichEditor component
  const [article, setArticle] = useState("");
  /*
  Change when user type in Title inputfield
  */
  const [topic, setTopic] = useState("")

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      RichText.current?.insertImage(result.uri);
    }
  };

  const submitReply =async () => {
    const currentUser = await authStorage.getCurrentUser()
    if(route.params.post?._id){
      let res =route.params.post
res.narrative=topic
      await addPost(res)
    }
    else{
      const newTopic = {
        narrative: topic,
       status: "active",
       topicId: route.params.topicData._id,
       title: "title",
       user: currentUser._id
       }
       console.log(newTopic)
await addPost(newTopic)       
    }

alert('comment created successfully')

navigation.navigate('TopicDetails', {
  topicData : route.params.topicData,
}
);

  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.TopContainer}>
        <View style={styles.ContainerForPic}>
     
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.TopLeftContianer}
          >
            <Ionicons name={"arrow-back-outline"} color={"#fff"} size={35} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Header */}
      {/* Input Field */}
      <Form
                 initialValues={{
                  title: "",
                  text:  "",
                  country:  ""}}
                 
                 onSubmit={submitReply}
                 enableReinitialize={true}
               >
                <View style={{    flexDirection: "row",
              alignItems:"center",
              justifyContent:"space-between"
}}> 
                <Text style={styles.StyleText} >{route.params.topicData.narrative}</Text> 
                <Image style={{width:20,height:20}} resizeMode="cover" source={require("../../assets/icons/reply.png")}  />

              </View>
       
      {/* Input Field */}
    
      <RichEditor
             initialContentHTML={'<div>'+(route?.params?.post?.narrative || "")+'</div>'}

        disabled={false}
      //  containerStyle={styles.editor}
        ref={RichText}
        initialHeight={500}
        androidHardwareAccelerationDisabled={false}      //  style={styles.rich}
     
        placeholder={route.params.post?.narrative || "Start Writing Here"}
        onChange={(text)=>{
			let a = text.split(">")[1]
			console.log(a)
				
          setTopic(a.split("<")[0])}}
        onFocus={(text) => console.log(text)}

        editorInitializedCallback={() => console.log("text")}
      />
   
      <RichToolbar
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={"#00B7DD"}
        selectedIconTint={"pink"}
        disabledIconTint={"purple"}
        onPressAddImage={pickImage}
        iconSize={40 * 0.75}
        actions={[
          actions.insertImage,
          ...defaultActions,
          actions.setStrikethrough,
          actions.heading1,
        ]}
        // map icons for self made actions
        iconMap={{
          [actions.insertImage]: image,
          [actions.heading1]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
          ),
          [actions.setStrikethrough]: strikethrough,
        }}
        insertImage={pickImage}
      />

<View
                              style={{
                                height: 54,
                                width: "99%",
                                
                              }}
                            >
</View>

      <TouchableOpacity >
      <Pressable style={styles.submitBtn} onPress={submitReply}  >
        <Text style={styles.submitBtnText}>Submit</Text>
      </Pressable>
      </TouchableOpacity>
      </Form>
      
   
    </ScrollView>

  );
};

export default Createpost;

const styles = StyleSheet.create({
  TopContainer: {
    backgroundColor: "#00B7DD",
    width: "100%",
    height: h("8%"),
    alignItems: "center",
  },
  ContainerForPic: {
    width: "100%",
    height: h("6%"),
    flexDirection: "row",
    marginTop: h("1%"),
    paddingLeft: h("2%"),
    paddingRight: h("3%"),
  },
  TopLeftContianer: {
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopMiddleContianer: {
    width: "90%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  TopRightContianer: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imgRenderDesgin: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 110 / 2,
  },
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  /********************************/
  // Input field
  titleInputField: {
    height: 40,
    borderWidth: 0,
    backgroundColor: "#fff",
    fontSize: 18,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.0,
    elevation: 1,
  },
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "monospace",
  },
  p: {
    fontSize: 30,
  },
  /*******************************/
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  editor: {
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 0,
  },
  rich: {
    flex: 1,
    borderWidth: 0,
  },
  richBar: {
    height: 50,
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    color: "#000",
  },
  tib: {
    textAlign: "center",
    color: "#515156",
    fontSize: 30,
  },
  /*******************************/
  // Submit button
  submitBtn: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#00B7DD",
    backgroundColor: "#00B7DD",
    padding: 5,
    width: "20%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "flex-end",
    margin: 10,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
  },
  StyleText: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,

  },
});
