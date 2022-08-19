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
import { faGear } from '@fortawesome/free-solid-svg-icons'
import styles from './styles';

import {LineChart} from "react-native-chart-kit";

interface ProfileProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({onTest, user, navigation}: ProfileProps) => {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView style={{paddingHorizontal: 20}}>
          <View style={styles.containerIcon}>
            <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <FontAwesomeIcon icon={faGear} size={30} color="#ffffff"/>
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
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Followers</Text>
                  <Text style={styles.feedElementDetailsText}>9</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>Following</Text>
                  <Text style={styles.feedElementDetailsText}>12</Text>
                </View>
              </View>
            </View>
            <View style={styles.activity}>
              <Text style={styles.feedElementUserText}>Activity in Time</Text>
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
                  <Text style={styles.feedElementDetailsTextDark}>Weight</Text>
                  <Text style={styles.feedElementDetailsText}>98kg</Text>
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
    onTest: () => dispatch(updateUser({name: 'Jobs'})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
