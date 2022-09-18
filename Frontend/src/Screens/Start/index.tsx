import {
  Button,
  ScrollView, View,
  Select, CheckIcon,
  Modal, FormControl, Input
} from 'native-base';
import React, {useEffect} from 'react';
import { SafeAreaView, Text, KeyboardAvoidingView, PermissionsAndroid, Image } from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import Geolocation from 'react-native-geolocation-service';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; 

import styles from './styles';
import api from '../../Services/api';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRunning, faBiking, faHiking } from '@fortawesome/free-solid-svg-icons'

import PinStartIcon from '../../../assets/pinStart.png';
import PinEndIcon from '../../../assets/pinEnd.png';
import PinInfoIcon from '../../../assets/pinInfo.png';

import MapViewDirections from 'react-native-maps-directions';

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
  const [speed, setSpeed] = React.useState<number>(0);
  
  const [type, setType] = React.useState<string>('run');

  const [points, setPoints] = React.useState<Array<Geolocation.GeoPosition>>([]);
  
  const [initialLatitude, setInitialLatitude] = React.useState(0);
  const [initialLongitude, setInitialLongitude] = React.useState(0);

  const [isStarted, setIsStarted] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  const [intervalGetCurrentPosition, setIntervalGetCurrentPosition] = React.useState<any>();

  const [distance, setDistance] = React.useState(0);
  const [averageSpeed, setAverageSpeed] = React.useState(0);
  const [calories, setCalories] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const [pointsOfInterest, setPointsOfInterest] = React.useState<Array<any>>([]);
  const [pointsToRender, setPointsToRender] = React.useState<Array<any>>([]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [poiTitle, setPoiTitle] = React.useState('');

  const [endCoord, setEndCoord] = React.useState({latitude: 0, longitude: 0});

  useEffect(() => {
    let isMounted = true;   
  
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
      {enableHighAccuracy: true, timeout: 20000}
    );

    return () => { isMounted = false };
  } , []);
  
  const onStart = async () => {
    await Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setInitialLatitude(position.coords.latitude);
        setInitialLongitude(position.coords.longitude);
        setPoints([position]);
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000}
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
        {enableHighAccuracy: true, timeout: 20000}
      );
    }, 2000);
    setIntervalGetCurrentPosition(interval);
    setIsStarted(true);
  };

  const onPause = () => {
    Geolocation.getCurrentPosition(
      (position: Geolocation.GeoPosition) => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setAltitude(position.coords.altitude);
        setSpeed(position.coords.speed);
        setPoints(points => [...points, position]);
        setEndCoord({latitude: position.coords.latitude, longitude: position.coords.longitude});
        api.post('/activities/data', {
          user: user.email.toLowerCase(),
          start: startDateTime,
          end: new Date(),
          initialCoord: {
            latitude: initialLatitude,
            longitude: initialLongitude,
          },
          points: points,
          type: type,
          pointsOfInterest: pointsOfInterest,
          }).then((response) => {
            clearInterval(intervalGetCurrentPosition);
            setDistance(response.data.activity.distance);
            setAverageSpeed(response.data.activity.averageSpeed);
            setCalories(response.data.activity.calories);
            setDuration(response.data.activity.duration);
            setIsPaused(true);
            setEndDateTime(new Date());
            var coordsTemp = [];
            var step = Math.trunc(points.length / 25) + 1;
            for (var i = 1; i < points.length - 1; i += step) {
              coordsTemp.push({latitude: points[i].coords.latitude, longitude: points[i].coords.longitude});
            }
            setPointsToRender(coordsTemp);
          }
        ).catch((error) => {
          console.log(error);
        });
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000}
    );
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
        {enableHighAccuracy: true, timeout: 20000}
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
      api.post('/activities/data', {
        user: user.email.toLowerCase(),
        start: startDateTime,
        end: end,
        initialCoord: {
          latitude: initialLatitude,
          longitude: initialLongitude,
        },
        points: points,
        type: type,
        pointsOfInterest: pointsOfInterest,
        }).then((response) => {
          console.log(response);
          setStartDateTime(null);
          setEndDateTime(null);
          setPoints([]);
          setInitialLatitude(latitude);
          setInitialLongitude(longitude);
          setType('run');
          setPoiTitle('');
          setModalVisible(false);
          setPointsOfInterest([]);
          setPointsToRender([]);
          navigation.navigate('StartActivityDetails', {activity: response.data.activity});
        }
      ).catch((error) => {
        console.log(error);
      });
    }, 1000);
  };

  const onSavePointOfInterest = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setPointsOfInterest([...pointsOfInterest, {latitude: position.coords.latitude, longitude: position.coords.longitude, title: poiTitle}]);
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000}
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
            { isPaused && initialLatitude && initialLongitude &&
              <Marker coordinate={{latitude: initialLatitude, longitude: initialLongitude}} title={"Start"} >
                <Image
                  source={PinStartIcon}
                  style={{width: 25, height: 25}}
                  resizeMode="contain"
                />
              </Marker>
            }
            { isPaused && pointsToRender.length > 0 &&
              <Marker coordinate={endCoord} title={"End"} >
                <Image
                  source={PinEndIcon}
                  style={{width: 25, height: 25}}
                  resizeMode="contain"
                />
              </Marker>
            }
            { pointsOfInterest.length > 0 &&
              pointsOfInterest.map((poi, index) => (
                <Marker key={index} coordinate={{latitude: poi.latitude, longitude: poi.longitude}} title={poi.title} >
                  <Image
                    source={PinInfoIcon}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                </Marker>
              ))
            }
            { isPaused && pointsToRender.length > 0 &&
              <MapViewDirections
                origin={{latitude: initialLatitude, longitude: initialLongitude}}
                destination={{latitude: pointsToRender[pointsToRender.length - 1].latitude, longitude: pointsToRender[pointsToRender.length - 1].longitude}}
                waypoints={pointsToRender}
                apikey={'AIzaSyB7s0q8XsrI4Ih0gnv19wuZOlyE32fc_ds'}
                strokeWidth={2}
                strokeColor="green"
                optimizeWaypoints={true}
                mode="WALKING"
              />
            }
          </MapView>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            { isStarted && isPaused &&
              <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white'}}>Duration: {new Date(duration * 1000).toISOString().slice(11, 19)}</Text>
                <Text style={{color: 'white'}}>Distance: {distance.toFixed(2) + ' KM'}</Text>
                <Text style={{color: 'white'}}>Average Speed: {averageSpeed.toFixed(2) + ' KM/H'}</Text>
                <Text style={{color: 'white'}}>Calories: {calories.toFixed(1) + ' kcal'}</Text>
              </View>
            }
            { isStarted && !isPaused && 
              <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white'}}>Latitude: {latitude}</Text>
                <Text style={{color: 'white'}}>Longitude: {longitude}</Text>
                <Text style={{color: 'white'}}>Altitude: {altitude}</Text>
                <Text style={{color: 'white'}}>Speed: {(speed * 3.6).toFixed(2) + ' KM/H'}</Text>
              </View>
            }
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
                  mt={2} onValueChange={itemValue => {setType(itemValue); console.log(itemValue)}}>
                    <Select.Item label="Run" value="run" startIcon={<FontAwesomeIcon icon={faRunning} size={30} color="#000"/>} />
                    <Select.Item label="Ride" value="ride" startIcon={<FontAwesomeIcon icon={faBiking} size={30} color="#000"/>}/>
                    <Select.Item label="Hike" value="hike" startIcon={<FontAwesomeIcon icon={faHiking} size={30} color="#000"/>}/>
                </Select>

                <Button width={"150"} height={"150"} mt={5} backgroundColor={'#04AA6C'} margin={2} onPress={onStart} borderRadius={100}>
                  <Text style={{color: '#fff', fontSize: 25}}>Start</Text>
                </Button>
              </View>
            }
            {
              isStarted && !isPaused &&
                <Button width={"80%"} height={60} backgroundColor={'#04AA6C'} margin={2} onPress={onPause}>
                  <Text style={{color: '#fff', fontSize: 18}}>Pause</Text>
                </Button>
            }
            {
              isStarted && isPaused &&
                <Button width={"80%"} height={60} backgroundColor={'#04AA6C'} margin={2} onPress={() => setModalVisible(true)}>
                  <Text style={{color: '#fff', fontSize: 18}}>Add Point of Interest</Text>
                </Button>
            }
            {
              isStarted && isPaused &&
                <Button width={"80%"} height={60} backgroundColor={'#04AA6C'} margin={2} onPress={onResume}>
                  <Text style={{color: '#fff', fontSize: 18}}>Resume</Text>
                </Button>
            }
            {
              isStarted && 
                <Button width={"80%"} height={60} backgroundColor={'#04AA6C'} margin={2} onPress={onStop}>
                  <Text style={{color: '#fff', fontSize: 18}}>Stop</Text>
                </Button>
            }
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Point of Interest</Modal.Header>
                <Modal.Body>
                  Add your point of interest
                  <FormControl>
                    <FormControl.Label mt={4}>Description</FormControl.Label>
                    <Input
                      placeholder=""
                      type="text"
                      selectionColor={'#15573E'}
                      size="md"
                      _focus={{borderColor: '#15573E'}}
                      color={'#15573E'}
                      variant="underlined"
                      borderColor={'#04C37D'}
                      onChangeText={value => setPoiTitle(value)}
                    />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      backgroundColor={'#15573E'}
                      onPress={() => {
                        setModalVisible(false);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      backgroundColor={'#04AA6C'}
                      onPress={() => {
                        setModalVisible(false);
                        onSavePointOfInterest();
                      }}>
                      Add
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal> 
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
