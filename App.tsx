import { View, Text } from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LogIn from './screens/LogIn/LogIn';
import LandingPage from './screens/LandingPage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ animation: "none" }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false}} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false, gestureEnabled: false }} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </View>
  );
};

export default App;