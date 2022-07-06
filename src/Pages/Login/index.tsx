import {
  Input,
  Text,
  VStack,
  FormControl,
  Button,
  WarningOutlineIcon,
  Link,
} from 'native-base';
import React from 'react';
import {View, SafeAreaView, Image} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import SocialHikeIcon from '../../../assets/socialhikeicon.png';

import styles from './styles';

interface LoginProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Login: React.FC<LoginProps> = ({onTest, user, navigation}: LoginProps) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (email === undefined || email === '') {
      setErrors({...errors, email: 'Email is required'});
      return false;
    } else if (password === undefined) {
      setErrors({...errors, password: 'Password is required'});
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate() ? console.log('Submitted') : console.log('Validation Failed');
    // TODO: navigate to Register screen
    navigation.navigate('Register');
  };

  const onCreateAnAccount = () => {
    navigation.navigate('Register');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerIcon}>
        <Image source={SocialHikeIcon} style={styles.icon} />
        <Text fontSize="3xl" fontFamily="Open Sans" style={styles.appNameText}>
          SocialHike
        </Text>
      </View>
      <View style={styles.containerInputs}>
        <VStack width="90%" mx="3" maxW="300px">
          <FormControl isInvalid={('email' || 'password') in errors}>
            <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}}>
              Email
            </FormControl.Label>
            <Input
              placeholder=""
              type="text"
              selectionColor={'#15573E'}
              size="md"
              _focus={{borderColor: '#15573E'}}
              color={'#E9E8E8'}
              variant="underlined"
              borderColor={'#04C37D'}
              onChangeText={value => setEmail(value)}
            />
            <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="8">
              Password
            </FormControl.Label>
            <Input
              placeholder=""
              type="password"
              selectionColor={'#15573E'}
              size="md"
              _focus={{borderColor: '#15573E'}}
              color={'#E9E8E8'}
              variant="underlined"
              borderColor={'#04C37D'}
              onChangeText={value => setPassword(value)}
            />
            {('email' || 'password') in errors && (
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Error
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <Link
            _text={{fontSize: 'md', fontWeight: '500', color: '#8C8A8C'}}
            alignSelf="center"
            mt="8">
            Forget Password?
          </Link>
          <Button
            onPress={onSubmit}
            mt="8"
            _text={{fontWeight: 'bold', fontSize: 'md', color: '#E9E8E8'}}
            backgroundColor={'#04AA6C'}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={10}>
            Log in
          </Button>
          <Button
            onPress={onCreateAnAccount}
            mt="8"
            _text={{fontWeight: 'bold', fontSize: 'md', color: '#E9E8E8'}}
            backgroundColor={'#15573E'}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={10}>
            Create An Account
          </Button>
        </VStack>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
