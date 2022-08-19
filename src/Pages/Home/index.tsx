import {
  ScrollView,
  Pressable,
  VStack,
  View,
  Image,
  Text
} from 'native-base';
import React from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import styles from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers, faBell, faClock, faRoute, faRunning, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

interface HomeProps {
  onTest?: any;
  user: any;
  navigation: any;
}

let mock = [
  {

  }
]

const Home: React.FC<HomeProps> = ({onTest, user, navigation}: HomeProps) => {

  const onFeedDetails = () => {
    navigation.navigate('FeedDetails');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={styles.containerIcon}>
            <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <FontAwesomeIcon icon={faUsers} size={30} color="#ffffff"/>
              </VStack>
            </Pressable>
            <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <FontAwesomeIcon icon={faBell} size={30} color="#ffffff"/>
              </VStack>
            </Pressable>
          </View>
          <View style={styles.feed}>
            <View style={styles.feedElement}>
              <MapView style={styles.feedElementMap}
              showsUserLocation={false}
              followsUserLocation={false}
              showsMyLocationButton={false}
              scrollEnabled={false}
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              region={{
                latitude: -15.8426396,
                longitude: -48.0511031,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }} />
              <View style={styles.feedElementUser}>
                <View style={styles.feedElementUserInfo}>
                  <Image width={8} height={8} borderRadius={100} source={{
                  uri: "https://wallpaperaccess.com/full/317501.jpg"
                  }} alt="Alternate Text" />
                  <Text style={styles.feedElementUserText}>Daniel Maike</Text>
                </View>
                <FontAwesomeIcon icon={faRunning} size={20} color="#ffffff"/>
              </View>
              <View style={styles.feedElementDetails}>
                <View>
                  <Text style={styles.feedElementDetailsTextDark}>05 May 2022</Text>
                  <Text style={{color: '#fff', fontSize: 14}}>4:15 PM</Text>
                </View>
                <View>
                  <Text style={styles.feedElementDetailsTextDark}>Time Duration</Text>
                  <View style={styles.feedElementDetailsTextWithImage}>
                    <FontAwesomeIcon icon={faClock} size={20} color="#ffffff"/>
                    <Text style={styles.feedElementDetailsText}>2:24:02h</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.feedElementDetailsTextDark}>Distance</Text>
                  <View style={styles.feedElementDetailsTextWithImage}>
                    <FontAwesomeIcon icon={faRoute} size={20} color="#ffffff"/>
                    <Text style={styles.feedElementDetailsText}>12.34KM</Text>
                  </View>
                </View>
              </View>
              <View style={styles.feedElementReacts}>
                <Pressable style={styles.feedElementReactLike} onPress={() => navigation.goBack()}>
                  <VStack width={'50%'} height={10} bgColor={"#15573E"} alignItems="center" justifyContent={"center"}>
                    <FontAwesomeIcon icon={faHeart} size={30} color="#ffffff"/>
                  </VStack>
                </Pressable>
                <Pressable style={styles.feedElementReactComment} onPress={onFeedDetails}>
                  <VStack width={'50%'} height={10} bgColor={"#04AA6C"} alignItems="center" justifyContent={"center"}>
                    <FontAwesomeIcon icon={faPlus} size={30} color="#ffffff"/>
                  </VStack>
                </Pressable>
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
    onTest: () => dispatch(updateUser({name: 'Jobs'})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
