import { View, Text, Dimensions, StyleSheet, Button, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'; 
import type { RouteProp } from '@react-navigation/native';
import RNFLinearGradient from 'react-native-linear-gradient';

export type RootStackParamList = {
  LoginScreen: undefined; 
  LandingPage: { inputCode: string }; 
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

type LandingPageRouteProp = RouteProp<RootStackParamList, 'LandingPage'>;


const LandingPage = ({ route }: { route: LandingPageRouteProp }) => {
    const { inputCode } = route.params;

    const headerColors = ['#8b0894ff', '#974fd1ff', '#cb83fbff'];
    const waveColors = ['#8b0894ff', '#974fd1ff', '#cb83fbff'];


    return(
        <View style={Styles.container}>
            <View style={Styles.horizontalBoarderTop}>
                <RNFLinearGradient 
                colors={headerColors}
                start={{ x: 0, y: 0}}
                end={{ x: 1, y: 1}}
                locations={[0, .5, 1]}
                useAngle={false}
                style={Styles.gradientTop}
                >
                    
                    <Text style={Styles.welcomeText}>Welcome</Text>
                    <Text style={Styles.userNameText}>{inputCode}</Text>
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
                                <Stop offset="0%" stopColor={waveColors[0]} />
                                <Stop offset="50%" stopColor={waveColors[1]} />
                                <Stop offset="100%" stopColor={waveColors[2]} />
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
                >
               <Text style={Styles.dataTableButtonText}>DATA{"\n"}TABLE</Text>
               
                </Pressable>

                <Pressable     
                    style={({ pressed }) => pressed ? Styles.dataTableButtonPressed : Styles.dataTableButtonNormal}
                >
                    <Text style={Styles.dataTableButtonText}>LOG{"\n"}BOOK</Text>
               
                </Pressable>
            </View>
            
            <View style={Styles.waveContainer}>
                <Svg
                    height={screenHeight * .40}
                    width={screenWidth}
                    viewBox='0, 75, 1440, 1250'
                    >

                    <Defs>
                        <LinearGradient id="bottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor="#a0ace7" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#5f6bbd" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Path 
                    fill="url(#bottomGrad)" 
                    d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,229.3C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </Svg>
            </View>
            <View style={Styles.horizontalBoarderBottom}></View>
        </View>
    )
}

export default LandingPage

const Styles = StyleSheet.create({

    container: {
        backgroundColor: '#ffffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    horizontalBoarderTop: {
        height: horizontalBoarderHeightTop,
        width: screenWidth,
        justifyContent: 'flex-end',
        zIndex: 1,
    },
    gradientTop: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    welcomeText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: '600',
        textAlign: 'left',
        zIndex: 2,
    },
    userNameText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'left',
        zIndex: 2,
    },

    childConatinerTop: {
        width: screenWidth,
        height: topChildContainerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffff',
    },
    waveContainer:{
        width: screenWidth,
        height: screenHeight * .075,
        zIndex: 1,
    },
    childConatinerBottom: {
        backgroundColor: '#ffffffff',
        width: screenWidth,
        height: doubleButtonChildContainerHeight,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',

    },
    overviewContainer: {
        height: overviewHeight,
        width: overviewWidth,
        borderRadius: 18,
        backgroundColor: '#c9bcbcff',
        zIndex: 0,
    },

    horizontalBoarderBottom: {
        height: horizontalBoarderHeightBottom,
        width: screenWidth,
        backgroundColor: '#a0ace7ff',
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
    }
});