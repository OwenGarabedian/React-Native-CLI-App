import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Pressable, Alert, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
let callerId = "";
const backArrow = "<";

export type RootStackParamList = {
    HomeScreen: undefined;
    LogIn: undefined;
    LoginScreen: undefined;
    DataBase: undefined;
    TextMessages: { inputCode: string, inputName: string }; 
    LandingPage: { inputName: string; userId: string };
    TextMessageRendering: {textIndex: any, passingCode: string, inputName: string};
};


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

type TextMessagesProps = NativeStackScreenProps<RootStackParamList, 'TextMessages'>;

const DataBaseScreen = ({ navigation, route }: TextMessagesProps) => {

    const { inputCode, inputName } = route.params; 

    const [conversations, setConversations] = useState<Conversation[]>([]);

    const goBack = () => {
    navigation.navigate("LandingPage", { 
    inputName: inputName,
    userId: inputCode
        });
  }

    console.log("the userId is:", inputCode);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/userConversations'); 
            const responseData: Conversation[] = response.data; // Type assertion

            if (responseData && responseData.length > 0) {
                
                // Process the data to add the 'lastMessageText' property
                const processedData = responseData.map(conversation => {
                    const messages = conversation.messages;
                    
                    // Check if there are messages in the conversation
                    if (messages && messages.length > 0) {
                        // Get the text from the very last message in the array
                        const lastMessage = messages[messages.length - 1];
                        return {
                            ...conversation,
                            lastMessageText: lastMessage.text
                        };
                    }
                    // If no messages array exists or it's empty, fall back to initialTextSent
                    return {
                        ...conversation,
                        lastMessageText: conversation.initialTextSent
                    };
                });

                const filteredData = processedData.filter(conversation => {
                    return conversation.userId === inputCode; 
                });
                
                console.log("Filtered conversations:", filteredData);
                
                // Set the state with the filtered array
                setConversations(filteredData);

            }

        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to fetch data from the server.");
        };
    }


    useEffect(() => {

        fetchData();

    // Set up an interval to update the state every 1000 milliseconds (1 second)
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
        <View>
            <Text>
                DUDE
            </Text>
        </View>
      );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2d2dff',
  },
  topContainer:{
    width: screenWidth,
    height: screenHeight *.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    alignSelf: 'flex-start',
    paddingRight: 320,
    marginTop: -50,
    fontWeight: 'bold',
    fontSize: 36,
    color: '#ffffffff'
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
    justifyContent: 'flex-start',
    paddingTop: 4,
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

export default DataBaseScreen;
