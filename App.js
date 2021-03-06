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

import './src/animations';
import HomeScreen from './src/screens/HomeScreen';
import Example1Screen from './src/screens/Example1Screen';
import Example2Screen from './src/screens/Example2Screen';
import Example3Screen from './src/screens/Example3Screen';
import Example4Screen from './src/screens/Example4Screen';
import Example5Screen from './src/screens/Example5Screen';

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
        <Stack.Screen
          name="Example3"
          options={{
            headerShown: false,
          }}
          component={Example3Screen}
        />
        <Stack.Screen name="Example4" component={Example4Screen} />
        <Stack.Screen name="Example5" component={Example5Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
