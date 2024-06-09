import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import MessageItem from './MessageItem';

export default function MessageList({ messages, scrollViewRef, currentUser, roomId, setSelectedImage }) {
    return (
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>
            {
                messages.map((message, index) => {
                    return (
                        <MessageItem setSelectedImage={setSelectedImage} message={message} key={index} currentUser={currentUser} roomId={roomId} />
                    );
                })
            }
        </ScrollView>
    );
}
