import { View, TouchableOpacity, Text } from "react-native";
import React, { memo } from "react";
import Modal from "react-native-modal";
import styles from "./styles";

const DriveModal = ({ children, visible, onRequestClose }) => {
  return (
    <Modal
      animationIn="slideInUp"
      transparent
      isVisible={visible}
      onRequestClose={onRequestClose}
      onBackdropPress={onRequestClose}
      backdropColor="rgba(0,0,0,0.5)"
    >
      {children}
    </Modal>
  );
};

export default memo(DriveModal);
