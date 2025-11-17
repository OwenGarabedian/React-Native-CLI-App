import { View, Text, Dimensions, StyleSheet, Button, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const textValue = "Enter Log In Code"

const LogIn = ({navigation}:{navigation:any}) => {

    const [passwords, setPassword] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    

    const onTextChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setInputValue(numericValue);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/login-data'); 
            // The response.data should have the structure { data: [...] }
            const responseData = response.data

            if (responseData && responseData.length > 0) {
                const firstObject = responseData[0];

                const passwords = firstObject.codes;
                console.log("passwords are being set to: ", passwords);
                setPassword(passwords);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to fetch data from the server.");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleLogInPress = () => {

        let loggedIn = false;
        let passedPassword = inputValue.toString();
        console.log("after button pressed", passwords);

        console.log(passedPassword);
        for(let i = 0; i < passwords.length; i++){
            console.log(passwords[i]);
            if (passwords[i] == passedPassword) {
                console.log(passwords[i]);
                loggedIn = true
            }
        }
        if (loggedIn) {
            Alert.alert("Button Pressed!", "Correct Log In!");
            navigation.navigate("LandingPage");
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