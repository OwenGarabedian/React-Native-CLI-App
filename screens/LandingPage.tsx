import { View, Text, Dimensions, StyleSheet, Button, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

// const childContainerWidth = screenWidth;
const horizontalBoarderHeightTop = screenHeight * .2;


const topChildContainerHeight = screenHeight * .35;
const overviewWidth = screenWidth * .85;
const overviewHeight = topChildContainerHeight * .8;

const twoButtonChildContainerHeight = screenHeight * .25;
const bottomButtonsWidth = screenWidth * .4;

const horizontalBoarderHeightBottom = screenHeight * .15;



// const 


const LandingPage = () => {
    return(
        <View style={Styles.container}>
            <View style={Styles.horizontalBoarderTop}></View>

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
        backgroundColor: '#ff0000ff',
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
        height: twoButtonChildContainerHeight,
        justifyContent: 'space-evenly',
        flexDirection: 'row',

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
        width: bottomButtonsWidth,



        backgroundColor: '#111111ff',
        borderRadius: 8,
        alignItems: 'center',
        opacity: 1,
        justifyContent: 'center'
    },
    dataTableButtonPressed: {
        width: bottomButtonsWidth,



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