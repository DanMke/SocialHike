import {
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  ArrowBackIcon,
  Image,
  Button,
} from 'native-base';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import styles from './styles';
import api from '../../Services/api';

interface FollowingProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Following: React.FC<FollowingProps> = ({
  onUpdateUser,
  user,
  navigation,
}: FollowingProps) => {
  const [following, setFollowing] = React.useState([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [refreshing, setRefreshing] = React.useState<Boolean>(false);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    api
      .get('/users/' + user.email)
      .then(response => {
        onUpdateUser(response.data);
        var followingTemp = [];
        user.following.forEach((element: any) => {
          followingTemp.push(element.user);
        });
        setFollowing(followingTemp);
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

  const onUnfollow = (e: any, followingUser: any) => {
    api.delete('/users/' + user.email + '/following', {data: {following: followingUser.email}}).then(response => {
      setFollowing(following.filter((element: any) => element.email !== followingUser.email));
    }
    ).catch(error => {
      console.log(error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView
          style={{paddingHorizontal: 20, paddingTop: 20}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
                  style={styles.backIcon}
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
                {following.map((followingUser: any) => (
                  <View style={styles.feedElement} key={followingUser.email}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        width={12}
                        height={12}
                        borderRadius={100}
                        source={{
                          uri: `data:image/png;base64,${followingUser.avatar}`,
                        }}
                        alt="Alternate Text"
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          marginLeft: 15,
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          alignContent: 'flex-start',
                        }}>
                        <Text style={styles.feedElementDetailsTextDark}>
                          {followingUser.username}
                        </Text>
                        <Text style={styles.feedElementText}>
                          {followingUser.firstName}
                        </Text>
                      </View>
                    </View>
                    <Button
                      backgroundColor={'#15573E'}
                      onPress={e => onUnfollow(e, followingUser)}>
                      <Text style={styles.buttonText}>Unfollow</Text>
                    </Button>
                  </View>
                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Following);
