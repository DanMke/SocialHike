import {
  ScrollView,
  View,
  Text,
} from 'native-base';
import React, {useEffect} from 'react';
import {SafeAreaView, KeyboardAvoidingView, PermissionsAndroid, Image, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import Geolocation from 'react-native-geolocation-service';

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 

import styles from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons'

import {LineChart} from "react-native-chart-kit";
import api from '../../Services/api';

import PinStartIcon from '../../../assets/pinStart.png';

interface RoutesProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Routes: React.FC<RoutesProps> = ({onTest, user, navigation}: RoutesProps) => {

  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [routes, setRoutes] = React.useState([]);
  const [elevations, setElevations] = React.useState<any[]>([0]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
    // TODO: pegar as activities e os inicios de rotas e desenhar no mapa

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        api.get('/activities/near').then((response) => {
          setRoutes(response.data);
          setElevations(response.data.map((route: any) => route.elevation));
        }).catch((error) => {
          console.log(error);
        });
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

  } , []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
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
            {routes.map((route: any) => (
              <Marker
                coordinate={{
                  latitude: route.initialCoord.latitude,
                  longitude: route.initialCoord.longitude,
                }}
                title={'Distance: ' + route.distance.toFixed(2) + ' KM'}
                key={route._id}
                onPress={(event) => {
                  if (event.nativeEvent.action === 'marker-press') {
                    console.log("porra")
                    console.log(route._id)
                  } else {
                    console.log("não é")
                  }

                }}
              >
                {/* <Callout tooltip> */}
                  <TouchableHighlight onPress={() => console.log('p')} onShowUnderlay={()=> console.log(route._id)}>
                  <Image
                    source={PinStartIcon}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                  </TouchableHighlight>
                {/* </Callout> */}
              </Marker>
            ))}
          </MapView>
          <ScrollView>
            <View style={styles.routes}>
              {routes.map((route: any) => (
                <View style={styles.routeElement} key={route._id}>
                  <View>
                    <Text style={styles.routeElementText}>{new Date(route.start).toDateString() + ' ' + new Date(route.start).toLocaleTimeString()}</Text>
                  </View>
                  <View style={styles.routeDetails}>
                    <View style={styles.routeDistance}>
                      <Text style={styles.routeElementTextDark}>Distance</Text>
                      <View style={styles.routeElementTextWithImage}>
                        <FontAwesomeIcon icon={faRoute} size={20} color="#ffffff"/>
                        <Text style={styles.routeElementTextKM}>{route.distance.toFixed(2) + 'KM'}</Text>
                      </View>
                      <Text style={styles.routeElementTextDark}>Average Elevation</Text>
                      <Text style={styles.routeElementTextValue}>{route.maxElevation.toFixed(2) + 'm'}</Text>
                    </View>
                    <View style={styles.routeElevation}> 
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.routeElementTextDark}>Max Elevation</Text>
                        <Text style={styles.routeElementTextValue}>{route.maxElevation.toFixed(2) + 'm'}</Text>
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.routeElementTextDark}>Min Elevation</Text>
                        <Text style={styles.routeElementTextValue}>{Math.min(...route.elevations).toFixed(2) + 'm'}</Text>
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.routeElementTextDark}>Elevation</Text>
                      <LineChart
                        data={{
                          labels: route.elevations,
                          datasets: [
                            {
                              data: route.elevations
                            }
                          ]
                        }}
                        width={120} // from react-native
                        height={60}
                        withVerticalLabels={false} // optional, defaults to false
                        withHorizontalLabels={false} // optional, defaults to false
                        chartConfig={{
                          backgroundColor: "#FAFAFA",
                          backgroundGradientFrom: "#FAFAFA",
                          backgroundGradientTo: "#FAFAFA",
                          color: (opacity = 1) => `rgba(0, 120, 0, ${opacity})`,
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
              ))}
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
