import React from "react";
import { Modal, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

const FullScreenImageModal = ({ visible, imageUrl, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="closecircle" size={hp(3)} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  closeButton: {
    position: "absolute",
    top: hp(2),
    right: wp(2),
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: hp(1),
    borderRadius: 50,
  },
  image: {
    width: wp(90),
    height: hp(70),
    resizeMode: "contain",
  },
});

export default FullScreenImageModal;