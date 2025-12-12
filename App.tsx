import { View, Text } from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LogIn from './screens/LogIn/LogIn';
import LandingPage from './screens/LandingPage'
import DataBase from './screens/DataBase';
import TextMessages from './screens/TextMessages'
import TextMessageRendering from './screens/TextMessagesRendering';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ animation: "none" }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false}} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="LandingPage" component={LandingPage as any} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="DataBase" component={DataBase} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="TextMessages" component={TextMessages as any} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="TextMessageRendering" component={TextMessageRendering as any} options={{ headerShown: false, gestureEnabled: false }} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack/>
      </NavigationContainer>
    </View>
  );
};

export default App;