import React from "react";
import { Modal, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const FullScreenImageModal = ({ visible, imageUrl, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          {/* Đây có thể là một biểu tượng X hoặc nút Back */}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: hp(2),
    right: wp(2),
    zIndex: 1,
    // Thiết kế nút đóng modal tại đây
  },
  image: {
    width: wp(100),
    height: hp(100),
    resizeMode: "contain",
  },
});

export default FullScreenImageModal;