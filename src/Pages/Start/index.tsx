import {
  ScrollView, View,
} from 'native-base';
import React, {useEffect} from 'react';
import { SafeAreaView, Text, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import Geolocation from 'react-native-geolocation-service';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

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
          <Text>dfsdfs</Text>
        <MapView style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          scrollEnabled={true}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          region={{
            latitude: -15.8477559,
            longitude: -48.0505933,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
        <Text>dfsdfs</Text>

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
