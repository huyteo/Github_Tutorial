import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ChatItem({ item }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image 
        source={require('../assets/images/avatar.png')} 
        style={styles.avatar} 
      />

      {/* name and last message */}
      <View style={styles.detailsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.nameText}>Nomi</Text>
          <Text style={styles.timeText}>Time</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginBottom: hp(4),
    paddingBottom: hp(2),
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  avatar: {
    height: hp(10),
    width: hp(10),
    borderRadius: hp(10),
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: 'gray',
  },
  timeText: {
    fontSize: hp(1.6),
    fontWeight: 'normal',
    color: 'gray',
  },
});