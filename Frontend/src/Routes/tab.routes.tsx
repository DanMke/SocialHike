import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faRoute, faMapLocationDot, faUser, faChartLine } from '@fortawesome/free-solid-svg-icons'

const Tab = createBottomTabNavigator();

import {HomeStack} from './stack.routes'
import {ProfileStack} from './stack.routes'

import Routes from '../Screens/Routes';
import Start from '../Screens/Start';
import Activity from '../Screens/Activity';

export function TabRoutes() {
  return (
    <Tab.Navigator 
      initialRouteName="Home" 
      screenOptions={{
        tabBarActiveBackgroundColor: '#333333',
        tabBarInactiveBackgroundColor: '#333333',
        tabBarActiveTintColor: '#04AA6C',
        tabBarInactiveTintColor: '#E5E5E5',
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {
          backgroundColor: '#333333',
          borderTopColor: '#211F20',
          borderTopWidth: 1,
          height: 90
        }
      }}>
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false, tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faHouse} color={color} size={30} />) }} />
      <Tab.Screen name="Routes" component={Routes} options={{ headerShown: false, tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faMapLocationDot} color={color} size={30} />) }} />
      <Tab.Screen name="Start" component={Start} options={{ headerShown: false, tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faRoute} color={color} size={30} />) }} />
      <Tab.Screen name="Activity" component={Activity} options={{ headerShown: false, tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faChartLine} color={color} size={30} />) }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false, tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faUser} color={color} size={30} />) }} />
    </Tab.Navigator>
  );
}