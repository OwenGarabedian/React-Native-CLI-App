import React, { useRef } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, Dimensions, Pressable, 
    Alert, ScrollView, TextInput, NativeSyntheticEvent, TextInputContentSizeChangeEventData 
} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const messageWidth = 40;
let bubbleHieght = 38;
let messageLines = 0;

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

export type RootStackParamList = {
    HomeScreen: undefined;
    LogIn: undefined;
    LoginScreen: undefined;
    DataBase: undefined;
    TextMessages: { inputCode: string, inputName: string }; 
    LandingPage: { inputName: string; userId: string };
    TextMessageRendering: {textIndex: any, passingCode: string};
};


type TextMessageRenderingProps = NativeStackScreenProps<RootStackParamList, 'TextMessageRendering'>;

const TextMessagesRendering = ({ navigation, route }: TextMessageRenderingProps) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const { textIndex, passingCode } = route.params; 
    const [phoneNumber, setPhoneNumber] = useState("");
    const textIndexNum = textIndex.toString();



    const scrollViewRef = useRef<ScrollView>(null);
    const [inputMessage, setInputMessage] = useState(""); 

    const handleTextChange = (text: string) => {
      const textLength = text.length;
      const lastLength = inputMessage.length;

      if (textLength > lastLength) {
        const remainder = Math.floor(textLength % messageWidth);
        console.log(textLength);
        if(remainder == 0) {
          console.log("it should be next line!");
          bubbleHieght = bubbleHieght + 30;
          messageLines++;
        }
      }
      if (textLength < lastLength) {
        const remainder = Math.floor(textLength % messageWidth);
        console.log(textLength);
        if(remainder == 39 && messageLines > 0) {
          console.log("it should be del line!");
          bubbleHieght = bubbleHieght - 30;
          messageLines--;
        }
      }
      // if (textLength % messageWidth > messageLines) {
      //   console.log("it should be next line!");
      //   bubbleHieght = bubbleHieght + 40;
      //   return bubbleHieght;
      // }
      setInputMessage(text);
    }

    // const handleContentSizeChange = (text: string) => {
    //   const newtext = text
    //   setInputMessage("", newtext);
    // }

    useEffect(() => {
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/userConversations'); 
            const responseData: Conversation[] = response.data; // Type assertion

                const filteredByUser = responseData.filter(conversation => {
                return conversation.userId === passingCode; 
            });

                const targetConversation = filteredByUser.find(conversation => {
                return conversation.messageId === textIndexNum; 
            });

              if (targetConversation && targetConversation.messages) {
              // Set the state with the exact 'messages' array from that object
              setPhoneNumber(targetConversation.callerId); 
              setMessages(targetConversation.messages);
              console.log("Messages set:", targetConversation.messages);

            } else {
              console.log("No matching conversation or messages found.");
              setMessages([]); // Ensure state is cleared if nothing is found
            }

          } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to fetch data from the server.");
        }
    };

    useEffect(() => {
            fetchData();
        }, []);

//item.type === 'primary' ? styles.primaryItem : styles.secondaryItem (this is what it looks like for different)

  return (
    <View style={Styles.container}>
        <View style={Styles.nameBar}>
          <Text style={Styles.titleText}>{phoneNumber}</Text>
        </View>
          <ScrollView>
            <View>
              {messages.map((item, index) => (
                <View style={item.sender === 'AI' ? Styles.AItextBubble : Styles.humanTextBubble}> 
                  <Text style={Styles.bubbleText}>
                    {messages[index].text}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <TextInput 
          multiline={true}
          // onContentSizeChange={handleContentSizeChange}
          onChangeText={handleTextChange}
          placeholder="Type here..."
          style={[Styles.sendMessageBubble, { height: bubbleHieght }]}
          >
          </TextInput>
    </View>
      );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2d2dff',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  nameBar:{
    width: screenWidth,
    height: screenHeight * .15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b3b3bff',
    zIndex: 3,
    opacity: .6
  },
  borderLine: {
    width: screenWidth * .96,
    height: 1, 
    backgroundColor: '#7b7b7bff',
    zIndex: 2,
    alignSelf: 'center', 
  },
  titleText: {
    color: '#fff',
    paddingTop: 40,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 40,
  },
  AItextBubble: {
    width: screenWidth * .6,
    // height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(65, 130, 210, 1)',
    borderRadius: 12,
    zIndex: 1,
    margin: 10,
    padding: 7,
    alignSelf: 'flex-end'
  },
  humanTextBubble: {
    width: screenWidth * .6,
    // height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(70, 70, 70, 1)',
    borderRadius: 12,
    zIndex: 1,
    margin: 10,
    padding: 7,
  },
  sendMessageBubble: {
    width: screenWidth * .85,
    backgroundColor: '#2d2d2dff',
    borderColor: '#929292ff',
    borderWidth: 2,
    marginBottom: 25,
    borderRadius: 25,
    alignSelf: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 7,
    paddingBottom: 10,
    fontSize: 18,
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
  bubbleText: {
    color: '#e5e5e5ff',
    fontSize: 18,
    padding: 5,
    textAlign: 'left',
  },
});

export default TextMessagesRendering;
