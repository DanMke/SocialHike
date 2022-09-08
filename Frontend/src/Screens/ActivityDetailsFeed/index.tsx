import {
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  ArrowBackIcon,
  HStack,
  Input,
  Spacer,
  Box,
  Avatar,
  ChevronRightIcon,
} from 'native-base';
import React, { useEffect } from 'react';
import {SafeAreaView, KeyboardAvoidingView, Image} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock, faRoute, faRunning, faBolt, faFire, faBiking, faHiking, faHeart, faComment, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 

import MapViewDirections from 'react-native-maps-directions';

import styles from './styles';

import PinStartIcon from '../../../assets/pinStart.png';
import PinEndIcon from '../../../assets/pinEnd.png';

import {
  LineChart,
} from "react-native-chart-kit";
import api from '../../Services/api';

interface ActivityDetailsFeedProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const ActivityDetailsFeed: React.FC<ActivityDetailsFeedProps> = ({onUpdateUser, user, navigation}: ActivityDetailsFeedProps) => {

  const [activity, setActivity] = React.useState(navigation.getState().routes[1].params.activity);
  const [paces, setPaces] = React.useState<any>([0]);
  const [startCoord, setStartCoord] = React.useState<any>({latitude: -15.8358917, longitude: -48.0561833});
  const [endCoord, setEndCoord] = React.useState<any>({latitude: -15.83607, longitude: -48.05608});
  const [coords, setCoords] = React.useState<any>([]);

  const [showComments, setShowComments] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');

  useEffect(() => {
    setActivity(navigation.getState().routes[1].params.activity);
    api.get('/activities/' + navigation.getState().routes[1].params.activity._id).then((response) => {
      setActivity(response.data);
      var activityTemp = response.data;
      var pacesTemp = [];
      for (var i = 0; i < activityTemp.paces.length; i++) {
        pacesTemp.push(activityTemp.paces[i].pace);
      }
      setPaces(pacesTemp);

      var coordsTemp = [];
      if (activityTemp.points.length <= 25) {
        for (var i = 1; i < activityTemp.points.length - 1; i++) {
          coordsTemp.push({latitude: activityTemp.points[i].coords.latitude, longitude: activityTemp.points[i].coords.longitude});
        }
      } else {
        var step = Math.trunc(activityTemp.points.length / 25) + 1;
        for (var i = 1; i < activityTemp.points.length - 1; i += step) {
          coordsTemp.push({latitude: activityTemp.points[i].coords.latitude, longitude: activityTemp.points[i].coords.longitude});
        }
      }
      setCoords(coordsTemp);

      setStartCoord(activityTemp.initialCoord);
      setEndCoord({latitude: activityTemp.points[activityTemp.points.length-1].coords.latitude, longitude: activityTemp.points[activityTemp.points.length-1].coords.longitude});
    }).catch((error) => {
      console.log(error);
    });
    
    
  }, []);

  const onComment = () => {
    console.log(user._id)
    api.post('/activities/' + activity._id + '/comments', {
      comment: commentText,
      user: user._id
      }).then((response) => {
        console.log(response.data);
        setActivity(response.data);
        setCommentText('');
      }
      ).catch((error) => {
        console.log(error);
      }
    );
  };

  const onUser = () => {
    navigation.navigate('FeedProfile', {user: activity.user});
  }

  const onLike = () => {
    var action = "add";
    if (activity.likes.some((like: any) => like._id === user._id)) {
      action = "remove";
    }
    api.post('/activities/' + activity._id + '/like', {
      action: action,
      user: user._id
    }).then((response) => {
      console.log(response.data);
      setActivity(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
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
                latitudeDelta: 0.005,
                longitudeDelta: 0.001,
              }}>
                <Marker coordinate={startCoord} title={"Start"} >
                  <Image
                    source={PinStartIcon}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                </Marker>
                <Marker coordinate={endCoord} title={"End"}>
                  <Image
                    source={PinEndIcon}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                </Marker>
                {
                  coords.length > 0 && (
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
                  )
                }
              </MapView>
              <Pressable style={styles.feedElementUser} onPress={onUser}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={{width: 25, height: 25, borderRadius: 100}} source={{
                  uri: `data:image/png;base64,${activity.user.avatar}`,
                  }} />
                  <Text style={styles.feedElementUserText}>{activity.user.firstName + ' ' + activity.user.lastName}</Text>
                </View>
              </Pressable>
              <View style={styles.feedElementUser}>
                <View style={styles.feedElementInfo}>
                  <Text style={styles.feedElementDetailsTextDark}>{new Date(activity.start).toDateString()}</Text>
                  <Text style={{color: '#fff', fontSize: 14}}>{new Date(activity.start).toLocaleTimeString()}</Text>
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
              <View style={styles.feedElementDetailsTwo}>
                <View>
                  <Text style={styles.feedElementDetailsTextDark}>Num Likes</Text>
                  <View style={styles.feedElementDetailsTextWithImage}>
                    <FontAwesomeIcon icon={faHeart} size={20} color="#ffffff"/>
                    <Text style={styles.feedElementDetailsText}>{activity.likes.length}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.feedElementDetailsTextDark}>Num Comments</Text>
                  <View style={styles.feedElementDetailsTextWithImage}>
                    <FontAwesomeIcon icon={faComment} size={20} color="#ffffff"/>
                    <Text style={styles.feedElementDetailsText}>{activity.comments.length}</Text>
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
                      labels: activity.elevations,
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
                      labels: paces,
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
              <View style={styles.feedElementReacts}>
                <Pressable style={styles.feedElementReactLike} onPress={onLike}>
                  <VStack width={'50%'} height={10} bgColor={"#15573E"} alignItems="center" justifyContent={"center"}>
                    <FontAwesomeIcon icon={faHeart} size={30} color={activity.likes.some((like: any) => like._id === user._id) ? '#FF2400' : '#fff'}/>
                  </VStack>
                </Pressable>
                <Pressable style={styles.feedElementReactComment} onPress={() => setShowComments(!showComments)}>
                  <VStack width={'50%'} height={10} bgColor={"#04AA6C"} alignItems="center" justifyContent={"center"}>
                    <FontAwesomeIcon icon={faComment} size={30} color="#ffffff"/>
                  </VStack>
                </Pressable>
              </View>
            </View>
            {showComments &&
              <View style={{backgroundColor: '#333333', marginTop: 30}}>
                <View style={{paddingVertical: 2}}>
                  <Input variant="outline" selectionColor={'#15573E'} type="text" color={'#E9E8E8'}
                      value={commentText} borderColor={'#04C37D'} _focus={{borderColor: '#15573E'}} 
                      onChangeText={value => setCommentText(value)} rightElement={
                    <Pressable onPress={onComment}>
                      <ChevronRightIcon size="xl" color="#ffffff" style={{marginRight: 10}} />
                    </Pressable>
                  }/>
                </View>
                {activity.comments.map((item: any) => (
                  <Box key={item._id}>
                    <Box borderBottomWidth="1" _dark={{borderColor: "#15573E"}} borderColor="#15573E" pl={["0", "4"]} pr={["0", "5"]} py="2">
                      <HStack space={[2, 3]} justifyContent="space-between">
                        <Avatar size="48px" source={{
                          uri: `data:image/png;base64,${item.user.avatar}`,
                        }} />
                        <VStack>
                          <Text _dark={{
                            color: "#8C8A8C"
                          }} color="#8C8A8C" bold>
                            {item.user.firstName + ' ' + item.user.lastName}
                          </Text>
                          <Text color="#fff" _dark={{
                            color: "#fff"
                          }}>
                            {item.comment}
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" _dark={{
                          color: "#8C8A8C"
                        }} color="#8C8A8C" alignSelf="flex-start">
                          {new Date(item.createdAt).toLocaleDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString()}
                        </Text>
                      </HStack>
                    </Box>
                  </Box>
                ))}
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetailsFeed);
