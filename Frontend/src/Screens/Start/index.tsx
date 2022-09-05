import {
  Button,
  ScrollView, View,
} from 'native-base';
import React, {useEffect} from 'react';
import { SafeAreaView, Text, KeyboardAvoidingView, PermissionsAndroid } from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import Geolocation from 'react-native-geolocation-service';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import styles from './styles';
import api from '../../Services/api';

interface StartProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Start: React.FC<StartProps> = ({onTest, user, navigation}: StartProps) => {

  const [latitude, setLatitude] = React.useState<Number>(0);
  const [longitude, setLongitude] = React.useState<Number>(0);
  const [altitude, setAltitude] = React.useState<Number>(0);
  const [speed, setSpeed] = React.useState<Number>(0);

  const [points, setPoints] = React.useState([]);
  
  const [initialLatitude, setInitialLatitude] = React.useState(0);
  const [initialLongitude, setInitialLongitude] = React.useState(0);

  const [isStarted, setIsStarted] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  const [intervalGetCurrentPosition, setIntervalGetCurrentPosition] = React.useState<any>();

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();

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
  } , []);
  
  const onStart = () => {
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

    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(
        (position: Geolocation.GeoPosition) => {
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setAltitude(position.coords.altitude);
          setSpeed(position.coords.speed);
        },
        (error) => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }, 1000);
    setIntervalGetCurrentPosition(interval);
    setIsStarted(true);
  };

  const onPause = () => {
    clearInterval(intervalGetCurrentPosition);
    setIsPaused(true);
  };

  const onResume = () => {
    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setAltitude(position.coords.altitude);
          setSpeed(position.coords.speed);
        },
        (error) => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }, 1000);
    setIntervalGetCurrentPosition(interval);
    setIsPaused(false);
  };

  const onStop = () => {
    clearInterval(intervalGetCurrentPosition);
    setIsStarted(false);
    setIsPaused(false);
    api.post('/activities', {
      user: user.email,
      points: points,
      }).then((response) => {
        console.log(response);
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
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
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>LATITUDE: {latitude}</Text>
            <Text style={{color: 'white'}}>LONGITUDE: {longitude}</Text>
            <Text style={{color: 'white'}}>ALTITUDE: {altitude}</Text>
            <Text style={{color: 'white'}}>SPEED: {speed}</Text>
            { !isStarted && 
              <Button width={"200"} height={"200"} backgroundColor={'#04AA6C'} margin={2} onPress={onStart} borderRadius={100}>
                <Text style={{color: '#fff', fontSize: 25}}>Start</Text>
              </Button>
            }
            {
              isStarted && !isPaused &&
                <Button width={"80%"} height={20} backgroundColor={'#04AA6C'} margin={2} onPress={onPause}>
                  <Text style={{color: '#fff', fontSize: 18}}>Pause</Text>
                </Button>
            }
            {
              isStarted && isPaused &&
                <Button width={"80%"} height={20} backgroundColor={'#04AA6C'} margin={2} onPress={onResume}>
                  <Text style={{color: '#fff', fontSize: 18}}>Resume</Text>
                </Button>
            }
            {
              isStarted && 
                <Button width={"80%"} height={20} backgroundColor={'#04AA6C'} margin={2} onPress={onStop}>
                  <Text style={{color: '#fff', fontSize: 18}}>Stop</Text>
                </Button>
            }         
          </View>
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
