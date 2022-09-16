import {ScrollView, Pressable, VStack, View, Text} from 'native-base';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import styles from './styles';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUsers,
  faBell,
  faClock,
  faRoute,
  faRunning,
  faHeart,
  faPlus,
  faBiking,
  faHiking,
} from '@fortawesome/free-solid-svg-icons';

import api from '../../Services/api';

import auth from '@react-native-firebase/auth';

interface HomeProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Home: React.FC<HomeProps> = ({
  onUpdateUser,
  user,
  navigation,
}: HomeProps) => {
  const [activities, setActivities] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [refreshing, setRefreshing] = React.useState<Boolean>(false);

  const onRefresh = React.useCallback((initial: Boolean = false) => {
    if (initial) {
      setRefreshing(true);
    }

    setLoading(true);
    if (!user) {
      const userFirebase = auth().currentUser;
      api
        .get('/users/' + userFirebase?.email)
        .then(response => {
          onUpdateUser(response.data);
          api
            .get('/activities')
            .then(response => {
              var allActivities = response.data;
              // TODO: Filter by following users
              setActivities(allActivities);
              setLoading(false);
              setRefreshing(false);
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
              setRefreshing(false);
            });
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          setRefreshing(false);
        });
    } else {
      api
        .get('/activities')
        .then(response => {
          // TODO: Filter by following users
          var allActivities = response.data.sort((a: any, b: any) => {
            return new Date(b.start).getTime() - new Date(a.start).getTime();
          });
          setActivities(allActivities);
          setLoading(false);
          setRefreshing(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          setRefreshing(false);
        });
    }
  }, []);

  useEffect(() => {
    onRefresh(true);
  }, []);

  const onActivityDetails = (e: any, activity: any) => {
    navigation.navigate('ActivityDetailsFeed', {activity: activity});
  };

  const onNotifications = () => {
    navigation.navigate('Notifications');
  };

  const onSocial = () => {
    navigation.navigate('Social');
  };

  const onLike = (e: any, activity: any) => {
    var action = 'add';
    if (activity.likes.some((like: any) => like._id === user._id)) {
      action = 'remove';
    }
    api
      .post('/activities/' + activity._id + '/like', {
        action: action,
        user: user._id,
      })
      .then(response => {
        console.log(response);
        var newActivities = activities.map((a: any) => {
          if (a._id === activity._id) {
            a.likes = response.data.likes;
          }
          return a;
        });
        setActivities(newActivities);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onUser = (e: any, activity: any) => {
    console.log(activity);
    // navigation.navigate('Home', {screen: 'FeedProfile', params: {user: activity}});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView
          style={{height: '100%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.containerIcon}>
            <Pressable style={styles.icon} onPress={onSocial}>
              <VStack
                width={50}
                height={50}
                bgColor={'#333333'}
                space={4}
                alignItems="center"
                justifyContent={'center'}
                borderRadius="10">
                <FontAwesomeIcon icon={faUsers} size={30} color="#ffffff" />
              </VStack>
            </Pressable>
            <Pressable style={styles.icon} onPress={onNotifications}>
              <VStack
                width={50}
                height={50}
                bgColor={'#333333'}
                space={4}
                alignItems="center"
                justifyContent={'center'}
                borderRadius="10">
                <FontAwesomeIcon icon={faBell} size={30} color="#ffffff" />
              </VStack>
            </Pressable>
          </View>
          {loading ? (
            <View style={styles.indicatorWrapper}>
              <ActivityIndicator size="large" color="#04AA6C" />
            </View>
          ) : activities.length === 0 ? (
            <View style={styles.indicatorWrapper}>
              <Text style={styles.feedElementDetailsTextDark}>
                No activities yet
              </Text>
            </View>
          ) : (
            activities.map(activity => (
              <View style={styles.feed} key={activity._id}>
                <View style={styles.feedElement}>
                  <Image
                    style={styles.feedElementMap}
                    source={{
                      uri: `data:image/png;base64,${activity.mapImage}`,
                    }}
                  />
                  <View style={styles.feedElementUser}>
                    <Pressable
                      style={styles.feedElementUserInfo}
                      onPress={e => onUser(e, activity.user)}>
                      <Image
                        style={{width: 25, height: 25, borderRadius: 100}}
                        source={{
                          uri: `data:image/png;base64,${activity.user.avatar}`,
                        }}
                      />
                      <Text style={styles.feedElementUserText}>
                        {activity.user.firstName + ' ' + activity.user.lastName}
                      </Text>
                    </Pressable>
                    {activity.type == 'run' && (
                      <FontAwesomeIcon
                        icon={faRunning}
                        size={20}
                        color="#fff"
                      />
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
                        {new Date(activity.start).toDateString()}
                      </Text>
                      <Text style={{color: '#fff', fontSize: 14}}>
                        {new Date(activity.start).toLocaleTimeString()}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.feedElementDetailsTextDark}>
                        Time Duration
                      </Text>
                      <View style={styles.feedElementDetailsTextWithImage}>
                        <FontAwesomeIcon
                          icon={faClock}
                          size={20}
                          color="#ffffff"
                        />
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
                        <FontAwesomeIcon
                          icon={faRoute}
                          size={20}
                          color="#ffffff"
                        />
                        <Text style={styles.feedElementDetailsText}>
                          {activity.distance.toFixed(2) + 'KM'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.feedElementReacts}>
                    <Pressable
                      style={styles.feedElementReactLike}
                      onPress={e => onLike(e, activity)}>
                      <VStack
                        width={'50%'}
                        height={10}
                        bgColor={'#15573E'}
                        alignItems="center"
                        justifyContent={'center'}>
                        <FontAwesomeIcon
                          icon={faHeart}
                          size={30}
                          color={
                            activity.likes.some(
                              (like: any) => like._id === user._id,
                            )
                              ? '#FF2400'
                              : '#fff'
                          }
                        />
                      </VStack>
                    </Pressable>
                    <Pressable
                      style={styles.feedElementReactComment}
                      onPress={e => onActivityDetails(e, activity)}>
                      <VStack
                        width={'50%'}
                        height={10}
                        bgColor={'#04AA6C'}
                        alignItems="center"
                        justifyContent={'center'}>
                        <FontAwesomeIcon
                          icon={faPlus}
                          size={30}
                          color="#ffffff"
                        />
                      </VStack>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))
          )}
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
