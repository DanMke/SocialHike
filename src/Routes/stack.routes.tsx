import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

import Login from '../Pages/Login';

export function StackRoutes() {
  return (
    <Navigator initialRouteName='Login'>
        <Screen name='Login' component={Login} options={{ headerShown: false }} />
    </Navigator>
  );
}
