import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TabRoutes} from './tab.routes';

const Stack = createNativeStackNavigator();

import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import FeedDetails from '../Pages/FeedDetails';
import Profile from '../Pages/Profile';
import Notifications from '../Pages/Notifications';
import Social from '../Pages/Social';

export function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='TabRoutes' component={TabRoutes} options={{ headerShown: false }} />
        <Stack.Screen name='HomeTab' component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export function HomeStack() {
  return (
    <Stack.Navigator initialRouteName='HomeStack'>
        <Stack.Screen name='HomeStack' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='FeedDetails' component={FeedDetails} options={{ headerShown: false }} />
        <Stack.Screen name='Notifications' component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name='Social' component={Social} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName='ProfileStack'>
        <Stack.Screen name='ProfileStack' component={Profile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
