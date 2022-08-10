import {
  Input,
  Text,
  VStack,
  FormControl,
  Button,
  WarningOutlineIcon,
  Link,
  IconButton,
  ScrollView,
} from 'native-base';
import React from 'react';
import {View, SafeAreaView, Image, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import styles from './styles';

interface HomeProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Home: React.FC<HomeProps> = ({onTest, user, navigation}: HomeProps) => {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
              
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
