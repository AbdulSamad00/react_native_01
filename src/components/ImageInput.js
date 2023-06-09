import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
//import { Camera } from 'expo-camera';

import colors from "./../config/colors";

function ImageInput({ imageUri, onChangeImage }) {
 
    useEffect(() => {
         requestPermission();
      }, []);

    const requestPermission = async ()=>{
        //await Permissions.askAsync(Permissions.MEDIA_LIBRARY,Permissions.LOCATION);
         const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
         if(!granted) 
           alert("you need to enable permission to access the library");

           //const {status} = await Camera.requestCameraPermissionsAsync();
          
       }

    const handlePress = () => {
        if (!imageUri) selectImage();
        else
          Alert.alert("Delete", "Are you sure you want to delete this image?", [
            { text: "Yes", onPress: () => onChangeImage(null) },
            { text: "No" },
          ]);
      };

      const selectImage = async ()=>{
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                //presentationStyle: "Automatic",
                allowsEditing: true,
                aspect: [4, 3],
              });
          if(!result.cancelled)
          onChangeImage(result.uri);
        } catch (error) {
          console.log("Error during reading Image Library",error);
        }
       }  
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.GREY.Trolley_Grey}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.GREY.whiteish,
    borderRadius: 15,
    height: 100,
    width: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;