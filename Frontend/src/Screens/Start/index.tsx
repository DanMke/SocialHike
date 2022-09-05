import {
  Button,
  ScrollView, View,
  Select, CheckIcon
} from 'native-base';
import React, {useEffect} from 'react';
import { SafeAreaView, Text, KeyboardAvoidingView, PermissionsAndroid } from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import Geolocation from 'react-native-geolocation-service';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import styles from './styles';
import api from '../../Services/api';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRunning, faBiking, faHiking } from '@fortawesome/free-solid-svg-icons'

interface StartProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Start: React.FC<StartProps> = ({onUpdateUser, user, navigation}: StartProps) => {

  const [startDateTime, setStartDateTime] = React.useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = React.useState<Date | null>(null);

  const [latitude, setLatitude] = React.useState<number>(0);
  const [longitude, setLongitude] = React.useState<number>(0);
  const [altitude, setAltitude] = React.useState<number | null>(0);
  const [speed, setSpeed] = React.useState<number | null>(0);
  
  const [type, setType] = React.useState<string>('run');

  const [points, setPoints] = React.useState<Array<Geolocation.GeoPosition>>([]);
  
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
        setPoints([position]);
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    setStartDateTime(new Date());

    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(
        (position: Geolocation.GeoPosition) => {
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setAltitude(position.coords.altitude);
          setSpeed(position.coords.speed);
          setPoints(points => [...points, position]);
            
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
    setEndDateTime(new Date());
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
          setPoints([...points, position]);
          
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
    setTimeout(() => {
      var end: Date | null = new Date();
      if (isPaused) {
        end = endDateTime;
      }
      clearInterval(intervalGetCurrentPosition);
      setIsStarted(false);
      setIsPaused(false);
      api.post('/activities', {
        user: user.email,
        start: startDateTime,
        end: end,
        initialCoord: {
          latitude: initialLatitude,
          longitude: initialLongitude,
        },
        points: points,
        type: type,
        }).then((response) => {
          console.log(response);
          setStartDateTime(null);
          setEndDateTime(null);
          setPoints([]);
          setInitialLatitude(latitude);
          setInitialLongitude(longitude);
          setType('run');
        }
      ).catch((error) => {
        console.log(error);
      });
    }, 1000);
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
            <Text style={{color: 'white'}}>Latitude: {latitude}</Text>
            <Text style={{color: 'white'}}>Longitude: {longitude}</Text>
            <Text style={{color: 'white'}}>Altitude: {altitude}</Text>
            <Text style={{color: 'white'}}>Speed (m/s): {speed}</Text>
            { !isStarted && 
              <View>
                <Select selectedValue={type} 
                  accessibilityLabel="Choose Type" 
                  variant="underlined" 
                  borderColor={'#04C37D'}
                  placeholder="Choose Type"
                  color={'#E9E8E8'}
                  _selectedItem={{
                    bg: "white",
                    endIcon: <CheckIcon size="5" />
                  }} 
                  mt={1} onValueChange={itemValue => {setType(itemValue); console.log(itemValue)}}>
                    <Select.Item label="Run" value="run" startIcon={<FontAwesomeIcon icon={faRunning} size={30} color="#000"/>} />
                    <Select.Item label="Ride" value="ride" startIcon={<FontAwesomeIcon icon={faBiking} size={30} color="#000"/>}/>
                    <Select.Item label="Hike" value="hike" startIcon={<FontAwesomeIcon icon={faHiking} size={30} color="#000"/>}/>
                </Select>

                <Button width={"200"} height={"200"} backgroundColor={'#04AA6C'} margin={2} onPress={onStart} borderRadius={100}>
                  <Text style={{color: '#fff', fontSize: 25}}>Start</Text>
                </Button>
              </View>
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
    onUpdateUser: (loggedUser: Object) => dispatch(updateUser(loggedUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
