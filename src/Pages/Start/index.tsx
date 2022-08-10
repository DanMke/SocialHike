import {
  Input,
  Text,
  VStack,
  FormControl,
  Button,
  WarningOutlineIcon,
  Link,
  IconButton,
  ScrollView,
} from 'native-base';
import React, {useEffect} from 'react';
import {View, SafeAreaView, Image, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import Geolocation from 'react-native-geolocation-service';

import styles from './styles';

interface StartProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Start: React.FC<StartProps> = ({onTest, user, navigation}: StartProps) => {

  useEffect(() => {
    // Geolocation.requestAuthorization("always");

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  } , []);
  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (store: any) => {
  return {
    user: store.user.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTest: () => dispatch(updateUser({name: 'Jobs'})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
