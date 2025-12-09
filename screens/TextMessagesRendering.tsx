import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Pressable, Alert, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

interface Message {
    sender: string;
    text: string;
    time: string;
}

interface Conversation { 
    userId: string;
    callerId: string;
    callersName: string;
    callersQuery: string;
    callersAdress: string;
    callersApointment: string;
    initialTextSent: string;
    conversationId: string;
    messages: Message[]; 
    messageId: string; 
    lastMessageText?: string; 
}

const TextMessagesScreen = () => {

  return (
        <View style={Styles.container}>
            <Text>
                Render the texts
            </Text>
        </View>
      );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2d2dff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer:{
    width: screenWidth,
    height: screenHeight *.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderLine: {
    width: screenWidth * .96,
    height: 1, 
    backgroundColor: '#7b7b7bff',
    zIndex: 2,
    alignSelf: 'center', 
    opacity: .8,
  },
  titleText: {
    color: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 40,
  },
  itemView: {
    width: screenWidth,
    height: screenHeight * .11,
    justifyContent: 'center',
    backgroundColor: 'rgba(70, 70, 70, 1)',
    gap: 5,
    borderRadius: 3,
    margin: -1,
    zIndex: 1,
  },
  phoneNumber: {
    color: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  textMessage: {
    color: '#b09f9fff',
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textMessageButtonPressed: {

  },
  textMessageButtonNormal: {

  },
});

export default TextMessagesScreen;
