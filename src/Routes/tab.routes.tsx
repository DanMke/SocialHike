import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Home from '../Pages/Home';
import Start from '../Pages/Start';

export function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Start" component={Start} />
    </Tab.Navigator>
  );
}