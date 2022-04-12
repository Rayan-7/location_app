import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
const Stack=createNativeStackNavigator();
const StackNavigator = () => {
    return (
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
    </NavigationContainer>
      
      );

      
    }

    export default StackNavigator;