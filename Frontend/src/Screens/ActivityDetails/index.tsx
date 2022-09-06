import {
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  ArrowBackIcon,
} from 'native-base';
import React, { useEffect } from 'react';
import {SafeAreaView, KeyboardAvoidingView, Image} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock, faRoute, faRunning, faBolt, faFire, faBiking, faHiking } from '@fortawesome/free-solid-svg-icons'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 

import MapViewDirections from 'react-native-maps-directions';

import styles from './styles';

import PinIcon from '../../../assets/pin.png';

import {
  LineChart,
} from "react-native-chart-kit";

interface ActivityDetailsProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({onUpdateUser, user, navigation}: ActivityDetailsProps) => {

  const [activity, setActivity] = React.useState(navigation.getState().routes[1].params.activity);
  const [paces, setPaces] = React.useState<any>([0]);
  const [startCoord, setStartCoord] = React.useState<any>({latitude: 0, longitude: 0});
  const [endCoord, setEndCoord] = React.useState<any>({latitude: 0, longitude: 0});
  const [coords, setCoords] = React.useState<any>([]);

  useEffect(() => {
    setActivity(navigation.getState().routes[1].params.activity);
    
    var pacesTemp = [];
    for (var i = 0; i < activity.paces.length; i++) {
      pacesTemp.push(activity.paces[i].pace);
    }
    setPaces(pacesTemp);

    var coordsTemp = [];
    if (activity.points.length <= 25) {
      for (var i = 1; i < activity.points.length - 1; i++) {
        coordsTemp.push({latitude: activity.points[i].coords.latitude, longitude: activity.points[i].coords.longitude});
      }
    } else {
      var step = Math.trunc(activity.points.length / 25) + 1;
      for (var i = 1; i < activity.points.length - 1; i += step) {
        coordsTemp.push({latitude: activity.points[i].coords.latitude, longitude: activity.points[i].coords.longitude});
      }
    }
    setCoords(coordsTemp);

    setStartCoord(activity.initialCoord);
    setEndCoord({latitude: activity.points[activity.points.length-1].coords.latitude, longitude: activity.points[activity.points.length-1].coords.longitude});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View style={styles.containerIcon}>
          <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
            <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
              <ArrowBackIcon size="xl" color="#ffffff" />
            </VStack>
          </Pressable>
          </View>
          <View style={styles.feedElement}>
            <MapView style={styles.feedElementMap}
            showsUserLocation={false}
            followsUserLocation={false}
            showsMyLocationButton={false}
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            region={{
              latitude: startCoord.latitude,
              longitude: startCoord.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
              <Marker coordinate={startCoord} title={"Start"} >
                <Image
                  source={PinIcon}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
              </Marker>
              <Marker coordinate={endCoord} title={"End"}>
                <Image
                  source={PinIcon}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
              </Marker>
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
                <Text style={styles.feedElementDetailsTextDark}>{new Date(activity.start).toDateString()}</Text>
                <Text style={{color: '#fff', fontSize: 14}}>{new Date(activity.start).getHours() + ':' + new Date(activity.start).getMinutes()}</Text>
              </View>
              {activity.type == 'run' && <FontAwesomeIcon icon={ faRunning } size={ 20 } color="#fff" />}
              {activity.type == 'ride' && <FontAwesomeIcon icon={ faBiking } size={ 20 } color="#fff" />}
              {activity.type == 'hike' && <FontAwesomeIcon icon={ faHiking } size={ 20 } color="#fff" />}
            </View>
            <View style={styles.feedElementDetails}>
              <View>
                <Text style={styles.feedElementDetailsTextDark}>Calories Burned</Text>
                <View style={styles.feedElementDetailsTextWithImage}>
                  <FontAwesomeIcon icon={faFire} size={20} color="#ffffff"/>
                  <Text style={styles.feedElementDetailsText}>{activity.calories.toFixed(1) + 'kcal'}</Text>
                </View>
              </View>
              
              <View>
                <Text style={styles.feedElementDetailsTextDark}>Time Duration</Text>
                <View style={styles.feedElementDetailsTextWithImage}>
                  <FontAwesomeIcon icon={faClock} size={20} color="#ffffff"/>
                  <Text style={styles.feedElementDetailsText}>{new Date(activity.duration * 1000).toISOString().slice(11, 19)}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.feedElementDetailsTextDark}>Distance</Text>
                <View style={styles.feedElementDetailsTextWithImage}>
                  <FontAwesomeIcon icon={faRoute} size={20} color="#ffffff"/>
                  <Text style={styles.feedElementDetailsText}>{activity.distance.toFixed(2) + 'KM'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.feedElementDetailsTwo}>
              <View>
                <Text style={styles.feedElementDetailsTextDark}>Average Speed</Text>
                <View style={styles.feedElementDetailsTextWithImage}>
                  <FontAwesomeIcon icon={faBolt} size={20} color="#ffffff"/>
                  <Text style={styles.feedElementDetailsText}>{activity.averageSpeed.toFixed(2) + 'km/h'}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.feedElementDetailsTextDark}>Max Speed</Text>
                <View style={styles.feedElementDetailsTextWithImage}>
                  <FontAwesomeIcon icon={faBolt} size={20} color="#ffffff"/>
                  <Text style={styles.feedElementDetailsText}>{activity.maxSpeed.toFixed(2) + 'km/h'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.routeDetails}>
              <View style={styles.routeElevation}> 
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Max Elevation</Text>
                  <Text style={styles.feedElementDetailsText}>{activity.maxElevation.toFixed(2) + 'm'}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Average Elevation</Text>
                  <Text style={styles.feedElementDetailsText}>{activity.averageElevation.toFixed(2) + 'm'}</Text>
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.feedElementDetailsTextDark}>Elevation</Text>
                <LineChart
                  data={{
                    labels: ['100', '200', '300'],
                    datasets: [
                      {
                        data: activity.elevations
                      }
                    ],
                  }}
                  width={120} // from react-native
                  height={60}
                  withVerticalLabels={false} // optional, defaults to false
                  withHorizontalLabels={false} // optional, defaults to false
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    color: (opacity = 1) => `rgba(0, 125, 0, ${opacity})`,
                    strokeWidth: 2, // optional, default 3
                    propsForDots: {
                      r: "0",
                      strokeWidth: "0",
                    }
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
                  <Text style={styles.feedElementDetailsTextDark}>     Max Pace    </Text>
                  <Text style={styles.feedElementDetailsText}>{Math.trunc(activity.maxPace / 60) + ':' + Math.trunc(activity.maxPace % 60) + '/KM'}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>     Average Pace    </Text>
                  <Text style={styles.feedElementDetailsText}>{Math.trunc(activity.averagePace / 60) + ':' +Math.trunc(activity.averagePace % 60) + '/KM'}</Text>
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.feedElementDetailsTextDark}>Pace  </Text>
                <LineChart
                  data={{
                    labels: ['0', '5', '10'],
                    datasets: [
                      {
                        data: paces
                      }
                    ],
                  }}
                  width={120} // from react-native
                  height={60}
                  withVerticalLabels={false} // optional, defaults to false
                  withHorizontalLabels={false} // optional, defaults to false
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    color: (opacity = 1) => `rgba(0, 125, 0, ${opacity})`,
                    strokeWidth: 10, // optional, default 3
                    propsForDots: {
                      r: "0",
                      strokeWidth: "0",
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetails);
