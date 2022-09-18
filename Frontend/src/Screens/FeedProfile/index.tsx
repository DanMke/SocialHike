import {
  ScrollView,
  Pressable,
  View,
  VStack,
  Text,
  ArrowBackIcon,
} from 'native-base';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGear, faDoorOpen} from '@fortawesome/free-solid-svg-icons';
import styles from './styles';

import {LineChart} from 'react-native-chart-kit';

import auth from '@react-native-firebase/auth';
import api from '../../Services/api';

interface FeedProfileProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const FeedProfile: React.FC<FeedProfileProps> = ({
  onUpdateUser,
  user,
  navigation,
}: FeedProfileProps) => {
  const [userProfile, setUserProfile] = React.useState<any>({
    followers: [],
    following: [],
  });

  const [allDurationTimeActivies, setAllDurationTimeActivies] =
    React.useState(0);
  const [allDistanceActivities, setAllDistanceActivities] = React.useState(0);
  const [activiesSize, setActiviesSize] = React.useState(0);
  const [activitiesDistanceByMonth, setActivitiesDistanceByMonth] =
    React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [refreshing, setRefreshing] = React.useState<Boolean>(false);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    var userEmail =
      navigation.getState().routes[navigation.getState().routes.length - 2]
        .params.activity.user.email;
    api.get('/users/' + userEmail.toLowerCase()).then(response => {
      setUserProfile(response.data);
      api
        .get('/activities/user/' + response.data._id)
        .then(response => {
          var activities = response.data;
          setActiviesSize(activities.length);
          var durationTime = 0;
          var distance = 0;
          var activitiesDistanceByMonthTemp = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ];
          activities.forEach((activity: any) => {
            durationTime += activity.duration;
            distance += activity.distance;
            activitiesDistanceByMonthTemp[new Date(activity.start).getMonth()] +=
              activity.distance;
          });
          setActivitiesDistanceByMonth(activitiesDistanceByMonthTemp);
          setAllDurationTimeActivies(durationTime);
          setAllDistanceActivities(distance);
          setLoading(false);
          setRefreshing(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    });

  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView style={{paddingHorizontal: 20}}>
          {loading ? (
            <View
              style={{
                width: '100%',
                height: Dimensions.get('screen').height * 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#04AA6C" />
            </View>
          ) : (
            <>
              <View style={styles.containerIcon}>
                <Pressable
                  style={styles.icon}
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
              <View>
                <View style={styles.profile}>
                  <View style={styles.profileUser}>
                    <Image
                      style={{width: 30, height: 30, borderRadius: 100}}
                      source={{
                        uri: `data:image/png;base64,${userProfile.avatar}`,
                      }}
                    />
                    <Text style={styles.feedElementUserText}>
                      {userProfile.firstName + ' ' + userProfile.lastName}
                    </Text>
                  </View>
                  <View style={styles.profileUserDetails}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.feedElementDetailsTextDark}>
                        Username
                      </Text>
                      <Text style={styles.feedElementDetailsText}>
                        {userProfile.username}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.feedElementDetailsTextDark}>
                        Followers
                      </Text>
                      <Text style={styles.feedElementDetailsText}>
                        {userProfile.followers.length}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.feedElementDetailsTextDark}>
                        Following
                      </Text>
                      <Text style={styles.feedElementDetailsText}>
                        {userProfile.following.length}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.activity}>
                  <Text style={styles.feedElementUserText}>
                    Activity in this Year
                  </Text>
                  <View style={styles.profileUserDetailsTwo}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.feedElementDetailsTextDark}>
                        Time
                      </Text>
                      <Text style={styles.feedElementDetailsText}>
                        {new Date(allDurationTimeActivies * 1000)
                          .toISOString()
                          .slice(11, 19)}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.feedElementDetailsTextDark}>
                        Distance
                      </Text>
                      <Text style={styles.feedElementDetailsText}>
                        {allDistanceActivities.toFixed(2) + 'KM'}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.feedElementDetailsTextDark}>
                        Activities
                      </Text>
                      <Text style={styles.feedElementDetailsText}>
                        {activiesSize}
                      </Text>
                    </View>
                  </View>
                  <LineChart
                    data={{
                      labels: [
                        'J',
                        'F',
                        'M',
                        'A',
                        'M',
                        'J',
                        'J',
                        'A',
                        'S',
                        'O',
                        'N',
                        'D',
                      ],
                      datasets: [
                        {
                          data: activitiesDistanceByMonth,
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width * 0.8} // from react-native
                    height={220}
                    yAxisSuffix={'km'}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: '#FAFAFA',
                      backgroundGradientFrom: '#FAFAFA',
                      backgroundGradientTo: '#FAFAFA',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(0, 120, 0, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(0, 120, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                        width: '100%',
                      },
                      propsForDots: {
                        r: '3',
                        strokeWidth: '2',
                        stroke: '#04AA6C',
                      },
                    }}
                    style={{
                      marginVertical: 8,
                      borderRadius: 5,
                      width: '100%',
                    }}
                  />
                </View>
              </View>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedProfile);
