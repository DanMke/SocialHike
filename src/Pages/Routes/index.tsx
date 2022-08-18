import {
  ScrollView,
  View,
  Text,
} from 'native-base';
import React, {useEffect} from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import Geolocation from 'react-native-geolocation-service';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import styles from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons'

interface RoutesProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Routes: React.FC<RoutesProps> = ({onTest, user, navigation}: RoutesProps) => {

  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  useEffect(() => {
    // TODO geolocation request authorization if not authorized
    // Geolocation.requestAuthorization("always");
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

  } , []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.externalView}>
          <MapView style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
          </MapView>
          <ScrollView style={styles.routes}>
            <View style={styles.routeElement}>
              <View>
                <Text style={styles.routeElementText}>Percurso 1</Text>
              </View>
              <View style={styles.routeDetails}>
                <View style={styles.routeDistance}>
                  <Text style={styles.routeElementTextDark}>Distance</Text>
                  <View style={styles.routeElementTextWithImage}>
                    <FontAwesomeIcon icon={faRoute} size={20} color="#ffffff"/>
                    <Text style={styles.routeElementTextKM}>12.34KM</Text>
                  </View>
                </View>
                <View style={styles.routeElevation}> 
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.routeElementTextDark}>Max Elevation</Text>
                    <Text style={styles.routeElementTextValue}>1500 m</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.routeElementTextDark}>Min Elevation</Text>
                    <Text style={styles.routeElementTextValue}>500 m</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
