/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import Example1Screen from './src/screens/Example1Screen';
import Example2Screen from './src/screens/Example2Screen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            title: 'Animated Examples',
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Example1"
          options={{
            headerShown: false,
          }}
          component={Example1Screen}
        />
        <Stack.Screen
          name="Example2"
          options={{
            headerShown: false,
          }}
          component={Example2Screen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
