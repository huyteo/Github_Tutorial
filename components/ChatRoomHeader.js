import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';


export default function ChatRoomHeader({user, router}) {
  return (
    <Stack.Screen
    options={{
      title: '',
      headerShadowVisible: false,
      headerLeft: () => {
        return (
            <View className="flex-row items-center gap-4">
                <TouchableOpacity onPress={()=> router.back()}>
                    <Entypo name='chevron-left' size={hp(4)} color="#3399FF" />
                </TouchableOpacity>
                <View className="flex-row items-center gap-3">
                    <Image
                        source={user?.profileUrl}
                        style={{height: hp(4), aspectRatio: 1, borderRadius: 100}}
                />
                <Text style={{ fontSize: hp(2.4), color: '#737373', fontWeight: 'bold' }}>
                    {user?.username}
                </Text>
                </View>
            </View>
        );
      },
      headerRight: () => {
        return (
            <View className="flex-row items-center gap-8">
                <Ionicons name='call' size={hp(3)} color={'#6699FF'} />
                <FontAwesome5 name='video' size={hp(3)} color={'#6699FF'} />
            </View>
        );
      }
    }}
  />
  )
}
