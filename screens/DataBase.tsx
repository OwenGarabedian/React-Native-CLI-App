import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Pressable, Alert, ScrollView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const backArrow = "←"; 
let callersNum = 0;

const topChildContainerHeight = screenHeight * .35;
const doubleButtonsHeight = screenHeight * .225;

export type RootStackParamList = {
  HomeScreen: undefined;
  LogIn: undefined;
  LoginScreen: undefined;
  DataBase: { inputCode: string, inputName: string };
  TextMessages: { inputCode: string, inputName: string };
  LandingPage: { inputName: string; userId: string };
  TextMessageRendering: { textIndex: any, passingCode: string, inputName: string };
};

interface DateObject {
    date: string;
}

interface callerLog {
    id: String,
    userId: String,
    from: String,
    date: String,
    success: Boolean,
    routeTo: String,
    action: String,
}

type DataBaseProps = NativeStackScreenProps<RootStackParamList, 'DataBase'>;

const DataBaseScreen = ({ navigation, route }: DataBaseProps) => {

  const { inputCode, inputName } = route.params;

  const [callerLog, setCallerLog] = useState<callerLog[]>([]);
  const [dates, setDates] = useState<DateObject[]>([]); 
  const [callerNum, setCallerNum] = useState(0);

  const goBack = () => {
    navigation.navigate("LandingPage", {
      inputName: inputName,
      userId: inputCode
    });
  }

  console.log("the userId is:", inputCode);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/callerLog');
      const responseData: callerLog[] = response.data;

        if (responseData && responseData.length > 0) {
                

        const filteredData = responseData.filter(callerLog => {
            return callerLog.userId === inputCode; 
              });
              
              console.log("Filtered conversations:", filteredData);
              
              setCallerLog(filteredData);

              const extractedDates: DateObject[] = [];

              for(let i = 0; i < filteredData.length; i++){
                const oldDate = filteredData[i].date;
                const newDateString = oldDate.slice(0, 10);
                extractedDates.push({ date: newDateString });
              }

              setDates(extractedDates);
            }

      console.log(dates);
      setCallerNum(responseData.length);
    } catch {
      console.log("failed.");
    }
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
    <View style={Styles.container}>

      <View style={Styles.topContainer}>
            <Pressable onPress={(goBack)} style={Styles.backArrowButton}>
              <Text style={Styles.backArrow}>{backArrow}</Text>
            </Pressable>
          <View style={Styles.titleTextWrapper}>
            <Text style={Styles.titleText}>CALLER LOGS</Text>
          </View>
      </View>
      
      <ScrollView>
        <View style={Styles.middleContainer}>

            <View style={Styles.callsThisWeekContainer}>
              <Text style={[Styles.callerNum, Styles.callerNumShadow]}>{callerNum}</Text> 
              <Text style={Styles.callerNumDef}>Total Callers</Text>
            </View>

            <View style={Styles.notCallsThisWeekContainer}></View>
          </View>

        <View style={Styles.callerLogContainer}>
          <ScrollView>
            {callerLog.map((item, index) => (
              <View style={Styles.itemView}>
                  <Text style={Styles.phoneNumber}>{item.from}</Text>
  
                  <View>
                    <Text style={Styles.textMessage} numberOfLines={1}>{dates[index].date}</Text>
                  </View>
  
                {index < callerLog.length - 1 && (
                  <View style={Styles.borderLine}></View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        </ScrollView>

      </View>

  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333', // Darker background for contrast
  },
    childConatinerTop: {
    width: screenWidth,
    height: topChildContainerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  callsThisWeekContainer: {
    width: screenWidth * .4,
    height: doubleButtonsHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444444', 
    borderRadius: 20,
    ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        android: {
            elevation: 8,
        },
    }),
  },
  notCallsThisWeekContainer: {
    width: screenWidth * .4,
    height: doubleButtonsHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444444', 
    borderRadius: 20,
    ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        android: {
            elevation: 8,
        },
    }),
  },
  callerLogContainer: {
    alignSelf: 'center',
    width: screenWidth * .9,
    height: screenHeight * .7,
    alignItems: 'center',
    backgroundColor: '#444444', 
    borderRadius: 20,
    ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        android: {
            elevation: 8,
        },
    }),
  },
  topContainer:{
          width: screenWidth,
          height: screenHeight * .175,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 15,
          backgroundColor: '#5f6bbd',
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
  middleContainer: {
    backgroundColor: '#333333',
    width: screenWidth,
    height: screenHeight * .3,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  callerNum: {
    color: '#007AFF', 
    fontWeight: '900', 
    fontSize: 80,
    textAlign: 'center',
  },
  callerNumShadow: {
    ...Platform.select({
        ios: {
            shadowColor: '#007AFF',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 10,
        },
        android: {
        },
    }),
  },
  callerNumDef: {
    color: '#E0E0E0', 
    fontWeight: '600',
    fontSize: 16,
    marginTop: 5,
  },
  backArrowButton: {
        position: 'absolute',
        left: 20,
        bottom: 15,
    },
  backArrow: {
        fontWeight: 'bold', 
        fontSize: 30, 
        color: '#FFFFFF' 
    },
  titleTextWrapper: {
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 45,
    paddingLeft: 0,
    fontSize: 32,
  },
  itemView: {
    width: screenWidth * .85,
    height: screenHeight * .1,
    justifyContent: 'flex-start',
    borderRadius: 20,
    gap: 5,
    margin: -1,
    zIndex: 1,
  },
  phoneNumber: {
    color: '#fff',
    paddingTop: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  textMessage: {
    color: '#b09f9fff',
    paddingLeft: 15,
    padding: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  borderLine: {
        width: screenWidth * .86, 
        height: 1, 
        backgroundColor: '#7b7b7bff', 
        alignSelf: 'center', 
        opacity: 0.6,
    },
});

export default DataBaseScreen;
