import { View, Text, Dimensions, StyleSheet, Button, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { DATA } from './data';

const textValue = "Enter Log In Code"

const LogIn = () => {
 
    const [inputValue, setInputValue] = useState("");
    

    const onTextChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setInputValue(numericValue);
    };

    const handleLogInPress = () => {
        let loggedIn = false;

        for(let i = 0; i < DATA.length; i++){
            if (DATA[i] == inputValue) {
                loggedIn = true
            }
        }
        if (loggedIn) {
            Alert.alert("Button Pressed!", "Correct Log In!");
        }
        else {
            Alert.alert("Button Pressed!", "Incorrect Log In!");
        }
    }


        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    editable
                    maxLength={3}
                    placeholder={textValue}
                    style={Styles.TextInput}
                    keyboardType='numeric'
                    onChangeText={onTextChange}
                    value={inputValue}
            />

                <Pressable
                    onPress={handleLogInPress}
                    style={({ pressed }) => pressed ? Styles.buttonPressed : Styles.buttonNormal}
                >
                    <Text style={Styles.buttonText}>Log In</Text>
                </Pressable>
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
    TextInput: {
        width: 200,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        margin: 8,
        borderRadius: 8,
        fontSize: 16,
        textAlign: 'center',
    },
        buttonNormal: {
        backgroundColor: '#111111ff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        opacity: .9,
    },
        buttonPressed: {
        backgroundColor: '#000000ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        opacity: 0.7,
    },
        buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    }
})