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

  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [initialLatitude, setInitialLatitude] = React.useState(0);
  const [initialLongitude, setInitialLongitude] = React.useState(0);

  useEffect(() => {
    // TODO geolocation request authorization if not authorized
    // Geolocation.requestAuthorization("always");
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setInitialLatitude(position.coords.latitude);
        setInitialLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    const intervalGetCurrentPosition = setInterval(() => {
      console.log('Logs every second');
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }, 1000);
    // TODO: On FOCUS OUT clear interval
    // TODO: update location in background
    return () => clearInterval(intervalGetCurrentPosition); 

  } , []);
  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <MapView style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            region={{
              latitude: initialLatitude,
              longitude: initialLongitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
          </MapView>
        <Text style={{color: 'white'}}>LATITUDE: {latitude}</Text>
        <Text style={{color: 'white'}}>LONGITUDE: {longitude}</Text>
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
