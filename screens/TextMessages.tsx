import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Pressable, Alert, ScrollView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
let callerId = "";
// Updated the visual representation of the arrow to a more modern, single character
const backArrow = "←"; 

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
    lastSender?: string; 
}

type TextMessagesProps = NativeStackScreenProps<RootStackParamList, 'TextMessages'>;

const TextMessagesScreen = ({ navigation, route }: TextMessagesProps) => {

    const { inputCode, inputName } = route.params; 

    const [conversations, setConversations] = useState<Conversation[]>([]);

        const handleTextOpen = (index: number) => {
        const buttonIndex = index + 1;
        navigation.navigate("TextMessageRendering", { 
            textIndex: buttonIndex, 
            passingCode: inputCode,
            inputName: inputName,
        });
    }

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
                
                const processedData = responseData.map(conversation => {
                    const messages = conversation.messages;
                    
                    if (messages && messages.length > 0) {
                        const lastMessage = messages[messages.length - 1];
                        return {
                            ...conversation,
                            lastMessageText: lastMessage.text,
                            lastSender: lastMessage.sender
                        };
                    }
                    return {
                        ...conversation,
                        lastMessageText: conversation.initialTextSent,
                        lastSender: 'You'
                    };
                });

                const filteredData = processedData.filter(conversation => {
                    return conversation.userId === inputCode; 
                });
                
                console.log("Filtered conversations:", filteredData);
                
                setConversations(filteredData);

            }

        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to fetch data from the server.");
        };
    }


    useEffect(() => {

        fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
            <><View style={Styles.topContainer}>
      <Pressable onPress={(goBack)} style={Styles.backArrowButton}>
        <Text style={Styles.backArrow}>{backArrow}</Text>
      </Pressable>
      <Text style={Styles.titleText}>INBOX</Text>
    </View><SafeAreaView style={Styles.safeAreaContainer}>
        <ScrollView style={Styles.scrollViewContent}>
          {conversations.map((item, index) => (
            <View key={item.messageId}>
              <Pressable
                onPress={() => handleTextOpen(index)}
                style={({ pressed }) => [Styles.itemView, pressed ? Styles.textMessageButtonPressed : Styles.textMessageButtonNormal
                ]}>

                <Text style={Styles.phoneNumber}>{item.callerId}</Text>

                <View style={Styles.messageSnippetContainer}>
                  {item.lastSender === 'You' && <Text style={Styles.messageSender}>You: </Text>}
                  <Text style={Styles.textMessage} numberOfLines={1}>{item.lastMessageText}</Text>
                </View>

              </Pressable>

              {index < conversations.length - 1 && (
                <View style={Styles.borderLine}></View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView></>
      );
};

const Styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#212121', // Primary very dark background 212121
    },
    scrollViewContent: {
        flex: 1,
    },
    topContainer:{
        width: screenWidth,
        height: screenHeight * .175, // Taller header
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        backgroundColor: '#9c55a1', // Primary purple accent color
        ...Platform.select({ 
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 }, 
                shadowOpacity: 0.4,
                shadowRadius: 5,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    backArrowButton: {
        position: 'absolute',
        left: 20,
        bottom: 15,
    },
    backArrow: {
        fontWeight: 'bold', // Bolder arrow
        fontSize: 30, // Larger arrow symbol
        color: '#FFFFFF' // White arrow on purple background
    },
    borderLine: {
        width: screenWidth * .96, 
        height: 1, 
        backgroundColor: '#7b7b7bff', // The original gray separator color
        alignSelf: 'center', 
        opacity: 0.6,
    },
    titleText: {
        color: '#FFFFFF', // White title text
        fontWeight: '600', 
        paddingTop: 45,
        fontSize: 32, 
    },
    itemView: {
        width: screenWidth,
        height: screenHeight * .1, 
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#2C2C2C', // Slightly lighter gray for item background
    },
    phoneNumber: {
        color: '#e5c8efff', // Use primary purple to highlight the caller
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    messageSnippetContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageSender: {
        color: '#AAAAAA', 
        fontSize: 14,
        fontWeight: 'normal',
    },
    textMessage: {
        color: '#CCCCCC',
        fontSize: 14,
        flexShrink: 1,
        fontWeight: 'normal',
    },
    textMessageButtonPressed: {
        backgroundColor: '#444444', 
    },
    textMessageButtonNormal: {

    },
});

export default TextMessagesScreen;
