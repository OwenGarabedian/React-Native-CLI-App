import { View, Text, Dimensions, StyleSheet, Button, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const textValue = "Enter Log In Code"

const LogIn = () => {
    return (
        <View style={Styles.container}>
            <Text>Logged In!</Text>
        </View>
    );
}

export default LogIn

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})