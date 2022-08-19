import {
  ScrollView,
  Image,
  Pressable,
  View,
  VStack,
  Text,
} from 'native-base';
import React from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock, faRoute, faRunning, faBolt, faFire } from '@fortawesome/free-solid-svg-icons'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import styles from './styles';

import {
  LineChart,
} from "react-native-chart-kit";

interface ProfileProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({onTest, user, navigation}: ProfileProps) => {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView style={{paddingHorizontal: 20}}>

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
