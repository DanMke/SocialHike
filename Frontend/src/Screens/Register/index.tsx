import {
    Input,
    VStack,
    FormControl,
    Button,
    WarningOutlineIcon,
    IconButton,
    Pressable,
    ArrowBackIcon,
    Image,
    Modal
  } from 'native-base';
import React from 'react';
import {View, SafeAreaView, ScrollView, KeyboardAvoidingView} from 'react-native';

import DatePicker from 'react-native-date-picker'

import styles from './styles';

import SocialHikeIcon from '../../../assets/socialhikeicon.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import auth from '@react-native-firebase/auth';

import api from '../../Services/api';

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
  const [avatar, setAvatar] = React.useState<string>('');

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
        console.error(error);
      });
    } else {
      console.log(errors);
      console.log('Validation Failed');
    }
  }

  const onChooseAvatar = () => {
    console.log('Choose Avatar');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
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
                  <Image width={20} height={20} borderRadius={100} source={{
                      uri: "https://wallpaperaccess.com/full/317501.jpg"
                      }} alt="User Image" />
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
