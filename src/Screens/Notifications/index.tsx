import {
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  ArrowBackIcon
} from 'native-base';
import React from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'


import styles from './styles';

interface NotificationsProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Notifications: React.FC<NotificationsProps> = ({onTest, user, navigation}: NotificationsProps) => {

  const mockNotifications = [
    {
      id: 1,
      title: 'New post',
      description: 'New post from @user',
      date: '05 May 2022 - 4:15 PM'
    },
    {
      id: 2,
      title: 'New post',
      description: 'New post from @user',
      date: '05 May 2022 - 6:15 PM'
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView style={{paddingHorizontal: 20, paddingTop: 20}}>
          <View style={styles.containerIcon}>
            <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <ArrowBackIcon size="xl" color="#ffffff" />
              </VStack>
            </Pressable>
          </View>
          <View>
            {mockNotifications.map((notification) => {
              return (
                <View style={styles.notificationElement}>
                  <View style={{flexDirection: 'row'}}>
                    <FontAwesomeIcon icon={faBell} size={20} color="#ffffff"/>
                    <Text style={styles.notificationElementText}>{notification.title}</Text>
                  </View>
                  <View style={{marginTop: 10, marginBottom: 5}}>
                  <Text style={styles.feedElementDetailsTextDark}>{notification.date}</Text>
                  <Text style={styles.feedElementDetailsText}>{notification.description}</Text>
                  </View>
                </View>
              )}
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
