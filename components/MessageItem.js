import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';

export default function MessageItem({ message, currentUser, roomId, setSelectedImage }) {
    const handleImagePress = () => {
        console.log("Bấm ảnh!", message.imageUrl); // In ra console khi bấm ảnh
        if (message.imageUrl) {
          setSelectedImage(message.imageUrl);
        }
      };
    const handleLongPress = () => {
        if (currentUser?.userId === message?.userId) {
            Alert.alert(
                "Xóa tin nhắn",
                "Bạn có chắc muốn xóa tin nhắn này?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    {
                        text: "Xóa",
                        onPress: () => deleteMessage()
                    }
                ],
                { cancelable: true }
            );
        } else {
            Alert.alert(
                "Xóa tin nhắn",
                "Bạn có chắc muốn xóa tin nhắn này?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    {
                        text: "Xóa",
                        onPress: () => deleteMessage()
                    }
                ],
                { cancelable: true }
            );
        }
    };

    const deleteMessage = async () => {
        if (!roomId || !message?.id) {
            Alert.alert("Dữ liệu không hợp lệ", "Thiếu ID Phòng hoặc ID Tin nhắn.");
            console.error("ID Phòng:", roomId);
            console.error("ID Tin nhắn:", message?.id);
            return;
        }

        try {
            await deleteDoc(doc(db, "rooms", roomId, "messages", message.id));
        } catch (error) {
            console.error("Lỗi khi xóa tin nhắn: ", error);
            Alert.alert("Xóa tin nhắn thất bại");
        }
    };

    const getMessageTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000); // Chuyển timestamp thành mili giây
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return `${dayOfWeek}, ${time}`;
    };

    if (currentUser?.userId === message?.userId) {
        return (
            <View className="flex-row justify-end mb-3 mr-3">
                <View style={{ width: wp(80) }}>
                    <TouchableOpacity onLongPress={handleLongPress}>
                        {message?.text && (
                            <View className="self-end p-3 rounded-2xl bg-indigo-400 border border-neutral-200">
                                <Text style={{ fontSize: hp(2.1), color: 'white' }}>{message.text}</Text>
                            </View>
                        )}
                        {message?.imageUrl && (
                            <TouchableOpacity onPress={handleImagePress} className="self-end p-3 rounded-2xl">
                                <Image
                                    source={{ uri: message.imageUrl }}
                                    style={{ width: 180, height: 180, resizeMode: 'cover', marginTop: 5, borderRadius: 6 }}
                                />
                            </TouchableOpacity>
                        )}
                        {message?.createAt && (
                            <View style={{ marginTop: hp(1) }}>
                                <Text style={{ fontSize: hp(1.5), color: 'grey', textAlign: 'center' }}>
                                    {getMessageTimestamp(message.createAt)}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style={{ width: wp(80) }} className="ml-3 mb-3">
                <View className="flex self-start p-3 px-4 rounded-2xl">
                    <TouchableOpacity onPress={handleLongPress}>
                        {message?.text && (
                            <View className="self-end p-3 rounded-2xl bg-zinc-200 border border-neutral-200">
                                <Text style={{ fontSize: hp(2.1), color: 'black' }}>{message.text}</Text>
                            </View>
                        )}
                        {message?.imageUrl && (
                            <TouchableOpacity onPress={handleImagePress} className="self-end p-3 rounded-2xl">
                                <Image
                                    source={{ uri: message.imageUrl }}
                                    style={{ width: 180, height: 180, resizeMode: 'cover', marginTop: 5, borderRadius: 6 }}
                                />
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
