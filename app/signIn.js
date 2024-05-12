import { View, Text, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';

export default function signIn() {
  return (
    <View className="flex-1">
        <StatusBar style='dark'/>
        <View className="flex-1 gap-12">
          {/* signIn image */}
          
          <View className="items-center">
            <Image style={{height: hp(25)}} resizeMode='contain' source={require('../assets/images/login.png')}/>
          </View>
        </View>
    </View>
  )
}