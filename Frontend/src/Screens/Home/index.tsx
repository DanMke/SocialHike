import {
  ScrollView,
  Pressable,
  VStack,
  View,
  Text
} from 'native-base';
import React, { useEffect } from 'react';
import {SafeAreaView, KeyboardAvoidingView, Image} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import styles from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers, faBell, faClock, faRoute, faRunning, faHeart, faPlus, faBiking, faHiking } from '@fortawesome/free-solid-svg-icons'

import api from '../../Services/api';

interface HomeProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Home: React.FC<HomeProps> = ({onUpdateUser, user, navigation}: HomeProps) => {

  const [activities, setActivities] = React.useState<any[]>([]);

  useEffect(() => {
    api.get('/activities').then((response) => {
      var allActivities = response.data;
      // TODO: Filter by following users
      setActivities(allActivities);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const onActivityDetails = (e: any, activity: any) => {
    navigation.navigate('ActivityDetails', {activity: activity});
  }

  const onNotifications = () => {
    navigation.navigate('Notifications');
  }

  const onSocial = () => {
    navigation.navigate('Social');
  }

  const onLike = () => {
    console.log(user);
    // TODO req +1 like or -1 like
    // TODO change color of heart
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <View style={styles.containerIcon}>
            <Pressable style={styles.icon} onPress={onSocial}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <FontAwesomeIcon icon={faUsers} size={30} color="#ffffff"/>
              </VStack>
            </Pressable>
            <Pressable style={styles.icon} onPress={onNotifications}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <FontAwesomeIcon icon={faBell} size={30} color="#ffffff"/>
              </VStack>
            </Pressable>
          </View>
          <View style={styles.feed}>
            {activities.map((activity) => (
              <View style={styles.feedElement} key={activity._id}>
                <Image style={styles.feedElementMap} source={{
                    uri: `data:image/png;base64,${activity.mapImage}`,
                  }} />
                <View style={styles.feedElementUser}>
                  <View style={styles.feedElementUserInfo}>
                    <Image style={{width: 25, height: 25, borderRadius: 100}} source={{
                    uri: `data:image/png;base64,${activity.user.avatar}`,
                    }} />
                    <Text style={styles.feedElementUserText}>{activity.user.firstName + ' ' + activity.user.lastName}</Text>
                  </View>
                  {activity.type == 'run' && <FontAwesomeIcon icon={ faRunning } size={ 20 } color="#fff" />}
                  {activity.type == 'ride' && <FontAwesomeIcon icon={ faBiking } size={ 20 } color="#fff" />}
                  {activity.type == 'hike' && <FontAwesomeIcon icon={ faHiking } size={ 20 } color="#fff" />}
                </View>
                <View style={styles.feedElementDetails}>
                  <View>
                    <Text style={styles.feedElementDetailsTextDark}>{new Date(activity.start).toDateString()}</Text>
                    <Text style={{color: '#fff', fontSize: 14}}>{new Date(activity.start).toLocaleTimeString()}</Text>
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
                <View style={styles.feedElementReacts}>
                  <Pressable style={styles.feedElementReactLike} onPress={onLike}>
                    <VStack width={'50%'} height={10} bgColor={"#15573E"} alignItems="center" justifyContent={"center"}>
                      <FontAwesomeIcon icon={faHeart} size={30} color="#ffffff"/>
                    </VStack>
                  </Pressable>
                  <Pressable style={styles.feedElementReactComment} onPress={(e) => onActivityDetails(e, activity)}>
                    <VStack width={'50%'} height={10} bgColor={"#04AA6C"} alignItems="center" justifyContent={"center"}>
                      <FontAwesomeIcon icon={faPlus} size={30} color="#ffffff"/>
                    </VStack>
                  </Pressable>
                </View>
              </View>
            ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
