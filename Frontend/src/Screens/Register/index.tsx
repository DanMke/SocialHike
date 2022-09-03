import {
    Input,
    VStack,
    FormControl,
    Button,
    WarningOutlineIcon,
    IconButton,
    Pressable,
    ArrowBackIcon,
    Modal
  } from 'native-base';
import React from 'react';
import {View, SafeAreaView, Image, ScrollView, KeyboardAvoidingView} from 'react-native';

import DatePicker from 'react-native-date-picker'

import styles from './styles';

import SocialHikeIcon from '../../../assets/socialhikeicon.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import auth from '@react-native-firebase/auth';

import api from '../../Services/api';

import * as ImagePicker from 'react-native-image-picker';

interface RegisterProps {
  navigation: any;
}

const Register: React.FC<RegisterProps> = ({navigation}: RegisterProps) => {

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [weight, setWeight] = React.useState<number>(0.0);
  const [height, setHeight] = React.useState<number>(0.0);
  const [birth, setBirth] = React.useState<Date>(new Date());
  const [username, setUsername] = React.useState<string>('');
  const [avatar, setAvatar] = React.useState<string>('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');

  const [errors, setErrors] = React.useState({});

  const [showPassword, setShowPassword] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');

  const validate = () => {
    let valid = true;
    let e = {};
    if (email === undefined || email === '') {
      e = Object.assign(e, {email: 'Email is required or incorrect'});
      valid = false;
    }
    if (password === undefined || password === '') {
      e = Object.assign(e, {password: 'Password is required or incorrect'});
      valid = false;
    }
    if (confirmPassword === undefined || confirmPassword === '') {
      e = Object.assign(e, {confirmPassword: 'Confirm Password is required or incorrect'});
      valid = false;
    }
   
    if (firstName === undefined || firstName === '') {
      e = Object.assign(e, {firstName: 'First Name is required or incorrect'});
      valid = false;
    }
    if (lastName === undefined || lastName === '') {
      e = Object.assign(e, {lastName: 'Last Name is required or incorrect'});
      valid = false;
    }
    if (weight === undefined || weight === 0.0) {
      e = Object.assign(e, {weight: 'Weight is required or incorrect'});
      valid = false;
    }
    if (height === undefined || height === 0.0) {
      e = Object.assign(e, {height: 'Height is required or incorrect'});
      valid = false;
    }
    if (birth === undefined || birth.getFullYear() > 2010) {
      e = Object.assign(e, {birth: 'Birth is required or incorrect'});
      valid = false;
    }
    if (username === undefined || username === '') {
      e = Object.assign(e, {username: 'Username is required or incorrect'});
      valid = false;
    }
    setErrors(e);
    return valid;
  };
  
  const onCreateAnAccount = () => {
    if (password !== confirmPassword) {
      setModalMessage('Passwords do not match');
      setShowModal(true);
    } else if (validate()) {
      console.log('Submitted and Validated');
      auth().createUserWithEmailAndPassword(email, password).then(() => {
        
        console.log('User account created & signed in!');

        api.post('/users', {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          weight: weight,
          height: height,
          birth: birth,
          username: username,
          avatar: avatar
        }).then((response) => {
          console.log(response.data);
          setErrors({});
          navigation.navigate('Login');
        }).catch((error) => {
          console.log(error);
        });
        
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setModalMessage('That email address is already in use!');
          setShowModal(true);
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setModalMessage('That email address is invalid!');
          setShowModal(true);
        }
        if (error.code === 'auth/weak-password') {
          console.log('Password is too weak!');
          setModalMessage('Password is too weak!');
          setShowModal(true);
        }
        console.error(error);
      });
    } else {
      console.log(errors);
      console.log('Validation Failed');
    }
  }

  const onChooseAvatar = () => {  
    const options = {
      mediaType: 'photo',
      maxWidth: 80,
      maxHeight: 80,
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
          console.log('User cancelled image picker');
      } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
      } else {
        setAvatar(response.assets[0].base64);
      }
    });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <View style={styles.containerIcon}>
            <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <ArrowBackIcon size="xl" color="#ffffff" />
              </VStack>
            </Pressable>
            <Image source={SocialHikeIcon} style={styles.icon} alt="App Icon" />
          </View>
          <View style={styles.containerInputs}>
            <VStack width="90%" mx="3" maxW="320px">
              <View>
              <View style={{flexDirection: "row", alignItems: 'center'}}>
                <Pressable onPress={onChooseAvatar}>
                  <Image style={{width: 80, height: 80, borderRadius: 100}} source={{
                      uri: `data:image/png;base64,${avatar}`,
                      }} />
                </Pressable>
                <View style={{flexDirection: "column", width: '70%', marginLeft: 15}}>
                  <FormControl isInvalid={('firstName' in errors)}>
                    <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="0">First Name</FormControl.Label>
                    <Input
                      placeholder=""
                      type="text"
                      selectionColor={'#15573E'}
                      size="md"
                      _focus={{borderColor: '#15573E'}}
                      color={'#E9E8E8'}
                      variant="underlined"
                      borderColor={'#04C37D'}
                      onChangeText={value => setFirstName(value)}
                    />
                    {('firstName') in errors && (
                      <FormControl.ErrorMessage fontSize={'sm'} leftIcon={<WarningOutlineIcon size="sm" />}>
                        {errors.firstName}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>  
                  <FormControl isInvalid={('lastName' in errors)}>
                    <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Last Name</FormControl.Label>
                    <Input
                      placeholder=""
                      type="text"
                      selectionColor={'#15573E'}
                      size="md"
                      _focus={{borderColor: '#15573E'}}
                      color={'#E9E8E8'}
                      variant="underlined"
                      borderColor={'#04C37D'}
                      onChangeText={value => setLastName(value)}
                    />
                    {('lastName') in errors && (
                      <FormControl.ErrorMessage fontSize={'sm'} leftIcon={<WarningOutlineIcon size="sm" />}>
                        {errors.lastName}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </View>
              </View>
              </View>
              <FormControl isInvalid={('email' in errors)}>
                <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="0">Email</FormControl.Label>
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
                  <FormControl.ErrorMessage fontSize={'sm'} leftIcon={<WarningOutlineIcon size="sm" />}>
                    {errors.email}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={('username' in errors)}>
                <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Username</FormControl.Label>
                <Input
                  placeholder=""
                  type="text"
                  selectionColor={'#15573E'}
                  size="md"
                  _focus={{borderColor: '#15573E'}}
                  color={'#E9E8E8'}
                  variant="underlined"
                  borderColor={'#04C37D'}
                  onChangeText={value => setUsername(value)}
                />
                
                {'username' in errors && (
                  <FormControl.ErrorMessage fontSize={'sm'} leftIcon={<WarningOutlineIcon size="sm" />}>
                    {errors.username}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={('password' in errors)}>
                <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Password</FormControl.Label>
                <Input
                  placeholder=""
                  selectionColor={'#15573E'}
                  size="md"
                  _focus={{borderColor: '#15573E'}}
                  color={'#E9E8E8'}
                  variant="underlined"
                  borderColor={'#04C37D'}
                  onChangeText={value => setPassword(value)}
                  type={showPassword ? "text" : "password"} 
                  InputRightElement={<IconButton icon={<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={20} color="#8C8A8C"/>} onPress={() => setShowPassword(!showPassword)}/>}
                />
                {'password' in errors && (
                  <FormControl.ErrorMessage fontSize={'sm'} leftIcon={<WarningOutlineIcon size="sm" />}>
                    {errors.password}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={('confirmPassword' in errors)}>
                <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Confirm Password</FormControl.Label>
                <Input
                  placeholder=""
                  selectionColor={'#15573E'}
                  size="md"
                  _focus={{borderColor: '#15573E'}}
                  color={'#E9E8E8'}
                  variant="underlined"
                  borderColor={'#04C37D'}
                  onChangeText={value => setConfirmPassword(value)}
                  type={showPassword ? "text" : "password"} 
                  InputRightElement={<IconButton icon={<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={20} color="#8C8A8C"/>} onPress={() => setShowPassword(!showPassword)}/>}
                />
                {('confirmPassword') in errors && (
                  <FormControl.ErrorMessage fontSize={'sm'} leftIcon={<WarningOutlineIcon size="sm" />}>
                    {errors.confirmPassword}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              
              <FormControl isInvalid={('weight' in errors)}>
                <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Weight</FormControl.Label>
                <Input
                  placeholder=""
                  type="text"
                  keyboardType='numeric'
                  selectionColor={'#15573E'}
                  size="md"
                  _focus={{borderColor: '#15573E'}}
                  color={'#E9E8E8'}
                  variant="underlined"
                  borderColor={'#04C37D'}
                  rightIcon={<WarningOutlineIcon size="xs" />}
                  onChangeText={value => setWeight((value as unknown) as number)}
                />
                {('weight') in errors && (
                  <FormControl.ErrorMessage fontSize={'sm'} leftIcon={<WarningOutlineIcon size="sm" />}>
                    {errors.weight}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={('height' in errors)}>
                <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Height</FormControl.Label>
                <Input
                  placeholder=""
                  type="text"
                  keyboardType='numeric'
                  selectionColor={'#15573E'}
                  size="md"
                  _focus={{borderColor: '#15573E'}}
                  color={'#E9E8E8'}
                  variant="underlined"
                  borderColor={'#04C37D'}
                  onChangeText={value => setHeight((value as unknown) as number)}
                />
                {('height') in errors && (
                  <FormControl.ErrorMessage fontSize={'sm'} leftIcon={<WarningOutlineIcon size="sm" />}>
                    {errors.height}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={('birth' in errors)}>
                <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Birth</FormControl.Label>
                <Input
                  placeholder=""
                  type="text"
                  keyboardType='numeric'
                  selectionColor={'#15573E'}
                  size="md"
                  _focus={{borderColor: '#15573E'}}
                  color={'#E9E8E8'}
                  variant="underlined"
                  borderColor={'#04C37D'}
                  onPressIn={() => setShowDatePicker(true)}
                  value={birth.toLocaleDateString("en-US")}
                  onChangeText={value => setBirth((value as unknown) as Date)}
                />
                <DatePicker
                  modal
                  open={showDatePicker}
                  date={birth}
                  mode="date"
                  onConfirm={(date) => {
                    setShowDatePicker(false)
                    setBirth(date)
                  }}
                  onCancel={() => {
                    setShowDatePicker(false)
                  }}
                />

                {('birth') in errors && (
                  <FormControl.ErrorMessage fontSize={'sm'} leftIcon={<WarningOutlineIcon size="sm" />}>
                    {errors.birth}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <Button
                onPress={onCreateAnAccount}
                mt="8"
                _text={{fontWeight: 'bold', fontSize: 'md', color: '#E9E8E8'}}
                backgroundColor={'#15573E'}
                paddingTop={4}
                paddingBottom={4}
                borderRadius={10}
                mb={10}>
                Create An Account
              </Button>              
            </VStack>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Invalid Data</Modal.Header>
                <Modal.Body>
                  {modalMessage}
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button backgroundColor={'#15573E'} onPress={() => {
                    setShowModal(false);
                    }}>
                      Okay
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

export default Register;
