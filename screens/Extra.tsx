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
    TextMessageRendering: { textIndex: any, passingCode: string };
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const horizontalBoarderHeightTop = screenHeight * .125;
const topChildContainerHeight = screenHeight * .35;
const overviewWidth = screenWidth * .85;
const overviewHeight = topChildContainerHeight * .8;
const doubleButtonChildContainerHeight = screenHeight * .23;
const doubleButtonsWidth = screenWidth * .4;
const doubleButtonsHeight = screenHeight * .225;
const horizontalBoarderHeightBottom = screenHeight * .15;


type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'LandingPage'>;



const ExtraPage = ({ navigation, route }: LandingPageProps) => {

    const { inputCode, inputName } = route.params;


    const headerColors = ['#9c55a1', '#b255b8', '#ac1fb6']; // Purple theme
    const topWaveColors = ['#9c55a1', '#b255b8', '#ac1fb6'];

    const bottomColors = ['#a0ace7', '#5f6bbd', '#5e669b']; // Blue theme
    const bottomWaveColors = ['#a0ace7', '#5f6bbd', '#5e669b'];


    const handleTextMessages = () => {

    }

    const handleSettings = () => {
        navigation.navigate("SettingsPage", {
            inputCode: inputCode,
            inputName: inputName
        });
    }

    const handleHomePage = () => {
        navigation.navigate("LandingPage", {
            inputName: inputName,
            userId: inputCode
        });
    }

    const handleDataBase = () => {
        ;

        const handleSettingsPress = () => {
            Alert.alert("Settings Clicked!");
        }

        const handleExtraPress = () => {
            Alert.alert("Extra Tab Clicked!");
        }


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
                    <View style={Styles.headerTextContainer}> 
                        <Text style={Styles.titleText}>EXTRA FEATURES</Text>
                    </View>
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
            
            <View style={Styles.middleContainer}>

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
                    style={Styles.gradientBottom}
                >

                    <View style={Styles.tabChanger}>

                        <Pressable style={Styles.tabButton} onPress={handleSettings}>
                            <View style={Styles.smallIconCircle}>
                                <Settings color="white" size={24} />
                            </View>

                            <Text style={Styles.tabButtonTextInactive}>Settings</Text>
                        </Pressable>

                        <Pressable style={Styles.tabButton} onPress={handleHomePage}>

                            <View style={Styles.smallIconCircle}>
                                <Home color="white" size={24} />
                            </View>

                            <Text style={Styles.tabButtonTextInactive}>Home</Text>

                        </Pressable>


                        <Pressable style={Styles.tabButton} >
                            <View style={Styles.homeIconCircle}>
                                <MoreHorizontal color="white" size={30} />
                            </View>
                            <Text style={Styles.tabButtonTextActive}>Extra</Text>

                        </Pressable>

                    </View>

                </RNFLinearGradient>

            </View>
            
        </View>
    )
}

export default ExtraPage

const Styles = StyleSheet.create({

container: {
    backgroundColor: '#212121',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
},
middleContainer: {
    height: screenHeight*.63,
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
        backgroundColor: '#6c77bbff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        elevation: 5,
        shadowColor: '#2e2e2eff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        zIndex: 3,
    
    },
    smallIconCircle: {
        width: screenWidth * .10,
        height: screenHeight * .045,
        borderRadius: 30,
        marginTop: 30,
        backgroundColor: '#7f87baff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        elevation: 5,
        shadowColor: '#a8a8a8ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        opacity: .75,
    
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
    alignItems: 'center',
    justifyContent: 'center'
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
    alignSelf: 'flex-end',
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
titleText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 45,
    paddingLeft: 0,
    fontSize: 32,
    alignSelf: 'center',
    marginLeft: -10,
},
});
