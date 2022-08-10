import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TabRoutes} from './tab.routes';

const Stack = createNativeStackNavigator();

import Login from '../Pages/Login';
import Register from '../Pages/Register';


export function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='TabRoutes' component={TabRoutes} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
