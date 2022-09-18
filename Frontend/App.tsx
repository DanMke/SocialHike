import "./src/ignoreWarnings";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SSRProvider} from '@react-aria/ssr'; 

import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';

import { store } from './src/Redux/store';
import { Routes } from './src/Routes';

import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={ store }>
      <SSRProvider>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </SSRProvider>
    </Provider>
  );
};

export default App;
