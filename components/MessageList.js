import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MessageList = ({ scrollViewRef, messages, currentUser }) => {
    return (
        <ScrollView ref={scrollViewRef}>
            {messages.map((message, index) => (
                <View key={index} style={{ marginVertical: hp(1), paddingHorizontal: wp(3), alignItems: 'center' }}>
                    <Text style={{ fontSize: hp(1.5), color: 'grey', textAlign: 'center' }}>
                        {message.dayOfWeek}, {message.time}
                    </Text>
                    <View style={[
                        styles.messageContainer,
                        message.userId === currentUser.userId ? styles.currentUserMessage : styles.otherUserMessage,
                        message.imageUrl ? styles.imageMessageContainer : null // Không có nền cho tin nhắn hình ảnh
                    ]}>
                        {message.imageUrl && (
                            <Image source={{ uri: message.imageUrl }} style={styles.image} />
                        )}
                        {message.text && (
                            <Text style={styles.messageText}>{message.text}</Text>
                        )}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = {
    messageContainer: {
        borderRadius: 22,
        padding: wp(2.8),
        marginVertical: hp(0.5),
        maxWidth: '80%'
    },
    currentUserMessage: {
        backgroundColor: '#6699FF',
        alignSelf: 'flex-end',
    },
    otherUserMessage: {
        backgroundColor: '#6699FF',
        alignSelf: 'flex-start',
    },
    imageMessageContainer: {
        backgroundColor: 'transparent', // Không có nền cho tin nhắn hình ảnh
        padding: 0, // Không có padding cho tin nhắn hình ảnh
        marginVertical: 0 // Điều chỉnh margin cho tin nhắn hình ảnh nếu cần
    },
    image: {
        width: wp(50),
        height: hp(25),
        borderRadius: 10
    },
    messageText: {
        fontSize: hp(2),
        color: 'white' // Đổi màu chữ thành màu trắng
    }
};

export default MessageList;
