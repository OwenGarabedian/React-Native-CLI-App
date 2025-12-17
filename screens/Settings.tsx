import { View, Text, Dimensions, StyleSheet, Button, TouchableOpacity, Pressable, Alert, TextInput, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import type { RouteProp } from '@react-navigation/native';
import RNFLinearGradient from 'react-native-linear-gradient'; 
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Home, Settings, MoreHorizontal, MessageSquare, Phone } from 'lucide-react-native';


export type RootStackParamList = {
    HomeScreen: undefined;
    SettingsPage: { inputCode: string, inputName: string };
    ExtraPage: { inputCode: string, inputName: string };
    LogIn: undefined;
    LoginScreen: undefined;
    DataBase: { inputCode: string, inputName: string };
    TextMessages: { inputCode: string, inputName: string }; 
    LandingPage: { inputName: string; userId: string };
    TextMessageRendering: {textIndex: any, passingCode: string};
};


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const horizontalBoarderHeightTop = screenHeight * .175;
const topChildContainerHeight = screenHeight * .35;
const overviewWidth = screenWidth * .85;
const overviewHeight = topChildContainerHeight * .8;
const doubleButtonChildContainerHeight = screenHeight * .23;
const doubleButtonsWidth = screenWidth * .4;
const doubleButtonsHeight = screenHeight * .225;
const horizontalBoarderHeightBottom = screenHeight * .15;


type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'LandingPage'>;



const SettingsPage = ({ navigation, route }: LandingPageProps) => {

    const { inputCode, inputName } = route.params;


    const headerColors = ['#9c55a1', '#b255b8', '#ac1fb6']; // Purple theme
    const topWaveColors = ['#9c55a1', '#b255b8', '#ac1fb6'];

    const bottomColors = ['#a0ace7', '#5f6bbd', '#5e669b']; // Blue theme
    const bottomWaveColors = ['#a0ace7', '#5f6bbd', '#5e669b'];


    const handleTextMessages = () => {

    }

    const handleHomePage = () => {
        navigation.navigate("LandingPage", {
            inputName: inputName,
            userId: inputCode
        });
    }

    const handleExtra = () => {
        navigation.navigate("ExtraPage", {
            inputCode: inputCode,
            inputName: inputName
            });
    }

    const handleDataBase = () => {

        const handleSettingsPress = () => {
        Alert.alert("Settings Clicked!");
    }

    const handleExtraPress = () => {
        Alert.alert("Extra Tab Clicked!");
    }


    }

    return (
        <View style={Styles.container}>
            <View style={Styles.waveContainer}>
                <Svg
                    height={screenHeight * .40}
                    width={screenWidth}
                    viewBox='0, 75, 1440, 1250'
                >

                    <Defs>
                        <LinearGradient id="bottomWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor={bottomWaveColors[0]} />
                            <Stop offset="50%" stopColor={bottomWaveColors[1]} />
                            <Stop offset="100%" stopColor={bottomWaveColors[2]} />
                        </LinearGradient>
                    </Defs>

                    <Path
                        fill="url(#bottomWaveGradient)"
                        d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,229.3C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </Svg>

            </View>

            <View style={Styles.horizontalBoarderBottom}>
                <RNFLinearGradient
                    colors={bottomColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, .5, 1]}
                    useAngle={false}
                    style={Styles.gradientBottom} 
                >
                    <View style={Styles.tabChanger}>
                        <Pressable style={Styles.tabButton}>
                            <Settings color="white" size={24} /> 
                            <Text style={Styles.tabButtonTextInactive}>Settings</Text>
                        </Pressable>

                        <Pressable style={Styles.tabButton} onPress={handleHomePage}>
                            <View style={Styles.homeIconCircle}>
                                <Home color="white" size={30} />
                            </View>
                            <Text style={Styles.tabButtonTextActive}>Home</Text>
                        </Pressable>

                        <Pressable style={Styles.tabButton} >
                            <MoreHorizontal color="white" size={24} onPress={handleExtra}/> 
                            <Text style={Styles.tabButtonTextInactive}>Extra</Text>
                        </Pressable>
                    </View>
                </RNFLinearGradient>
            </View>
        </View>
    )
}

export default SettingsPage

const Styles = StyleSheet.create({

    container: {
        backgroundColor: '#212121', 
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    tabChanger: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70, 

        ...Platform.select({
            ios: {
                shadowColor: '#000000ff',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: .75, 
                shadowRadius: 10,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    homeIconCircle: {
        width: screenWidth * .12,                
        height: screenHeight * .05,             
        borderRadius: 30,   
        marginTop: 30,     
        backgroundColor: '#5f6bbd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        zIndex: 3,
        
    },
    tabButton: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    tabButtonTextActive: {
        color: '#FFFFFF', 
        fontSize: 12,
        marginTop: 4,
        fontWeight: '700',
    },
    tabButtonTextInactive: {
        color: '#e0e0e0',
        fontSize: 12,
        marginTop: 4,
        opacity: 0.7,
    },
    gradientBottom: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start', 
        alignItems: 'center', 
    },
    horizontalBoarderTop: {
        height: horizontalBoarderHeightTop,
        width: screenWidth,
        justifyContent: 'flex-end',
        zIndex: 1,
        marginBottom: -1, 
    },
    gradientTop: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    headerTextContainer: { 
        paddingLeft: 20,
        paddingBottom: 15,
    },
    welcomeText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: '300', 
        textAlign: 'left',
        zIndex: 2,
    },
    userNameText: {
        color: '#fff',
        fontSize: 28, 
        fontWeight: '700',
        textAlign: 'left',
        zIndex: 2,
    },
    childConatinerTop: {
        width: screenWidth,
        height: topChildContainerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212121', // Match dark background
        zIndex: 0,
    },
    waveContainer: {
        width: screenWidth,
        height: screenHeight * .075,
        zIndex: 1,
    },
    childConatinerBottom: {
        backgroundColor: '#212121', // Match dark background
        width: screenWidth,
        height: doubleButtonChildContainerHeight,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 0, 
    },
    overviewContainer: {
        height: overviewHeight,
        width: overviewWidth,
        borderRadius: 15,
        backgroundColor: '#2C2C2C', 
        zIndex: 0,
         ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3, 
                shadowRadius: 15,
            },
            android: {
                elevation: 12,
            },
        }),
        justifyContent: 'center',
        alignItems: 'center',
    },
    overviewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    overviewStat: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8,
        paddingVertical: 2,
    },
    horizontalBoarderBottom: {
        height: horizontalBoarderHeightBottom,
        width: screenWidth,
        zIndex: 2,
        marginTop: -1, 
        justifyContent: 'center',
    },
    actionButton1: { 
        width: doubleButtonsWidth,
        height: doubleButtonsHeight * 0.85, 
        borderRadius: 12, 
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#ac1fb6',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: .75,
                shadowRadius: 8,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    actionButton2: { 
        width: doubleButtonsWidth,
        height: doubleButtonsHeight * 0.85, 
        borderRadius: 12, 
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#5f6bbd',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.75,
                shadowRadius: 8,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    callerNumShadow: {
    ...Platform.select({
        ios: {
            shadowColor: '#ffffffff',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10,
        },
        android: {
        },
    }),
  },
    buttonText: { 
        color: '#fff',
        fontSize: 22, 
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    dataTableButtonPressed: {
        opacity: 0.75, 
    },
    dataTableButtonNormal: {
        opacity: 1,
    },
});
