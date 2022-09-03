import {
  ScrollView,
  Image,
  Pressable,
  View,
  VStack,
  Text,
} from 'native-base';
import React from 'react';
import {SafeAreaView, KeyboardAvoidingView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import styles from './styles';

import {LineChart} from "react-native-chart-kit";

import auth from '@react-native-firebase/auth';

interface ProfileProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({onUpdateUser, user, navigation}: ProfileProps) => {

  const onFollowers = () => {
    // TODO: endpoint for followers
    navigation.navigate('Followers');
  };

  const onFollowing = () => {
    // TODO: endpoint for following
    navigation.navigate('Following');
  };

  const onEditProfile = () => {
    // TODO: endpoint for edit profile
    navigation.navigate('EditProfile');
  };
  
  const onSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        onUpdateUser(null);
        navigation.navigate('Login');
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
                <Image width={8} height={8} borderRadius={100} source={{
                  uri: "https://wallpaperaccess.com/full/317501.jpg"
                }} alt="Alternate Text" />
                <Text style={styles.feedElementUserText}>Daniel Maike</Text>
              </View>
              <View style={styles.profileUserDetails}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Username</Text>
                  <Text style={styles.feedElementDetailsText}>@danielmaike</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Height</Text>
                  <Text style={styles.feedElementDetailsText}>1.78m</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Weight</Text>
                  <Text style={styles.feedElementDetailsText}>98kg</Text>
                </View>
              </View>
              <View style={styles.profileUserDetailsTwo}>
                <Pressable style={{alignItems: 'center'}} onPress={onFollowers}>
                  <Text style={styles.feedElementDetailsTextDark}>Followers</Text>
                  <Text style={styles.feedElementDetailsText}>9</Text>
                </Pressable>
                <Pressable style={{alignItems: 'center'}} onPress={onFollowing}>
                  <Text style={styles.feedElementDetailsTextDark}>Following</Text>
                  <Text style={styles.feedElementDetailsText}>12</Text>
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
