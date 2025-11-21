import { View, Text, Dimensions, StyleSheet, Button, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  LoginScreen: undefined; 
  LandingPage: { inputCode: string }; 
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

// const childContainerWidth = screenWidth;
const horizontalBoarderHeightTop = screenHeight * .2;


const topChildContainerHeight = screenHeight * .35;
const overviewWidth = screenWidth * .85;
const overviewHeight = topChildContainerHeight * .8;

const doubleButtonChildContainerHeight = screenHeight * .25;
const doubleButtonsWidth = screenWidth * .4;
const doubleButtonsHeight = screenHeight * .225;

const horizontalBoarderHeightBottom = screenHeight * .15;

type LandingPageRouteProp = RouteProp<RootStackParamList, 'LandingPage'>;


const LandingPage = ({ route }: { route: LandingPageRouteProp }) => {
    const { inputCode } = route.params;



    return(
        <View style={Styles.container}>
            <View style={Styles.horizontalBoarderTop}>
                <Text style={Styles.welcomeText}>Welcome</Text>
                <Text style={Styles.userNameText}>{inputCode}</Text>
            </View>

            <View style={Styles.childConatinerTop}>
                <View style={Styles.overviewContainer}></View>

            </View>
            {/* <View style={Styles.middleDividerContainer}>

            </View> */}
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
            <View style={Styles.horizontalBoarderBottom}>

            </View>
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
        backgroundColor: '#ff0000ff',
    },
    welcomeText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: '600',
        textAlign: 'left',
    },
    userNameText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'left',
    },

    childConatinerTop: {
        width: screenWidth,
        height: topChildContainerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff8000ff',
    },

    childConatinerBottom: {
        backgroundColor: '#04ff00ff',
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
        backgroundColor: '#ffffffff',
    },

    horizontalBoarderBottom: {
        height: horizontalBoarderHeightBottom,
        width: screenWidth,
        backgroundColor: '#002affff',
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
})