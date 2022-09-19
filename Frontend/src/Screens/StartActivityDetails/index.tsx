import {
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  ArrowBackIcon,
  Button,
  Modal,
} from 'native-base';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faRoute,
  faRunning,
  faBolt,
  faFire,
  faBiking,
  faHiking,
} from '@fortawesome/free-solid-svg-icons';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

import styles from './styles';

import PinStartIcon from '../../../assets/pinStart.png';
import PinEndIcon from '../../../assets/pinEnd.png';
import PinInfoIcon from '../../../assets/pinInfo.png';

import * as ImagePicker from 'react-native-image-picker';

import Carousel from 'react-native-snap-carousel';

import {LineChart} from 'react-native-chart-kit';
import api from '../../Services/api';

interface StartActivityDetailsProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const StartActivityDetails: React.FC<StartActivityDetailsProps> = ({
  onUpdateUser,
  user,
  navigation,
}: StartActivityDetailsProps) => {
  const [activity, setActivity] = React.useState(
    navigation.getState().routes[1].params.activity,
  );
  const [paces, setPaces] = React.useState<any>([0]);
  const [startCoord, setStartCoord] = React.useState<any>({
    latitude: 0,
    longitude: 0,
  });
  const [endCoord, setEndCoord] = React.useState<any>({
    latitude: 0,
    longitude: 0,
  });
  const [coords, setCoords] = React.useState<any>([]);
  const [photos, setPhotos] = React.useState<any>([]);
  const [showPhotos, setShowPhotos] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  var mapRef = React.useRef<MapView>(null);

  useEffect(() => {
    setActivity(navigation.getState().routes[1].params.activity);
    console.log(navigation.getState().routes[1].params.activity);
    var pacesTemp = [];
    for (var i = 0; i < activity.paces.length; i++) {
      pacesTemp.push(activity.paces[i].pace);
    }
    setPaces(pacesTemp);

    var coordsTemp = [];
    if (activity.points.length <= 25) {
      for (var i = 1; i < activity.points.length - 1; i++) {
        coordsTemp.push({
          latitude: activity.points[i].coords.latitude,
          longitude: activity.points[i].coords.longitude,
        });
      }
    } else {
      var step = Math.trunc(activity.points.length / 25) + 1;
      for (var i = 1; i < activity.points.length - 1; i += step) {
        coordsTemp.push({
          latitude: activity.points[i].coords.latitude,
          longitude: activity.points[i].coords.longitude,
        });
      }
    }
    setCoords(coordsTemp);

    setStartCoord(activity.initialCoord);
    setEndCoord({
      latitude: activity.points[activity.points.length - 1].coords.latitude,
      longitude: activity.points[activity.points.length - 1].coords.longitude,
    });
  }, []);

  const onSave = () => {
    // 'takeSnapshot' takes a config object with the
    // following options
    setLoading(true);
    const snapshot = mapRef.takeSnapshot({
      format: 'png', // image formats: 'png', 'jpg' (default: 'png')
      quality: 1, // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'base64', // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then(uri => {
      activity.mapImage = uri;
      api
        .post('/activities', {
          user: user._id,
          start: activity.start,
          end: activity.end,
          initialCoord: {
            latitude: activity.initialCoord.latitude,
            longitude: activity.initialCoord.longitude,
          },
          points: activity.points,
          type: activity.type,
          mapImage: activity.mapImage,
          pointsOfInterest: activity.pointsOfInterest,
          photos: photos,
        })
        .then(response => {
          console.log(response);
          navigation.goBack();
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    });
  };

  const onAddPhotos = () => {
    console.log(photos.length);
    const requestExternalStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to upload photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestExternalStoragePermission();

    const options = {
      mediaType: 'photo',
      maxHeight: 200,
      selectionLimit: 2,
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        var photosTemp = [];
        for (var i = 0; i < response.assets.length; i++) {
          photosTemp.push(response.assets[i].base64);
        }
        setPhotos(photosTemp);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <View style={{paddingHorizontal: 20, height: '100%'}}>
            <View style={styles.containerIcon}>
              <Pressable
                style={styles.backIcon}
                onPress={() => navigation.goBack()}>
                <VStack
                  width={50}
                  height={50}
                  bgColor={'#333333'}
                  space={4}
                  alignItems="center"
                  justifyContent={'center'}
                  borderRadius="10">
                  <ArrowBackIcon size="xl" color="#ffffff" />
                </VStack>
              </Pressable>
            </View>

            <View style={styles.feedElement}>
              <MapView
                style={styles.feedElementMap}
                ref={map => {
                  mapRef = map;
                }}
                showsUserLocation={false}
                followsUserLocation={false}
                showsMyLocationButton={false}
                scrollEnabled={true}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                region={{
                  latitude: startCoord.latitude,
                  longitude: startCoord.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.001,
                }}>
                <Marker coordinate={startCoord} title={'Start'}>
                  <Image
                    source={PinStartIcon}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                </Marker>
                <Marker coordinate={endCoord} title={'End'}>
                  <Image
                    source={PinEndIcon}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                </Marker>
                {activity.pointsOfInterest &&
                  activity.pointsOfInterest.length > 0 &&
                  activity.pointsOfInterest.map((poi: any, index: number) => (
                    <Marker
                      coordinate={{
                        latitude: poi.latitude,
                        longitude: poi.longitude,
                      }}
                      title={poi.title}
                      key={index}>
                      <Image
                        source={PinInfoIcon}
                        style={{width: 25, height: 25}}
                        resizeMode="contain"
                      />
                    </Marker>
                  ))}
                <MapViewDirections
                  origin={startCoord}
                  destination={endCoord}
                  waypoints={coords}
                  apikey={'AIzaSyB7s0q8XsrI4Ih0gnv19wuZOlyE32fc_ds'}
                  strokeWidth={2}
                  strokeColor="green"
                  optimizeWaypoints={true}
                  mode="WALKING"
                />
              </MapView>
              <View style={styles.feedElementUser}>
                <View style={styles.feedElementInfo}>
                  <Text style={styles.feedElementDetailsTextDark}>
                    {new Date(activity.start).toDateString()}
                  </Text>
                  <Text style={{color: '#fff', fontSize: 14}}>
                    {new Date(activity.start).toLocaleTimeString()}
                  </Text>
                </View>
                {activity.type == 'run' && (
                  <FontAwesomeIcon icon={faRunning} size={20} color="#fff" />
                )}
                {activity.type == 'ride' && (
                  <FontAwesomeIcon icon={faBiking} size={20} color="#fff" />
                )}
                {activity.type == 'hike' && (
                  <FontAwesomeIcon icon={faHiking} size={20} color="#fff" />
                )}
              </View>
              <View style={styles.feedElementDetails}>
                <View>
                  <Text style={styles.feedElementDetailsTextDark}>
                    Calories Burned
                  </Text>
                  <View style={styles.feedElementDetailsTextWithImage}>
                    <FontAwesomeIcon icon={faFire} size={20} color="#ffffff" />
                    <Text style={styles.feedElementDetailsText}>
                      {activity.calories.toFixed(1) + 'kcal'}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.feedElementDetailsTextDark}>
                    Time Duration
                  </Text>
                  <View style={styles.feedElementDetailsTextWithImage}>
                    <FontAwesomeIcon icon={faClock} size={20} color="#ffffff" />
                    <Text style={styles.feedElementDetailsText}>
                      {new Date(activity.duration * 1000)
                        .toISOString()
                        .slice(11, 19)}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.feedElementDetailsTextDark}>
                    Distance
                  </Text>
                  <View style={styles.feedElementDetailsTextWithImage}>
                    <FontAwesomeIcon icon={faRoute} size={20} color="#ffffff" />
                    <Text style={styles.feedElementDetailsText}>
                      {activity.distance.toFixed(2) + 'KM'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.feedElementDetailsTwo}>
                <View>
                  <Text style={styles.feedElementDetailsTextDark}>
                    Average Speed
                  </Text>
                  <View style={styles.feedElementDetailsTextWithImage}>
                    <FontAwesomeIcon icon={faBolt} size={20} color="#ffffff" />
                    <Text style={styles.feedElementDetailsText}>
                      {activity.averageSpeed.toFixed(2) + 'km/h'}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.feedElementDetailsTextDark}>
                    Max Speed
                  </Text>
                  <View style={styles.feedElementDetailsTextWithImage}>
                    <FontAwesomeIcon icon={faBolt} size={20} color="#ffffff" />
                    <Text style={styles.feedElementDetailsText}>
                      {activity.maxSpeed.toFixed(2) + 'km/h'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.routeDetails}>
                <View style={styles.routeElevation}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.feedElementDetailsTextDark}>
                      Max Elevation
                    </Text>
                    <Text style={styles.feedElementDetailsText}>
                      {activity.maxElevation.toFixed(2) + 'm'}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.feedElementDetailsTextDark}>
                      Average Elevation
                    </Text>
                    <Text style={styles.feedElementDetailsText}>
                      {activity.averageElevation.toFixed(2) + 'm'}
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>
                    Elevation
                  </Text>
                  <LineChart
                    data={{
                      labels: activity.elevations,
                      datasets: [
                        {
                          data: activity.elevations,
                        },
                      ],
                    }}
                    width={120} // from react-native
                    height={60}
                    withVerticalLabels={false} // optional, defaults to false
                    withHorizontalLabels={false} // optional, defaults to false
                    chartConfig={{
                      backgroundColor: '#FFFFFF',
                      backgroundGradientFrom: '#FFFFFF',
                      backgroundGradientTo: '#FFFFFF',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      strokeWidth: 10,
                      propsForDots: {
                        r: '0',
                        strokeWidth: '0',
                      },
                    }}
                    bezier
                    style={{
                      paddingRight: 0,
                      marginLeft: 20,
                      marginTop: 5,
                      width: '100%',
                    }}
                  />
                </View>
              </View>
              <View style={styles.routeDetails}>
                <View style={styles.routeElevation}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.feedElementDetailsTextDark}>
                      {' '}
                      Max Pace{' '}
                    </Text>
                    <Text style={styles.feedElementDetailsText}>
                      {(Math.trunc(activity.maxPace / 60) < 10 ? '0' : '') + Math.trunc(activity.maxPace / 60) +
                        ':' +
                        (Math.trunc(activity.maxPace % 60) < 10 ? '0' : '') + Math.trunc(activity.maxPace % 60) +
                        '/KM'}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.feedElementDetailsTextDark}>
                      {' '}
                      Average Pace{' '}
                    </Text>
                    <Text style={styles.feedElementDetailsText}>
                      { (Math.trunc(activity.averagePace / 60) < 10 ? '0' : '') + Math.trunc(activity.averagePace / 60) +
                        ':' +
                        (Math.trunc(activity.averagePace % 60) < 10 ? '0' : '') + Math.trunc(activity.averagePace % 60) +
                        '/KM'}
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Pace </Text>
                  <LineChart
                    data={{
                      labels: paces,
                      datasets: [
                        {
                          data: paces,
                        },
                      ],
                    }}
                    width={120} // from react-native
                    height={60}
                    withVerticalLabels={false} // optional, defaults to false
                    withHorizontalLabels={false} // optional, defaults to false
                    chartConfig={{
                      backgroundColor: '#FFFFFF',
                      backgroundGradientFrom: '#FFFFFF',
                      backgroundGradientTo: '#FFFFFF',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      strokeWidth: 10,
                      propsForDots: {
                        r: '0',
                        strokeWidth: '0',
                      },
                    }}
                    bezier
                    style={{
                      paddingRight: 0,
                      marginLeft: 20,
                      marginTop: 5,
                      width: '100%',
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <Button
                  style={{width: '60%', height: 50, marginBottom: 30}}
                  backgroundColor={'#04AA6C'}
                  onPress={() => setShowPhotos(true)}>
                  <Text style={{color: '#fff', fontSize: 16}}>
                    See activity photos
                  </Text>
                </Button>
              </View>
            </View>
            <Modal
              isOpen={showPhotos}
              onClose={() => setShowPhotos(false)}
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Activity Photos</Modal.Header>
                <Modal.Footer>
                  {photos.length > 0 ? (
                    <View
                      style={{
                        height: '100%',
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 10,
                      }}>
                      <Carousel
                        layout="default"
                        data={photos}
                        sliderWidth={50}
                        itemWidth={250}
                        renderItem={({item, index}) => (
                          <Image
                            key={index}
                            style={{width: '100%', height: '100%'}}
                            resizeMode="center"
                            source={{
                              uri: `data:image/png;base64,${item}`,
                            }}
                          />
                        )}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: '100%',
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: '#000', fontSize: 16}}>
                        No photos available
                      </Text>
                    </View>
                  )}
                </Modal.Footer>
              </Modal.Content>
            </Modal>

            <Button
              style={{width: '100%', height: 50, marginBottom: 10}}
              backgroundColor={'#15573E'}
              onPress={onAddPhotos}>
              <Text style={{color: '#fff', fontSize: 16}}>
                Add photo of activity
              </Text>
            </Button>
            {loading ? (
              <ActivityIndicator size="large" color="#04AA6C" />
            ) : (
              <Button
                style={{width: '100%', height: 50, marginBottom: 30}}
                backgroundColor={'#04AA6C'}
                onPress={onSave}>
                <Text style={{color: '#fff', fontSize: 16}}>Save</Text>
              </Button>
            )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartActivityDetails);
