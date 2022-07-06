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

import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';

import { store } from './src/Redux/store';
import { Routes } from './src/Routes';

const App = () => {
  return (
    <Provider store={ store }>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
