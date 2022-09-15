import {
  Input,
  Text,
  VStack,
  FormControl,
  Button,
  WarningOutlineIcon,
  Link,
  IconButton,
  Modal,
} from 'native-base';
import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import SocialHikeIcon from '../../../assets/socialhikeicon.png';
import auth from '@react-native-firebase/auth';

import api from '../../Services/api';

import styles from './styles';

interface LoginProps {
  onUpdateUser?: any;
  user: any;
  navigation: any;
}

const Login: React.FC<LoginProps> = ({
  onUpdateUser,
  user,
  navigation,
}: LoginProps) => {
  const [email, setEmail] = React.useState('');
  const [emailForgotPassword, setEmailForgotPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const [showModal, setShowModal] = React.useState(false);

  const [showModalError, setShowModalError] = React.useState(false);
  const [modalErrorMessage, setModalErrorMessage] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    if (
      email === undefined ||
      email === '' ||
      password === undefined ||
      password === ''
    ) {
      setErrors({
        ...errors,
        email: 'Email is required',
        password: 'Password is required',
      });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (validate()) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          console.log('User account signed in!');
          // console.log(userCredential);
          console.log('/users/' + email)
          api
            .get('/users/' + email.toLowerCase())
            .then(response => {
              // console.log(response.data);
              onUpdateUser(response.data);
              setErrors({});
              console.log('aquiiii');
              navigation.navigate('TabRoutes', {screen: 'Home'});
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
            });
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error);
          if (errorCode === 'auth/invalid-email') {
            setModalErrorMessage('Invalid email address');
            setShowModalError(true);
          }
          if (errorCode === 'auth/wrong-password') {
            setModalErrorMessage('Wrong password.');
            setShowModalError(true);
          }
          if (errorCode === 'auth/user-not-found') {
            setModalErrorMessage('User not found.');
            setShowModalError(true);
          }

          setLoading(false);
        });
    } else {
      console.log(errors);
      console.log('Validation Failed');
    }
  };

  const onForgotPassword = () => {
    auth()
      .sendPasswordResetEmail(emailForgotPassword)
      .then(() => {
        console.log('Password reset email sent!');
        setShowModal(false);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
        if (errorCode === 'auth/invalid-email') {
          setModalErrorMessage('Invalid email address');
          setShowModalError(true);
        }
        if (errorCode === 'auth/user-not-found') {
          setModalErrorMessage('User not found.');
          setShowModalError(true);
        }
      });
  };

  const onCreateAnAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <View style={{width: '100%', height: '100%'}}>
          <View style={styles.containerIcon}>
            <Image source={SocialHikeIcon} style={styles.icon} />
            <Text fontSize="3xl" style={styles.appNameText}>
              SocialHike
            </Text>
          </View>
          <View style={styles.containerInputs}>
            <VStack width="90%" mx="3" maxW="320px">
              <FormControl isInvalid={'email' in errors}>
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
                {'email' in errors && (
                  <FormControl.ErrorMessage
                    fontSize={'sm'}
                    leftIcon={<WarningOutlineIcon size="sm" />}>
                    {errors.email}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={'password' in errors}>
                <FormControl.Label
                  _text={{fontSize: 'md', color: '#8C8A8C'}}
                  mt="5">
                  Password
                </FormControl.Label>
                <Input
                  placeholder=""
                  selectionColor={'#15573E'}
                  size="md"
                  _focus={{borderColor: '#15573E'}}
                  color={'#E9E8E8'}
                  variant="underlined"
                  borderColor={'#04C37D'}
                  onChangeText={value => setPassword(value)}
                  type={showPassword ? 'text' : 'password'}
                  InputRightElement={
                    <IconButton
                      icon={
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          size={20}
                          color="#8C8A8C"
                        />
                      }
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
                {'password' in errors && (
                  <FormControl.ErrorMessage
                    fontSize={'sm'}
                    leftIcon={<WarningOutlineIcon size="sm" />}>
                    {errors.password}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <Link
                _text={{fontSize: 'md', fontWeight: '500', color: '#8C8A8C'}}
                alignSelf="center"
                mt="5"
                onPress={() => setShowModal(true)}>
                Forgot Password?
              </Link>
              {loading ? (
                <ActivityIndicator size="large" color="#04AA6C" />
              ) : (
                <>
                  <Button
                    onPress={onSubmit}
                    mt="5"
                    _text={{
                      fontWeight: 'bold',
                      fontSize: 'md',
                      color: '#E9E8E8',
                    }}
                    backgroundColor={'#04AA6C'}
                    paddingTop={4}
                    paddingBottom={4}
                    borderRadius={10}>
                    Log in
                  </Button>
                  <Button
                    onPress={onCreateAnAccount}
                    mt="5"
                    _text={{
                      fontWeight: 'bold',
                      fontSize: 'md',
                      color: '#E9E8E8',
                    }}
                    backgroundColor={'#15573E'}
                    paddingTop={4}
                    paddingBottom={4}
                    borderRadius={10}>
                    Create An Account
                  </Button>
                </>
              )}
            </VStack>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Forgot Password?</Modal.Header>
                <Modal.Body>
                  Enter email address and we'll send a link to reset your
                  password.
                  <FormControl>
                    <FormControl.Label mt={4}>Email</FormControl.Label>
                    <Input
                      placeholder=""
                      type="text"
                      selectionColor={'#15573E'}
                      size="md"
                      _focus={{borderColor: '#15573E'}}
                      color={'#15573E'}
                      variant="underlined"
                      borderColor={'#04C37D'}
                      onChangeText={value => setEmailForgotPassword(value)}
                    />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      backgroundColor={'#15573E'}
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      backgroundColor={'#04AA6C'}
                      onPress={() => {
                        setShowModal(false);
                        onForgotPassword();
                      }}>
                      Send Email
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            <Modal
              isOpen={showModalError}
              onClose={() => setShowModalError(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Invalid Data</Modal.Header>
                <Modal.Body>{modalErrorMessage}</Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      backgroundColor={'#15573E'}
                      onPress={() => {
                        setShowModalError(false);
                      }}>
                      Okay
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
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
    onUpdateUser: (loggedUser: Object) => dispatch(updateUser(loggedUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
