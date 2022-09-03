import {
  ScrollView,
  View,
  Text,
} from 'native-base';
import React from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock, faRoute, faRunning, faBolt, faFire } from '@fortawesome/free-solid-svg-icons'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import styles from './styles';

import {
  LineChart,
} from "react-native-chart-kit";

interface ActivityProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Activity: React.FC<ActivityProps> = ({onTest, user, navigation}: ActivityProps) => {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView style={{paddingHorizontal: 20, paddingTop: 20}}>
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
              <View style={styles.feedElementInfo}>
                <Text style={styles.feedElementDetailsTextDark}>05 May 2022</Text>
                <Text style={{color: '#fff', fontSize: 14}}>4:15 PM</Text>
              </View>
              <FontAwesomeIcon icon={faRunning} size={20} color="#ffffff"/>
            </View>
            <View style={styles.feedElementDetails}>
              <View>
                <Text style={styles.feedElementDetailsTextDark}>Calories Burned</Text>
                <View style={styles.feedElementDetailsTextWithImage}>
                  <FontAwesomeIcon icon={faFire} size={20} color="#ffffff"/>
                  <Text style={styles.feedElementDetailsText}>802kcal</Text>
                </View>
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
            <View style={styles.feedElementDetailsTwo}>
              <View>
                <Text style={styles.feedElementDetailsTextDark}>Average Speed</Text>
                <View style={styles.feedElementDetailsTextWithImage}>
                  <FontAwesomeIcon icon={faBolt} size={20} color="#ffffff"/>
                  <Text style={styles.feedElementDetailsText}>8.02km/h</Text>
                </View>
              </View>
              <View>
                <Text style={styles.feedElementDetailsTextDark}>Max Speed</Text>
                <View style={styles.feedElementDetailsTextWithImage}>
                  <FontAwesomeIcon icon={faBolt} size={20} color="#ffffff"/>
                  <Text style={styles.feedElementDetailsText}>8.02km/h</Text>
                </View>
              </View>
            </View>
            <View style={styles.routeDetails}>
              <View style={styles.routeElevation}> 
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Max Elevation</Text>
                  <Text style={styles.feedElementDetailsText}>1500 m</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Average Elevation</Text>
                  <Text style={styles.feedElementDetailsText}>500 m</Text>
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.feedElementDetailsTextDark}>Elevation</Text>
                <LineChart
                  data={{
                    labels: ['100', '200', '300'],
                    datasets: [
                      {
                        data: [
                          800,
                          1200,
                          1500,
                          500,
                          1500,
                          1500,
                          1500,
                          1500,
                          1500,
                        ]
                      }
                    ],
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
            <View style={styles.routeDetails}>
              <View style={styles.routeElevation}> 
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>     Max Pace    </Text>
                  <Text style={styles.feedElementDetailsText}>6:04/KM</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>     Average Pace    </Text>
                  <Text style={styles.feedElementDetailsText}>5:04/KM</Text>
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.feedElementDetailsTextDark}>Pace  </Text>
                <LineChart
                  data={{
                    labels: ['100', '200', '300'],
                    datasets: [
                      {
                        data: [
                          800,
                          1200,
                          1500,
                          500,
                          1500,
                          1500,
                          1500,
                          1500,
                          1500,
                        ]
                      }
                    ],
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

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
