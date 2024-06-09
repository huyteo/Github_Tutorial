import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Feather } from '@expo/vector-icons';
import CustomeKeyboardView from '../../components/CustomeKeyboardView';
import { useAuth } from '../context/authContext';
import { getRoomId } from '../../utils/common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, snapshotEqual } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../firebaseConfig' 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { launchImageLibraryAsync } from 'expo-image-picker';


export default function ChatRoom() {
    const item = useLocalSearchParams(); // second user
    const {user} = useAuth(); // logged in user
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false); 

    useEffect(()=>{
      createRoomIfNotExists();

      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy('createAt', 'asc'));

      let unsub = onSnapshot(q, (snapshot)=> {
          let allMessages = snapshot.docs.map(doc=>{
              return doc.data();
          });
          setMessages([...allMessages]);
      });

      const KeyBoardDidShowListener = Keyboard.addListener(
        'keyboardDidShow', updateScrollView
      )

      return ()=>{
        unsub();
        KeyBoardDidShowListener.remove();
      }

    },[]);

    useEffect(()=>{
        updateScrollView();
    },[messages])

    const updateScrollView = ()=>{
      setTimeout(()=>{
          scrollViewRef?.current?.scrollToEnd({animated: true})
      },100)
    } 

    const createRoomIfNotExists = async ()=>{
      // roomId 
      let roomId = getRoomId(user?.userId, item?.userId);
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        createAt: Timestamp.fromDate(new Date())
      });
    }

    const getCurrentDateTime = () => {
      const now = new Date();
      const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      return { dayOfWeek, time };
    };

    const handleSendMessage = async () => {
      let message = textRef.current.trim();
      const hasText = message !== '';
      const hasImage = !!image;
  
      if (!hasImage && !hasText) return;
  
      try {
          let roomId = getRoomId(user?.userId, item?.userId);
          const docRef = doc(db, 'rooms', roomId);
          const messagesRef = collection(docRef, "messages");
          textRef.current = "";
          if (inputRef) inputRef?.current?.clear();
  
          const { dayOfWeek, time } = getCurrentDateTime(); // Lấy thời gian và ngày hiện tại
  
          let newMessageData = {
              userId: user?.userId,
              profileUrl: user?.profileUrl,
              senderName: user?.username,
              createAt: Timestamp.fromDate(new Date()),
              dayOfWeek, // Thêm thông tin ngày vào dữ liệu tin nhắn mới
              time // Thêm thông tin thời gian vào dữ liệu tin nhắn mới
          };
          
  
          if (hasImage) {
              setUploading(true);
              const response = await fetch(image.uri); // Lấy dữ liệu từ URI ảnh
              const blob = await response.blob(); // Chuyển đổi dữ liệu thành blob
              const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1); // Lấy tên file ảnh
              const storage = getStorage();
              const storageRef = ref(storage, filename);

              try {
                  await uploadBytes(storageRef, blob); // Tải ảnh lên Firebase Storage
                  const downloadURL = await getDownloadURL(storageRef); // Lấy URL tải xuống
                  newMessageData.imageUrl = downloadURL; // Thêm URL ảnh vào dữ liệu tin nhắn
              } catch (e) {
                  console.log("Error uploading image:", e);
              } finally {
                  setUploading(false);
                  setImage(null); 
              }
          }
  
          if (hasText) {
              newMessageData.text = message; 
          }
  
          const newDoc = await addDoc(messagesRef, newMessageData);
  
      } catch (err) {
          Alert.alert('Message', err.message);
      }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
  
    // Kiểm tra xem người dùng đã chọn ảnh hay chưa
    if (!result.canceled) { 
      const source = { uri: result.assets[0].uri }; 
      setImage(source); // Cập nhật trạng thái image
    }
  };


  return (
    <CustomeKeyboardView inChat={true}>
        <View className="flex-1 bg-white">
            <StatusBar style='dark'/>
            <ChatRoomHeader user={item} router={router}/>
            <View className="h-3 border-b border-neutral-300"/>
            <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
              <View className="flex-1">
                  <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
              </View>
              <View style={{marginBottom: hp(1.7)}} className="pt-2">
                  <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5" >
                      <TextInput
                        ref={inputRef}
                        onChangeText={value=> textRef.current = value} 
                        placeholder='Type message...'
                        style={{fontSize: hp(2)}}
                        className="flex-1 mr-2"
                        />
                         <TouchableOpacity onPress={pickImage} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                            <AntDesign name='link' size={hp(2.7)} color={'#3399FF'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full" >
                            <Feather name='send' size={hp(2.7)} color={'#6699FF'} />
                        </TouchableOpacity>
                  </View>
              </View>
            </View>
        </View>
    </CustomeKeyboardView>
  )
}

