import {StyleSheet, TouchableOpacity, Text, Modal} from "react-native";

import ImageViewer from "react-native-image-zoom-viewer";
import apiClient from "../../../api/client";


//can check for the different file types here and show accordingly, currently it assumes every file is an image file
export default function FileView({selectedFile, modalVisible, setModalVisible}) {
  
  const filePath = apiClient.getBaseURL() + selectedFile?.path;

  return (
    <Modal visible={modalVisible} transparent={true}>
      <ImageViewer imageUrls={[{url: filePath}]}/>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
        <Text>Close</Text>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    paddingTop: 40,
    paddingRight: 10,
    right: 0,
    color: "white",
  },
});
