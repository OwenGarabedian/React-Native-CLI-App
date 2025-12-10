import { View, Text, Dimensions, StyleSheet, Button, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import type { RouteProp } from '@react-navigation/native';
import RNFLinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export type RootStackParamList = {
    HomeScreen: undefined;
    LogIn: undefined;
    LoginScreen: undefined;
    DataBase: undefined;
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
const doubleButtonChildContainerHeight = screenHeight * .25;
const doubleButtonsWidth = screenWidth * .4;
const doubleButtonsHeight = screenHeight * .225;
const horizontalBoarderHeightBottom = screenHeight * .10;


type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'LandingPage'>;



const LandingPage = ({ navigation, route }: LandingPageProps) => {

    const { inputName, userId } = route.params;

    const passingUserId = userId;
    const passingUserName = inputName;

    console.log(passingUserId, passingUserName)

    const headerColors = ['#9c55a1ff', '#b255b8ff', '#ac1fb6ff'];
    const topWaveColors = ['#9c55a1ff', '#b255b8ff', '#ac1fb6ff'];

    const bottomColors = ['#a0ace7', '#5f6bbd', '#5e669bff'];
    const bottomWaveColors = ['#a0ace7', '#5f6bbd', '#5e669bff'];


    const handleTextMessages = () => {
        Alert.alert("Sending you to text messages");
        navigation.navigate("TextMessages", { 
            inputCode: passingUserId, 
            inputName: passingUserName, 
        });


    }

    const handleDataBase = () => {
        Alert.alert("Sending you to the data base");
        navigation.navigate("DataBase");
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.horizontalBoarderTop}>
                <RNFLinearGradient
                    colors={headerColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, .5, 1]}
                    useAngle={false}
                    style={Styles.gradientTop}
                >

                    <Text style={Styles.welcomeText}>Welcome</Text>
                    <Text style={Styles.userNameText}>{inputName}</Text>
                </RNFLinearGradient>
            </View>

            <View style={Styles.waveContainer}>

                <Svg
                    height={screenHeight * .40}
                    width={screenWidth}
                    viewBox='0, 0, 1440, 1250'
                >
                    <Defs>
                        <LinearGradient id="topWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor={topWaveColors[0]} />
                            <Stop offset="50%" stopColor={topWaveColors[1]} />
                            <Stop offset="100%" stopColor={topWaveColors[2]} />
                        </LinearGradient>
                    </Defs>

                    <Path
                        fill="url(#topWaveGradient)"
                        d="M0,192L30,170.7C60,149,120,107,180,128C240,149,300,235,360,277.3C420,320,480,320,540,282.7C600,245,660,171,720,160C780,149,840,203,900,192C960,181,1020,107,1080,74.7C1140,43,1200,53,1260,80C1320,107,1380,149,1410,170.7L1440,192L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
                    />
                </Svg>
            </View>


            <View style={Styles.childConatinerTop}>
                <View style={Styles.overviewContainer}></View>
            </View>

            <View style={Styles.childConatinerBottom}>
                <Pressable
                    style={({ pressed }) => pressed ? Styles.dataTableButtonPressed : Styles.dataTableButtonNormal}
                    onPress={handleTextMessages}
                >
                    <Text style={Styles.textMessagesButton}>Text{"\n"}Messages</Text>

                </Pressable>

                <Pressable
                    style={({ pressed }) => pressed ? Styles.dataTableButtonPressed : Styles.dataTableButtonNormal}
                    onPress={handleDataBase}
                >
                    <Text style={Styles.dataTableButtonText}>Caller{"\n"}Logs</Text>

                </Pressable>
            </View>

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
                    style={Styles.gradientTop}
                >
                <View style={Styles.tabChanger}>
                    <Text>HELLO</Text>
                </View>
                </RNFLinearGradient>
            </View>
        </View>
    )
}

export default LandingPage

const Styles = StyleSheet.create({

    container: {
        backgroundColor: '#ffffffff',
        shadowColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabChanger: {
        fontSize: 15,
        zIndex: 1,
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
        shadowColor: 'transparent',
    },
    welcomeText: {
        color: '#fff',
        shadowColor: 'transparent',
        fontSize: 36,
        fontWeight: '600',
        textAlign: 'left',
        zIndex: 2,
        paddingBottom: 10,
    },
    userNameText: {
        color: '#fff',
        shadowColor: 'transparent',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'left',
        zIndex: 2,
        paddingBottom: 10,
    },

    childConatinerTop: {
        width: screenWidth,
        height: topChildContainerHeight,
        shadowColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffff',
    },
    waveContainer: {
        width: screenWidth,
        height: screenHeight * .075,
        shadowColor: 'transparent',
        zIndex: 1,
    },
    childConatinerBottom: {
        backgroundColor: '#ffffffff',
        width: screenWidth,
        height: doubleButtonChildContainerHeight,
        shadowColor: 'transparent',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',

    },
    overviewContainer: {
        height: overviewHeight,
        shadowColor: 'transparent',
        width: overviewWidth,
        borderRadius: 18,
        backgroundColor: '#c9bcbcff',
        zIndex: 0,
    },

    horizontalBoarderBottom: {
        height: horizontalBoarderHeightBottom,
        shadowColor: 'transparent',
        width: screenWidth,
        zIndex: 2,
    },

    dataTableButtonNormal: {
        width: doubleButtonsWidth,
        height: doubleButtonsHeight,



        backgroundColor: '#111111ff',
        borderRadius: 8,
        alignItems: 'center',
        opacity: 1,
        justifyContent: 'center'
    },
    dataTableButtonPressed: {
        width: doubleButtonsWidth,
        height: doubleButtonsHeight,



        backgroundColor: '#111111ff',
        borderRadius: 8,
        alignItems: 'center',
        opacity: .75,
        justifyContent: 'center'
    },
    dataTableButtonText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: '600',
        textAlign: 'center',
    },
    textMessagesButton: {
        color: '#fff',
        fontSize: 34,
        fontWeight: '600',
        textAlign: 'center',
    },
});