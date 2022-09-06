import {
  ScrollView,
  Pressable,
  View,
  VStack,
  Text,
} from 'native-base';
import React, {useEffect} from 'react';
import {SafeAreaView, Image, KeyboardAvoidingView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import styles from './styles';

import {LineChart} from "react-native-chart-kit";

import auth from '@react-native-firebase/auth';
import api from '../../Services/api';

interface ProfileProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({onUpdateUser, user, navigation}: ProfileProps) => {
  
  const [loggedUser, setLoggedUser] = React.useState<any>(user);
  const [allDurationTimeActivies, setAllDurationTimeActivies] = React.useState(0);
  const [allDistanceActivities, setAllDistanceActivities] = React.useState(0);
  const [activiesSize, setActiviesSize] = React.useState(0);

  useEffect(() => {
    api.get('/users/' + user.email).then((response) => {
      onUpdateUser(response.data);
    });

    api.get('/activities/' + user.email).then((response) => {
      var activities = response.data;
      setActiviesSize(activities.length);
      var durationTime = 0;
      var distance = 0;
      activities.forEach((activity: any) => {
        durationTime += activity.durationTime;
        distance += activity.distance;
      });
      setAllDurationTimeActivies(durationTime);
      setAllDistanceActivities(distance);
    });
  }, []);

  const onFollowers = () => {
    navigation.navigate('Followers');
  };

  const onFollowing = () => {
    navigation.navigate('Following');
  };

  const onEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  
  const onSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login').then(() => {
          onUpdateUser(null);
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView style={{paddingHorizontal: 20}}>
          <View style={styles.containerIcon}>
            <Pressable style={styles.icon} onPress={onEditProfile}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <FontAwesomeIcon icon={faGear} size={30} color="#ffffff"/>
              </VStack>
            </Pressable>
            <Pressable style={styles.icon} onPress={onSignOut}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <FontAwesomeIcon icon={faDoorOpen} size={30} color="#ffffff"/>
              </VStack>
            </Pressable>
          </View>
          <View>
            <View style={styles.profile}>
              <View style={styles.profileUser}>
              <Image style={{width: 30, height: 30, borderRadius: 100}} source={{
                      uri: `data:image/png;base64,${user.avatar}`,
                      }} />
                <Text style={styles.feedElementUserText}>{user.firstName + ' ' + user.lastName}</Text>
              </View>
              <View style={styles.profileUserDetails}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Username</Text>
                  <Text style={styles.feedElementDetailsText}>{user.username}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Height</Text>
                  <Text style={styles.feedElementDetailsText}>{user.height + ' CM'}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Weight</Text>
                  <Text style={styles.feedElementDetailsText}>{user.weight + ' KG'}</Text>
                </View>
              </View>
              <View style={styles.profileUserDetailsTwo}>
                <Pressable style={{alignItems: 'center'}} onPress={onFollowers}>
                  <Text style={styles.feedElementDetailsTextDark}>Followers</Text>
                  <Text style={styles.feedElementDetailsText}>{user.followers.length}</Text>
                </Pressable>
                <Pressable style={{alignItems: 'center'}} onPress={onFollowing}>
                  <Text style={styles.feedElementDetailsTextDark}>Following</Text>
                  <Text style={styles.feedElementDetailsText}>{user.following.length}</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.activity}>
              <Text style={styles.feedElementUserText}>Activity in this Year</Text>
              <View style={styles.profileUserDetailsTwo}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Time</Text>
                  <Text style={styles.feedElementDetailsText}>3h30m</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Distance</Text>
                  <Text style={styles.feedElementDetailsText}>12.78km</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Activities</Text>
                  <Text style={styles.feedElementDetailsText}>98</Text>
                </View>
              </View>
              <LineChart
                data={{
                  labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }
                  ]
                }}
                width={Dimensions.get('window').width * 0.8} // from react-native
                height={220}
                yAxisSuffix={'km'}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#FAFAFA",
                  backgroundGradientFrom: "#FAFAFA",
                  backgroundGradientTo: "#FAFAFA",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(0, 120, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 120, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                    width: '100%',
                  },
                  propsForDots: {
                    r: "3",
                    strokeWidth: "2",
                    stroke: "#04AA6C"
                  }
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 5,
                  width: '100%',
                }}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
