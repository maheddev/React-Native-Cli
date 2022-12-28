/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Login.js';
import Dashboard from './src/Dashboard.js';
import SignUpPage from './src/SignUpPage.js';
import Check from './src/Check.js';
import Maps from './src/Maps';
import {enableLatestRenderer} from 'react-native-maps';
import RegisterVehicle from './src/RegisterVehicle';

const App = () => {
  const Stack = createStackNavigator();
  enableLatestRenderer();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{header: () => null}}
        />

        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Maps"
          component={Maps}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="RegisterVehicle"
          component={RegisterVehicle}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
