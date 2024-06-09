import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';

export default function MessageItem({ message, currentUser, roomId }) { 

  const handleLongPress = () => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteMessage()
        }
      ],
      { cancelable: true }
    );
  };

  const deleteMessage = async () => {
    try {
      await deleteDoc(doc(db, "rooms", roomId, "messages", message.id));
      Alert.alert("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message: ", error);
      Alert.alert("Failed to delete message");
    }
  };
  const getMessageTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert timestamp to milliseconds
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${dayOfWeek}, ${time}`;
  };

  if (currentUser?.userId === message?.userId) {
    // My message
    return (
        <View className="flex-row justify-end mb-3 mr-3">
          <View style={{ width: wp(80) }}>
            <TouchableOpacity 
              onLongPress={handleLongPress}
            >
             {message?.text && (
              <View className="self-end p-3 rounded-2xl bg-indigo-400 border border-neutral-200">
                <Text style={{ fontSize: hp(2.1), color: 'white' }}>{message.text}</Text>
              </View>
            )}
            {message?.imageUrl && (
              <View className="self-end p-3 rounded-2xl ">
                <Image
                  source={{ uri: message.imageUrl }}
                  style={{ width: 180, height: 180, resizeMode: 'cover', marginTop: 5, borderRadius: 6 }} // Adjust resizeMode and borderRadius as needed
                />
              </View>
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
    // Other user's message
    return ( 
      <View style={{ width: wp(80) }} className="ml-3 mb-3">
        <View className="flex self-start p-3 px-4 rounded-2xl">
        {message?.text && (
              <View className="self-end p-3 rounded-2xl bg-indigo-400 border border-neutral-200">
                <Text style={{ fontSize: hp(2.1), color: 'white' }}>{message.text}</Text>
              </View>
            )}
           {message?.imageUrl && (
              <View className="self-end p-3 rounded-2xl ">
                <Image
                  source={{ uri: message.imageUrl }}
                  style={{ width: 180, height: 180, resizeMode: 'cover', marginTop: 5, borderRadius: 6 }} // Adjust resizeMode and borderRadius as needed
                />
              </View>
            )}
        </View>
      </View>
    );
  }
}
