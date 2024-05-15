import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ChatItem from './ChatItem';

export default function ChatList({ users }) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => item.id || Math.random().toString()} // Use a unique identifier (if available)
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ChatItem image={item.image} text={item.text} />}
      />
    </View>
  );
}
