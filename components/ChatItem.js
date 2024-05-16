import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ChatItem({ item, router, noBorder }) {
return (
<TouchableOpacity className="flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 border-b border-neutral-200">
<Image
source={require('../assets/images/avatar.png')}
style={{ height: hp(10), width: hp(10), borderRadius: hp(10) }}
/>


  {/* name and lát mesage */}
  <View className="flex-1 gap-1">
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-800">Nomi</Text>
      <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Time</Text>
    </View>
    <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Last message</Text>
  </View>
</TouchableOpacity>
);
}