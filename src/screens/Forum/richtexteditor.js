import React, { useRef, useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import HTMLView from "react-native-htmlview";

// Images
import strikethrough from "../../assets/rich_text_editor_images/strikethrough.png";
import image from "../../assets/rich_text_editor_images/image.png";

import * as ImagePicker from "expo-image-picker";

const EditorScreen = () => {
  const RichText = useRef(); // reference to the RichEditor component
  const [article, setArticle] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,  
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
        RichText.current?.insertImage(result.uri)
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Editor</Text>
      <RichEditor
        disabled={false}
        containerStyle={styles.editor}
        ref={RichText}
        style={styles.rich}
        placeholder={"Start Writing Here"}
        onChange={(text) => setArticle(text)}
      />
      <RichToolbar
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={"purple"}
        selectedIconTint={"pink"}
        disabledIconTint={"purple"}
        onPressAddImage={pickImage}
        iconSize={40}
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
      <Text style={styles.text}>Result</Text>
      <HTMLView value={article} stylesheet={styles} />
    </ScrollView>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
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
    marginTop: 40,
    backgroundColor: "#F5FCFF",
  },
  editor: {
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 0,
  },
  rich: {
    height: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10
  },
  tib: {
    textAlign: "center",
    color: "#515156",
    fontSize: 30,
  },
});
