import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';

export default function MessageItem({ message, currentUser, roomId }) { 


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
