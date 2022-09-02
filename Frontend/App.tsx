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

// TODO verificar se o usuario esta logado, se nao tiver logado vai para a pagina de login, se tiver vai pra pagina de home

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
