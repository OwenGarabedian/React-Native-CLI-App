import { View, Text, Dimensions, StyleSheet, Alert, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const textValue = "Enter Log In Code"

interface UserDataEntry {
    code: string;
    name: string;
    userId: string;
}

const LogIn = ({ navigation }: { navigation: any }) => {
    const [userData, setUserData] = useState<UserDataEntry[]>([]);
    const [inputValue, setInputValue] = useState("");

    const onTextChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setInputValue(numericValue);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/login-data');
            const responseData = response.data;

            if (responseData && responseData.length > 0) {
                const firstObject = responseData[0].users;
                setUserData(firstObject);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to fetch data from the server.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const checkAutoLogin = async () => {
            try {
                const credentials = await Keychain.getGenericPassword();
                if (credentials && userData.length > 0) {
                    const savedUserId = credentials.username;
                    const savedCode = credentials.password;

                    const matchedUser = userData.find(
                        (u) => u.userId === savedUserId && u.code === savedCode
                    );

                    if (matchedUser) {
                        console.log("Auto-login successful for:", matchedUser.name);
                        navigation.navigate("LandingPage", { 
                            inputName: matchedUser.name, 
                            userId: matchedUser.userId 
                        });
                    }
                }
            } catch (error) {
                console.log("Auto-login error:", error);
            }
        };

        if (userData.length > 0) {
            checkAutoLogin();
        }
    }, [userData]);

    const handleLogInPress = async () => {
        let loggedInUser: UserDataEntry | null = null;
        let passedPassword = inputValue.toString();

        for (let i = 0; i < userData.length; i++) {
            if (userData[i].code === passedPassword) {
                loggedInUser = userData[i];
                break;
            }
        }

        if (loggedInUser) {
            try {
                await Keychain.setGenericPassword(
                    loggedInUser.userId, 
                    passedPassword
                );
                
                Alert.alert("Success", "Correct Log In!");
                navigation.navigate("LandingPage", { 
                    inputName: loggedInUser.name, 
                    userId: loggedInUser.userId 
                });
            } catch (error) {
                console.error("Keychain save error:", error);
                navigation.navigate("LandingPage", { 
                    inputName: loggedInUser.name, 
                    userId: loggedInUser.userId 
                });
            }
        } else {
            Alert.alert("Login Failed", "Incorrect Log In Code!");
        }
    };

    return (
        <View style={Styles.container}>
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

export default LogIn;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
        backgroundColor: '#111',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonPressed: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    }
});
