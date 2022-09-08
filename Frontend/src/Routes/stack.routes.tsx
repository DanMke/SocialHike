import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TabRoutes} from './tab.routes';

const Stack = createNativeStackNavigator();

import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Notifications from '../Screens/Notifications';
import Social from '../Screens/Social';
import Followers from '../Screens/Followers';
import Following from '../Screens/Following';
import EditProfile from '../Screens/EditProfile';
import Activity from '../Screens/Activity';
import ActivityDetails from '../Screens/ActivityDetails';
import StartActivityDetails from '../Screens/StartActivityDetails';
import Start from '../Screens/Start';
import FeedProfile from '../Screens/FeedProfile';
import ActivityDetailsFeed from '../Screens/ActivityDetailsFeed';

import auth from '@react-native-firebase/auth';

export function StackRoutes() {

  const user = auth().currentUser;
  var initialRoute = 'Login';
  if (user && user.email) {
    initialRoute = 'TabRoutes';
  }
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='TabRoutes' component={TabRoutes} options={{ headerShown: false }} />
        {/* <Stack.Screen name='HomeTab' component={Home} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );

}

export function HomeStack() {
  return (
    <Stack.Navigator initialRouteName='HomeStack'>
        <Stack.Screen name='HomeStack' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='ActivityDetailsFeed' component={ActivityDetailsFeed} options={{ headerShown: false }} />
        <Stack.Screen name='Notifications' component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name='Social' component={Social} options={{ headerShown: false }} />
        <Stack.Screen name='FeedProfile' component={FeedProfile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName='ProfileStack'>
        <Stack.Screen name='ProfileStack' component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name='Followers' component={Followers} options={{ headerShown: false }} />
        <Stack.Screen name='Following' component={Following} options={{ headerShown: false }} />
        <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export function ActivityStack() {
  return (
    <Stack.Navigator initialRouteName='ActivityStack'>
        <Stack.Screen name='ActivityStack' component={Activity} options={{ headerShown: false }} />
        <Stack.Screen name='ActivityDetails' component={ActivityDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export function StartStack() {
  return (
    <Stack.Navigator initialRouteName='StartStack'>
        <Stack.Screen name='StartStack' component={Start} options={{ headerShown: false }} />
        <Stack.Screen name='StartActivityDetails' component={StartActivityDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
