import {
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  ArrowBackIcon,
  Button,
  Input,
  Icon,
} from 'native-base';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import styles from './styles';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import api from '../../Services/api';

interface SocialProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Social: React.FC<SocialProps> = ({
  onUpdateUser,
  user,
  navigation,
}: SocialProps) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [usersList, setUsersList] = React.useState([]);
  const [originalUsersList, setOriginalUsersList] = React.useState([]);
  const [functionTimeout, setFunctionTimeout] = React.useState<NodeJS.Timeout>(
    null as unknown as NodeJS.Timeout,
  );
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [refreshing, setRefreshing] = React.useState<Boolean>(false);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    api
      .post('/users/social', {'email': user.email})
      .then(response => {
        setUsersList(response.data);
        setOriginalUsersList(response.data);
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

  function onSearch(query: string) {
    setSearchQuery(query);
    clearTimeout(functionTimeout);

    const timeout = setTimeout(() => {
      console.log(query);
      if (query === '') {
        setUsersList(originalUsersList);
      } else {
        const newList = usersList.filter(user =>
          String(user.username).toLowerCase().includes(query.toLowerCase()),
        );
        setUsersList(newList);
      }
    }, 1000);

    setFunctionTimeout(timeout);
  }

  const onFollow = (e: any, follower: any) => {
    e.preventDefault();
    api
      .post('/users/' + user.email.toLowerCase() + '/following', {
        following: follower.email,
      })
      .then(response => {
        onUpdateUser(response.data);
        onRefresh();
      })
      .catch(error => {
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
          <View style={styles.containerIcon}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'space-between',
              }}>
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
              <VStack w="80%" space={5} alignSelf="center">
                <Input
                  placeholder="Search users by username"
                  type="text"
                  selectionColor={'#15573E'}
                  size="md"
                  _focus={{borderColor: '#15573E'}}
                  color={'#E9E8E8'}
                  variant="outline"
                  borderColor={'#04C37D'}
                  InputLeftElement={
                    <Icon
                      size="5"
                      color="gray.400"
                      as={
                        <FontAwesomeIcon
                          style={{marginHorizontal: 10}}
                          icon={faSearch}
                          size={20}
                          color="#ffffff"
                        />
                      }
                    />
                  }
                  value={searchQuery}
                  onChangeText={value => onSearch(value)}
                />
              </VStack>
            </View>
          </View>
          <View>
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
              usersList.map((userList: any) => (
                <Pressable style={styles.feedElement} key={userList.user.email}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                      style={{width: 50, height: 50, borderRadius: 100}}
                      source={{
                        uri: `data:image/png;base64,${userList.user.avatar}`,
                      }}
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
                        {userList.user.username}
                      </Text>
                      <Text style={styles.feedElementText}>
                        {userList.user.firstName}
                      </Text>
                    </View>
                  </View>
                  <Button
                    backgroundColor={'#04AA6C'}
                    onPress={e => onFollow(e, userList.user)}>
                    <Text style={styles.buttonText}>Follow</Text>
                  </Button>
                </Pressable>
              ))
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
    onUpdateUser: (loggedUser: Object) => dispatch(updateUser(loggedUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Social);
