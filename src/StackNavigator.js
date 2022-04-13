import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import MainScreen from './components/MainScreen/MainScreen';
const Stack=createNativeStackNavigator();
const StackNavigator = () => {
    return (
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
      <Stack.Screen name="MainScreen" component={MainScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
      
      );

      
    }

    export default StackNavigator;