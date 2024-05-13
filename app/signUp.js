import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import Loading from '../components/Loading';
import CustomeKeyboardView from '../components/CustomeKeyboardView';

export default function signUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async()=>{
      if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
        Alert.alert('Sign Up', "Please fill all the field!");
        return;
      }

      // register process
  }
  return (
    <CustomeKeyboardView>
        <StatusBar style='dark'/>
        <View style={{paddingTop: hp(7), paddingHorizontal: wp(5)}} className="flex-1 gap-12">
          {/* signUp image */}
          
          <View className="items-center">
            <Image style={{height: hp(20)}} resizeMode='contain' source={require('../assets/images/register.png')}/>
          </View>


          <View className="gap-10">
              <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-800">Sign Up</Text>
              {/* input */}
              <View className="gap-4">
                  <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                    <Feather name='user' size={hp(2.7)} color="gray"/>
                    <TextInput
                        onChangeText={value=> usernameRef.current=value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder='Username'
                        placeholderTextColor={'gray'}
                    />
                  </View>
                  <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                    <Octicons name='mail' size={hp(2.7)} color="gray"/>
                    <TextInput
                        onChangeText={value=> emailRef.current=value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder='Email address'
                        placeholderTextColor={'gray'}
                    />
                  </View>
                  <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                        <Octicons name='lock' size={hp(2.7)} color="gray"/>
                        <TextInput
                            onChangeText={value=> passwordRef.current=value}
                            style={{fontSize: hp(2)}}
                            className="flex-1 font-semibold text-neutral-700"
                            secureTextEntry
                            placeholder='Password'
                            placeholderTextColor={'gray'}
                        />
                      </View>
                  <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                    <Feather name='image' size={hp(2.7)} color="gray"/>
                    <TextInput
                        onChangeText={value=> profileRef.current=value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder='Profile url'
                        placeholderTextColor={'gray'}
                    />
                  </View>
                      
                      

                  {/* submit button */}

                  <View>
                    {
                      loading? (
                        <View className="flex-row justify-center">
                          <Loading size={hp(8)}/>
                        </View>
                      ):(
                        <TouchableOpacity onPress={handleRegister} style={{backgroundColor: '#3333FF', borderRadius: 10, justifyContent: 'center', alignItems: 'center', height: hp(6.5)}} >
                            <Text style={{fontSize: hp(2.7)}} className="text-white font-bold tracking-wider">
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                      )
                    }
                  </View>

                  
         
                  {/* sign up text */}

                  <View className="flex-row justify-center">
                      <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Already have an account?</Text> 
                      <Pressable onPress={()=> router.push('signIn')}>
                          <Text style={{fontSize: hp(1.8)}} className="font-bold text-indigo-500">Sign In</Text> 
                      </Pressable>
                  </View>

              </View>
              
          </View>
        </View>
      </CustomeKeyboardView>
  )
}