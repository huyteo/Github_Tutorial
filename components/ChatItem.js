import { Image } from 'expo-image';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { blurhash } from '../utils/common';

export default function ChatItem({ item, router, noBorder }) {


  const openChatRoom = ()=>{
    router.push({pathname: '/chatRoom', params: item});
  }
return (
<TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder? '': 'border-b border-neutral-200'}`}>
{/* <Image
      source={{uri: item?.profileUrl}}
      style={{ height: hp(10), width: hp(10), }}
      className="rounded-full"
/> */}

    <Image 
        style={{height: hp(8), width: hp(8), borderRadius: 100}}
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
        />


  {/* name and lát mesage */}
  <View className="flex-1 gap-1">
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-800">{item?.username}</Text>
      <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Time</Text>
    </View>
    <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Last message</Text>
  </View>
</TouchableOpacity>
);
}