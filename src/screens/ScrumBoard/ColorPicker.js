import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";
import Modal from "react-native-modal";
import { IconButton } from "react-native-paper";

const ColorPicker = ({ visible, setVisible, setColor }) => {
  const hideModal = () => setVisible(false);
  return (
    <Modal isVisible={visible} onModalHide={hideModal} style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text>Select color</Text>
        <IconButton onPress={hideModal} icon="close" />
      </View>
      <TriangleColorPicker
        onColorSelected={(color) => {
          setColor("color", color);
          hideModal();
        }}
        style={{ flex: 1 }}
      />
      <Text
        style={{
          position: "absolute",
          bottom: 50,
          left: 10,
          right: 10,
          width: "100%",
        }}
      >
        Tap below to add new color
      </Text>
    </Modal>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  inputsContainer: {
    marginHorizontal: 10,
    maxHeight: "90%",
  },
});
