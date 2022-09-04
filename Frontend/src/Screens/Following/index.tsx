import {
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  ArrowBackIcon,
  Image,
  Button
} from 'native-base';
import React, {useEffect} from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import styles from './styles';
import api from '../../Services/api';

interface FollowingProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Following: React.FC<FollowingProps> = ({onUpdateUser, user, navigation}: FollowingProps) => {

  const [following, setFollowing] = React.useState([]);

  useEffect(() => {
    api.get('/users/' + user.email).then((response) => {
      onUpdateUser(response.data);
      setFollowing(user.following);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView style={{paddingHorizontal: 20, paddingTop: 20}}>
          <View style={styles.containerIcon}>
            <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <ArrowBackIcon size="xl" color="#ffffff" />
              </VStack>
            </Pressable>
          </View>
          <View>
            {following.map((followingUser: any) => (
              <View style={styles.feedElement} key={followingUser.email}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image width={12} height={12} borderRadius={100} source={{
                  uri: `data:image/png;base64,${followingUser.avatar}`,
                  }} alt="Alternate Text" />
                  <View style={{flexDirection: 'column', marginLeft: 15, justifyContent: 'center', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                    <Text style={styles.feedElementDetailsTextDark}>{followingUser.username}</Text>
                    <Text style={styles.feedElementText}>{followingUser.firstName}</Text>
                  </View>
                </View>
                <Button backgroundColor={"#04AA6C"} onPress={() => navigation.goBack()}>
                  <Text style={styles.buttonText}>Follow</Text>
                </Button>
              </View>
            ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Following);
