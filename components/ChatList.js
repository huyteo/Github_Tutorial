import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ChatItem from './ChatItem';
import { useRouter } from 'expo-router';

export default function ChatList({ users, currentUser }) {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => item.id || Math.random().toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => 
          <ChatItem
            noBorder={index + 1 === users.length} // Sử dụng index được truyền từ renderItem
            router={router}
            currentUser={currentUser}
            item={item}
            index={index}
          />
        }
      />
    </View>
  );
}
