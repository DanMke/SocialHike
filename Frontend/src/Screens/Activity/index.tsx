import {ScrollView, View, Text, Pressable} from 'native-base';
import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
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

import api from '../../Services/api';

import styles from './styles';
interface ActivityProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Activity: React.FC<ActivityProps> = ({
  onUpdateUser,
  user,
  navigation,
}: ActivityProps) => {
  const [activities, setActivities] = React.useState([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [refreshing, setRefreshing] = React.useState<Boolean>(false);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    api
      .get('/activities/user/' + user.email)
      .then(response => {
        response.data.sort((a: any, b: any) => {
          return new Date(b.start).getTime() - new Date(a.start).getTime();
        });
        setActivities(response.data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  const onActivityDetails = (e: any, activity: any) => {
    navigation.navigate('ActivityDetails', {activity: activity});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{paddingTop: 40}} />
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
            activities.map((activity: any) => (
              <View
                style={{paddingHorizontal: 20, paddingVertical: 10}}
                key={activity._id}>
                <View style={styles.feedElement}>
                  <View>
                    <Image
                      style={{width: '100%', height: 150}}
                      source={{
                        uri: `data:image/png;base64,${activity.mapImage}`,
                      }}
                    />
                  </View>

                  <Pressable onPress={e => onActivityDetails(e, activity)}>
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
                        <FontAwesomeIcon
                          icon={faRunning}
                          size={20}
                          color="#fff"
                        />
                      )}
                      {activity.type == 'ride' && (
                        <FontAwesomeIcon
                          icon={faBiking}
                          size={20}
                          color="#fff"
                        />
                      )}
                      {activity.type == 'hike' && (
                        <FontAwesomeIcon
                          icon={faHiking}
                          size={20}
                          color="#fff"
                        />
                      )}
                    </View>
                    <View style={styles.feedElementDetails}>
                      <View>
                        <Text style={styles.feedElementDetailsTextDark}>
                          Calories Burned
                        </Text>
                        <View style={styles.feedElementDetailsTextWithImage}>
                          <FontAwesomeIcon
                            icon={faFire}
                            size={20}
                            color="#ffffff"
                          />
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
                    <View style={styles.feedElementDetailsTwo}>
                      <View>
                        <Text style={styles.feedElementDetailsTextDark}>
                          Average Speed
                        </Text>
                        <View style={styles.feedElementDetailsTextWithImage}>
                          <FontAwesomeIcon
                            icon={faBolt}
                            size={20}
                            color="#ffffff"
                          />
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
                          <FontAwesomeIcon
                            icon={faBolt}
                            size={20}
                            color="#ffffff"
                          />
                          <Text style={styles.feedElementDetailsText}>
                            {activity.maxSpeed.toFixed(2) + 'km/h'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
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

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
